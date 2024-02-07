import axios from "axios";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    timeAgo();
  }, []);

  // 시간차 계산
  const [newTime, setNewTime] = useState("");
  const originDate = modifiedAt;
  const date = new Date(originDate);
  const nineHours = 9 * 60 * 60 * 1000;
  const adjustedDate = new Date(date.getTime() + nineHours);

  function timeAgo() {
    const currentTime = new Date();
    const inputTime = adjustedDate;
    console.log(currentTime);
    console.log(inputTime);

    const timeDifferenceInSeconds = Math.floor(
      (currentTime - inputTime) / 1000
    );

    if (timeDifferenceInSeconds < 60) {
      return setNewTime(`${timeDifferenceInSeconds} 초 전`);
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return setNewTime(`${minutes} 분 전`);
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return setNewTime(`${hours} 시간 전`);
    } else if (timeDifferenceInSeconds < 2592000) {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return setNewTime(`${days} 일 전`);
    } else if (timeDifferenceInSeconds < 31536000) {
      const months = Math.floor(timeDifferenceInSeconds / 2592000);
      return setNewTime(`${months} 달 전`);
    } else {
      const years = Math.floor(timeDifferenceInSeconds / 31536000);
      return setNewTime(`${years} 년 전`);
    }
  }

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
            <div>{newTime}</div>
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
