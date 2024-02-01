import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false, // 로그인이 되는지 여부를 표시하는 프로퍼티
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 로그인 성공 시 사용자 정보 불러오기
    loginUser: (state, action) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.isLoggedIn = true; // 로그인 상태 true
    },
    // 로그아웃
    logout: (state) => {
      localStorage.clear();
      state.data = null;
      state.isLoggedIn = false;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
