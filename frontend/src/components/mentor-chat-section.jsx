import { useEffect, useState, useRef } from "react";
import "../assets/css/user-chat-section.css";
import axios from "axios";
import PropTypes from "prop-types";
import UserChat from "./userChat";

ChatMemberCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  userDetails: PropTypes.object.isRequired,
};

function ChatMemberCard({ name, id, userDetails }) {
  const initialOnlineState = false;
  const onlineRef = useRef(initialOnlineState);
  const [openChat, setOpenChat] = useState(false);

  const handleChatBox = () => {
    setOpenChat(true);
  };
  return (
    <>
      {openChat && (
        <UserChat
          setOpenChat={setOpenChat}
          name={name}
          userDetails={userDetails}
        />
      )}
      <div
        className="chat-member-wrap"
        onClick={handleChatBox}
        style={{ cursor: "pointer" }}
      >
        <div className="chat-member">
          <h1>{name}</h1>
          {(onlineRef.current && <p className="color-green">Online</p>) || (
            <p className="color-gray">Offline</p>
          )}
        </div>
        <div className="bg-red msg-count"></div>
      </div>
    </>
  );
}

export default function MentorChatSection() {
  const [followingMentors, setFollowingMentors] = useState([]);
  const findFollowings = async () => {
    await axios
      .get(import.meta.env.VITE_API_URL + "/mentor/followings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data !== false) {
          console.log(res.data);
          setFollowingMentors(res.data);
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    findFollowings();
  }, []);

  return (
    <>
      {followingMentors.length != 0 ? (
        followingMentors.map((item) => {
          return (
            <>
              <ChatMemberCard
                key={item._id}
                name={item.userName}
                id={item.userId._id}
                userDetails={item.userId}
              />
            </>
          );
        })
      ) : (
        <p className="color-black text-center" style={{ margin: "1rem 0 0 0" }}>
          {" "}
          You dont follow anyone
        </p>
      )}
    </>
  );
}
