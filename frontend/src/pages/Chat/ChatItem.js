import { Link, useNavigate } from "react-router-dom";

import temp_profile from "../../assets/cat1.png";
import style from "./ChatItem.module.css";

const ChatItem = ({ roomId }) => {
  // console.log("item", roomId);
  const navigator = useNavigate();
  // console.log(room);
  const getDetail = () => {
    navigator(`/chat/${roomId}`, { state: { roomId: roomId } });
  };

  const id = 0; // test

  return (
    <div onClick={getDetail}>
      <div className={`${style.chat_item}`}>
        <div className={`${style.left_side}`}>
          <img src={temp_profile} className={`${style.profile}`} />
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
