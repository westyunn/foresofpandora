import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import style from "./CommentItem.module.css";

import { replyActions } from "../../../store/reply";
import { commentActions } from "../../../store/comment";
import ReplyList from "../Reply/ReplyList";

const CommentItem = ({
  commentId,
  memberId,
  content,
  replyCount,
  nickname,
  createAt,
  modifiedAt,
  articleId,
}) => {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const dispatch = useDispatch();

  const [openReply, setOpenReply] = useState(false); // 대댓글 목록 열기

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

  // 댓글 수정 버튼 클릭
  const update_handler = () => {
    // reducer에 데이터 보내기
    dispatch(commentActions.startUpdate({ commentId, content }));
  };

  // axios : 댓글 삭제
  const delete_handelr = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .delete(`/api/articles/${articleId}/comments/${commentId}`, {
          headers: {
            authorization: `Bearer ${token}`,
            refreshtoken: refreshToken,
          },
        })
        .then((res) => {
          console.log("댓글 삭제 성공 : ", res);
          alert("삭제되었습니다.");
          window.location.reload();
        })
        .catch((err) => {
          console.log("댓글 삭제 실패 : ", err);
        });
    }
  };

  const openReply_handler = () => {
    setOpenReply(!openReply);
  };

  const createReply_handler = () => {
    dispatch(replyActions.openReplyNotice({ nickname, commentId }));
  };

  // className={`${}`}
  return (
    <div className={`${style.comment_item}`}>
      <div className={`${style.container}`}>
        <div className={`${style.left_side}`}>프사자리</div>

        <div className={`${style.middle_side}`}>
          <div className={`${style.middle_side_top}`}>
            <div className={`${style.nickname}`}>{nickname}</div>
            <div className={`${style.regTime}`}>{newTime}</div>
          </div>
          <div className={`${style.content}`}>{content}</div>
          <div className={`${style.reply}`}>
            <div
              className={`${style.reply_create}`}
              onClick={createReply_handler}
            >
              답글달기
            </div>
            {!openReply && replyCount > 0 && (
              <div
                className={`${style.reply_list}`}
                onClick={openReply_handler}
              >
                답글 {replyCount}개
              </div>
            )}
            {openReply && (
              <div>
                <div
                  className={`${style.reply_list}`}
                  onClick={openReply_handler}
                >
                  답글 닫기
                </div>
                <ReplyList articleId={articleId} commentId={commentId} />
              </div>
            )}
          </div>
        </div>
        <div className={`${style.right_side}`}>
          <button onClick={update_handler}>수정</button>
          <button onClick={delete_handelr}>삭제</button>
        </div>
      </div>
      <hr className={`${style.line}`} />
    </div>
  );
};

export default CommentItem;
