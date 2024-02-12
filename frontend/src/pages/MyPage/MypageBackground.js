import ProfileBackground1 from "../../assets/ProfileBackground1.png";
import ProfileBackground2 from "../../assets/ProfileBackground2.png";
import ProfileBackground3 from "../../assets/ProfileBackground3.png";
import ProfileBackground4 from "../../assets/ProfileBackground4.png";
import ProfileBackground0 from "../../assets/ProfileBackground5.png";

import style from "./Mypage.module.css";

const IMAGES = [
  ProfileBackground0,
  ProfileBackground1,
  ProfileBackground2,
  ProfileBackground3,
  ProfileBackground4,
];

function MyPageBackground({ value = 0 }) {
  const src = IMAGES[value];
  return (
    <div className={style.backgroundImgDiv}>
      <img className={style.backgroundImg} src={src} alt={value} />
    </div>
  );
}

export default MyPageBackground;
