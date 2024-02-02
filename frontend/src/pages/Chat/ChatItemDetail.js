import { io } from "socket.io-client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import style from "./ChatItemDetail.module.css";
import temp_profile from "../../assets/cat1.png";

const ChatItemDetail = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const socket = io("http://localhost:3000");

  useEffect(() => {
    socket.on("newMessage", (message) => {
      // 메시지 처리
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  const sendMessage = (message) => {
    socket.emit("sendMessage", message);
  };

  return (
    <div className={`${style.chat_item_detail}`}>
      <div className={`${style.header}`}>
        <button
          className={`${style.bt_back}`}
          onClick={() => {
            navigator(-1);
          }}
        >
          뒤로
        </button>
        <img src={temp_profile} className={`${style.profile}`} />
        <div>7시간 31분 48초</div>
      </div>
      <div className={`${style.chat}`}>
        <span className={`${style.chat_left}`}>
          <span>안녕 나는 고양이야</span>
        </span>
        <span className={`${style.chat_right}`}>
          <span>어쩌라고</span>
        </span>
      </div>
      <div className={`${style.message}`}>
        <textarea placeholder="message..." spellCheck="false" />
        <button>전송</button>
      </div>
    </div>
  );
};

export default ChatItemDetail;
