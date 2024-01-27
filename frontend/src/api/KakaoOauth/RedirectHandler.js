import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const code = new URL(document.location.toString()).searchParams.get("code");
  useEffect(() => {
    const login = async () => {
      // 백으로 인가코드 넘겨주기
      await axios({
        method: "GET",
        url: `${process.env.REACT_APP_BACKURL}/api/auth/kakao/login?code={인가코드}`, // backend로 인가코드 보내기
        headers: {
          "Content-Type": "application/json;charset=utf-8", //json형태로 데이터를 보내겠다는뜻
        },
      })
        .then((res) => {
          console.log(res);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    login();
  }, [code, navigate]);
  return (
    <>
      <div>개발중...</div>
    </>
  );
};

export default Login;
