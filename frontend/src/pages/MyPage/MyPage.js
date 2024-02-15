import MyPageUser from "./MyPageUser";
import MyboardButton from "../../assets/MyboardButton.png";
import SavedButton from "../../assets/SavedButton.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user";
import { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import style from "./Mypage.module.css";

const MyPage = () => {
  // const userId = useSelector((state) => state.user.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLoggedin);
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const handle = () => {};

  // 로그아웃 테스트 구현
  const handleLogout = async () => {
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
              window.location.reload();
            }
          })
          .catch((error) => {
            if (
              error.response.data.message ===
              "블랙리스트에 있는 액세스 토큰입니다."
            ) {
              // 로그아웃 처리
              localStorage.removeItem("access_token");
              localStorage.removeItem("refreshtoken");
              dispatch(userActions.logout());
              return;
            }

            console.error("Logout failed", error);
          });
      }
    }
  };

  const handleWithdraw = async () => {
    if (token) {
      if (window.confirm("정말 탈퇴 하시겠습니까?")) {
        await axios({
          method: "DELETE",
          url: `/api/auth/withdrawal`,
          // access token이랑 refresh token 둘 다 req header에 담아서 보냅니당
          headers: {
            authorization: `Bearer ${token}`,
            refreshtoken: refreshToken,
          },
        })
          .then((response) => {
            // 회원탈퇴 성공 처리
            console.log(response);
            localStorage.removeItem("access_token");
            localStorage.removeItem("refreshtoken");
            dispatch(userActions.logout());
            // 회원탈퇴 성공 시 다시 메인으로
            if (response.data.success) {
              navigate("/");
              window.location.reload();
            }
          })
          .catch((error) => {
            console.error("withdarw failed", error);
          });
      }
    }
  };

  return (
    <div className={style.board_container}>
      <div className={style.mypage}>
        <MyPageUser />
        <div className={style.buttonImg}>
          <Link to="/mypage/board">
            <img src={MyboardButton} />
          </Link>
        </div>
        <div className={style.buttonImg}>
          <Link to="/mypage/favorite">
            <img src={SavedButton} />
          </Link>
        </div>
        <div className={style.userButton}>
          <button className={style.withdraw} onClick={handleWithdraw}>
            회원탈퇴
          </button>
          <button className={style.logout} onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
