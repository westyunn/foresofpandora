import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  commentId: null, // 수정 중인 댓글 id
  content: null, // 수정 중인 댓글 내용
  refresh: true,
  replyRefresh: true,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    startUpdate: (state, action) => {
      state.commentId = action.payload.commentId;
      state.content = action.payload.content;
    },
    closeUpdate: (state) => {
      state.commentId = null;
      state.content = null;
    },
    handleRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    handleReplyRefresh: (state) => {
      state.replyRefresh = !state.replyRefresh;
    },
  },
});

export const commentActions = commentSlice.actions;
export default commentSlice;
