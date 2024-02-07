import { useEffect, useRef } from "react";
import Comment from "./Comment";
import styles from "./CommentModal.module.css";
const CommentModal = ({ articleId, setCModalOpen }) => {
  const modalOutside = useRef();

  // 백그라운드 클릭 핸들러
  const handleClickOutside = (e) => {
    if (modalOutside.current && !modalOutside.current.contains(e.target)) {
      setCModalOpen(false); // 모달 닫힘
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
    >
      <Comment articleId={articleId} />
    </div>
  );
};

export default CommentModal;
