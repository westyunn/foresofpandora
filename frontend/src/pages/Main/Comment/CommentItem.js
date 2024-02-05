import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import style from "./CommentItem.module.css";

import { replyActions } from "../../../store/reply";
import ReplyList from "../Reply/ReplyList";
import ReplyNotice from "./ReplyNotice";

const CommentItem = ({
  commentId,
  content,
  createAt,
  memberId,
  modifiedAt,
  replyCount,
  articleId,
}) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const isReply = useSelector((state) => state.reply.isReply);

  const [openReply, setOpenReply] = useState(false); // 대댓글 목록 열기

  useEffect(() => {});

  // 몇분전인지

  const update_handler = () => {
    // axios : 댓글 수정
    // axios.put(
    //   `api/articles/${articleId}/comments/${commentId}`,
    //   {
    //     content: newComment.content,
    //   },
    //   {
    //     headers: {
    //       authorization: `Bearer ${token}`,
    //       refreshtoken: refreshToken,
    //     },
    //   }
    // );
  };

  const delete_handelr = () => {
    // axios : 댓글 삭제
    axios.delete(`api/articles/${articleId}/comments/${commentId}`, {
      headers: {
        authorization: `Bearer ${token}`,
        refreshtoken: refreshToken,
      },
    });
  };

  const openReply_handler = () => {
    setOpenReply(!openReply);
  };

  const createReply_handler = () => {
    dispatch(replyActions.isReply({ memberId, commentId }));
  };

  // className={`${}`}
  return (
    <div className={`${style.comment_item}`}>
      <div className={`${style.container}`}>
        <div className={`${style.left_side}`}>프사자리</div>

        <div className={`${style.right_side}`}>
          <div className={`${style.right_side_top}`}>
            <div className={`${style.nickname}`}>{memberId}번 유저</div>
            <div className={`${style.regTime}`}>{createAt}분전</div>
          </div>
          <div className={`${style.content}`}>{content}</div>
          <div className={`${style.reply}`}>
            <div
              className={`${style.reply_create}`}
              onClick={createReply_handler}
            >
              답글달기
            </div>
            {openReply || (
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
                <ReplyList />
              </div>
            )}
          </div>
        </div>
      </div>
      <hr className={`${style.line}`} />
      <div className={`${style.reply_to}`}>{isReply && <ReplyNotice />}</div>
    </div>
  );
};

export default CommentItem;
