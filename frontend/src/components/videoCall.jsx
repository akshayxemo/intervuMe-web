import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

export default function VideoCall() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionToken = searchParams.get("sessionToken");
  const token = localStorage.getItem("token");
  const [stream, setStream] = useState();
  const myVideo = useRef();
  console.log(sessionToken);
  // const userVideo = useRef();
  // const connectionRef = useRef();
  useEffect(() => {
    navigator.mediaDevices
      .getDisplayMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });
    const socket = io("http://localhost:3000", {
      query: { token: token },
    });
    try {
      socket.on("connect", () => {
        console.log("Connected to server", socket.id);
        socket.emit("join-video-call", sessionToken);
      });
    } catch (err) {
      console.error(err);
    }

    return () => {
      socket.disconnect();
    };
  }, [sessionToken]);
  return (
    <>
      {stream && (
        <video
          playsInline
          muted
          ref={myVideo}
          autoPlay
          style={{ width: "300px" }}
        />
      )}
    </>
  );
}
