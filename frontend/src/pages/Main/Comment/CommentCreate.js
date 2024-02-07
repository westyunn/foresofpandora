import { useState, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import style from "./CommentCreate.module.css";
import { commentActions } from "../../../store/comment";

const CommentCreate = ({ articleId }) => {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const dispatch = useDispatch();

  const [newComment, setNewComment] = useState("");

  const content_change_handler = (e) => {
    console.log(e.target.value);
    setNewComment(e.target.value);
  };

  // axios : 댓글 작성
  const submit_handler = () => {
    if (newComment.length > 250) {
      alert("글자수 제한을 초과했습니다.");
      return;
    }

    console.log(newComment);
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
      .then((res) => {
        console.log("댓글 생성 성공 : ", res);
        dispatch(commentActions.handleRefresh());
        setNewComment("");
      })
      .catch((err) => {
        console.log("댓글 생성 실패 : ", err);
      });
  };

  return (
    <div className={`${style.comment_create}`}>
      <div className={`${style.comment}`}>
        <textarea
          value={newComment}
          onChange={content_change_handler}
          placeholder="comment..."
          spellCheck="false"
          maxLength="250"
        />
        <button onClick={submit_handler}>등록</button>
      </div>
    </div>
  );
};

export default CommentCreate;
