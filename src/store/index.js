import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const rootReducer = combineReducers({
  user: userReducer
})

const persistConfig = {
  key: "root",
  storage
}

const persisteReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persisteReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware 기본은 true
  // true일때는 직렬화 불가능 값이 있으면 오류 출력(함수 등) false 설정 시 오류는 없지만 데이터 손실 가능성이 있음.
  // 특정 상황에서만 사용 시 serializableCheck: {}로 사용
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ingoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
})

export const persister = persistStore(store)