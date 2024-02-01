import { useState } from "react";
import style from "./CommentCreate.module.css";

const CommentCreate = () => {
  const [newComment, setNewComment] = useState({});

  return (
    <div className={`${style.comment_create}`}>
      <div className={`${style.comment}`}>
        <textarea placeholder="comment..." spellCheck="false" />
        <button>등록</button>
      </div>
    </div>
  );
};

export default CommentCreate;
