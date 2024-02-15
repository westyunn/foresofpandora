import { useEffect, useState } from "react";
import axios from "axios";

import style from "../NotificationItem.module.css";

const ReplyOnReply = () => {
  return (
    <div>
      <div className={`${style.articleContent}`}>
        내 답글에 답글 "..."이 달렸습니다
      </div>
      <div className={`${style.content}`}>답글 내용...</div>
    </div>
  );
};

export default ReplyOnReply;
