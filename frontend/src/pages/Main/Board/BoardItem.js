import "./BoardItem.css";
const BoardItem = ({ item }) => {
  return (
    <div className="board-container">
      <div>{item.id}</div>
      <div>{item.content}</div>
    </div>
  );
};
export default BoardItem;
