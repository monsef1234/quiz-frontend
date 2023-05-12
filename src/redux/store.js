import { combineReducers, configureStore } from "@reduxjs/toolkit";
import questionsSlice from "./qustionsSlice";
const rootReducers = combineReducers({
  data: questionsSlice.reducer,
});

const store = configureStore({
  reducer: rootReducers,
});

export default store;
