import { Link } from "react-router-dom";
import styles from "./Main.module.css";
import BoardList from "./Board/BoardList";
import BoardCreateButton from "../../assets/BoardCreate.png";

const Main = () => {
  return (
    <div className={styles.scroll_container}>
      <h2>메인</h2>
      <div>
        <BoardList />
        <div className={styles.createBtn}>
          <Link to={"/board/create"}>
            <img src={BoardCreateButton} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;
