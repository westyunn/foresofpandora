const REACT_APP_BACKURL = process.env.REACT_APP_BACKURL;

export async function getMyBoard(userId) {
  const response = await fetch(
    `${REACT_APP_BACKURL}/api/articles/myboard/${userId}`
  );
  const body = await response.json();
  return body;
}

export async function getFavorite(userId) {
  const response = await fetch(
    `${REACT_APP_BACKURL}/api/articles/favorite/${userId}`
  );
  const body = await response.json();
  return body;
}
