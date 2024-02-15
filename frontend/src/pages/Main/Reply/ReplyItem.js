import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import style from "./ReplyItem.module.css";
import { replyActions } from "../../../store/reply";
import Modal from "./Modal";
import axios from "axios";
import openModalButton from "../../../assets/openModal.png";
import profile from "../../../assets/temp_profile_2.png";

// 프로필 이미지 리스트
import { profileImg } from "../../../components/profileImg";
import ReplyCreate from "./ReplyCreate";

const ReplyItem = ({
  commentReplyId,
  memberId,
  content,
  nickname,
  profileIdx,
  backgroundIdx,
  createdAt,
  modifiedAt,
  articleId,
  commentId,
  replyCount,
}) => {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  // 로그인한 유저 아이디
  const loginUserId = useSelector((state) => state.user.userId);

  // 프로필 이미지 인덱스
  const profileImgIdx = profileIdx === -1 ? profileImg.length - 1 : profileIdx;

  //프로필 배경 인덱스
  const colorIdx = backgroundIdx === -1 ? 0 : backgroundIdx;

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
  // 답장 중 컴포넌트 열기
  const createReply_handler = () => {
    const tagIdValue = commentReplyId ? memberId : null;
    console.log(
      "디스패치 전 memberId:",
      memberId,
      "디스패치 전 commentReplyId:",
      commentReplyId
    );

    dispatch(
      replyActions.openReplyNotice({
        nickname,
        commentId,
        memberId: tagIdValue,
        commentReplyId,
      })
    );
    console.log(
      "디스패치 후 memberId:",
      memberId,
      "디스패치 후 commentReplyId:",
      commentReplyId
    );
  };

  return (
    <div className={`${style.container}`}>
      {/* 1 profile */}
      <div className={`${style.profile}`}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: profileImg[profileImgIdx].color[colorIdx],
            borderRadius: "100%",
            width: "3rem",
            height: "3rem",
          }}
        >
          <img
            src={profileImg[profileImgIdx].image}
            style={{ width: "2.2rem", height: "2.2rem" }}
          ></img>
        </div>
      </div>
      {/* 1 comment */}
      <div className={`${style.comment}`}>
        {/* 2 content */}
        <div className={`${style.content}`}>
          {/* 3 nickname & time */}
          <div className={`${style.nickname_time}`}>
            <div
              className={
                loginUserId === memberId
                  ? `${style.nickname_me}`
                  : `${style.nickname}`
              }
            >
              {nickname}
            </div>
            <div className={`${style.time}`}>{newTime}</div>
          </div>
          {/* 3 댓글 내용 */}
          <div className={`${style.content_text}`}>{content}</div>
          <div
            className={`${style.reply_create}`}
            onClick={createReply_handler}
          >
            답글달기
          </div>
          {/* <ReplyCreate
            articleId={articleId}
            commentId={commentId}
            replyId={replyId}
          /> */}
        </div>
        {/* 2 modal */}
        <div className={`${style.modal}`}>
          <div
            onClick={() => {
              openModal_handler();
            }}
          >
            <img src={openModalButton} style={{ height: "1.1rem" }} />
          </div>
          <Modal
            isOpen={openModal}
            commentReplyId={commentReplyId}
            commentId={commentId}
            content={content}
            articleId={articleId}
            replyCount={replyCount}
            memberId={memberId}
            onClose={() => setOpenModal(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default ReplyItem;
