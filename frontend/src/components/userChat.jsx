import demoImg from "../assets/demo-pic.jpg";
import { MdClose, MdOutlineSend } from "react-icons/md";
import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { io } from "socket.io-client";

UserChat.propTypes = {
  setOpenChat: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  userDetails: PropTypes.object.isRequired,
};
export default function UserChat({ setOpenChat, name, userDetails }) {
  const [chat, setChat] = useState("");
  const [allChats, setAllChats] = useState([]);
  const chatContainerRef = useRef();
  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  const socket = useRef(null); // Use useRef to hold the socket reference

  useEffect(() => {
    // Inside useEffect, initialize the socket connection when the component mounts
    socket.current = io(`${import.meta.env.VITE_API_URL}`); // Change the URL based on your backend socket.io server address

    socket.current.on("connect", () => {
      // Emit join-chat event to join the specific chat room
      socket.current.emit("join-chat", userDetails._id);
    });

    socket.current.on("newMessage", (message) => {
      // Receive new messages from the server and update the state
      setAllChats((prevAllChats) => [...prevAllChats, message]);
      scrollToBottom();
    });

    return () => {
      // Disconnect from the socket when the component is unmounted
      socket.current.disconnect();
    };
  }, [userDetails._id]);

  useEffect(() => {
    const getChats = async () => {
      axios
        .get(
          import.meta.env.VITE_API_URL + `/mentor/get-chats/${userDetails._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setAllChats(response.data);
          scrollToBottom();
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getChats();
  }, [userDetails._id]);

  useEffect(() => {
    scrollToBottom();
  }, [allChats]);

  const handleChat = (e) => {
    setChat(e.target.value);
  };

  const handleSendChat = async () => {
    axios
      .post(
        import.meta.env.VITE_API_URL + "/mentor/send-chat",
        { to: userDetails._id, msg: chat },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setAllChats((prevAllChats) => [...prevAllChats, response.data]);
        setChat("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="chat-section-wrap">
        <div className="reciver-details">
          <MdClose
            className="chat-close bg-black color-white"
            onClick={() => {
              setOpenChat(false);
            }}
          />
          <img src={demoImg} className="reciver-img" />
          <h1 className="reciver-name">{name}</h1>
          <p className="reciver-desc">{userDetails.emailId}</p>
        </div>
        <div className="span-tag">--- Activity ---</div>
        <div className="chat-section" ref={chatContainerRef}>
          {allChats.length !== 0 ? (
            allChats.map((item) => {
              if (item.from === userDetails._id) {
                return (
                  <>
                    <div className="msg-wrap">
                      <div className="msg-info">
                        <h1 className="msg-name">{name}</h1>
                      </div>
                      <div className="msg-body msg-from">{item.message}</div>
                      <p className="msg-date">
                        {format(
                          parseISO(item.createdAt),
                          "MMM d, yyyy - hh:mm a"
                        )}
                      </p>
                    </div>
                  </>
                );
              } else {
                return (
                  <>
                    <div className="msg-wrap">
                      <div className="msg-info">
                        <h1 className="msg-name sender">You</h1>
                      </div>
                      <div className="msg-body msg-to">{item.message}</div>
                      <p className="msg-date sender-date">
                        {format(
                          parseISO(item.createdAt),
                          "MMM d, yyyy - hh:mm a"
                        )}
                      </p>
                    </div>
                  </>
                );
              }
            })
          ) : (
            <p>you dont have any chats</p>
          )}
        </div>
        <div className="send-message-section">
          <textarea
            name="input-msg"
            id="send-message"
            rows="1"
            value={chat}
            onChange={handleChat}
            placeholder="write a message"
          ></textarea>
          <button className="btn-send" onClick={handleSendChat}>
            <MdOutlineSend />
          </button>
        </div>
      </div>
    </>
  );
}
