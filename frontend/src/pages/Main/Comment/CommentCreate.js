import { useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import style from "./CommentCreate.module.css";
import { commentActions } from "../../../store/comment";

const CommentCreate = ({ articleId }) => {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [newComment, setNewComment] = useState("");

  const content_change_handler = (e) => {
    setNewComment(e.target.value);
    if (textRef == "") {
      textRef.current.style.height = 3 + "rem";
    }
  };

  // axios : 댓글 작성
  const submit_handler = () => {
    if (!token) {
      window.alert("로그인을 해주세요");
      navigate("/login");
      return;
    }
    if (newComment.length < 1) {
      alert("내용을 입력해주세요.");
      return;
    }
    if (newComment.length > 200) {
      alert("글자수 제한을 초과했습니다.");
      return;
    }
    axios
      .post(
        `/api/articles/${articleId}/comments`,
        {
          content: newComment,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            refreshtoken: refreshToken,
          },
        }
      )
      .then(() => {
        dispatch(commentActions.handleRefresh());
        setNewComment("");
        textRef.current.style.height = 3 + "rem"; // 댓글창 높이 원복
        // onCommentChange();
      })
      .catch((err) => {
        console.log("댓글 생성 실패 : ", err);
      });
  };

  // 댓글창 높이 늘리기
  const textRef = useRef();
  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, [textRef]);

  return (
    <div className={`${style.container}`}>
      <div className={`${style.comment}`}>
        <textarea
          value={newComment}
          ref={textRef}
          onInput={handleResizeHeight}
          onChange={content_change_handler}
          placeholder="comment..."
          spellCheck="false"
          maxLength="200"
        />
        <button onClick={submit_handler}>등록</button>
      </div>
    </div>
  );
};

export default CommentCreate;
