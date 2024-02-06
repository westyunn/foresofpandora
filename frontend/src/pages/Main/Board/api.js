import axios from "axios";
const token = localStorage.getItem("access_token");
const refreshToken = localStorage.getItem("refresh_token");

// 댓글 개수 조회
export const getCommentCount = async ({ item, setCommentCount, page }) => {
  const getCommentParams = { page: page };
  try {
    const res = await axios.get(`api/articles/${item.id}/comments`, {
      params: getCommentParams,
    });
    console.log(res.data.data.totalElements);
    setCommentCount(res.data.data.totalElements);
  } catch (error) {
    console.error(error);
  }
};
// 게시글 좋아요
export const postReaction = async ({ item, setIsLiked }) => {
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
    setIsLiked(res.data.data);
  } catch (err) {
    console.error(err);
  }
};

// 내 반응 조회
export const getMyReaction = async ({ item, setIsMyLiked }) => {
  try {
    if (token) {
      const res = await axios.get(`api/articles/reactions/${item.id}`, {
        headers: {
          authorization: `Bearer ${token}`,
          refreshtoken: refreshToken,
        },
      });
      setIsMyLiked(res.data.data);
    }
  } catch (err) {
    console.error(err);
  }
};

// 반응 개수 조회
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
      const res = await axios.get(`api/articles/storages/${item.id}`, {
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
export const getArticle = async ({ item, setReactionCount }) => {
  try {
    const res = await axios.get(`api/articles/${item.id}`);
    setReactionCount(res.data.data.reactionCount);
  } catch (err) {
    console.error(err);
  }
};

// 게시글 이미지 리스트 불러오기
export const getImgList = async ({ item, setImgList }) => {
  try {
    const res = await axios.get(`api/articles/${item.id}`);
    setImgList(res.data.data.imageList);
  } catch (err) {
    console.error(err);
  }
};

// 게시글 수정
export const putMyArticle = async (id, content) => {
  try {
    // post 요청 보낼때 헤더는 요청의 세번째 인자로 전달되어야 함
    const res = await axios.put(
      `/api/articles/storages/${id}`,
      { content: content },
      {
        headers: {
          authorization: `Bearer ${token}`,
          refreshtoken: refreshToken,
        },
      }
    );
    return res;
  } catch (err) {
    console.error(err);
  }
};
