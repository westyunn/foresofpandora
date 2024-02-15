import style from "./Mypage.module.css";

import { profileImg } from "../../components/profileImg";
const colorIdx = Math.floor(Math.random() * 2);

function MyPageIcon({ value = 0 }) {
  const src = profileImg[value].image;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: profileImg[value].color[colorIdx],
        borderRadius: "100%",
        width: "7rem",
        height: "7rem",
        position: "absolute",
        top: "8rem",
        border: "4px solid white",
      }}
    >
      <img src={src} style={{ width: "5rem" }}></img>
    </div>
  );
}

export default MyPageIcon;
