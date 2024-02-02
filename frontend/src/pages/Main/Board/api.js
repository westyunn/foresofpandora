import axios from "axios";
const token = localStorage.getItem("access_token");
const refreshToken = localStorage.getItem("refresh_token");

// 댓글 개수 조회
export const getCommentCount = async ({ item, setCommentCount, page }) => {
  const getCommentParams = { page: page };
  try {
    if (token) {
      const res = await axios.get(`api/articles/${item.id}/comments`, {
        params: getCommentParams,
        headers: {
          authorization: `Bearer ${token}`,
          refreshtoken: refreshToken,
        },
      });
      console.log(res.data.data.totalElements);
      setCommentCount(res.data.data.totalElements);
    }
  } catch (error) {
    console.error(error);
  }
};

export const getReactionCount = async ({ item, setReactionCount }) => {
  try {
    const res = await axios.get(`/api/articles/reactionCounts/${item.id}`, {
      headers: {
        authorization: `Bearer ${token}`,
        refreshtoken: refreshToken,
      },
    });
    setReactionCount(res.data.data);
  } catch (error) {
    console.error(error);
  }
};

export const postSaved = async ({ item, setIsSaved }) => {
  try {
    const res = await axios.post(`api/articles/storages/${item.id}`, {
      headers: {
        authorization: `Bearer ${token}`,
        refreshtoken: refreshToken,
      },
    });
    setIsSaved(res.data.data);
  } catch (err) {
    console.error(err);
  }
};
