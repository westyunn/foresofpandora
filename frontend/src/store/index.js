import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userSlice from "./user";
import replySlice from "./reply";
import { persistReducer } from "redux-persist";

// 초기화를 방지하기 위한 redux-persist 적용
const reducers = combineReducers({
  user: userSlice.reducer,
  reply: replySlice.reducer,
});

const persistConfig = {
  key: "root", // localStorage key
  storage, // localStorage
  whitelist: ["user", "reply"], // 스토리지에 저장할 리덕스 모듈을 나열
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
