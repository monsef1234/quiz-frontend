export const getScore = (answers, userAnswers) => {
  let score = 0;
  userAnswers.forEach((answer) => {
    if (answers.includes(answer)) {
      score += 1;
    }
  });
  return score;
};
