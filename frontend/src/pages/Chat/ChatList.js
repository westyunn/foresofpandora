import ChatItem from "./ChatItem";
import style from "./ChatList.module.css";

const ChatList = () => {
  return (
    <div className={`${style.chat_list}`}>
      <ChatItem />
    </div>
  );
};

export default ChatList;
