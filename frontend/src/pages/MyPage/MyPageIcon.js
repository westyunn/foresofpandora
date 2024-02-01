import profile0 from "../../assets/cat1.png";
import profile1 from "../../assets/cat2.png";
import profile2 from "../../assets/cat3.png";
import profile3 from "../../assets/cat4.png";
import profile4 from "../../assets/cat5.png";

import style from "./Mypage.module.css";

const IMAGES = [profile0, profile1, profile2, profile3, profile4];

function MyPageIcon({ value = 0 }) {
  const src = IMAGES[value];
  return (
    <div className={style.profileIconBox}>
      <img className={style.profileIcon} src={src} alt={value} />
    </div>
  );
}

export default MyPageIcon;
