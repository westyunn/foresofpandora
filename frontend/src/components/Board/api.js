const getBoardList = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKURL}/api/articles`);
    const data = await res.json();
  } catch (error) {
    console.error(error);
  }
};

export { getBoardList };
