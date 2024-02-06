import { useDispatch, useSelector } from "react-redux";

import style from "./ReplyNotice.module.css";
import { replyActions } from "../../../store/reply";

const ReplyNotice = () => {
  const dispatch = useDispatch();
  const memberId = useSelector((state) => state.reply.memberId);

  const close_handler = () => {
    dispatch(replyActions.closeReplyNotice());
  };

  return (
    <div className={`${style.container}`}>
      <div className={`${style.left}`}>
        <div className={`${style.nickname}`}>{memberId}</div>
        <div>님에게 답장중</div>
      </div>
      <button className={style.cancel} onClick={close_handler}>
        x
      </button>
    </div>
  );
};

export default ReplyNotice;
