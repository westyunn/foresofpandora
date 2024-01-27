import { BrowserRouter, Routes, Route } from "react-router-dom";
import KakaoOauth from "./api/KakaoOauth/KakaoOauth";
import RedirectHandler from "./api/KakaoOauth/RedirectHandler";

import "./App.css";

import Nav from "./components/Nav";
import Main from "./pages/Main/Main";
import Chat from "./pages/Chat/Chat";
import Notification from "./pages/Notification/Notification";
import MyPage from "./pages/MyPage/MyPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/outh" element={<KakaoOauth />} />
          <Route path="/auth/kakao" element={<RedirectHandler />} />
        </Routes>
        <Nav className="Nav" />
      </div>
    </BrowserRouter>
  );
}
export default App;
