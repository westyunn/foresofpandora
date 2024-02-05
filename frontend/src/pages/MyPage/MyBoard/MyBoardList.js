import BoardList from "../../../components/Board/BoardList";
import style from "../Mypage.module.css";
import arrow from "../../../assets/arrow.png";

import { Link } from "react-router-dom";

const MyBoardList = () => {
  return (
    <div>
      <Link to="/mypage">
        <img className={style.arrow} src={arrow} alt="Arrow" />
      </Link>
      <h3>내가 쓴 글</h3>

      <BoardList type={1} />
      {/* {isLoading && <div>Loading...</div>}
      <div id="observer"></div> */}
    </div>
  );
};

export default MyBoardList;
