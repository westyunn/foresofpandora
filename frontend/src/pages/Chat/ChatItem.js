import { Link, useNavigate } from "react-router-dom";
import { profileImg } from "../../components/profileImg";

import temp_profile from "../../assets/cat1.png";
import style from "./ChatItem.module.css";

const ChatItem = ({ roomId }) => {
  // 랜덤 인덱스 생성 (프로필 이미지)
  const profileIdx = Math.floor(Math.random() * profileImg.length - 1);

  // 랜덤 인덱스 생성 (프로필 이미지 배경)
  const colorIdx = Math.floor(Math.random() * 2);

  // console.log("item", roomId);
  const navigator = useNavigate();
  // console.log(room);
  const getDetail = () => {
    navigator(`/chat/${roomId}`, {
      state: { roomId: roomId, profileIdx: profileIdx, colorIdx: colorIdx },
    });
  };

  const id = 0; // test

  return (
    <div onClick={getDetail}>
      <div className={`${style.chat_item}`}>
        <div className={`${style.left_side}`}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: profileImg[profileIdx].color[colorIdx],
              borderRadius: "100%",
              width: "4rem",
              height: "4rem",
            }}
          >
            <img
              src={profileImg[profileIdx].image}
              style={{ width: "3rem" }}
            ></img>
          </div>
          {/* <img src={temp_profile} className={`${style.profile}`} /> */}
          <div className={`${style.current_message}`}>
            {roomId}번 채팅방 입니다
          </div>
        </div>
        <div className={`${style.right_side}`}>
          {/* <div className={`${style.time}`}>오후 12:48</div> */}
          {/* <div className={`${style.unread_message}`}>
            <div>3</div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
