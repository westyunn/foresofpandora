// 권한 설정 필요

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import style from "./Modal.module.css";

import { replyActions } from "../../../store/reply";
import { commentActions } from "../../../store/comment";
import { useNavigate } from "react-router-dom";

const Modal = ({
  isOpen,
  commentReplyId,
  commentId,
  content,
  articleId,
  replyCount,
  memberId,
}) => {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const dispatch = useDispatch();
  const modalRef = useRef(null); // 모달 참조를 위한 ref 설정
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(isOpen);

  const userId = useSelector((state) => state.user.userId);
  const authority = userId === memberId;

  useEffect(() => {
    setOpenModal(isOpen);
  }, [isOpen]);

  // 수정
  const update_handler = () => {
    // replyId, content 전달
    dispatch(replyActions.startReply({ commentReplyId, commentId, content }));
  };

  // axios : 답글 삭제
  const delete_handler = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .delete(
          `/api/articles/${articleId}/comments/${commentId}/replies/${commentReplyId}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
              refreshtoken: refreshToken,
            },
          }
        )
        .then((res) => {
          console.log("대댓글 삭제 성공 : ", res);
          if (replyCount === 1) {
            dispatch(commentActions.handleReplyRefresh());
          }
          dispatch(replyActions.handleRefresh());
        })
        .catch((err) => {
          console.log("대댓글 삭제 실패 : ", err);
        });
    }
  };

  // 신고
  const report_handler = () => {
    if (window.confirm("신고 페이지로 넘어가시겠습니까?")) {
      navigate("/report", {
        state: {
          articleId: articleId,
          itemId: commentId,
          type: "reply",
          content: content,
          commentReplyId: commentReplyId,
        },
      });
    }
  };

  // 모달 외부 영역 클릭 시 모달 닫기
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setOpenModal(false);
    }
  };

  useEffect(() => {
    // 모달이 열려있을 때만 이벤트 리스너 추가
    if (openModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal]);

  return (
    <div
      className={`${style.container}`}
      style={{ display: openModal ? "flex" : "none" }}
      ref={modalRef} // 모달 ref 지정
    >
      {authority && <button onClick={update_handler}>수정</button>}
      {authority && <button onClick={delete_handler}>삭제</button>}
      {!authority && <button onClick={report_handler}>신고</button>}
    </div>
  );
};

export default Modal;
