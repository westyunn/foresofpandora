import BoardList from "../../../components/Board/BoardList";
import { Link } from "react-router-dom";

import style from "../Mypage.module.css";
import arrow from "../../../assets/arrow.png";

const FavoriteList = () => {
  return (
    <div>
      <Link to="/mypage">
        <img className={style.arrow} src={arrow} />
      </Link>

      <h3 className={style.mypageTitle}>보관한 글</h3>

      <BoardList type={2} />
    </div>
  );
};

export default FavoriteList;
