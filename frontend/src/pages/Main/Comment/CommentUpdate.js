import { useState, useRef, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import style from "./CommentUpdate.module.css";
import { commentActions } from "../../../store/comment";

const CommentUpdate = ({ articleId }) => {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const dispatch = useDispatch();

  const commentId = useSelector((state) => state.comment.commentId);
  const content = useSelector((state) => state.comment.content);

  const [newComment, setNewComment] = useState(content);

  useEffect(() => {
    textRef.current.style.height = 3 + "rem";
  }, []);

  const content_change_handler = (e) => {
    setNewComment(e.target.value);
    handleResizeHeight();
  };

  // 댓글 수정 취소
  const close_handler = () => {
    dispatch(commentActions.closeUpdate());
  };

  // axios : 댓글 수정
  const submit_handler = () => {
    if (newComment.length < 1) {
      alert("내용을 입력해주세요.");
      return;
    }
    if (newComment.length > 200) {
      alert("글자수 제한을 초과했습니다.");
      return;
    }
    axios
      .put(
        `/api/articles/${articleId}/comments/${commentId}`,
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
        dispatch(commentActions.closeUpdate());
        dispatch(commentActions.handleRefresh());
        textRef.current.style.height = 3 + "rem"; // 댓글창 높이 원복
      })
      .catch((err) => {
        console.log("댓글 수정 실패 : ", err);
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
          spellCheck="false"
          maxLength="200"
        />
        <button className={`${style.bt_submit}`} onClick={submit_handler}>
          수정
        </button>
        <button className={`${style.bt_close}`} onClick={close_handler}>
          취소
        </button>
      </div>
    </div>
  );
};

export default CommentUpdate;
