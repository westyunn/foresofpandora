import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isReply: false, // 답글 작성중인지 여부
  memberId: null, // 답글 대상 유저
  commentId: null,
};

const replySlice = createSlice({
  name: "reply",
  initialState,
  reducers: {
    isReply: (state, action) => {
      state.isReply = true;
      state.memberId = action.payload.memberId;
      state.commentId = action.payload.commentId;
    },
    isNotReply: (state) => {
      state.isReply = false;
      state.memberId = null;
      state.commentId = null;
    },
  },
});

export const replyActions = replySlice.actions;
export default replySlice;
