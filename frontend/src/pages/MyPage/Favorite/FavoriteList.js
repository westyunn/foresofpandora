import BoardList from "../../../components/Board/BoardList";
import { Link } from "react-router-dom";

import style from "../Mypage.module.css";
import arrow from "../../../assets/arrow.png";

const FavoriteList = () => {
  return (
    <div className={style.board_container}>
      <Link to="/mypage">
        <img className={style.arrow} src={arrow} />
      </Link>

      <p className={style.mypageTitle}>보관한 글</p>

      <BoardList type={2} />
    </div>
  );
};

export default FavoriteList;
