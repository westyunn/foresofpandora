import { combineReducers, configureStore } from "@reduxjs/toolkit";
// persist-reducer 및 persistStore 관련
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userSlice from "./user";
import replySlice from "./reply";
import commentSlice from "./comment";
import notificationSlice from "./notification";

const persistConfig = {
  key: "root", // localStorage key
  storage, // localStorage
  whitelist: ["user", "reply", "comment", "notification"], // 스토리지에 저장할 리덕스 모듈을 나열
};

// 초기화를 방지하기 위한 redux-persist 적용
const rootReducer = combineReducers({
  user: userSlice.reducer,
  reply: replySlice.reducer,
  comment: commentSlice.reducer,
  notification: notificationSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

// persistStore 함수를 사용하여 persistor 객체를 생성합니다.
const persistor = persistStore(store);

// store와 persistor를 내보냅니다.
export { store, persistor };
