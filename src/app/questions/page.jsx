'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import './questions.css';

// Tell Next.js this is a dynamic page
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Import the questions data
import { allQuestions } from '../data/questions';

// Component that uses searchParams
function QuestionsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get movie parameter from URL
  const movieParam = searchParams?.get('movie')?.toLowerCase() || '';
  const numParam = Number(searchParams?.get('numQuestions')) || 10;
  const numQuestions = Math.min(numParam, 10);

  const movieQuestions = allQuestions[movieParam] || [];
  const limitedQuestions = movieQuestions.slice(0, numQuestions);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const currentQuestion = limitedQuestions[currentQuestionIndex] || null;
  
  const handleAnswer = (selectedOption) => {
    if (!currentQuestion) return;
    
    const isCorrect = selectedOption === currentQuestion.answer;
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < limitedQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      router.push(`/score?score=${score + (isCorrect ? 1 : 0)}&total=${limitedQuestions.length}`);
    }
  };

  if (!movieQuestions.length || !currentQuestion) {
    return (
      <div className="questions-container">
        <h2>❌ No questions found for this movie. Please try a different one.</h2>
        <a href="/home" className="home-button">🔙 Go Back to Home</a>
      </div>
    );
  }

  return (
    <div className="questions-container">
      <h2 className="progress">📍 Question {currentQuestionIndex + 1} of {limitedQuestions.length}</h2>
      <div className="question-card">
        <h3>{currentQuestion.question}</h3>
        <div className="options">
          {currentQuestion.options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Loading fallback component
function QuestionsLoading() {
  return (
    <div className="questions-container">
      <h2>Loading questions...</h2>
    </div>
  );
}

// Main component with Suspense boundary
export default function QuestionsPage() {
  return (
    <Suspense fallback={<QuestionsLoading />}>
      <QuestionsContent />
    </Suspense>
  );
}