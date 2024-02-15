import { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import CommentItem from "./CommentItem";
import style from "./CommentList.module.css";

const CommentList = ({ articleId, item }) => {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const dispatch = useDispatch();
  const commentListRef = useRef(null); // 댓글 목록 제일 아래 ref
  const [commentList, SetCommentList] = useState([]);
  const refresh = useSelector((state) => state.comment.refresh);
  const replyRefresh = useSelector((state) => state.reply.refresh);
  const [commentCount, setCommentCount] = useState(0); // 댓글 개수 상태 추가
  const page = 0; // test - 수정 필요

  useEffect(() => {
    getCommentList();
  }, [refresh, replyRefresh]);
  useEffect(() => {
    if (commentList.length > commentCount) {
      // 댓글 개수가 이전보다 많아졌는지 확인
      commentListRef.current?.scrollIntoView({ behavior: "smooth" });
      setCommentCount(commentList.length); // 댓글 개수 업데이트
    }
  }, [commentList.length]); // 댓글 리스트 길이에 의존성 추가

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
        console.log("1. get comment : ", response.data.data.content); // test
        SetCommentList(response.data.data.content);
        // getCommentList();
      })
      .catch((err) => {
        console.log("fail to get comment : ", err);
      });
  };
  // 댓글 목록 업데이트 될때 스크롤 맨 아래로 이동
  // useEffect(() => {
  //   commentListRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [commentList]);

  return (
    <div className={`${style.CommentList}`}>
      {commentList.map((comment, index) => (
        <>
          <CommentItem
            key={comment.commentId}
            {...comment}
            articleId={articleId}
          />
          {/* {index === commentList.length - 1 && <div ref={commentListRef} />} */}
        </>
      ))}
    </div>
  );
};

export default CommentList;
