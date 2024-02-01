import { useState, useEffect } from "react";

import style from "./ReplyList.module.css";
import ReplyItem from "./ReplyItem";

const ReplyList = ({}) => {
  const [replyList, setReplyList] = useState([
    // test
    {
      id: 0,
      nickname: "졸린 하마",
      content: "졸려",
      regTime: 1,
    },
    {
      id: 2,
      nickname: "배고픈 다람쥐",
      content: "도토리냠냠",
      regTime: 0,
    },
  ]);

  // className={`${}`}
  return (
    <div className={`${style.ReplyList}`}>
      {replyList.map((reply) => (
        <ReplyItem key={reply.id} {...reply} />
      ))}
    </div>
  );
};

export default ReplyList;
