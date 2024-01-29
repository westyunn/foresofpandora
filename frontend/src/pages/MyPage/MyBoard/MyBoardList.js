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
        createdAt: "2024-01-29T12:35:49.9631477",
        modifiedAt: "2024-01-29T12:35:49.963",
      },
      {
        articleId: 2,
        memberId: 1,
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
  console.log(items);
  return (
    <div>
      <BoardList items={items} />
    </div>
  );
};

export default MyBoardList;
