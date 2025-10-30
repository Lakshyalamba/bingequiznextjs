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
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = limitedQuestions[currentQuestionIndex] || null;
  const progressPercentage = ((currentQuestionIndex + 1) / limitedQuestions.length) * 100;
  
  const handleAnswer = (selectedOption) => {
    if (!currentQuestion || showFeedback) return;
    
    setSelectedAnswer(selectedOption);
    setShowFeedback(true);
    
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
  };
  
  const handleNext = () => {
    if (currentQuestionIndex + 1 < limitedQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      const finalScore = score;
      const encodedAnswers = encodeURIComponent(JSON.stringify(userAnswers));
      router.push(`/score?score=${finalScore}&total=${limitedQuestions.length}&answers=${encodedAnswers}`);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setUserAnswers(userAnswers.slice(0, -1));
      if (userAnswers[userAnswers.length - 1]?.isCorrect) {
        setScore(score - 1);
      }
      setSelectedAnswer(null);
      setShowFeedback(false);
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
            {currentQuestion.options.map((option, index) => {
              let buttonClass = "option-button";
              if (showFeedback) {
                buttonClass += " disabled";
                if (option === selectedAnswer) {
                  buttonClass += " selected";
                }
                if (option === currentQuestion.answer) {
                  buttonClass += " correct";
                } else if (option === selectedAnswer && option !== currentQuestion.answer) {
                  buttonClass += " incorrect";
                }
              }
              
              return (
                <button 
                  key={index} 
                  className={buttonClass}
                  onClick={() => handleAnswer(option)}
                  disabled={showFeedback}
                >
                  <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                  {option}
                </button>
              );
            })}
          </div>
          
          {showFeedback && (
            <div className={`answer-feedback ${selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect'}`}>
              <div className="feedback-text">
                {selectedAnswer === currentQuestion.answer ? 'Correct!' : 'Incorrect!'}
              </div>
              {selectedAnswer !== currentQuestion.answer && (
                <div className="correct-answer-text">
                  The correct answer is: {currentQuestion.answer}
                </div>
              )}
            </div>
          )}
          
          <div className="navigation-buttons">
            <button 
              className="nav-button prev-button"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              ← Previous
            </button>
            
            {showFeedback && (
              <button 
                className={`nav-button ${currentQuestionIndex === limitedQuestions.length - 1 ? 'finish-button' : 'next-button'}`}
                onClick={handleNext}
              >
                {currentQuestionIndex === limitedQuestions.length - 1 ? 'Finish Quiz' : 'Next →'}
              </button>
            )}
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