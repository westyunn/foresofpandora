import MyPageIcon from "./MyPageIcon";
import MyPageBackground from "./MypageBackground";
import setting from "../../assets/SettingButton.png";

import style from "./Mypage.module.css";

const MyPageUser = () => {
  // const id = 1;
  // const value = id%5;

  const icon = Math.floor(Math.random() * 4);
  const background = Math.floor(Math.random() * 4);

  return (
    <div>
      <div>
        <MyPageBackground value={background} />

        <div className={style.user}>
          <MyPageIcon value={icon} />
        </div>
      </div>

      <h2>유저정보</h2>
    </div>
  );
};

export default MyPageUser;
