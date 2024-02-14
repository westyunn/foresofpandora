import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { commentActions } from "../../../store/comment";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import style from "./Modal.module.css";
import { useSelector } from "react-redux";

const Modal = ({
  isOpen,
  commentId,
  content,
  articleId,
  memberId,
  closeModalHandler,
}) => {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalRef = useRef(null); // 모달 참조를 위한 ref 설정

  // setOpenModal 상태와 해당 상태를 변경하는 함수를 정의
  const [openModal, setOpenModal] = useState(isOpen);
  const [openReportModal, setOpenReportModal] = useState(false);

  const userId = useSelector((state) => state.user.userId);
  const authority = userId === memberId;

  useEffect(() => {
    setOpenModal(isOpen);
  }, [isOpen]);

  // 수정
  const update_handler = () => {
    dispatch(commentActions.startUpdate({ commentId, content }));
  };
  // 삭제
  const delete_handler = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .delete(`/api/articles/${articleId}/comments/${commentId}`, {
          headers: {
            authorization: `Bearer ${token}`,
            refreshtoken: refreshToken,
          },
        })
        .then((res) => {
          console.log("댓글 삭제 성공 : ", res);
          dispatch(commentActions.handleRefresh());
          setOpenModal(false); // setOpenModal 함수를 통해 모달 닫기
        })
        .catch((err) => {
          console.log("댓글 삭제 실패 : ", err);
        });
    }
  };

  // 신고
  const report_handler = () => {
    if (window.confirm("신고 페이지로 넘어가시겠습니까?")) {
      navigate("/report", {
        state: {
          itemId: commentId,
          type: "comment",
          content: content,
          articleId: articleId,
        },
      });
    }
  };

  // 모달 외부 영역 클릭 시 모달 닫기
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setOpenModal(false);
      // closeModalHandler();
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
    <>
      <div
        className={`${style.container}`}
        style={{ display: openModal ? "flex" : "none" }}
        ref={modalRef} // 모달 ref 지정
      >
        {authority && <button onClick={update_handler}>수정</button>}
        {authority && <button onClick={delete_handler}>삭제</button>}
        {!authority && <button onClick={report_handler}>신고</button>}
      </div>
    </>
  );
};

export default Modal;
