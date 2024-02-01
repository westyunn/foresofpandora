import { Link } from "react-router-dom";

import arrow from "../../../assets/arrow.png";
import style from "./BoardTemp.module.css";

const BoardTempList = () => {
  return (
    <div>
      <div className={style.article}>
        <Link to="/board/create">
          <img className={style.arrow} src={arrow} />
        </Link>
        <h3>임시보관함</h3>
        {/* <p>총 &nbsp;{items.length}개</p>
      <BoardList items={items} isSave={isSave} /> */}
      </div>
    </div>
  );
};

export default BoardTempList;
