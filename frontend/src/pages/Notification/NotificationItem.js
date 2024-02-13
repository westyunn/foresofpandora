import style from "./NotificationItem.module.css";

import notice_comment from "../../assets/notice_comment.png";
import notice_like from "../../assets/notice_like.png";

const NotificationItem = ({ id, event, myContent, content, time }) => {
  console.log(id);
  return (
    <div className={`${style.container}`}>
      <div className={`${style.icon_notice}`}>
        <div className={`${style.icon}`}>
          {event === "comment" && <img src={notice_comment} />}
          {event === "like" && <img src={notice_like} />}
        </div>
        <div className={`${style.notice}`}>
          {event === "comment" && (
            <div className={`${style.articleContent}`}>
              내 글에 댓글 "{content}..."이 달렸습니다
            </div>
          )}
          {event === "like" && (
            <div className={`${style.articleContent}`}>
              내 글에 좋아요가 달렸습니다
            </div>
          )}

          <div className={`${style.content}`}>{myContent}</div>
        </div>
      </div>
      <div className={`${style.time}`}>3분전</div>
    </div>
  );
};

export default NotificationItem;
