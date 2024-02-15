import close from "../../assets/modalClose.png";
import styles from "./ChatModal.module.css";
import { io } from "socket.io-client";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ChatModal = ({ setChatModalOpen, formattedName, item }) => {
  const userId = useSelector((state) => state.user.userId);
  console.log(item);
  const navigator = useNavigate();
  const [confirmModal, setConfirmModal] = useState(false);
  // // 서버 URL로 소켓 인스턴스 생성 (로컬 테스트용)
  // const socket = io("http://localhost:3000/");

  const handleConfirmModal = () => {
    setConfirmModal(true);
  };

  // const handleSendChatRequest = () => {
  //   // 상대방의 정ㅂ조와 함께 채팅 요청 서버에 보냄
  //   socket.emit("request_chat", { to: item.memberId });
  // };
  async function creatRoom() {
    console.log(userId);
    console.log(item.memberId);
    try {
      const data = { member1Id: userId, member2Id: item.memberId };
      const res = await axios({
        method: "POST",
        url: `/api/chat/rooms`,
        data,
      });
      const roomId = res.data.data;

      // console.log("dkdkr", res.data.data);
      navigator(`/chat/${roomId}`, {
        state: { roomId: roomId, chatUserId: item.memberId },
      });
    } catch (err) {
      console.log("채팅방 생성 실패", err);
    }
  }

  return (
    <>
      <div className={`${styles.cmContainer}`}>
        <>
          <div>
            <button
              onClick={() => setChatModalOpen(false)}
              className={`${styles.closeBtn}`}
            >
              <img style={{ width: "29px", height: "29px" }} src={close} />
            </button>
          </div>
          <div onClick={creatRoom} className={`${styles.chatReq}`}>
            {formattedName}님께 채팅 요청하기
            {/* <button onClick={creatRoom} className={`${styles.chatReq}`}>
              {formattedName}님께 채팅 요청하기 
            </button> */}
          </div>
        </>
      </div>
    </>
  );
};

export default ChatModal;
