import { Link, useNavigate } from "react-router-dom";
import styles from "./Main.module.css";
import BoardList from "./Board/BoardList";

import { useSelector } from "react-redux";

import { useEffect, useState } from "react";

const Main = () => {
  const navigate = useNavigate();
  // const [coModalOpen, setCoModalOpen] = useState(false);
  const isLogin = useSelector((state) => state.user.isLoggedin);
  // 상태관리에 따라 렌더링하게
  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
  }, [isLogin, navigate]);

  return (
    <div className={styles.scroll_container}>
      <div>
        <BoardList />
      </div>
      {/* {!coModalOpen && (
        <div className={styles.createBtn}>
          <Link to={"/board/create"}>
            <img
              src={BoardCreateButton}
              style={{ width: "4rem", height: "4rem" }}
            />
          </Link>
        </div>
      )} */}
    </div>
  );
};

export default Main;
