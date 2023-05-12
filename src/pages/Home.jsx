import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getQuestions } from "../redux/qustionsSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import quizAnimation from "../animation/112900-checklist.json";
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState("15");
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [qstFetch, setqstFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchQuestion = async () => {
    await axios
      .get(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
      )
      .then(({ data: { results } }) => {
        const questions = results.map(
          ({ incorrect_answers, question, correct_answer }) => {
            const questions = [...incorrect_answers, correct_answer].sort(
              () => 0.5 - Math.random()
            );
            return { question, questions };
          }
        );
        const categories = results.map(({ category }) => category);
        const category = categories[0];
        const answers = results.map(({ correct_answer }) => {
          return correct_answer;
        });
        setLoading(false);
        dispatch(getQuestions({ questions, answers, category, name }));
        navigate("/questions");
        console.log(category);
      });
  };
  const postUserName = async () => {
    try {
      setLoading(true);
      await axios
        .post(`https://quiz-sf08.onrender.com/user`, { name })
        .then((res) => {
          return;
        });
      setqstFetch(true);
    } catch (error) {
      setqstFetch(false);
      setLoading(false);
      console.log(error.message);
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      category.trim() === "" ||
      difficulty.trim() === "" ||
      name.trim() === ""
    )
      toast.error("Please fill the form");
    try {
      await postUserName();
    } catch (error) {
      console.log(error.message);
    }
  };
  const classname = () => {
    let className;
    if (loading) {
      className =
        "bg-blue-500 opacity-50 w-full mt-3 rounded-lg text-white py-2 cursor-pointer tracking-wider active:scale-[.98]";
    } else {
      className =
        "bg-blue-500 w-full mt-3 rounded-lg text-white py-2 cursor-pointer tracking-wider active:scale-[.98]";
    }
    return className;
  };
  useEffect(() => {
    qstFetch && fetchQuestion();
  }, [qstFetch]);
  return (
    <div className="bg-gray-300 min-h-screen flex flex-col">
      <h1 className="font-[Pacifico] text-4xl text-blue-800 text-center mt-[2rem]">
        Quiz Time
      </h1>
      <div className="flex items-center flex-wrap grow px-3">
        <div className="grow max-w-2xl mx-auto">
          <form onSubmit={submitHandler}>
            <div className="flex flex-col">
              <label htmlFor="name" className="l-home">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                id="name"
                placeholder="John Doe"
                className="home"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="number" className="l-home">
                Number of Questions
              </label>
              <input
                type="number"
                name="number"
                id="number"
                value={10}
                disabled
                className="disabled:bg-slate-600 text-white home opacity-50"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="category" className="l-home">
                Select Category
              </label>
              <select
                name="category"
                id="category"
                className="home"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="15">Video Games</option>
                <option value="21">Sport</option>
                <option value="18">Computer Science</option>
                <option value="31">Japanese Anime & Manga</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="difficulty" className="l-home">
                Select Difficulty
              </label>
              <select
                className="home"
                name="difficulty"
                id="difficulty"
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <button type="submit" className={classname()} disabled={loading}>
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
        <div className="max-w-2xl mx-auto">
          <Lottie animationData={quizAnimation} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default Home;
