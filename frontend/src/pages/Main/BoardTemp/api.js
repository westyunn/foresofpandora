import axios from "axios";

export async function getMyTemp(page) {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const params = { page: page };
  try {
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
      console.log("임시보관 목록 불러오기 성공", res);
      return res;
    }
  } catch (err) {
    console.log("임시보관 목록 불러오기 실패", err);
  }
}

export async function deleteMyTemp(tempId) {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  try {
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
  } catch (err) {
    console.log("임시저장글 삭제 실패", err);
  }
}

export async function updateMyTemp(tempId, content) {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const data = { content: content };
  try {
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
  } catch (err) {
    console.log("임시저장 수정 실패", err);
  }
}

export async function postMyTemp(content) {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const data = { content: content };
  try {
    if (token) {
      const res = await axios({
        method: "POST",
        url: `/api/articles/temp`,
        data,
        // access token이랑 refresh token 둘 다 req header에 담아서 보냅니당
        headers: {
          authorization: `Bearer ${token}`,
          refreshtoken: refreshToken,
        },
      });
      return res;
    }
  } catch (err) {
    console.log("임시저장 글 등록 실패", err);
  }
}
export async function postTempToMyArticle(tempId, content) {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const data = { content: content };
  try {
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
  } catch (err) {
    console.log("임시저장 업로드 실패", err);
  }
}
