import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import style from "./ReplyItem.module.css";

import openModalButton from "../../../assets/openModal.png";
import Modal from "./Modal";

const ReplyItem = ({
  commentReplyId,
  memberId,
  content,
  nickname,
  createdAt,
  modifiedAt,
  articleId,
  commentId,
  replyCount,
}) => {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false); // 모달창 열기

  useEffect(() => {
    timeAgo();
  }, []);

  // 시간차 계산
  const [newTime, setNewTime] = useState("");
  const originDate = modifiedAt;
  const date = new Date(originDate);
  const adjustedDate = new Date(date.getTime());

  function timeAgo() {
    const currentTime = new Date();
    const inputTime = adjustedDate;

    const timeDifferenceInSeconds = Math.floor(
      (currentTime - inputTime) / 1000
    );

    if (timeDifferenceInSeconds < 60) {
      return setNewTime(`${timeDifferenceInSeconds} 초 전`);
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return setNewTime(`${minutes} 분 전`);
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return setNewTime(`${hours} 시간 전`);
    } else if (timeDifferenceInSeconds < 2592000) {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return setNewTime(`${days} 일 전`);
    } else if (timeDifferenceInSeconds < 31536000) {
      const months = Math.floor(timeDifferenceInSeconds / 2592000);
      return setNewTime(`${months} 달 전`);
    } else {
      const years = Math.floor(timeDifferenceInSeconds / 31536000);
      return setNewTime(`${years} 년 전`);
    }
  }

  const openModal_handler = () => {
    setOpenModal(true);
  };

  // className={`${style.}`}
  return (
    <div className={`${style.container}`}>
      <div className={`${style.left}`}>프사</div>

      <div className={`${style.middle}`}>
        <div className={`${style.middle_top}`}>
          <div className={`${style.nickname}`}>{nickname}</div>
          <div className={`${style.time}`}>
            <div>{newTime}</div>
          </div>
        </div>
        <div className={`${style.content}`}>{content}</div>
      </div>
      <div className={`${style.right_side}`}>
        <div
          onClick={() => {
            openModal_handler();
          }}
        >
          <img src={openModalButton} style={{ height: "1.2rem" }} />
        </div>
        <Modal
          isOpen={openModal}
          commentReplyId={commentReplyId}
          commentId={commentId}
          content={content}
          articleId={articleId}
          replyCount={replyCount}
          onClose={() => setOpenModal(false)}
        />
      </div>

      <hr className={`${style.line}`} />
    </div>
  );
};

export default ReplyItem;
