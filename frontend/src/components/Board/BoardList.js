import BoardItem from "./BoardItem";

const BoardList = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <div key={item.articleId}>
          <BoardItem item={item} />
        </div>
      ))}
    </div>
  );
};

export default BoardList;
