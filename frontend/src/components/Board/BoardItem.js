const BoardItem = (prop) => {
  console.log(prop.articleId);
  console.log(prop.memberId);
  console.log(prop.createdAt);
  return (
    <div>
      <h2>item</h2>
      <div>
        <h1>{prop.articleId}</h1>
        <p>{prop.memberId}</p>
        <p>{prop.createdAt}</p>
      </div>
    </div>
  );
};

export default BoardItem;
