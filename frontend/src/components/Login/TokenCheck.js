// TokenCheck.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";

function TokenCheck() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const expirationDate = localStorage.getItem("expiration");

    if (token && expirationDate) {
      const currentTime = new Date();
      if (new Date(expirationDate) <= currentTime) {
        dispatch(userActions.logout());
        navigate("/login");
      }
    }
  }, [dispatch, navigate]);

  return null; // 이 컴포넌트는 UI를 렌더링X, 단순 토큰 만료 확인용
}

export default TokenCheck;
