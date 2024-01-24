import axios from "axios";
import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
const navigate = useNavigate();
    const code = new URL(document.location.toString()).searchParams.get("code");
   useEffect(() => {
    const login = async() => {
        // 백으로 인가코드 넘겨주기
        await axios({
            method: 'GET',
            url: `/api/auth/kakao/login?code=${code}`,
            headers: {
                "Content-Type": "application/json;charset=utf-8", //json형태로 데이터를 보내겠다는뜻 
            }
        }).then((res) => {
            console.log(res);
            // localStorage.setItem("email", res.data.account.kakaoEmail);
            navigate("/");
        }).catch((err)=>{
            console.log(err);
        })
    };
    login();
   }, [code, navigate ])

    // const response = await axios.get()
    return (
        <>
        <div>
            개발중...
        </div>
        </>
    )
//수정중
}

export default Login;