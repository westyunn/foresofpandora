import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import style from "../NotificationItem.module.css";

const ReactionOnArticle = ({ articleId }) => {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const navigate = useNavigate();

  const [articleContent, setArticleContent] = useState("");
  const [item, setItem] = useState(null);
  const [articleCut, setArticleCut] = useState(false);

  useEffect(() => {
    getArticle();
  });

  // axios : 게시글 단건 조회
  const getArticle = () => {
    axios
      .get(`api/articles/${articleId}`, {
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
      })
      .catch((err) => {
        console.log("Comment_on_Article : 게시글 단건 조회 실패", err);
      });
  };

  // 클릭 시 이동
  const handleNavigate = () => {
    navigate("/boarddetail", { state: { item: item } });
  };

  return (
    <div onClick={handleNavigate}>
      <div className={`${style.content}`}>
        내 글에
        <span className={`${style.yourContent}`}> 좋아요</span>가 달렸습니다
      </div>
      <div className={`${style.myContent}`}>
        {articleContent}
        {articleCut && <span>...</span>}
      </div>
    </div>
  );
};

export default ReactionOnArticle;
