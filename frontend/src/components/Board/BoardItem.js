import "./Board.css";
const BoardItem = ({ item }) => {
  console.log(item);
  return (
    <div>
      <div>
        <div className="articleImg">
          <img src={item.imgUrl} />
        </div>
        <div className="articleText">
          <h3>{item.memberNicname}</h3>
          <p>{item.content}</p>
          <p>{item.createdAt}</p>
        </div>
      </div>
    </div>
  );
};

export default BoardItem;
