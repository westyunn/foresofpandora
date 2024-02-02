import style from "./ReplyNotice.module.css";

const CommentReplyCreate = ({ nickname }) => {
  return (
    <div className={`${style.container}`}>
      <div className={`${style.left}`}>
        <div className={`${style.nickname}`}>{nickname}</div>
        <div>님에게 답장중</div>
      </div>
      <button>X</button>
    </div>
  );
};

export default CommentReplyCreate;
