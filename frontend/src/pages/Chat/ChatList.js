import axios from "axios";
import ChatItem from "./ChatItem";
import style from "./ChatList.module.css";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

const ChatList = () => {
  const userId = useSelector((state) => state.user.userId);
  const [roomId, setRoomId] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    getRoomList(); // 초기 데이터 로딩 시에는 한 번만 호출
  }, []);
  //방 목록 불러오기
  async function getRoomList() {
    const token = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    const res = await axios({
      method: "GET",
      url: `/api/chat/rooms`,
      headers: {
        authorization: `Bearer ${token}`,
        refreshtoken: refreshToken,
      },
    });
    console.log(res.data.data);
    // console.log(res.data.data[0]);
    setRoomList(res.data.data);
    console.log(roomList);
    return res;
  }

  const setName = (e) => {
    setRoomName(e.target.value);
  };

  return (
    <div className={`${style.chat_list} ${style.board_container}`}>
      {roomList.map((room) => (
        <div key={room.roomId}>
          <ChatItem room={room} />
        </div>
      ))}
      {/* <ChatItem /> */}
      {/* <input value={roomName} onChange={setName}></input>
      <button onClick={creatRoom}>방 생성</button> */}
      {/* <button onClick={getRoomList}>방 목록</button> */}
    </div>
  );
};

export default ChatList;
