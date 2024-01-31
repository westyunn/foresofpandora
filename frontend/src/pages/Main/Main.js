import { Link } from "react-router-dom";

import BoardList from "./Board/BoardList";
import BoardCreateButton from "../../assets/BoardCreate.png";

const Main = () => {
  return (
    <div>
      <h2>메인</h2>
      <Link to={"/board/create"}>
        <img src={BoardCreateButton} />
      </Link>
      <BoardList />
    </div>
  );
};

export default Main;
