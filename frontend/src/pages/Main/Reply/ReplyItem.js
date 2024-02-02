import style from "./ReplyItem.module.css";

const ReplyItem = ({ id, nickname, content, regTime }) => {
  // className={`${style.}`}
  return (
    <div className={`${style.container}`}>
      <div className={`${style.left}`}>프사</div>

      <div className={`${style.right}`}>
        <div className={`${style.right_top}`}>
          <div className={`${style.nickname}`}>{nickname}</div>
          <div className={`${style.time}`}>
            {regTime === 0 ? <div>방금전</div> : <div>{regTime}분전</div>}
          </div>
        </div>
        <div className={`${style.content}`}>{content}</div>
      </div>

      <hr className={`${style.line}`} />
    </div>
  );
};

export default ReplyItem;
