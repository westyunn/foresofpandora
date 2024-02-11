import axios from "axios";

export async function getMyBoard(page) {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const params = { page: page };
  if (token) {
    const res = await axios({
      method: "GET",
      url: `/api/member/articles`,
      params,
      // access token이랑 refresh token 둘 다 req header에 담아서 보냅니당
      headers: {
        authorization: `Bearer ${token}`,
        refreshtoken: refreshToken,
      },
    });
    return res;
  }
}

export async function getMySaved(page) {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const params = { page: page };
  if (token) {
    const res = await axios({
      method: "GET",
      url: `/api/member/storages`,
      params,
      // access token이랑 refresh token 둘 다 req header에 담아서 보냅니당
      headers: {
        authorization: `Bearer ${token}`,
        refreshtoken: refreshToken,
      },
    });
    return res;
  }
}

export async function getBoardDetail(id) {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  if (token) {
    const res = await axios({
      method: "GET",
      url: `/api/articles/${id}`,
      // access token이랑 refresh token 둘 다 req header에 담아서 보냅니당
      headers: {
        authorization: `Bearer ${token}`,
        refreshtoken: refreshToken,
      },
    });
    const data = res.data.data;
    return data;
  }
}
