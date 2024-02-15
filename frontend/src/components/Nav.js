import { Link } from "react-router-dom";
import { useState } from "react";
import BoardCreateButton from "../assets/BoardCreate.png";

import NoHome from "../assets/Home.png";
import Home from "../assets/clickHome.png";
import Chat from "../assets/clickChat.png";
import NoChat from "../assets/Chatting.png";
import noNotification from "../assets/Notification.png";
import My from "../assets/clickMy.png";
import NoMy from "../assets/Mypage-temp.png";
import Notice from "../assets/clickNotic.png";

import axios from "axios";

import "./Nav.css";

const Nav = () => {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const handleCreate = async () => {
    if (token) {
      await axios({
        method: "GET",
        url: "/api/member/articleCreationCount",
        headers: {
          authorization: `Bearer ${token}`,
          refreshtoken: refreshToken,
        },
      }).then((response) => {
        if (!response.data) {
          window.alert("하루 글 작성 가능 횟수가 초과되었습니다.");
          return;
        }
      });
    }
  };
  // 클릭시 해당 요소만 색깔 바꾸도록 하기
  const [click, setClick] = useState("home");
  return (
    <div className="Nav">
      <Link to="/" onClick={() => setClick("home")}>
        <img
          src={click === "home" ? Home : NoHome}
          style={{ width: "2.2rem", height: "2.2rem" }}
          alt="홈 아이콘"
        />
      </Link>
      <Link to="/chat" onClick={() => setClick("chat")}>
        <img
          src={click === "chat" ? Chat : NoChat}
          style={{ width: "2rem", height: "2rem" }}
        />
      </Link>
      <Link to="/board/create" onClick={handleCreate}>
        <img
          src={BoardCreateButton}
          style={{ width: "3rem", height: "3rem" }}
        />
      </Link>
      <Link to="/notification" onClick={() => setClick("notice")}>
        <img
          src={click === "notice" ? Notice : noNotification}
          style={{ width: "2rem", height: "2rem" }}
        />
      </Link>
      <Link to="/mypage" onClick={() => setClick("mypage")}>
        <img
          src={click === "mypage" ? My : NoMy}
          style={
            click === "mypage"
              ? { width: "3rem", height: "2rem" }
              : { width: "3rem", height: "3rem" }
          }
        />
      </Link>
    </div>
  );
};

export default Nav;
