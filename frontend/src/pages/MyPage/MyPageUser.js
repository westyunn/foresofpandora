import MyPageIcon from "./MyPageIcon";
import MyPageBackground from "./MypageBackground";

const MyPageUser = (userId) => {
  const id = 1;
  const value = id % 5;

  return (
    <div>
      {/* <MyPageBackground value={value} /> */}
      <MyPageIcon value={value} />
      <h3>유저정보</h3>
    </div>
  );
};

export default MyPageUser;
