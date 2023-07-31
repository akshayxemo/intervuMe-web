import { useEffect, useState, useMemo, useRef } from "react";
import "../assets/css/user-chat-section.css";
import axios from "axios";
import PropTypes from "prop-types";
import { io } from "socket.io-client";

ChatMentorCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
const socket = io(import.meta.env.VITE_API_URL + "");
function ChatMentorCard({ name, id }) {
  const initialOnlineState = false;
  const onlineRef = useRef(initialOnlineState);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("chat connection", socket.id);
    });
    socket.on("i-am-joined", (Gid) => {
      console.log("id: " + Gid + "myId: " + id);
      if (Gid === id) {
        onlineRef.current = true;
      }
    });
    socket.on("i-am-leaving", (Gid) => {
      // console.log("id: " + Gid + "myId: " + id);
      if (Gid === id) {
        onlineRef.current = false;
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [id]);

  // Memoize the 'online' state value
  // const memoizedOnlineState = useMemo(() => onlineRef.current, []);

  return (
    <>
      <div className="chat-member-wrap">
        <div className="chat-member">
          <h1>{name}</h1>
          {(onlineRef.current && <p className="color-green">Online</p>) || (
            <p className="color-gray">Offline</p>
          )}
        </div>
        <div className="bg-red msg-count"></div>
      </div>
      ;
    </>
  );
}

export default function UserChat() {
  const [followingMentors, setFollowingMentors] = useState([]);
  const findFollowings = async () => {
    await axios
      .get(import.meta.env.VITE_API_URL + "/followings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.following);
        setFollowingMentors(res.data.following);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    findFollowings();
  }, []);
  return (
    <>
      {followingMentors.map((item) => {
        return (
          <>
            <ChatMentorCard key={item._id} name={item.name} id={item.id} />
          </>
        );
      })}
    </>
  );
}
