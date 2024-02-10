import axios from "axios";
const token = localStorage.getItem("access_token");
const refreshToken = localStorage.getItem("refresh_token");

//게시물 신고
export const reportArticle = async (id, content) => {
  try {
    const res = await axios.post(
      `/api/reports/articles/${id}`,
      { cotent: content },
      {
        headers: {
          authorization: `Bearer ${token}`,
          refreshtoken: refreshToken,
        },
      }
    );
    window.alert("신고가 완료되었습니다");
  } catch (err) {
    if (err.response.data.errorCode === "DUPLICATED_ARTICLE_REPORT") {
      window.alert(err.response.data.message);
    } else if (err.response.data.errorCode === "VALIDATION_CHECK_FAIL") {
      window.alert(err.response.data.message);
    }
    console.error("게시글 신고 실패", err);
  }
};

//댓글신고
export async function reportComment(id, content) {
  try {
    const data = { content: content };
    if (token) {
      const res = await axios({
        method: "POST",
        url: `/api/reports/comments/${id}`,
        data,
        // access token이랑 refresh token 둘 다 req header에 담아서 보냅니당
        headers: {
          authorization: `Bearer ${token}`,
          refreshtoken: refreshToken,
        },
      });
      window.alert("신고가 완료되었습니다");
      return res;
    }
  } catch (err) {
    if (err.response.data.errorCode === "DUPLICATED_ARTICLE_REPORT") {
      window.alert(err.response.data.message);
    } else if (err.response.data.errorCode === "VALIDATION_CHECK_FAIL") {
      window.alert(err.response.data.message);
    }
    console.error("댓글 신고 실패", err);
  }
}
//대댓글신고
export async function reportReply(id, content) {
  try {
    const data = { content: content };
    if (token) {
      const res = await axios({
        method: "POST",
        url: `/api/reports/replies/${id}`,
        data,
        // access token이랑 refresh token 둘 다 req header에 담아서 보냅니당
        headers: {
          authorization: `Bearer ${token}`,
          refreshtoken: refreshToken,
        },
      });
      window.alert("신고가 완료되었습니다");
      return res;
    }
  } catch (err) {
    if (err.response.data.errorCode === "DUPLICATED_ARTICLE_REPORT") {
      window.alert(err.response.data.message);
    } else if (err.response.data.errorCode === "VALIDATION_CHECK_FAIL") {
      window.alert(err.response.data.message);
    }
    console.error("대댓글 신고 실패", err);
  }
}
