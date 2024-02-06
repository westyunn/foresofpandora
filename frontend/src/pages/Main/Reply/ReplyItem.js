import axios from "axios";
import { useDispatch } from "react-redux";

import style from "./ReplyItem.module.css";
import { replyActions } from "../../../store/reply";

const ReplyItem = ({
  commentReplyId,
  memberId,
  content,
  nickname,
  createdAt,
  modifiedAt,
  articleId,
  commentId,
}) => {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const dispatch = useDispatch();

  const update_handler = () => {
    console.log(commentReplyId);
    console.log(commentId);
    console.log(content);
    // replyId, content 전달
    dispatch(replyActions.startReply({ commentReplyId, commentId, content }));
  };

  // axios : 답글 삭제
  const delete_handelr = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .delete(
          `/api/articles/${articleId}/comments/${commentId}/replies/${commentReplyId}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
              refreshtoken: refreshToken,
            },
          }
        )
        .then((res) => {
          console.log("대댓글 삭제 성공 : ", res);
          alert("삭제되었습니다.");
          window.location.reload();
        })
        .catch((err) => {
          console.log("대댓글 삭제 실패 : ", err);
        });
    }
  };
  // className={`${style.}`}
  return (
    <div className={`${style.container}`}>
      <div className={`${style.left}`}>프사</div>

      <div className={`${style.middle}`}>
        <div className={`${style.middle_top}`}>
          <div className={`${style.nickname}`}>{nickname}</div>
          <div className={`${style.time}`}>
            {createdAt === 0 ? <div>방금전</div> : <div>{createdAt}분전</div>}
          </div>
        </div>
        <div className={`${style.content}`}>{content}</div>
      </div>

      <div className={`${style.right_side}`}>
        <button onClick={update_handler}>수정</button>
        <button onClick={delete_handelr}>삭제</button>
      </div>

      <hr className={`${style.line}`} />
    </div>
  );
};

export default ReplyItem;
