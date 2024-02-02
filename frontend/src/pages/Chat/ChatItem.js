import { Link } from "react-router-dom";

import temp_profile from "../../assets/cat1.png";
import style from "./ChatItem.module.css";

const ChatItem = () => {
  const id = 0; // test

  return (
    <div>
      <Link to={`/chat/${id}`} className={`${style.chat_item}`}>
        <div className={`${style.left_side}`}>
          <img src={temp_profile} className={`${style.profile}`} />
          <div className={`${style.current_message}`}>안녕 나는 고양이야</div>
        </div>
        <div className={`${style.right_side}`}>
          <div className={`${style.time}`}>오후 12:48</div>
          <div className={`${style.unread_message}`}>
            <div>3</div>
          </div>
        </div>
      </Link>
      <Link to={`/chat/${id}`} className={`${style.chat_item}`}>
        <div className={`${style.left_side}`}>
          <img src={temp_profile} className={`${style.profile}`} />
          <div className={`${style.current_message}`}>테스트입니다</div>
        </div>
        <div className={`${style.right_side}`}>
          <div className={`${style.time}`}>오후 11:11</div>
          <div className={`${style.unread_message}`}>
            <div>111</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ChatItem;
