import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserAnswers } from "../redux/qustionsSlice";
import axios from "axios";
import { getScore } from "../helper/getScore";

const Questions = () => {
  const { answers, category, userId, questions } = useSelector(
    (state) => state.data
  );
  const [checking, setChecking] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fun = async (point) => {
    await axios
      .put(`https://quiz-sf08.onrender.com/user`, {
        name: userId,
        category,
        point,
      })
      .then((res) => {
        return;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const submitHandler = async (e) => {
    const inputs = document.querySelectorAll(".input");
    let _answers = [];
    inputs.forEach((input) => {
      const { checked, value } = input;
      if (checked) {
        _answers.push(value);
      }
    });
    dispatch(getUserAnswers({ _answers }));
    const point = getScore(answers, _answers);
    await fun(point);
    navigate("/result");
  };
  return (
    <div className="bg-gray-300 min-h-screen p-3">
      <h1 className="text-4xl font-Pacifico text-center text-blue-500 my-5">
        Questions
      </h1>
      <div className="bg-white border rounded-lg shadow max-w-6xl mx-auto">
        {questions.map((q, idx) => {
          return (
            <div
              key={idx}
              className={
                idx === questions.length - 1
                  ? "p-3"
                  : "border-b border-blue-500 p-3"
              }
            >
              <h2
                dangerouslySetInnerHTML={{ __html: q.question }}
                className="mt-2 mb-1 font-semibold"
              />
              {q.questions.map((s, i) => {
                return (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={q.question}
                      id={s}
                      value={s}
                      className="input"
                    />
                    <label
                      htmlFor={s}
                      dangerouslySetInnerHTML={{ __html: s }}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      {!checking && (
        <button
          onClick={() => setChecking(true)}
          className="bg-blue-700 block mx-auto px-4 py-2 my-5 cursor-pointer rounded-lg text-white"
        >
          Submit
        </button>
      )}
      {checking && (
        <button
          onClick={submitHandler}
          className="bg-blue-700 block mx-auto px-4 py-2 my-5 cursor-pointer rounded-lg text-white"
        >
          Are You Sure?
        </button>
      )}
    </div>
  );
};

export default Questions;
