import { useEffect, useState } from "react";
import axios from "axios";

import style from "../NotificationItem.module.css";

const ReplyOnComment = ({ articleId, commentId, ReplyId }) => {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const [commentContent, setCommentContent] = useState("");
  const [replyContent, setReplyContent] = useState("");

  const [commentCut, setCommentCut] = useState(false);
  const [replyCut, setReplyCut] = useState(false);

  useEffect(() => {
    getComment();
    getReply();
  });

  // axios : 댓글 단건 조회
  const getComment = () => {
    axios
      .get(`/api/articles/${articleId}/comments/${commentId}`, {
        headers: {
          authorization: `Bearer ${token}`,
          refreshtoken: refreshToken,
        },
      })
      .then((res) => {
        const fullContent = res.data.data.content;
        if (fullContent.length > 15) {
          setCommentContent(fullContent.substr(0, 15));
          setCommentCut(true);
          return;
        }
        setCommentContent(fullContent);
      })
      .catch((err) => {
        console.log("Comment_on_Article : 댓글 단건 조회 실패", err);
      });
  };

  // axios : 대댓글 단건 조회
  const getReply = () => {
    axios
      .get(
        `/api/articles/${articleId}/comments/${commentId}/replies/${ReplyId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            refreshtoken: refreshToken,
          },
        }
      )
      .then((res) => {
        const fullContent = res.data.data.content;
        if (fullContent.length > 7) {
          setReplyContent(fullContent.substr(0, 7));
          setReplyCut(true);
          return;
        }
        setReplyContent(fullContent);
      })
      .catch((err) => {
        console.log("Comment_on_Article : 댓글 단건 조회 실패", err);
      });
  };

  const handleNavigate = () => {};

  return (
    <div onClick={handleNavigate}>
      <div className={`${style.content}`}>
        내 댓글에 답글 "
        <span className={`${style.yourContent}`}> {replyContent}</span>
        {replyCut && <span>...</span>}" 달렸습니다
      </div>
      <div className={`${style.myContent}`}>
        {commentContent}
        {commentCut && <span>...</span>}
      </div>
    </div>
  );
};

export default ReplyOnComment;
