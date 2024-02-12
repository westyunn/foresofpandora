import { useState } from "react";
import { useSelector } from "react-redux";
import close from "../../assets/modalClose.png";
import styles from "./ChatModal.module.css";
const ChatModal = ({ setChatModalOpen, item, formattedName }) => {
  const id = useSelector((state) => state.user.userId); // 아이디 비교해서 채팅 신청

  return (
    <>
      <div className={`${styles.cmContainer}`}>
        <div>
          <button
            onClick={() => setChatModalOpen(false)}
            className={`${styles.closeBtn}`}
          >
            <img style={{ width: "29px", height: "29px" }} src={close} />
          </button>
        </div>
        <div className={`${styles.chatReq}`}>
          {formattedName}님께 채팅 요청하기
        </div>
      </div>
    </>
  );
};

export default ChatModal;
