import BoardList from "../../../components/Board/BoardList";
import { getMyBoard } from "../api";
import { useState, useEffect } from "react";

const MyBoardList = (userId) => {
  const [items, setItems] = useState([]);

  const newItems = () => {
    setItems([
      {
        articleId: 1,
        memberId: 1,
        memberNicname: "굴러가는 도토리",
        imgUrl:
          "https://dimg.donga.com/wps/NEWS/IMAGE/2023/05/12/119255016.1.jpg",
        content: "고양이 이름으로 곤약이 어때? 화나면 꼬냑이야",
        createdAt: "2024-01-29T12:35:49.9631477",
        modifiedAt: "2024-01-29T12:35:49.963",
      },
      {
        articleId: 2,
        memberId: 1,
        memberNicname: "소리치는 하마",
        imgUrl:
          "https://dimg.donga.com/wps/NEWS/IMAGE/2023/05/12/119255016.1.jpg",
        content: "고양이랑 강아지 중 고양이가 좋지않아?? 이것봐 진짜 이뻐 ",
        createdAt: "2024-01-29T12:35:49.9631477",
        modifiedAt: "2024-01-29T12:35:49.963",
      },
    ]);
  };
  useEffect(() => {
    newItems();
  }, []);

  //   const handleLoad = async () => {
  //     const { articles } = await getMyBoard(userId);
  //     setItems(articles);
  //   };
  //   useEffect(() => {
  //     handleLoad();
  //   }, []);
  // console.log(items);
  return (
    <div>
      <h1>보관한 글</h1>
      <BoardList items={items} />
    </div>
  );
};

export default MyBoardList;
