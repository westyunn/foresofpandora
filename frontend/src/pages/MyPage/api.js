// const REACT_APP_BACKURL = process.env.REACT_APP_BACKURL;

export async function getMyBoard(page) {
  const response = await fetch(`/api/members/articles?page=${page}`);
  const body = await response.json();
  return body;
}

// export async function getSave() {
//   const response = await fetch(`${REACT_APP_BACKURL}/api/member/save`);
//   const body = await response.json();
//   return body;
// }
