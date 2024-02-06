import style from "./Comment.module.css";
import CommentList from "./CommentList";
import CommentCreate from "./CommentCreate";

const Comment = ({ articleId }) => {
  // className={`${}`}
  const testId = 1;

  return (
    <div className={`${style.comment}`}>
      <div className={`${style.top}`}>
        <h2>댓글</h2>
      </div>
      <div className={`${style.comment_list}`}>
        <CommentList articleId={testId} />
      </div>
      <CommentCreate articleId={testId} />
    </div>
  );
};

export default Comment;
