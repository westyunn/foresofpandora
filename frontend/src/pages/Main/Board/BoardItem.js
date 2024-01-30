import "./BoardItem.css";
const BoardItem = ({ item }) => {
  return (
    <div className="board-container">
      <div>
        <div>{item.id}</div>
        <div>{item.content}</div>
      </div>
    </div>
  );
};
export default BoardItem;
