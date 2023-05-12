import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  questions: [],
  answers: [],
  category: "",
  userAnswers: [],
  userId: "",
};
const questionsSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    getQuestions: (state, { payload }) => {
      state.questions = payload.questions;
      state.answers = payload.answers;
      state.category = payload.category;
      state.userId = payload.name;
    },
    getUserAnswers: (state, { payload }) => {
      state.userAnswers = payload._answers;
    },
  },
});
export const { getQuestions, getUserAnswers } = questionsSlice.actions;
export default questionsSlice;
