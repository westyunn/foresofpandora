import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listen: false, // 연결 여부
  noticeList: [], // 알림 리스트
  // event - 이벤트 종류 (좋아요 or 댓글)
  // myContent - 내 글의 내용 일부 (20글자까지)
  // content - 상대방이 작성한 내용 (10글자까지)
  // time - 알림 수신 시간 or 상대방이 내용을 작성한 시간 -> 알림 아이템에서 시간차 계산해서 표시
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    // 연결 성공
    connect: (state) => {
      state.listen = true;
    },
    // 연결 끊기
    disconnect: (state) => {
      state.listen = false;
    },
    // 수신한 event를 eventList에 추가
    addEvent: (state, action) => {
      state.noticeList = [...state.noticeList, action.payload];
    },
  },
});

export const notificationAction = notificationSlice.actions;
export default notificationSlice;
