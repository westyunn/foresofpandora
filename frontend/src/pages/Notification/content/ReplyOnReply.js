import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import style from "../NotificationItem.module.css";

const ReplyOnReply = ({ articleId, commentId, ReplyId, commentReplyId }) => {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const navigate = useNavigate();

  const [replyContent, setReplyContent] = useState("");
  // const [articleId, setArticleId] = useState("");
  const [commentCut, setCommentCut] = useState(false);
  const [replyCut, setReplyCut] = useState(false);

  useEffect(() => {
    getReply();
  }, []);

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
  const getDetail = async () => {
    try {
      // const data = await getBoardDetail(articleId);
      // navigate("/boarddetail", { state: { item: data } });
    } catch (error) {
      console.error("Error deleting temp:", error);
    }
  };
  return (
    <div onClick={getDetail}>
      <div className={`${style.articleContent}`}>
        내 답글에 답글 "
        <span className={`${style.yourContent}`}>{replyContent}</span>
        {replyCut && <span>...</span>} "이 달렸습니다
      </div>
      <div className={`${style.myContent}`}>
        {/* {commentContent} */}
        {commentCut && <span>...</span>}
      </div>
    </div>
  );
};

export default ReplyOnReply;
