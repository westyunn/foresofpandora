import axios from "axios";

export async function getMyTemp(page) {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const params = { page: page };
  if (token) {
    const res = await axios({
      method: "GET",
      url: `/api/member/temp`,
      params,
      // access token이랑 refresh token 둘 다 req header에 담아서 보냅니당
      headers: {
        authorization: `Bearer ${token}`,
        refreshtoken: refreshToken,
      },
    });
    // const body = await res.json();
    console.log(res);
    return res;
  }
}

export async function deleteMyTemp(tempId) {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  if (token) {
    const res = await axios({
      method: "DELETE",
      url: `/api/articles/temp/${tempId}`,
      // access token이랑 refresh token 둘 다 req header에 담아서 보냅니당
      headers: {
        authorization: `Bearer ${token}`,
        refreshtoken: refreshToken,
      },
    });
    return res;
  }
}

export async function updateMyTemp(tempId, content) {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const data = { content: content };
  if (token) {
    const res = await axios({
      method: "PUT",
      url: `/api/articles/temp/${tempId}`,
      data,
      // access token이랑 refresh token 둘 다 req header에 담아서 보냅니당
      headers: {
        authorization: `Bearer ${token}`,
        refreshtoken: refreshToken,
      },
    });
    return res;
  }
}

export async function postMyTemp(tempId, content) {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const data = { content: content };
  if (token) {
    const res = await axios({
      method: "POST",
      url: `/api/articles/temp/${tempId}`,
      data,
      // access token이랑 refresh token 둘 다 req header에 담아서 보냅니당
      headers: {
        authorization: `Bearer ${token}`,
        refreshtoken: refreshToken,
      },
    });
    return res;
  }
}
