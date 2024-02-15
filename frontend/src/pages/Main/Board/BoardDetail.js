import { useLocation, Link } from "react-router-dom";
import BoardItem from "./BoardItem";
import arrow from "../../../assets/arrow.png";
import style from "./BoardDetail.module.css";
import { useNavigate } from "react-router-dom";

const BoardDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  // console.log(state);
  // 클릭 시 이동
  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <div>
      <img onClick={handleNavigate} className={style.arrow} src={arrow} />
      <BoardItem item={state.item} />
    </div>
  );
};
export default BoardDetail;
