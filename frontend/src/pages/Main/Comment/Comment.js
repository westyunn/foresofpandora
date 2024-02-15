import { useSelector } from "react-redux";

import style from "./Comment.module.css";
import CommentList from "./CommentList";
import ReplyNotice from "./ReplyNotice";
import CommentCreate from "./CommentCreate";
import CommentUpdate from "./CommentUpdate";
import ReplyCreate from "../Reply/ReplyCreate";
import ReplyUpdate from "../Reply/ReplyUpdate";
import { useEffect } from "react";

const Comment = ({ articleId }) => {
  const testId = 1; // articleId 수신시, testId 전부 articleId로 교체 필요

  const commentId = useSelector((state) => state.comment.commentId); // 댓글 수정
  const isReply = useSelector((state) => state.reply.isReply); // 대댓글 작성
  const replyId = useSelector((state) => state.reply.replyId); // 대댓글 수정
  // console.log(onCommentChange);
  // className={`${}`}
  return (
    <div className={`${style.container}`}>
      <div className={`${style.top}`}>
        <h2>댓글</h2>
      </div>
      <div className={`${style.comment_list}`}>
        <CommentList articleId={articleId} />
      </div>
      {!commentId && !isReply && !replyId && (
        <CommentCreate
          articleId={articleId}
          // onCommentChange={onCommentChange}
        />
      )}
      {/* <div className={`${style.reply_to}`}>
        {isReply && <ReplyNotice articleId={articleId} commentId={commentId} />}
      </div> */}
      {commentId && <CommentUpdate articleId={articleId} />}
      {isReply && <ReplyCreate articleId={articleId} />}
      {replyId && <ReplyUpdate articleId={articleId} />}
    </div>
  );
};

export default Comment;
