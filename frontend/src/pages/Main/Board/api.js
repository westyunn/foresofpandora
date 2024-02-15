import axios from "axios";
const token = localStorage.getItem("access_token");
const refreshToken = localStorage.getItem("refresh_token");

// 댓글 개수 조회
export const getCommentCount = async ({ item, setCommentCount, page }) => {
  const getCommentParams = { page: page };
  try {
    const res = await axios.get(`/api/articles/${item.id}/comments`, {
      params: getCommentParams,
    });
    console.log(res.data.data.totalElements);
    setCommentCount(res.data.data.totalElements);
  } catch (error) {
    console.error(error);
  }
};
// 게시글 좋아요
export const postReaction = async ({ item, setLikeCnt }) => {
  try {
    const res = await axios.post(
      `/api/articles/reactions/${item.id}`,
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
          refreshtoken: refreshToken,
        },
      }
    );
    console.log(res.data.data);
    // setIsLiked(res.data.data);
    // 좋아요 상태 변경하면 다시 getReactionCount로 가서 좋아요 개수 반영해서 조회해줌
    getReactionCount({ item, setLikeCnt });
  } catch (err) {
    console.error(err);
  }
};

// 내 반응 조회 (새로고침해도 안풀려야함)
export const getMyReaction = async ({ item, setIsMyLiked }) => {
  try {
    if (token) {
      const res = await axios.get(`api/articles/reactions/${item.id}`, {
        headers: {
          authorization: `Bearer ${token}`,
          refreshtoken: refreshToken,
        },
      });
      setIsMyLiked(res.data.data); // true 또는 false 값을 설정
    }
  } catch (err) {
    console.error(err);
  }
};

// 좋아요 개수 조회
export const getReactionCount = async ({ item, setLikeCnt }) => {
  try {
    const res = await axios.get(`/api/articles/reactionCounts/${item.id}`, {
      headers: {
        authorization: `Bearer ${token}`,
        refreshtoken: refreshToken,
      },
    });
    // 최종 반영된 좋아요 개수
    // setLikeCnt(res.data.data);
  } catch (error) {
    console.error(error);
  }
};

// 게시글 보관
export const postSaved = async ({ item, setIsSaved }) => {
  try {
    // post 요청 보낼때 헤더는 요청의 세번째 인자로 전달되어야 함
    const res = await axios.post(
      `/api/articles/storages/${item.id}`,
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
          refreshtoken: refreshToken,
        },
      }
    );
    setIsSaved(res.data.data);
  } catch (err) {
    console.error(err);
  }
};

// 나의 보관 여부 조회
export const getIsSaved = async ({ item, setIsMySaved }) => {
  try {
    if (token) {
      const res = await axios.get(`/api/articles/storages/${item.id}`, {
        headers: {
          authorization: `Bearer ${token}`,
          refreshtoken: refreshToken,
        },
      });
      setIsMySaved(res.data.data);
    }
  } catch (err) {
    console.error(err);
  }
};

// 게시글 단건 조회
export const getArticle = async ({ item, setCommentCount }) => {
  try {
    const res = await axios.get(`/api/articles/${item.id}`);
    // setReactionCount(res.data.data.reactionCount);
    setCommentCount(res.data.data.commentCount);
  } catch (err) {
    console.error(err);
  }
};

// 게시글 삭제
export const deleteArticle = async ({ item }) => {
  try {
    // post 요청 보낼때 헤더는 요청의 세번째 인자로 전달되어야 함
    const res = await axios.delete(`/api/articles/${item.id}`, {
      headers: {
        authorization: `Bearer ${token}`,
        refreshtoken: refreshToken,
      },
    });
    console.log(res);
  } catch (err) {
    console.error(err);
  }
};

export async function putMyArticle(id, content) {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const data = { content: content };
  try {
    if (token) {
      const res = await axios({
        method: "PUT",
        url: `/api/articles/${id}`,
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
    console.log("게시글 수정 실패", err);
  }
}
