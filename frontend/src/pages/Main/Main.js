import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "./Main.module.css";
import BoardList from "./Board/BoardList";
import BoardCreateButton from "../../assets/BoardCreate.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user";
import { useEffect } from "react";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLoggedin);
  // 상태관리에 따라 렌더링하게
  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
  }, [isLogin, navigate]);
  // 로그아웃 테스트 구현
  const handleLogout = async () => {
    const token = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    if (token) {
      if (window.confirm("정말 로그아웃하시겠습니까?")) {
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
            localStorage.removeItem("refreshtoken");
            dispatch(userActions.logout());
            // 로그아웃 성공 시 다시 로그인 창으로
            if (response.data.success) {
              navigate("/");
            }
          })
          .catch((error) => {
            console.error("Logout failed", error);
          });
      }
    }
  };

  return (
    <div className={styles.scroll_container}>
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
