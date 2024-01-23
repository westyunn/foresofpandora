import { useNavigate } from "react-router-dom";
import KakaoLogin from "./KakaoLogin";
const KakaoOauth = () => {
    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    // const REST_API_KEY = "1510ff9f0b4354974298e53c3550fa58";
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_Redirect_URL;
    // const REDIRECT_URI = "http://localhost:3000/test";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
    // console.log(REST_API_KEY);
        window.location.href = KAKAO_AUTH_URL
    const code = new URL(window.location.href).searchParams.get("code");
    return(
        <div>
            테스트입니다....
            <KakaoLogin cname="code" url="KAKAO_AUTH_URL"/>
        </div>
    )
}

export default KakaoOauth;