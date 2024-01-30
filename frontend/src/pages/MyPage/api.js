const REACT_APP_BACKURL = process.env.REACT_APP_BACKURL;

export async function getMyBoard() {
  const response = await fetch(`${REACT_APP_BACKURL}/api/member/create`);
  const body = await response.json();
  return body;
}

export async function getSave() {
  const response = await fetch(`${REACT_APP_BACKURL}/api/member/save`);
  const body = await response.json();
  return body;
}
