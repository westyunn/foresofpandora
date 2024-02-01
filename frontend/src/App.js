import { BrowserRouter, Routes, Route } from "react-router-dom";
import KakaoOauth from "./api/KakaoOauth/KakaoOauth";
import RedirectHandler from "./api/KakaoOauth/RedirectHandler";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { userActions } from "./store/user";
import "./App.css";

import Nav from "./components/Nav";
import Main from "./pages/Main/Main";
import BoardCreate from "./pages/Main/Board/BoardCreate";
import BoardUpdate from "./pages/Main/Board/BoardUpdate";
import Chat from "./pages/Chat/Chat";
import Notification from "./pages/Notification/Notification";
import MyPage from "./pages/MyPage/MyPage";

import FavoriteList from "./pages/MyPage/Favorite/FavoriteList";
import MyBoardList from "./pages/MyPage/MyBoard/MyBoardList";
import Login from "./components/Login/Login";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      // 토큰이 존재하면 로그인 상태를 true로 설정
      dispatch(userActions.loginUser({ token }));
    }
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/board/create"
            element={
              <Login>
                <BoardCreate />
              </Login>
            }
          />
          <Route path="/board/update" element={<BoardUpdate />} />
          <Route
            path="/chat"
            element={
              <Login>
                <Chat />
              </Login>
            }
          />
          <Route
            path="/notification"
            element={
              <Login>
                <Notification />
              </Login>
            }
          />
          <Route
            path="/mypage"
            element={
              <Login>
                <MyPage />
              </Login>
            }
          />
          <Route path="/outh" element={<KakaoOauth />} />
          <Route path="/auth/kakao" element={<RedirectHandler />} />
          <Route
            path="/mypage/myboard"
            element={<MyBoardList isSave={false} />}
          />
          <Route
            path="/mypage/favorite"
            element={<FavoriteList isSave={true} />}
          />
        </Routes>
        <Nav className="Nav" />
      </div>
    </BrowserRouter>
  );
}
export default App;
