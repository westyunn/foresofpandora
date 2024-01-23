import { Link } from "react-router-dom";

import "./Nav.css";

const Nav = () => {
  return (
    <div className="Nav">
      <Link to="/">main</Link>
      <Link to="/chat">chat</Link>
      <Link to="/notification">notification</Link>
      <Link to="/mypage">mypage</Link>
    </div>
  );
};
export default Nav;
