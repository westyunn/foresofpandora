// ReactChatApp.js

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./ChatItemDetail.module.css";
import temp_profile from "../../assets/cat1.png";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import { profileImg } from "../../components/profileImg";

const WebSocketEndpoint = "ws://i10b110.p.ssafy.io:8888/"; // 서버의 WebSocket 엔드포인트

const ReactChatApp = () => {
  const navigator = useNavigate();
  const userId = useSelector((state) => state.user.userId);
  const { state } = useLocation();
  const projectId = state.roomId;
  const chatUserId = state.chatUserId;
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [ws, setWs] = useState(null);
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // WebSocket 연결
    console.log("roomId", state.roomId);
    console.log("roomId", state.roomId);
    const newWs = new WebSocket(`${WebSocketEndpoint}${projectId}`);
    setWs(newWs);

    newWs.onopen = () => {
      console.log("WebSocket 연결 성공");
    };

    newWs.onmessage = (event) => {
      console.log("event", event);

      const receivedMessage = event.data;
      console.log("recived", event.data);
      setMessages((pre) => [
        ...pre,
        { id: chatUserId, message: receivedMessage },
      ]);
    };
    // console.log(pro);
    getMyChat();

    newWs.onclose = () => {
      // console.log("WebSocket 연결 종료");
    };

    return () => {
      newWs.close();
    };
  }, [projectId]);

  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      ws.send(inputMessage);
      saveChat();
      setMessages((pre) => [...pre, { id: userId, message: inputMessage }]);
      setInputMessage("");
    }
  };
  const updateInputMessage = (e) => {
    setInputMessage(e.target.value);
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  async function getMyChat() {
    const token = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    const res = await axios({
      method: "GET",
      url: `/api/chat/rooms/${projectId}`,
      headers: {
        authorization: `Bearer ${token}`,
        refreshtoken: refreshToken,
      },
    });
    console.log(res);
    const chatList = res.data.data;
    console.log("chatList", chatList);
    for (var i = 0; i < chatList.length; i++) {
      const chat = { id: chatList[i].senderId, message: chatList[i].content };
      console.log(chat);
      // console.log(chatList[i].senderId);
      // console.log(chatList[i].content);
      setMessages((pre) => [...pre, chat]);
    }
    // console.log(messages);
    return res;
  }

  //채팅 저장
  async function saveChat() {
    const token = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    const data = { content: inputMessage };
    const res = await axios({
      method: "POST",
      url: `/api/chat/rooms/${projectId}`,
      data,
      headers: {
        authorization: `Bearer ${token}`,
        refreshtoken: refreshToken,
      },
    });
    console.log(res);
    // console.log(res.data.data[0]);
    // setRoomList(res.data.data);
    return res;
  }

  // 랜덤 인덱스 생성 (프로필 이미지)
  const profileIdx = Math.floor(Math.random() * profileImg.length);

  // 랜덤 인덱스 생성 (프로필 이미지 배경)
  const colorIdx = Math.floor(Math.random() * 2);

  //

  return (
    <div className={`${style.board_container}`}>
      <div className={`${style.chat_item_detail}`}>
        <div className={`${style.header}`}>
          <div>
            <button
              className={`${style.bt_back}`}
              onClick={() => {
                navigator(-1);
              }}
            >
              뒤로
            </button>
          </div>
          <div>
            <img src={temp_profile} className={style.profile}></img>
          </div>
        </div>
        <div className={style.chatDiv}>
          {messages?.map((message, index) => (
            <>
              <div key={index} className={`${style.chat}`}>
                {message.id === userId ? (
                  <span className={`${style.chat_right}`}>
                    <span>{message.message}</span>
                  </span>
                ) : (
                  <span className={`${style.chat_left}`}>
                    <span>{message.message}</span>
                  </span>
                )}
              </div>
            </>
          ))}
        </div>
        <div className={`${style.message}`}>
          <div style={{ marginRight: "1%" }}>
            <input
              onKeyPress={handleOnKeyPress}
              onChange={updateInputMessage}
              value={inputMessage}
            />
          </div>
          <div>
            <button onClick={sendMessage}>전송</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactChatApp;
