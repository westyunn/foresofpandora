import BoardItem from "./BoardItem";

const BoardList = ({ items }) => {
  return (
    <div>
      <h1>test</h1>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.articleId}>
              <BoardItem prop={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BoardList;
