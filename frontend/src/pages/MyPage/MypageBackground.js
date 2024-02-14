import style from "./Mypage.module.css";
import { IMAGES } from "../../components/backgroundImg";

function MyPageBackground({ value = 0 }) {
  const src = IMAGES[value];
  return (
    <div className={style.backgroundImgDiv}>
      <img className={style.backgroundImg} src={src} alt={value} />
    </div>
  );
}

export default MyPageBackground;
