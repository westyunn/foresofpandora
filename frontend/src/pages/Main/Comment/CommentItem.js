import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import style from "./CommentItem.module.css";
import axios from "axios";
import Modal from "./Modal";
import ReplyList from "../Reply/ReplyList";
import { replyActions } from "../../../store/reply";

import openModalButton from "../../../assets/openModal.png";

// 프로필 이미지 리스트
import { profileImg } from "../../../components/profileImg";

const CommentItem = ({
  commentId,
  memberId,
  content,
  replyCount,
  nickname,
  profileIdx,
  backgroundIdx,
  createAt,
  modifiedAt,
  articleId,
}) => {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const dispatch = useDispatch();

  // 로그인한 유저 아이디
  const loginUserId = useSelector((state) => state.user.userId);

  // console.log(loginUserId);
  // console.log(memberId);

  // 프로필 이미지 인덱스
  const profileImgIdx = profileIdx === -1 ? profileImg.length - 1 : profileIdx;

  //프로필 배경 인덱스
  const colorIdx = backgroundIdx === -1 ? 0 : backgroundIdx;

  const [openReply, setOpenReply] = useState(false); // 대댓글 목록 열기
  const [openModal, setOpenModal] = useState(false); // 모달창 열기

  const replyRefresh = useSelector((state) => state.comment.replyRefresh);

  const [commentReplyId, setCommentReplyId] = useState(0);
  const page = 0;
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

  // axios : 답글 목록 조회
  const getReplyList = () => {
    console.log("getReplyList");
    axios
      .get(`/api/articles/${articleId}/comments/${commentId}/replies`, {
        params: {
          page,
        },
        headers: {
          authorization: `Bearer ${token}`,
          refreshtoken: refreshToken,
        },
      })
      .then((res) => {
        console.log("답글 목록 조회 성공", res);
      })
      .catch((err) => {
        console.log("답글 목록 조회 실패", err);
      });
  };

  // 답장 중 컴포넌트 열기
  const createReply_handler = () => {
    // commentReplyId가 있으면 id를 tagId로
    const tagIdValue = commentReplyId ? memberId : null;
    dispatch(
      replyActions.openReplyNotice({
        nickname,
        commentId,
        memberId: tagIdValue,
        commentReplyId,
      })
    );
  };

  // // 답글 단건 조회
  // const getReplyDetail = async () => {
  //   console.log("getReplyDetail");
  //   axios
  //     .get(
  //       `/api/articles/${articleId}/comments/${commentId}/replies/${commentReplyId}`,
  //       {
  //         params: {
  //           page,
  //         },
  //         headers: {
  //           authorization: `Bearer ${token}`,
  //           refreshtoken: refreshToken,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log("답글 단건 조회 성공", res);
  //       setCommentReplyId(res.data.data.content.commentReplyId);
  //       console.log(commentReplyId);
  //     })
  //     .catch((err) => {
  //       console.log("답글 단건 조회 실패", err);
  //     });
  // };

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
      {/* 1 comment & reply */}
      <div className={`${style.comment_reply}`}>
        {/* 2 comment */}
        <div className={`${style.comment}`}>
          {/* 3 content */}
          <div className={`${style.content}`}>
            {/* 4 nickname & time */}
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
                commentReplyId={commentReplyId}
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
