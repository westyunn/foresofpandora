import { useEffect, useState } from "react";
import axios from "axios";

import CommentItem from "./CommentItem";
import style from "./CommentList.module.css";

const CommentList = () => {
  const [commentList, SetCommentList] = useState([
    // test 자료
    {
      id: 0,
      nickname: "굴러가는 도토리",
      content: "헐 짱귀여워",
      regTime: 1,
    },
  ]);

  useEffect(() => {
    // 댓글 리스트 요정
  }, []);

  // className={`${}`}
  return (
    <div className={`${style.CommentList}`}>
      {commentList.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
};

export default CommentList;
