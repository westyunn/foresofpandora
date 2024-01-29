import MyPageIcon from "./MyPageIcon";

const MyPageUser = (userId) => {
  const id = 1;
  const value = id % 5;

  return (
    <div>
      <h3>유저정보</h3>
      <MyPageIcon value={value} />
    </div>
  );
};

export default MyPageUser;
