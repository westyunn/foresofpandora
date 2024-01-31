import MyPageUser from "./MyPageUser";
import MyboardButton from "../../assets/MyboardButton.png";
import SavedButton from "../../assets/SavedButton.png";

import { useState } from "react";
import { Link } from "react-router-dom";

import "./Mypage.css";

const MyPage = () => {
  // const userId = useSelector((state) => state.user.id);
  const userId = 1;
  return (
    <div>
      <h1>마이페이지</h1>
      <div className="mypage">
        <MyPageUser userId={userId} />
        <div className="buttonImg">
          <Link to="/mypage/myboard">
            <img src={MyboardButton} />
          </Link>
        </div>
        <div className="buttonImg">
          <Link to="/mypage/favorite">
            <img src={SavedButton} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
