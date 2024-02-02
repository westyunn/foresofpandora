import { useEffect, useState } from "react";
import axios from "axios";

import CommentItem from "./CommentItem";
import style from "./CommentList.module.css";

const CommentList = ({ articleId }) => {
  // const API = "http://i10b110.p.ssafy.io:8081/api-proxy/articles";

  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const [commentList, SetCommentList] = useState([]);

  const page = 0; // test data

  useEffect(() => {
    getCommentList();
  }, []);

  // axios : 댓글 목록 조회
  const getCommentList = () => {
    axios
      .get(`/api/articles/${articleId}/comments`, {
        params: {
          page,
        },
        headers: {
          authorization: `Bearer ${token}`,
          refreshtoken: refreshToken,
        },
      })
      .then((response) => {
        console.log("1. get comment : ", response.data.data.content); // test
        SetCommentList(response.data.data.content);
      })
      .catch((err) => {
        console.log("fail to get comment : ", err);
      });
  };

  // className={`${}`}
  return (
    <div className={`${style.CommentList}`}>
      {commentList.map((comment) => (
        <CommentItem key={comment.commentId} {...comment} />
      ))}
    </div>
  );
};

export default CommentList;
