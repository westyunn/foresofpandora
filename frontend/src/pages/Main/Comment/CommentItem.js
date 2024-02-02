import { useEffect, useState } from "react";
import style from "./CommentItem.module.css";

import ReplyList from "../Reply/ReplyList";
import ReplyNotice from "./ReplyNotice";

const CommentItem = ({ id, nickname, content, regTime }) => {
  const [openReply, setOpenReply] = useState(false);
  const [createReply, setCreateReply] = useState(false);

  useEffect(() => {});

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
            <div className={`${style.nickname}`}>{nickname}</div>
            <div className={`${style.regTime}`}>{regTime}분전</div>
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
                답글 2개
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
        {createReply && <ReplyNotice nickname={nickname} />}
      </div>
    </div>
  );
};

export default CommentItem;
