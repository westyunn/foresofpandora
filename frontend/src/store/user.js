import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false, // 로그인이 되는지 여부를 표시하는 프로퍼티
  userEmail: "",
  userId: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 로그인 성공 시 사용자 정보 불러오기
    loginUser: (state, action) => {
      console.log(action.payload.userEmail);
      state.userEmail = action.payload.userEmail;
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
    },
    // 로그아웃
    logout: (state) => {
      localStorage.clear();
      state.userEmail = "";
      state.userId = "";
      state.isLoggedIn = false;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
