import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import style from "./CommentItem.module.css";

import Modal from "./Modal";
import ReplyList from "../Reply/ReplyList";
import { replyActions } from "../../../store/reply";

import openModalButton from "../../../assets/openModal.png";
import profile from "../../../assets/temp_profile.png";

const CommentItem = ({
  commentId,
  memberId,
  content,
  replyCount,
  nickname,
  createAt,
  modifiedAt,
  articleId,
}) => {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const dispatch = useDispatch();

  const [openReply, setOpenReply] = useState(false); // 대댓글 목록 열기
  const [openModal, setOpenModal] = useState(false); // 모달창 열기

  const replyRefresh = useSelector((state) => state.comment.replyRefresh);

  const openModalHandler = () => {
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    timeAgo();
  }, []);

  useEffect(() => {
    // if (replyCount > 0) {
    //   replyCount = 1;
    // } else {
    //   replyCount = 0;
    //   setOpenReply(false);
    // }
  }, [replyRefresh]);

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

  // 답글 리스트 열기
  const openReply_handler = () => {
    setOpenReply(!openReply);
  };

  // 답장 중 컴포넌트 열기
  const createReply_handler = () => {
    dispatch(replyActions.openReplyNotice({ nickname, commentId }));
  };

  return (
    <div className={`${style.container}`}>
      {/* 1 profile */}
      <div className={`${style.profile}`}>
        <img src={profile} />
      </div>
      {/* 1 comment & reply */}
      <div className={`${style.comment_reply}`}>
        {/* 2 comment */}
        <div className={`${style.comment}`}>
          {/* 3 content */}
          <div className={`${style.content}`}>
            {/* 4 nickname & time */}
            <div className={`${style.nickname_time}`}>
              <div className={`${style.nickname}`}>{nickname}</div>
              <div className={`${style.time}`}>{newTime}</div>
            </div>
            {/* 4 댓글 내용 */}
            <div className={`${style.content_text}`}>{content}</div>
          </div>
          {/* 3 modal */}
          <div className={`${style.modal}`}>
            <div onClick={openModalHandler}>
              <img src={openModalButton} style={{ height: "1.2rem" }} />
            </div>
            <Modal
              isOpen={openModal}
              commentId={commentId}
              content={content}
              articleId={articleId}
              memberId={memberId}
              onClose={closeModalHandler} // 닫기 핸들러 전달
            />
          </div>
        </div>
        {/* 2 reply */}
        <div className={`${style.reply}`}>
          <div
            className={`${style.reply_create}`}
            onClick={createReply_handler}
          >
            답글달기
          </div>
          {!openReply && replyCount > 0 && (
            <div className={`${style.reply_list}`} onClick={openReply_handler}>
              답글 {replyCount}개
            </div>
          )}
          {openReply && (
            <div>
              <div
                className={`${style.reply_list}`}
                onClick={openReply_handler}
              >
                답글 닫기
              </div>
              <ReplyList
                articleId={articleId}
                commentId={commentId}
                replyCount={replyCount}
              />
            </div>
          )}
        </div>
        {/* 2 line */}
        <hr className={`${style.line}`} />
      </div>
    </div>
  );
};

export default CommentItem;
