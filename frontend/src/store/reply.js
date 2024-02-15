import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isReply: false, // 답글 작성중인지 여부
  nickname: null, // 답글 대상 유저 닉네임
  commentId: null, // 댓글 id
  replyId: null,
  content: null,
  refresh: true,
  tagId: null,
  targetReplyId: null,
};

const replySlice = createSlice({
  name: "reply",
  initialState,
  reducers: {
    openReplyNotice: (state, action) => {
      // console.log("openReplyNotice payload:", action.payload);
      console.log("openReplyNotice payload:", action.payload);
      state.isReply = true;
      state.nickname = action.payload.nickname;
      state.commentId = action.payload.commentId;
      state.tagId = action.payload.memberId;
      state.commentReplyId = action.payload.commentReplyId;
    },
    closeReplyNotice: (state) => {
      state.isReply = false;
      state.nickname = null;
      state.commentId = null;
      state.tagId = null;
      state.commentReplyId = null;
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
    handleRefresh: (state) => {
      state.refresh = !state.refresh;
    },
  },
});

export const replyActions = replySlice.actions;
export default replySlice;
