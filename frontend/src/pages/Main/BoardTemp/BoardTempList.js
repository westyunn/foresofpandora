import { Link } from "react-router-dom";

import BoardList from "../../../components/Board/BoardList";
import arrow from "../../../assets/arrow.png";
import style from "./BoardTemp.module.css";

const BoardTempList = () => {
  return (
    <div className={style.board_container}>
      <div className={style.article}>
        <Link to="/board/create">
          <img className={style.arrow} src={arrow} />
        </Link>
        <h3 className={style.tempTitle}>임시보관함</h3>
        <BoardList type={3} />
      </div>
    </div>
  );
};

export default BoardTempList;
