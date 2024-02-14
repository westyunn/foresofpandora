import { useRef, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import CommentItem from "./CommentItem";
import style from "./CommentList.module.css";

const CommentList = ({ articleId, item }) => {
  const page = 0; // test - 수정 필요

  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const dispatch = useDispatch();

  const [commentList, SetCommentList] = useState([]);
  const refresh = useSelector((state) => state.comment.refresh);
  const replyRefresh = useSelector((state) => state.reply.refresh);

  useEffect(() => {
    getCommentList();
  }, [refresh, replyRefresh]);

  // axios : 댓글 목록 조회
  const getCommentList = () => {
    console.log("getCommentList");
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
        SetCommentList(response.data.data.content);
      })
      .catch((err) => {
        console.log("fail to get comment : ", err);
      });
  };

  return (
    <div className={`${style.CommentList}`}>
      {commentList.map((comment) => (
        <CommentItem
          key={comment.commentId}
          {...comment}
          articleId={articleId}
        />
      ))}
    </div>
  );
};

export default CommentList;
