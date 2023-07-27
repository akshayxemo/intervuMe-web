import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

export default function VideoCall() {
  const { sessionToken } = useParams();
  const token = localStorage.getItem("token");
  const [stream, setStream] = useState();
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
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
  }, []);
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
