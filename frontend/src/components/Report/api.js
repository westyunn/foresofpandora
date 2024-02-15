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
      console.log(err.response.data.message);
      window.alert(err.response.data.message);
    } else if (err.response.data.errorCode === "VALIDATION_CHECK_FAIL") {
      window.alert(err.response.data.message);
    }
    console.error("게시글 신고 실패", err);
  }
};

//댓글신고
export async function reportComment(itemId, content, id) {
  try {
    const data = { content: content };
    console.log("게시글 아이디:", id, "댓글 아이디:", itemId);
    if (token) {
      // id가 articleId, itemId가 commentId
      const res = await axios({
        method: "POST",
        url: `/api/reports/${id}/comments/${itemId}`,
        data,
        // access token이랑 refresh token 둘 다 req header에 담아서 보냅니당
        headers: {
          authorization: `Bearer ${token}`,
          refreshtoken: refreshToken,
        },
      });
      console.log(res);
      window.alert("신고가 완료되었습니다");
      return res;
    }
  } catch (err) {
    if (err.response.data.errorCode === "DUPLICATED_COMMENT_REPORT") {
      window.alert(err.response.data.message);
    } else if (err.response.data.errorCode === "VALIDATION_CHECK_FAIL") {
      window.alert(err.response.data.message);
    }
    console.error("댓글 신고 실패", err);
  }
}
//대댓글신고
export async function reportReply(id, content, itemId, reply) {
  try {
    const data = { content: content };
    console.log("게시글 아이디:", id, "댓글 아이디:", itemId);
    if (token) {
      const res = await axios({
        method: "POST",
        url: `/api/reports/${id}/${itemId}/replies/${reply}`,
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
    if (err.response.data.errorCode === "DUPLICATED_REPLY_REPORT") {
      window.alert(err.response.data.message);
    } else if (err.response.data.errorCode === "VALIDATION_CHECK_FAIL") {
      window.alert(err.response.data.message);
    }
    console.error("대댓글 신고 실패", err);
  }
}
