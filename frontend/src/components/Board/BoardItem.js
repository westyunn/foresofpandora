import "./Board.css";
const BoardItem = ({ item, isSave }) => {
  console.log(isSave);
  return (
    <div>
      <div className="articleImg">
        <img src={item.imgUrl} />
        <div className="articleText">
          <p className="content">{item.content}</p>
          {isSave && <p>{item.memberNicname}</p>}
          {!isSave && (
            <div>
              <span>♡{item.like}</span>
              <span>▷{item.comment}</span>
              <p>{item.createdAt}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardItem;
