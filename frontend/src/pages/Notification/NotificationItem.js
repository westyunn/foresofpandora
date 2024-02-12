import style from "./NotificationItem.module.css";

const NotificationItem = () => {
  const ArticleContent = "집에 가고 싶다";
  const content = "나도 집에 가고 싶다";

  return (
    <div className={`${style.container}`}>
      <div className={`${style.icon_notice}`}>
        <div className={`${style.icon}`}>아이콘</div>
        <div className={`${style.notice}`}>
          <div className={`${style.articleContent}`}>
            내 글"{ArticleContent}"에 댓글이 달렸습니다
          </div>
          <div className={`${style.content}`}>{content}</div>
        </div>
      </div>
      <div className={`${style.time}`}>3분전</div>
    </div>
  );
};

export default NotificationItem;
