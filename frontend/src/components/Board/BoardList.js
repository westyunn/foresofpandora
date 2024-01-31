import BoardItem from "./BoardItem";

const BoardList = ({ items, isSave }) => {
  console.log(isSave);
  return (
    <div>
      {items.map((item) => (
        <div key={item.articleId}>
          <BoardItem item={item} isSave={isSave} />
        </div>
      ))}
    </div>
  );
};

export default BoardList;
