import { BrowserRouter, Routes, Route } from "react-router-dom";
import KakaoOauth from "./api/KakaoOauth/KakaoOauth";
import RedirectHandler from "./api/KakaoOauth/RedirectHandler";

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

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/board/create" element={<BoardCreate />} />
          <Route path="/board/update" element={<BoardUpdate />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/mypage" element={<MyPage />} />
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
