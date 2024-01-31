import { Link } from "react-router-dom";

import Home from "../assets/Home.png";
import Chatting from "../assets/Chatting.png";
import Notification from "../assets/Notification.png";
import Mypage from "../assets/Mypage-temp.png";

import "./Nav.css";

const Nav = () => {
  return (
    <div className="Nav">
      <Link to="/">
        <img src={Home} />
      </Link>
      <Link to="/chat">
        <img src={Chatting} />
      </Link>
      <Link to="/notification">
        <img src={Notification} />
      </Link>
      <Link to="/mypage">
        <img src={Mypage} />
      </Link>
    </div>
  );
};

export default Nav;
