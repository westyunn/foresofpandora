import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      // code
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
