import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css";
import useWindowSize from "../../utils/useWindowSize";
import femaleChat from "../../assets/female-chat-3d.png";
import bubbleChatCircle from "../../assets/chat-bubble-circle.png";
import bubbleChatDownLeft from "../../assets/chat-bubble-down-left.png";
import bubbleChatUpRight from "../../assets/chat-bubble-up-right.png";
// import {
//   addUserToChat,
//   updateChat,
//   getChat,
// } from "../../features/chat/chatActions";

import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBIcon,
} from "mdb-react-ui-kit";

import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

function Chat({ darkMode }) {
  const { width, height } = useWindowSize();

  const location = useLocation();
  const navigate = useNavigate();

  // const { loading, chats } = useSelector((state) => state.chat);
  const { userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const state = location.state;
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.emit("join_room",state?.room);
  }, [state]);


  const sendMessage = async () => {

    console.log('dsadsad')
    if (currentMessage !== "") {
      const messageData = {
        room: state?.room,
        sender: state?.username,
        content: currentMessage,
        time_stamp:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const [basicModal, setBasicModal] = useState(false);

  console.log("list", messageList);

  return (
    <div className="Chat-main">
      {width >= 769 ? (
        <div className="logo-image-section">
          <img src={femaleChat} className="about-male-chat-illustration" />
        </div>
      ) : null}
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                {}
                Exit Chat{" "}
                <i className="fas fa-exclamation-triangle text-danger"></i>
              </MDBModalTitle>
            </MDBModalHeader>

            <MDBModalBody>Are you sure to exit the chat?</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => setBasicModal(!basicModal)}
              >
                Close
              </MDBBtn>
              <MDBBtn color="danger" onClick={() => navigate("/")}>
                Exit Chat
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <div className="chat-window">
        <div className="chat-header">
          <p>Let's Chat</p>{" "}
          <MDBIcon
            icon="times-circle"
            color={darkMode ? "muted" : "danger"}
            size="2x"
            style={{
              marginRight: "2%",
            }}
            onClick={() => setBasicModal(!basicModal)}
          />
        </div>
        <div className={`chat-body ${darkMode ? "bg-black" : "bg-light"}`}>
          <ScrollToBottom className="message-container">

            {messageList.map((messageContent) => {
              return (
                <div
                  className="message"
                  id={state?.username === messageContent.sender ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.content}</p>
                    </div>
                    <div className="message-meta">
                      <p
                        className={`${darkMode ? "text-white" : "text-black"}`}
                        id="time"
                      >
                        {messageContent.time_stamp}
                      </p>
                      <p
                        className={`${darkMode ? "text-white" : "text-black"}`}
                        id="author"
                      >
                        {messageContent.sender}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            className={`${
              darkMode ? "footer-input-white" : "footer-input-dark"
            }`}
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>

      {width >= 1200 ? (
        <div className="logo-image-section">
          <img src={bubbleChatDownLeft} className="about-chat-bubble" />
          <img src={bubbleChatUpRight} className="about-chat-bubble" />
        </div>
      ) : null}
    </div>
  );
}

export default Chat;
