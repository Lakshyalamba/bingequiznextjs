'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import './questions.css';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

import { allQuestions } from '../data/questions';

function QuestionsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const movieParam = searchParams?.get('movie')?.toLowerCase() || '';
  const numParam = Number(searchParams?.get('numQuestions')) || 10;
  const numQuestions = Math.min(numParam, 10);

  const movieQuestions = allQuestions[movieParam] || [];
  const limitedQuestions = movieQuestions.slice(0, numQuestions);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const currentQuestion = limitedQuestions[currentQuestionIndex] || null;
  const progressPercentage = ((currentQuestionIndex + 1) / limitedQuestions.length) * 100;
  
  const handleAnswer = (selectedOption) => {
    if (!currentQuestion) return;
    
    const isCorrect = selectedOption === currentQuestion.answer;
    const newAnswer = {
      question: currentQuestion.question,
      userAnswer: selectedOption,
      correctAnswer: currentQuestion.answer,
      isCorrect: isCorrect,
      options: currentQuestion.options
    };
    
    const updatedAnswers = [...userAnswers, newAnswer];
    setUserAnswers(updatedAnswers);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < limitedQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const finalScore = score + (isCorrect ? 1 : 0);
      const encodedAnswers = encodeURIComponent(JSON.stringify(updatedAnswers));
      router.push(`/score?score=${finalScore}&total=${limitedQuestions.length}&answers=${encodedAnswers}`);
    }
  };

  if (!movieQuestions.length || !currentQuestion) {
    return (
      <div className="questions-container">
        <div className="error-state">
          <h2>No Questions Available</h2>
          <p>Sorry, we couldn't find questions for this movie. Please try selecting a different movie.</p>
          <a href="/home" className="home-button">Back to Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="questions-container">
      {/* Header */}
      <header className="quiz-header">
        <div className="header-content">
          <div className="quiz-logo">BingeQuiz</div>
          <div className="progress-info">
            <span className="progress-text">Question {currentQuestionIndex + 1} of {limitedQuestions.length}</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: `${progressPercentage}%`}}></div>
            </div>
          </div>
        </div>
      </header>

      {/* Back Button */}
      <a href="/home" className="back-button">Back to Home</a>

      {/* Quiz Content */}
      <div className="quiz-content">
        <div className="question-card">
          <div className="question-number">Question {currentQuestionIndex + 1}</div>
          <h2 className="question-text">{currentQuestion.question}</h2>
          <div className="options-grid">
            {currentQuestion.options.map((option, index) => (
              <button 
                key={index} 
                className="option-button"
                onClick={() => handleAnswer(option)}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuestionsLoading() {
  return (
    <div className="questions-container">
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading your movie quiz...</p>
      </div>
    </div>
  );
}

export default function QuestionsPage() {
  return (
    <Suspense fallback={<QuestionsLoading />}>
      <QuestionsContent />
    </Suspense>
  );
}