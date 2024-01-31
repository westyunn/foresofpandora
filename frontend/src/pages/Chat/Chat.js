import ChatList from "./ChatList";

import style from "./Chat.module.css";

const Chat = () => {
  return (
    <div className={`${style.chat}`}>
      <h2>채팅</h2>
      <ChatList />
    </div>
  );
};

export default Chat;
