import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user";
const Login = () => {
  const navigate = useNavigate();
  const code = new URL(document.location.toString()).searchParams.get("code");
  const encodedCode = encodeURIComponent(code);
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    const login = async () => {
      // 백으로 인가코드 넘겨주기
      await axios({
        method: "GET",
        url: `/api/auth/login/kakao?code=${encodedCode}`, // backend로 인가코드 보내기
        headers: {
          "Content-Type": "application/json;charset=utf-8", //json형태로 데이터를 보내겠다는뜻
        },
      })
        .then((res) => {
          // 추출한 사용자 정보를 사용하여 loginUser 액션 디스패치
          dispatch(
            userActions.loginUser({
              userId: res.data.data.id,
              userEmail: res.data.data.email,
            })
          );
          const REFRESH_TOKEN = res.headers.refreshtoken;
          const AUTHORIZATION_HEADER = res.headers.authorization || ""; // Authorization 헤더 값을 가져옵니다.
          const ACCESS_TOKEN = AUTHORIZATION_HEADER.split(" ")[1]; // 'Bearer '을 제거하여 실제 토큰만을 추출합니다.
          localStorage.setItem("refresh_token", REFRESH_TOKEN);
          localStorage.setItem("access_token", ACCESS_TOKEN);
          setToken(ACCESS_TOKEN);
          const tokenExpiration = new Date(
            new Date().getTime() + 1000 * 60 * 60 * 24
          );
          setTokenExpirationDate(tokenExpiration);
          localStorage.setItem("expiration", tokenExpiration.toISOString());
          navigate("/");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          window.alert("로그인에 실패하였습니다");
          navigate("/oauth");
        });
    };
    login();
  }, [code]);
  return (
    <>
      <div>개발중...</div>
    </>
  );
};

export default Login;
