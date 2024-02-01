import { Link } from "react-router-dom";
import styles from "./Main.module.css";
import BoardList from "./Board/BoardList";
import BoardCreateButton from "../../assets/BoardCreate.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";

const Main = () => {
  const dispatch = useDispatch();
  // 로그아웃 테스트 구현
  const handleLogout = async () => {
    const token = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    if (token) {
      await axios({
        method: "POST",
        url: `/api/auth/logout`,
        // access token이랑 refresh token 둘 다 req header에 담아서 보냅니당
        headers: {
          authorization: `Bearer ${token}`,
          refreshtoken: refreshToken,
        },
      })
        .then((response) => {
          // 로그아웃 성공 처리
          console.log(response);
          localStorage.removeItem("access_token");
          dispatch(userActions.logout());
        })
        .catch((error) => {
          // 오류 처리
          console.error("Logout failed", error);
        });
    }
  };

  return (
    <div className={styles.scroll_container}>
      <h2>메인</h2>
      <button onClick={handleLogout}>로그아웃</button>
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
