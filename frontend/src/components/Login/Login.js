import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../../store/user";
import { useSelector } from "react-redux";
import styles from "./Login.module.css";
const Login = ({ children }) => {
  // 로그인이 필요한 화면
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const cancelHandler = () => {
    navigate(-1);
  };
  if (!isLoggedIn) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginContent}>로그인이 필요한 화면입니다.</div>
        <div className={styles.linkBtn}>
          <Link to="/oauth" className={styles.login}>
            로그인하기{" "}
          </Link>
        </div>
        <button className={styles.login_cancel_btn} onClick={cancelHandler}>
          취소
        </button>
      </div>
    );
  }
  return children;
};

export default Login;
