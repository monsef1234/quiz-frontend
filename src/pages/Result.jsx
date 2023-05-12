import React from "react";
import { useSelector } from "react-redux";
import { getScore } from "../helper/getScore";
import Table from "../components/Table";

const Result = () => {
  const { userAnswers, answers } = useSelector((state) => state.data);
  const point = getScore(answers, userAnswers);
  return (
    <div className="bg-gray-300 min-h-screen px-3 py-5">
      <h1 className="text-4xl font-Pacifico text-center text-blue-900 pb-5">
        Result
      </h1>
      <div className="text-center font-semibold tracking-wide text-2xl">
        Your Result: {point} / 10
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-light tracking-wider my-5 underline">
          Leaderboard
        </h1>
        <div className="grid grid-cols-1 max-w-5xl mx-auto gap-3">
          <div className="flex gap-3 flex-wrap">
            <div className="grow flex flex-col items-center">
              <h2 className="underline tracking-wider text-blue-500 font-semibold">
                Entertainment: Video Games Category
              </h2>
              <Table category={"Entertainment: Video Games"} />
            </div>
            <div className="grow flex flex-col items-center">
              <h2 className="underline tracking-wider text-blue-500 font-semibold">
                Entertainment: Japanese Anime & Manga Category
              </h2>
              <Table category={"Entertainment: Japanese Anime & Manga"} />
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className="grow flex flex-col items-center">
              <h2 className="underline tracking-wider text-blue-500 font-semibold">
                Science: Computers Category
              </h2>
              <Table category={"Science: Computers"} />
            </div>
            <div className="grow flex flex-col items-center">
              <h2 className="underline tracking-wider text-blue-500 font-semibold">
                Sports Category
              </h2>
              <Table category={"Sports"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
