import { useLocation, Link } from "react-router-dom";
import BoardItem from "./BoardItem";
import arrow from "../../../assets/arrow.png";
import style from "./BoardDetail.module.css";

const BoardDetail = () => {
  const { state } = useLocation();

  return (
    <div>
      {state.type === 2 && (
        <Link to="/mypage/favorite">
          <img className={style.arrow} src={arrow} />
        </Link>
      )}
      {state.type === 1 && (
        <Link to="/mypage/board">
          <img className={style.arrow} src={arrow} />
        </Link>
      )}

      <BoardItem item={state.item} />
    </div>
  );
};
export default BoardDetail;
