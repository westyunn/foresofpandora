import BoardItem from "./BoardItem";
import style from "./Board.module.css";

const BoardList = ({ items, isSave }) => {
  console.log(isSave);
  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <BoardItem item={item} isSave={isSave} />
        </div>
      ))}
      <div className={style.empty}> </div>
    </div>
  );
};

export default BoardList;
