import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import "../assets/css/videoCall.css";
import pic from "../assets/demo-pic.jpg";
import {
  MdCancelPresentation,
  MdMic,
  MdMicOff,
  MdOutlineCall,
  MdOutlineCallEnd,
  MdOutlineClose,
  MdPresentToAll,
  MdVideocam,
  MdVideocamOff,
} from "react-icons/md";

import global from "global";
import * as process from "process";
global.process = process;

export default function MentorVideoCall() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionToken = searchParams.get("sessionToken");
  const { sessionId, menteeId } = useParams();

  const [me, setMe] = useState("");
  const [socket, setSocket] = useState();
  const [stream, setStream] = useState();
  const [userId, setUserId] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callEnded, setCallEnded] = useState(false);
  const [receivingCall, setReceivingCall] = useState(false);
  const [called, setCalled] = useState(false);
  const [callerInfo, setCallerInfo] = useState("not yet joined");

  const [micStatus, setMicStatus] = useState(true);
  const [myVideoStatus, setMyVideoStatus] = useState(true);
  const [screenShare, setScreenShare] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      })
      .catch((err) => {
        console.log(err);
      });

    const socket = io("http://localhost:3000");
    setSocket(socket);
    console.log("useeffectd");

    socket.on("connect", () => {
      console.log("Connected to server", socket.id);
      setMe(socket.id);
      socket.emit("join-video-call", sessionToken);
    });

    socket.on("user-joined", (id) => {
      socket.emit("user-joined", socket.id);
      setCallerInfo("User joined");
      setUserId(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });

    socket.on("endCallRecived", (signal) => {
      console.log(signal);
      setCallerInfo("User Leaved");
      setCallEnded(true);
      setCallAccepted(false);
      setCalled(false);
      setUserId(null);
    });

    return () => {
      socket.disconnect();
      setUserId(null);
    };
  }, []);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    console.log(peer);
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      setReceivingCall(false);
      setCallEnded(false);
      peer.signal(signal);
    });

    connectionRef.current = peer;
    setCalled(true);
  };

  const answerCall = () => {
    setCallAccepted(true);
    setCallEnded(false);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
    setReceivingCall(false);
  };

  const leaveCall = () => {
    setCallEnded(true);
    setCallAccepted(false);
    setCalled(false);
    socket.emit("endCall", "Call ended");
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
    navigate(`/mentor/give-result/${sessionId}/${menteeId}`);
  };

  // Function to stop the stream
  // const stopStream = () => {
  //   if (stream && stream.getTracks) {
  //     stream.getTracks().forEach((track) => track.stop());
  //     setStream(null); // Clear the stream from the state
  //   }
  // };

  const handleMicOnOff = () => {
    setMicStatus(!micStatus);
  };

  const handleVideoOnOff = () => {
    setMyVideoStatus(!myVideoStatus);
  };

  const handleScreenShare = () => {
    setScreenShare(!screenShare);
  };
  return (
    <>
      <div
        className="container-lg-no-pd bg-black video-main-container"
        style={{ width: "100vw", height: "100vh" }}
      >
        <div className="video-container container-lg-no-pd">
          <div className="my-video-screen">
            {(stream && (
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                style={{ width: "100%" }}
              />
            )) || (
              <div className="no-video-screen">
                <img src={pic} alt="" className="user-image" />
                <h1 className="heading no-video-title color-white">You</h1>
              </div>
            )}
            {stream && (
              <div className="show-user-details">
                <h3 className="show-user-title color-white">you</h3>
              </div>
            )}
          </div>
          <div className="user-video-screen">
            {(callAccepted && (
              <video
                playsInline
                ref={userVideo}
                autoPlay
                style={{ width: "100%" }}
              />
            )) || (
              <div className="no-video-screen">
                <img src={pic} alt="" className="user-image" />
                <h1 className="heading no-video-title color-white">
                  {callerInfo}
                </h1>
              </div>
            )}
          </div>
        </div>
        {userId && !called ? (
          <div className="button-sets">
            <button
              onClick={() => callUser(userId)}
              className="dial-in-btn control-btn bg-green color-white"
            >
              Join Meeting
            </button>
          </div>
        ) : called ? null : (
          <div className="button-sets">
            <p className="color-yellow">
              {" "}
              Please wait for the other participent...
            </p>
            <p className="color-white"> OR</p>
            <button
              className="control-btn bg-red color-white dial-in-btn"
              onClick={leaveCall}
            >
              {" "}
              <MdOutlineClose className="control-icon" /> Leave
            </button>
          </div>
        )}
        {called ? (
          <div className="button-sets">
            {receivingCall && !callAccepted ? (
              <button
                className="dial-in-btn control-btn bg-green color-white"
                onClick={answerCall}
              >
                <MdOutlineCall className="control-icon" /> Dial in
              </button>
            ) : !receivingCall && !callAccepted ? (
              <p className="waiting-text color-white">Calling ...</p>
            ) : null}
            {callAccepted && !callEnded ? (
              <button
                className="control-btn btn-round bg-red color-white"
                onClick={leaveCall}
              >
                {" "}
                <MdOutlineCallEnd className="control-icon" />{" "}
              </button>
            ) : null}
            {(micStatus && (
              <button
                className="control-btn btn-round bg-gray color-white"
                onClick={handleMicOnOff}
              >
                <MdMic className="control-icon" />
              </button>
            )) || (
              <button
                className="control-btn btn-round color-white bg-red"
                onClick={handleMicOnOff}
              >
                <MdMicOff className="control-icon" />
              </button>
            )}

            {(myVideoStatus && (
              <button
                className="control-btn btn-round bg-gray color-white"
                onClick={handleVideoOnOff}
              >
                <MdVideocam className="control-icon" />
              </button>
            )) || (
              <button
                className="control-btn btn-round color-white bg-red"
                onClick={handleVideoOnOff}
              >
                <MdVideocamOff className="control-icon" />
              </button>
            )}

            {(screenShare && (
              <button
                className="control-btn btn-round color-white bg-red"
                onClick={handleScreenShare}
              >
                <MdCancelPresentation className="control-icon" />
              </button>
            )) || (
              <button
                className="control-btn btn-round bg-gray color-white"
                onClick={handleScreenShare}
              >
                <MdPresentToAll className="control-icon" />
              </button>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
}