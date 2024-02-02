import { useEffect, useState } from "react";
import style from "./CommentItem.module.css";

import ReplyList from "../Reply/ReplyList";
import ReplyNotice from "./ReplyNotice";

const CommentItem = ({
  commentId,
  content,
  createAt,
  memberId,
  modifiedAt,
  replyCount,
}) => {
  const [openReply, setOpenReply] = useState(false); // 대댓글 목록 열기
  const [createReply, setCreateReply] = useState(false); // 대댓글 작성

  useEffect(() => {});

  const update_handler = () => {
    // axios : 댓글 수정
  };

  const delete_handelr = () => {
    // axios : 댓글 삭제
  };

  const openReply_handler = () => {
    setOpenReply(!openReply);
  };

  const createReply_handler = () => {
    setCreateReply(!createReply);
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
      <div className={`${style.reply_to}`}>
        {createReply && <ReplyNotice memberId={memberId} />}
      </div>
    </div>
  );
};

export default CommentItem;
