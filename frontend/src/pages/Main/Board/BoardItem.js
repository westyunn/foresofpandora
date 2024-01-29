const BoardItem = ({ board }) => {
  return (
    <div>
      <div>{board.title}</div>
      <div>{board.content}</div>
    </div>
  );
};
