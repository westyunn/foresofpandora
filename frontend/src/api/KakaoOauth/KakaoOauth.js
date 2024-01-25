import { useNavigate } from "react-router-dom";
const KakaoOauth = () => {
    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_Redirect_URL;
    console.log(REST_API_KEY);
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
    console.log(REST_API_KEY);
    
    return(
        <div>
            <img
            alt="카카오 로그인"
            src="../assets/kakaoLogin.png"
            onClick={() => window.location.href = KAKAO_AUTH_URL}
        />
        </div>
    )
}

export default KakaoOauth;