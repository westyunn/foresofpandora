import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import style from "./ReplyCreate.module.css";
import { replyActions } from "../../../store/reply";

const ReplyCreate = ({ articleId }) => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const [newReply, setNewReply] = useState();
  const commentId = useSelector((state) => state.reply.commentId);

  const content_change_handler = (e) => {
    setNewReply(e.target.value);
  };

  // axios : 대댓글 작성
  const submit_handler = () => {
    if (newReply.length > 250) {
      alert("글자수 제한을 초과했습니다.");
      return;
    }
    axios
      .post(
        `/api/articles/${articleId}/comments/${commentId}/replies`,
        {
          content: newReply,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            refreshtoken: refreshToken,
          },
        }
      )
      .then((res) => {
        console.log("대댓글 생성 성공 : ", res);

        dispatch(replyActions.isNotReply());
        alert("답글이 등록되었습니다");
        window.location.reload();
      })
      .catch((err) => {
        console.log("대댓글 생성 실패 : ", err);
      });
  };

  return (
    <div className={`${style.container}`}>
      <div className={`${style.comment}`}>
        <textarea
          value={newReply}
          onChange={content_change_handler}
          placeholder="Reply..."
          spellCheck="false"
          maxlength="250"
        />
        <button className={`${style.bt_submit}`} onClick={submit_handler}>
          등록
        </button>
      </div>
    </div>
  );
};

export default ReplyCreate;
