import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

export default function VideoCall() {
  const { sessionToken } = useParams();
  const token = localStorage.getItem("token");
  useEffect(() => {
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
  return <>{token}</>;
}
