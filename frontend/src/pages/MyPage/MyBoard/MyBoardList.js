import BoardList from "../../../components/Board/BoardList";
import style from "../Mypage.module.css";
import arrow from "../../../assets/arrow.png";

import { Link } from "react-router-dom";

const MyBoardList = () => {
  return (
    <div className={style.board_container}>
      <Link to="/mypage">
        <img className={style.arrow} src={arrow} alt="Arrow" />
      </Link>
      <p className={style.mypageTitle}>내가 쓴 글</p>

      <BoardList type={1} />
    </div>
  );
};

export default MyBoardList;
