import { useState } from "react";
import axios from "axios";

import style from "./CommentCreate.module.css";

const CommentCreate = ({ articleId }) => {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const [newComment, setNewComment] = useState({
    content: "",
  });

  const content_change_handler = (e) => {
    setNewComment({
      content: e.target.value,
    });
  };

  // axios : 댓글 작성
  const submit_handler = () => {
    console.log(newComment.content);
    axios
      .post(
        `/api/articles/${articleId}/comments`,
        {
          content: newComment.content,
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
      })
      .catch((err) => {
        console.log("댓글 생성 실패 : ", err);
      });

    alert("댓글이이 등록되었습니다");
    window.location.reload();
  };

  return (
    <div className={`${style.comment_create}`}>
      <div className={`${style.comment}`}>
        <textarea
          value={newComment.content}
          onChange={content_change_handler}
          placeholder="comment..."
          spellCheck="false"
        />
        <button onClick={submit_handler}>등록</button>
      </div>
    </div>
  );
};

export default CommentCreate;
