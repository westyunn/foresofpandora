import { BrowserRouter, Routes, Route } from "react-router-dom";
import KakaoOauth from "./api/KakaoOauth/KakaoOauth";
import RedirectHandler from "./api/KakaoOauth/RedirectHandler";
import "./App.css";
import Nav from "./components/Nav";
import Main from "./pages/Main/Main";
import BoardCreate from "./pages/Main/Board/BoardCreate";
import BoardUpdate from "./pages/Main/Board/BoardUpdate";
import Chat from "./pages/Chat/Chat";
import ChatItemDetail from "./pages/Chat/ChatItemDetail";

import Notification from "./pages/Notification/Notification";
import MyPage from "./pages/MyPage/MyPage";

import FavoriteList from "./pages/MyPage/Favorite/FavoriteList";
import MyBoardList from "./pages/MyPage/MyBoard/MyBoardList";
import Login from "./components/Login/Login";
import BoardList from "./components/Board/BoardList";

import BoardDetail from "./pages/Main/Board/BoardDetail";
import BoardTempList from "./pages/Main/BoardTemp/BoardTempList";
import Report from "./components/Report/Report";
import TokenCheck from "./components/Login/TokenCheck";
import BoardItem from "./components/Board/BoardItem";

function App() {
  return (
    <BrowserRouter>
      <TokenCheck />
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
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
          <Route path="/chat/:id" element={<ChatItemDetail />} />
          <Route path="/oauth" element={<KakaoOauth />} />
          <Route path="/auth/kakao" element={<RedirectHandler />} />
          <Route
            path="/mypage/board"
            element={<MyBoardList isSave={false} />}
          />
          <Route
            path="/mypage/favorite"
            element={<FavoriteList isSave={true} />}
          />
          <Route path="/boardtemp" element={<BoardTempList />} />
          <Route path="/boarddetail" element={<BoardDetail />} />
          <Route path="/report" element={<Report />} />
          {/* 알림창 -> 상세 페이지 */}
          <Route path="/board/item" element={<BoardItem />} />
        </Routes>
        <Nav className="Nav" />
      </div>
    </BrowserRouter>
  );
}
export default App;
