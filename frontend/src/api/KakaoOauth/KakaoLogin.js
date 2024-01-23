import axios from "axios";
import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

const KakaoLogin = (prop) => {
    const navigate = useNavigate();
   useEffect(() => {
    const login = async() => {
        await axios({
            method: 'GET',
            url: `api/kakao/login?code=${prop.cname}`,
            headers: {
                "Content-Type": "application/json;charset=utf-8", //json형태로 데이터를 보내겠다는뜻 
            }
        }).then((res) => {
            console.log(res);
            // localStorage.setItem("email", res.data.account.kakaoEmail);
            navigate("kakaologin");
        }).catch((err)=>{
            console.log(err);
        })
    };
    login();
   }, [prop.cname, navigate ])

    // const response = await axios.get()
    return (
        <>
        <button href={prop.url}>카카오 로그인</button>
        <Link to="/login"></Link>
        </>
    )

}

export default KakaoLogin;