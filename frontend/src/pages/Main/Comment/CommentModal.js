import { useEffect, useRef } from "react";
import Comment from "./Comment";
import styles from "./CommentModal.module.css";

import { useDispatch } from "react-redux";
import { commentActions } from "../../../store/comment";
import { replyActions } from "../../../store/reply";

const CommentModal = ({
  articleId,
  setCModalOpen,
  style,
  // setCoModalOpen,
  onCommentChange,
}) => {
  const dispatch = useDispatch();
  console.log(onCommentChange);

  const modalOutside = useRef();

  // 백그라운드 클릭 핸들러
  const handleClickOutside = (e) => {
    if (modalOutside.current && !modalOutside.current.contains(e.target)) {
      setCModalOpen(false); // 모달 닫힘
      // setCoModalOpen(false);
      dispatch(commentActions.closeUpdate());
      dispatch(replyActions.closeReply());
      dispatch(replyActions.closeReplyNotice());
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  return (
    <div
      ref={modalOutside}
      className={`${styles.cmContainer} ${styles.scroll_box}`}
      style={style}
    >
      <Comment articleId={articleId} />
    </div>
  );
};

export default CommentModal;
