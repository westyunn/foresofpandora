import profile1 from "../../assets/profile/1.png";
import profile2 from "../../assets/profile/2.png";
import profile3 from "../../assets/profile/3.png";
import profile4 from "../../assets/profile/4.png";
import profile5 from "../../assets/profile/5.png";
import profile6 from "../../assets/profile/6.png";
import profile7 from "../../assets/profile/7.png";
import profile8 from "../../assets/profile/8.png";
import profile9 from "../../assets/profile/9.png";
import profile10 from "../../assets/profile/10.png";
import profile11 from "../../assets/profile/11.png";
import profile12 from "../../assets/profile/12.png";
import profile13 from "../../assets/profile/13.png";
import profile14 from "../../assets/profile/14.png";
import profile15 from "../../assets/profile/15.png";

import style from "./Mypage.module.css";

import { profileImg } from "../../components/profileImg";

const IMAGES = [
  profile1,
  profile2,
  profile3,
  profile4,
  profile5,
  profile6,
  profile7,
  profile8,
  profile9,
  profile10,
  profile11,
  profile12,
  profile13,
  profile14,
  profile15,
];
const colorIdx = Math.floor(Math.random() * 2);

function MyPageIcon({ value = 0 }) {
  const src = IMAGES[value];
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
