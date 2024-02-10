import MyPageIcon from "./MyPageIcon";
import MyPageBackground from "./MypageBackground";

import style from "./Mypage.module.css";
import { useSelector } from "react-redux";

const MyPageUser = () => {
  const userEmail = useSelector((state) => state.user.userEmail);
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

      <h2 className={style.userEmail}>{userEmail}</h2>
    </div>
  );
};

export default MyPageUser;
