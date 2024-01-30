import { useState } from "react";
import MyPageUser from "./MyPageUser";
import { Link } from "react-router-dom";

const MyPage = () => {
  // const userId = useSelector((state) => state.user.id);
  const userId = 1;
  return (
    <div>
      <h2>마이페이지</h2>
      <MyPageUser userId={userId} />
      <Link to="/mypage/myboard">내가 쓴 글</Link>
      <Link to="/mypage/favorite">보관한 글</Link>
    </div>
  );
};

export default MyPage;
