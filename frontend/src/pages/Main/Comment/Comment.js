import style from "./Comment.module.css";
import CommentList from "./CommentList";
import CommentCreate from "./CommentCreate";

const Comment = () => {
  // className={`${}`}
  return (
    <div className={`${style.comment}`}>
      <div className={`${style.top}`}>
        <h2>댓글</h2>
      </div>
      <CommentList />
      <CommentCreate />
    </div>
  );
};

export default Comment;
