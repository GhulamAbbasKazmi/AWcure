import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { FaCommentAlt } from "react-icons/fa";
// import './ChatBot.css'

import femaleAvatar from "../../assets/female-avatar-3.png";
import maleAvatar from "../../assets/male-avatar-1.png";
import nurseIllustration from "../../assets/nurse-with-syringe.png";

import {
    MDBBtn,
    MDBCardImage
} from "mdb-react-ui-kit";

// const host = "http://localhost:5000";

const Chatbot = () => {
    const { userInfo, userToken } = useSelector((state) => state.user);

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([{ text: "How can I help you?", sender: "bot" }]);
    const [inputValue, setInputValue] = useState("");
    const [response, setResponse] = useState("");


    useEffect(() => {
        if (response != "") {
            setMessages([...messages, { text: response, sender: "bot" }]);
        }
      }, [response]);

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {

            if (inputValue == ""){
                return;
            }

            // Add the user message to the chat
            setMessages([...messages, { text: inputValue, sender: "user" }]);
            setInputValue("");

            axios
            .post(`/chat`, { inputValue })
            .then((res) => {
              setResponse(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
    };

    const handleMessageSend = () => {

        if (inputValue == ""){
            return;
        }
        if (inputValue.trim()) {

            // Add the user message to the chat
            setMessages([...messages, { text: inputValue, sender: "user" }]);
            setInputValue("");

            axios
            .post(`/chat`, { inputValue })
            .then((res) => {
              setResponse(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
    };

    return (
        <div
            style={{
                position: "fixed",
                bottom: 60,
                right: 20,
                zIndex: 999,
                backgroundColor: "#fff",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                borderRadius: 5,
                transition: "all 0.3s ease-in-out",
                transform: `translateY(${isOpen ? 0 : 100}%)`,
                maxWidth: 400,
                maxHeight: 600,
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 20px",
                    borderBottom: "1px solid #ccc",
                }}
            >
                <h3 style={{ margin: 0 }}>AW Cure Chatbot</h3>
                <button
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                    onClick={toggleChatbot}
                >
                    {isOpen ? "Close" : <FaCommentAlt />}
                </button>
            </div>
            <div
                style={{
                    maxHeight: 400,
                    overflowY: "scroll",
                    padding: 20,
                }}
                className="chat-body"
            >
                {messages.map((message, index) => (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            flexDirection: message.sender === "bot" ? "row" : "row-reverse",
                            alignItems:  message.sender === "bot" ? "flex-start" : "center",
                            marginBottom: 10,
                        }}
                    >
                        {message.sender === "bot" ? (
                            <img
                                src={nurseIllustration}
                                alt="Bot avatar"
                                style={{ width: "60px", height: "60px", padding:"5px", objectFit: "cover", borderRadius:"15%", backgroundColor: "rgba(0, 2, 45, 0.772)", marginRight:"10px" }}
                            />
                        ) : message.sender === "user" &&
                        <MDBCardImage
                            src={
                                userInfo?.image?.url
                                    ? userInfo?.image?.url
                                    : userInfo?.gender == "female"
                                        ? femaleAvatar
                                        : maleAvatar
                            }
                            alt="avatar"
                            className="rounded-circle m-2"
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                            fluid
                        />
                        }
                        <div
                            style={{
                                backgroundColor: message.sender === "bot" ? "#f5f5f5" : "#a060ff",
                                padding: "10px 15px",
                                borderRadius: 10,
                                color: message.sender === "bot" ? "#555" : "#fff",
                                maxWidth: 250,
                                position: "relative",
                            }}
                        >
                            <p style={{ margin: 0 }}>{message.text}</p>
                        </div>

                    </div>
                ))}
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    padding: 10,
                    borderTop: "1px solid #ccc",
                }}
            >
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    style={{
                        flex: 1,
                        padding: "10px 15px",
                        borderRadius: 20,
                        border: "none",
                        marginRight: 10,
                    }}
                    placeholder="Type a message..."
                />
                <MDBBtn
                    className="btn-rounded heroSecBtn-1"
                    style={{
                        width: "100%",
                        transition: "all 0.3s ease-in-out",
                    }}
                    onClick={handleMessageSend}
                >
                    Send
                </MDBBtn>
            </div>
        </div>
    );
};

export default Chatbot;