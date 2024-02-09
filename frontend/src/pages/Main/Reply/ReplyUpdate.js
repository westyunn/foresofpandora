// 수정 버튼 누르면 focus 시키기
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import style from "./ReplyUpdate.module.css";
import { replyActions } from "../../../store/reply";

const ReplyUpdate = ({ articleId }) => {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const dispatch = useDispatch();

  const replyId = useSelector((state) => state.reply.replyId);
  const commentId = useSelector((state) => state.reply.commentId);
  const content = useSelector((state) => state.reply.content);

  const [newReply, setNewReply] = useState(content);

  const content_change_handler = (e) => {
    console.log(e.target.value);
    setNewReply(e.target.value);
  };

  // 답글 수정 취소
  const close_handler = () => {
    dispatch(replyActions.closeReply());
  };

  // axios : 답글 수정
  const submit_handler = () => {
    if (newReply.length < 1) {
      alert("내용을 입력해주세요.");
      return;
    }
    if (newReply.length > 200) {
      alert("글자수 제한을 초과했습니다.");
      return;
    }
    axios
      .put(
        `/api/articles/${articleId}/comments/${commentId}/replies/${replyId}`,
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
        console.log("대댓글 수정 성공 : ", res);
        dispatch(replyActions.closeReply());
        dispatch(replyActions.handleRefresh());
      })
      .catch((err) => {
        console.log("대댓글 수정 실패 : ", err);
      });
  };

  return (
    <div className={`${style.container}`}>
      <div className={`${style.comment}`}>
        <textarea
          value={newReply}
          onChange={content_change_handler}
          spellCheck="false"
          maxLength="200"
        />
        <button className={`${style.bt_submit}`} onClick={submit_handler}>
          수정
        </button>
        <button className={`${style.bt_close}`} onClick={close_handler}>
          취소
        </button>
      </div>
    </div>
  );
};

export default ReplyUpdate;
