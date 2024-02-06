import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isReply: false, // 답글 작성중인지 여부
  memberId: null, // 답글 대상 유저 id
  commentId: null, // 댓글 id
  replyId: null,
  content: null,
};

const replySlice = createSlice({
  name: "reply",
  initialState,
  reducers: {
    openReplyNotice: (state, action) => {
      state.isReply = true;
      state.memberId = action.payload.memberId;
      state.commentId = action.payload.commentId;
    },
    closeReplyNotice: (state) => {
      state.isReply = false;
      state.memberId = null;
      state.commentId = null;
    },
    startReply: (state, action) => {
      state.replyId = action.payload.commentReplyId;
      state.commentId = action.payload.commentId;
      state.content = action.payload.content;
    },
    closeReply: (state) => {
      state.replyId = null;
      state.commentId = null;
      state.content = null;
    },
  },
});

export const replyActions = replySlice.actions;
export default replySlice;
