import React from 'react';

export default function SingleQuiz({ quiz, handleGetAllSelectedQuizzes }) {
  const { id, question } = quiz || {};

  return (
    <>
      <div className="quiz">
        <h4 className="question">
          Quiz {id} - {question}
        </h4>
        <form className="quizOptions">
          {quiz?.options?.map((item) => (
            <label key={item.id}>
              <input
                type="checkbox"
                value={JSON.stringify({ questionId: id, item })}
                onChange={(e) => handleGetAllSelectedQuizzes(e, JSON.parse(e.target.value))}
              />
              {item.option}
            </label>
          ))}
        </form>
      </div>
    </>
  );
}
