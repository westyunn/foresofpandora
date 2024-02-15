import MyPageIcon from "./MyPageIcon";
import MyPageBackground from "./MypageBackground";

import style from "./Mypage.module.css";
import { useSelector } from "react-redux";

const MyPageUser = () => {
  const userEmail = useSelector((state) => state.user.userEmail);
  const icon = Math.floor(Math.random() * 15);
  const background = Math.floor(Math.random() * 9);

  return (
    <div>
      <div>
        <MyPageBackground value={background} />

        <div className={style.user}>
          <MyPageIcon value={icon} />
        </div>
      </div>

      <p className={style.userEmail}>{userEmail}</p>
    </div>
  );
};

export default MyPageUser;
