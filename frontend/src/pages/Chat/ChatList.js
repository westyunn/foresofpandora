import axios from "axios";
import ChatItem from "./ChatItem";
import style from "./ChatList.module.css";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

const ChatList = () => {
  const userId = useSelector((state) => state.user.userId);
  const [roomId, setRoomId] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const [socket, setSocket] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [newRoomId, setNewRoomId] = useState("");
  const [roomList, setRoomList] = useState([]);

  // useEffect(() => {
  //   // const url = new URL(window.location.href);
  //   // const roomIdParam = url.searchParams.get("roomId");
  //   // setRoomId(roomIdParam);

  //   // WebSocket 연결
  //   const socket = new SockJS("http://i10b110.p.ssafy.io:9090/ws-stomp");
  //   setSocket(socket);
  //   const stomp = Stomp.over(socket);
  //   setStompClient(stomp);

  //   return () => {
  //     // 컴포넌트 언마운트 시 WebSocket 연결 해제
  //     if (stomp) {
  //       stomp.disconnect();
  //     }
  //   };
  // }, []);

  //방 만들기
  async function creatRoom() {
    const params = { name: roomName };
    if (!roomName) {
      window.alert("채팅방 이름이 필요합니다");
    } else {
      const res = await axios({
        method: "POST",
        url: `/api/chatroom`,
        params,
      });
      // console.log(res.data.data.roomId);
      setNewRoomId(res.data.data.roomId);
      return res;
    }
  }
  useEffect(() => {
    getRoomList(); // 초기 데이터 로딩 시에는 한 번만 호출
  }, []);
  //방 목록 불러오기
  async function getRoomList() {
    const res = await axios({
      method: "GET",
      url: `/api/chatroom`,
    });
    // console.log(res.data.data);
    setRoomList(res.data.data);
    return res;
  }

  const setName = (e) => {
    setRoomName(e.target.value);
  };

  return (
    <div className={`${style.chat_list}`}>
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
