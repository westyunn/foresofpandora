import { Link } from "react-router-dom";
import { useState } from "react";

import NoHome from "../assets/Home.png";
import Home from "../assets/clickHome.png";
import Chat from "../assets/clickChat.png";
import NoChat from "../assets/Chatting.png";
import noNotification from "../assets/Notification.png";
import My from "../assets/clickMy.png";
import NoMy from "../assets/Mypage-temp.png";
import Notice from "../assets/clickNotic.png";

import "./Nav.css";

const Nav = () => {
  // 클릭시 해당 요소만 색깔 바꾸도록 하기
  const [click, setClick] = useState("home");
  return (
    <div className="Nav">
      <Link to="/" onClick={() => setClick("home")}>
        <img
          src={click === "home" ? Home : NoHome}
          style={{ width: "45px", height: "45px" }}
          alt="홈 아이콘"
        />
      </Link>
      <Link to="/chat" onClick={() => setClick("chat")}>
        <img
          src={click === "chat" ? Chat : NoChat}
          style={{ width: "39px", height: "35px" }}
        />
      </Link>
      <Link to="/notification" onClick={() => setClick("notice")}>
        <img
          src={click === "notice" ? Notice : noNotification}
          style={{ width: "32px", height: "37px" }}
        />
      </Link>
      <Link to="/mypage" onClick={() => setClick("mypage")}>
        <img
          src={click === "mypage" ? My : NoMy}
          style={{ width: "44px", height: "40px" }}
        />
      </Link>
    </div>
  );
};

export default Nav;
