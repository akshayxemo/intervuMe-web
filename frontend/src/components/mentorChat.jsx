import demoImg from "../assets/demo-pic.jpg";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa6";
import { MdClose, MdOutlineSend } from "react-icons/md";
import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import io from "socket.io-client";

MentorChat.propTypes = {
  setOpenChat: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  mentorDetails: PropTypes.object.isRequired,
};
export default function MentorChat({ setOpenChat, name, mentorDetails }) {
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
      socket.current.emit("join-chat", mentorDetails._id);
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
  }, [mentorDetails._id]);

  useEffect(() => {
    const getChats = async () => {
      axios
        .get(
          import.meta.env.VITE_API_URL + `/user/get-chats/${mentorDetails._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setAllChats(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getChats();
  }, [mentorDetails._id]);

  useEffect(() => {
    scrollToBottom();
  }, [allChats]);

  const handleChat = (e) => {
    setChat(e.target.value);
  };

  const handleSendChat = async () => {
    axios
      .post(
        import.meta.env.VITE_API_URL + "/user/send-chat",
        { to: mentorDetails._id, msg: chat },
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

  function getFirstName(name) {
    const words = name.split(" ");
    return words[0];
  }

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
          <p className="reciver-desc">{mentorDetails.role}</p>
          <div className="socials">
            <FaFacebook className="social-icon" />
            <FaLinkedin className="social-icon" />
            <FaInstagram className="social-icon" />
            <FaTwitter className="social-icon" />
          </div>
        </div>
        <div className="span-tag">--- Activity ---</div>
        <div className="chat-section" ref={chatContainerRef}>
          {allChats.length !== 0 ? (
            allChats.map((item) => {
              if (item.from === mentorDetails._id) {
                return (
                  <>
                    <div className="msg-wrap">
                      <div className="msg-info">
                        <h1 className="msg-name">{getFirstName(name)}</h1>
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

// .................................UserChats for Mentor side rendering...............................
