import MyPageUser from "./MyPageUser";
import MyboardButton from "../../assets/MyboardButton.png";
import SavedButton from "../../assets/SavedButton.png";

import { Link } from "react-router-dom";

import style from "./Mypage.module.css";

const MyPage = () => {
  // const userId = useSelector((state) => state.user.id);
  const userId = 2;
  return (
    <div>
      <div className={style.mypage}>
        <MyPageUser userId={userId} />
        <div className={style.buttonImg}>
          <Link to="/mypage/board">
            <img src={MyboardButton} />
          </Link>
        </div>
        <div className={style.buttonImg}>
          <Link to="/mypage/favorite">
            <img src={SavedButton} />
          </Link>
        </div>
        <Link to="/boardtemp">임시보관함</Link>
      </div>
    </div>
  );
};

export default MyPage;
