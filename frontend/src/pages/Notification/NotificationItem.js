import React, { useState, useEffect } from "react";

import CommentOnArticle from "./content/CommentOnArticle";
import ReactionOnArticle from "./content/ReactionOnArticle";
import ReplyOnComment from "./content/ReplyOnComment";
import ReplyOnReply from "./content/ReplyOnReply";

import style from "./NotificationItem.module.css";
import notice_comment from "../../assets/notice_comment.png";
import notice_like from "../../assets/notice_like.png";

const NotificationItem = ({
  id,
  alarmType,
  alarmArgs,
  text,
  createdAt,
  modifiedAt,
}) => {
  useEffect(() => {
    timeAgo();
  }, []);

  console.log(alarmType);

  // 시간차 계산
  const [newTime, setNewTime] = useState("");
  const originDate = modifiedAt;
  const date = new Date(originDate);
  const adjustedDate = new Date(date.getTime());

  function timeAgo() {
    const currentTime = new Date();
    const inputTime = adjustedDate;

    const timeDifferenceInSeconds = Math.floor(
      (currentTime - inputTime) / 1000
    );

    if (timeDifferenceInSeconds < 60) {
      return setNewTime(`${timeDifferenceInSeconds} 초 전`);
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return setNewTime(`${minutes} 분 전`);
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return setNewTime(`${hours} 시간 전`);
    } else if (timeDifferenceInSeconds < 2592000) {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return setNewTime(`${days} 일 전`);
    } else if (timeDifferenceInSeconds < 31536000) {
      const months = Math.floor(timeDifferenceInSeconds / 2592000);
      return setNewTime(`${months} 달 전`);
    } else {
      const years = Math.floor(timeDifferenceInSeconds / 31536000);
      return setNewTime(`${years} 년 전`);
    }
  }

  // axios : 게시글 단건 조회
  return (
    <>
      {alarmType !== "NEW_REPLY_ON_REPLY" && (
        <div className={`${style.container}`}>
          <div className={`${style.icon_notice}`}>
            <div className={`${style.icon}`}>
              {alarmType === "NEW_REACTION_ON_ARTICLE" ? (
                <img src={notice_like} />
              ) : (
                <img src={notice_comment} />
              )}
            </div>
            <div className={`${style.notice}`}>
              {alarmType === "NEW_COMMENT_ON_ARTICLE" && (
                <CommentOnArticle
                  articleId={alarmArgs.articleId}
                  commentId={alarmArgs.articleCommentId}
                />
              )}
              {alarmType === "NEW_REACTION_ON_ARTICLE" && (
                <ReactionOnArticle articleId={alarmArgs.articleId} />
              )}
              {alarmType === "NEW_REPLY_ON_COMMENT" && (
                <ReplyOnComment
                  articleId={alarmArgs.articleId}
                  commentId={alarmArgs.articleCommentId}
                  ReplyId={alarmArgs.articleCommentReplyId}
                />
              )}
              {/* {alarmType === "NEW_REPLY_ON_REPLY" && (
            <ReplyOnReply
              articleId={alarmArgs.articleId}
              commentId={alarmArgs.articleCommentId}
              ReplyId={alarmArgs.articleCommentReplyId}
            />
          )} */}
            </div>
          </div>
          <div className={`${style.time}`}>{newTime}</div>
        </div>
      )}
    </>
  );
};

export default NotificationItem;
