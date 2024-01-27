import { useNavigate } from "react-router-dom";
import kakaoLogin from "../../assets/kakaoLogin.png";
import pandoraBox from "../../assets/pandora-box.png";
import PANDORA from "../../assets/PANDORA.png";
import KAKAO_AUTH_URL from "./OAuth";
import "./KakaoOauth.css";
const KakaoOauth = () => {
  const navigate = useNavigate();
  const cancelHandler = () => {
    navigate(-1);
  };

  return (
    <div className="loginContainer">
      <div>
        <div className="loginLogo">
          <div>
            <img alt="판도라 아이콘" src={pandoraBox} />
          </div>
          <div style={{ marginLeft: "20px" }}>
            <img alt="판도라 로고" src={PANDORA} style={{ marginTop: "6px" }} />
          </div>
        </div>
        <div className="login-btn-container">
          <img
            alt="카카오 로그인"
            src={kakaoLogin}
            onClick={() => (window.location.href = KAKAO_AUTH_URL)}
          />
          <button className="login-cancel-btn" onClick={cancelHandler}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default KakaoOauth;
