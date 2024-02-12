import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./JoinChat.css";

const JoinChat = ({ darkMode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [roomBookedMessage, setRoomBookedMessage] = useState(false);

  useEffect(() => {
    setUsername(userInfo?.username);
  }, [userInfo]);

  const joinRoom = () => {
    if (userInfo == null) {
      //get chat data
      // dispatch(getChat({ room_id: room }));
    } else if (username !== "" && room !== "") {
      navigate("/chat", { state: { username: username, room: room } });
    }
  };

  const joinVideoRoom = () => {
    navigate("/videoChat", { state: { user: userInfo, room: room } });
  }

  return (
    <div className="joinChatContainer">
      <p
        className={` ${darkMode ? "text-light" : "text-dark"}`}
        style={{
          fontSize: "4rem",
          fontWeight: "bolder",
          fontFamily: "sans-serif",
          textShadow:
            "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
        }}
      >
        Let's Chat!
      </p>

      {!userInfo ? (
        <input
          type="text"
          placeholder="Enter your Name ..."
          onChange={(event) => {
            setRoomBookedMessage(false);
            setUsername(event.target.value);
          }}
        />
      ) : null}

      <input
        type="text"
        placeholder="Enter Room ID..."
        onChange={(event) => {
          setRoomBookedMessage(false);
          setRoom(event.target.value);
        }}
      />

      {roomBookedMessage ? (
        <div className="text-danger text-center mb-2 bg-white p-2">
          The chat room is booked by a registered user.
          <i class="fas fa-exclamation-triangle text-danger"></i>{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            Register{" "}
          </span>
        </div>
      ) : null}
      <button onClick={joinRoom}>Join Chat Room</button>
      <button onClick={joinVideoRoom}>Join Video Room</button>
    </div>
  );
};

export default JoinChat;
