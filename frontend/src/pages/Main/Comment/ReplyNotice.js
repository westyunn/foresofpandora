import style from "./ReplyNotice.module.css";

const CommentReplyCreate = ({ memberId }) => {
  return (
    <div className={`${style.container}`}>
      <div className={`${style.left}`}>
        <div className={`${style.nickname}`}>{memberId}</div>
        <div>님에게 답장중</div>
      </div>
      <button>x</button>
    </div>
  );
};

export default CommentReplyCreate;
