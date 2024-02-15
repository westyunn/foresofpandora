import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import style from "./ReplyCreate.module.css";
import { replyActions } from "../../../store/reply";
import ReplyNotice from "../Comment/ReplyNotice";

const ReplyCreate = ({ articleId }) => {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newReply, setNewReply] = useState();
  const commentId = useSelector((state) => state.reply.commentId);
  const tagId = useSelector((state) => state.reply.tagId);
  const commentReplyId = useSelector((state) => state.reply.commentReplyId);
  console.log(
    "ReplyCreate에서 확인한 tagId:",
    tagId,
    "ReplyCreate에서 확인한 commentReplyId:",
    commentReplyId
  );
  const content_change_handler = (e) => {
    setNewReply(e.target.value);
  };

  // // 사용자 선택
  // const handleSelectUser = (userId) => {
  //   dispatch(replyActions.setTagId)
  // };

  const requestBody = {
    ...(commentReplyId && { targetReplyId: commentReplyId }),
    ...(tagId && { tagId }),
    content: newReply,
  };
  // axios : 대댓글 작성
  const submit_handler = () => {
    if (!token) {
      window.alert("로그인을 해주세요");
      navigate("/login");
      return;
    }
    if (newReply.length < 1) {
      alert("내용을 입력해주세요.");
      return;
    }
    if (newReply.length > 200) {
      alert("글자수 제한을 초과했습니다.");
      return;
    }
    console.log(requestBody);
    axios
      .post(
        `/api/articles/${articleId}/comments/${commentId}/replies`,
        requestBody,
        {
          headers: {
            authorization: `Bearer ${token}`,
            refreshtoken: refreshToken,
          },
        }
      )

      .then(() => {
        dispatch(replyActions.closeReply());
        dispatch(replyActions.closeReplyNotice());
        dispatch(replyActions.handleRefresh());
        setNewReply("");
      })
      .catch((err) => {
        console.log("대댓글 생성 실패 : ", err);
      });
  };

  // 댓글창 높이 늘리기
  const textRef = useRef();
  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, [textRef]);

  return (
    <div className={`${style.container}`}>
      <div className={`${style.comment}`}>
        <ReplyNotice articleId={articleId} commentId={commentId} />
        <div className={`${style.content}`}>
          <textarea
            value={newReply}
            ref={textRef}
            onInput={handleResizeHeight}
            onChange={content_change_handler}
            placeholder="Reply..."
            spellCheck="false"
            maxLength="200"
          />
          <button className={`${style.bt_submit}`} onClick={submit_handler}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyCreate;
