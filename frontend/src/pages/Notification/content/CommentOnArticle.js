import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import style from "../NotificationItem.module.css";

const CommentOnArticle = ({ articleId, commentId }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const [articleContent, setArticleContent] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [articleCut, setArticleCut] = useState(false);
  const [commentCut, setCommentCut] = useState(false);
  const [item, setItem] = useState(null);

  useEffect(() => {
    getArticle();
    getComment();
  }, []);

  // axios : 게시글 단건 조회
  const getArticle = () => {
    axios
      .get(`/api/articles/${articleId}`, {
        headers: {
          authorization: `Bearer ${token}`,
          refreshtoken: refreshToken,
        },
      })
      .then((res) => {
        const fullContent = res.data.data.content;
        if (fullContent.length > 15) {
          setArticleContent(fullContent.substr(0, 15));
          setArticleCut(true);
          return;
        }
        setArticleContent(fullContent);
        setItem(res.data.data);
        // console.log("data", res.data.data);
      })
      .catch((err) => {
        console.log("Comment_on_Article : 게시글 단건 조회 실패", err);
      });
  };

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
        if (fullContent.length > 7) {
          setCommentContent(fullContent.substr(0, 7));
          setCommentCut(true);
          return;
        }
        setCommentContent(fullContent);
      })
      .catch((err) => {
        console.log("Comment_on_Article : 댓글 단건 조회 실패", err);
      });
  };

  // 클릭 시 이동
  const handleNavigate = () => {
    navigate("/boarddetail", { state: { item: item } });
  };

  return (
    <div onClick={handleNavigate}>
      <div className={`${style.content}`}>
        내 글에 댓글 "
        <span className={`${style.yourContent}`}>{commentContent}</span>
        {commentCut && <span>...</span>}" 달렸습니다
      </div>
      <div className={`${style.myContent}`}>
        {articleContent}
        {articleCut && <span>...</span>}
      </div>
    </div>
  );
};

export default CommentOnArticle;
