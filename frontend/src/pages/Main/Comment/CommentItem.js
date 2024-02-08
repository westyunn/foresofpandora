import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import style from "./CommentItem.module.css";

import { replyActions } from "../../../store/reply";
import ReplyList from "../Reply/ReplyList";
import openModalButton from "../../../assets/openModal.png";
import Modal from "./Modal";

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
    if (replyCount > 0) {
      replyCount = 1;
    } else {
      replyCount = 0;
      setOpenReply(false);
    }
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
    <div className={`${style.comment_item}`}>
      <div className={`${style.container}`}>
        <div className={`${style.left_side}`}>프사자리</div>

        <div className={`${style.middle_side}`}>
          <div className={`${style.middle_side_top}`}>
            <div className={`${style.nickname}`}>{nickname}</div>
            <div className={`${style.regTime}`}>{newTime}</div>
          </div>
          <div className={`${style.content}`}>{content}</div>
          <div className={`${style.reply}`}>
            <div
              className={`${style.reply_create}`}
              onClick={createReply_handler}
            >
              답글달기
            </div>
            {!openReply && replyCount > 0 && (
              <div
                className={`${style.reply_list}`}
                onClick={openReply_handler}
              >
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
        </div>
        <div className={`${style.right_side}`}>
          <div onClick={openModalHandler}>
            <img src={openModalButton} style={{ height: "1.2rem" }} />
          </div>
          <Modal
            isOpen={openModal}
            commentId={commentId}
            content={content}
            articleId={articleId}
            onClose={closeModalHandler} // 닫기 핸들러 전달
          />
        </div>
      </div>
      <hr className={`${style.line}`} />
    </div>
  );
};

export default CommentItem;
