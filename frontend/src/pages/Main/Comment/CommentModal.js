import CommentList from "./CommentList";
import Comment from "./Comment";
import styles from "./CommentModal.module.css";
const CommentModal = ({ articleId, setCModalOpen }) => {
  return (
    <div className={`${styles.cmContainer}`}>
      <Comment articleId={articleId} />
    </div>
  );
};

export default CommentModal;
