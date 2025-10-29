'use client';
import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import './score.css';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

function ScoreContent() {
  const searchParams = useSearchParams();
  const score = parseInt(searchParams?.get('score') || 0);
  const total = parseInt(searchParams?.get('total') || 10);
  const answersParam = searchParams?.get('answers');
  
  const [showReview, setShowReview] = useState(false);
  
  let userAnswers = [];
  if (answersParam) {
    try {
      userAnswers = JSON.parse(decodeURIComponent(answersParam));
    } catch (e) {
      console.error('Error parsing answers:', e);
    }
  }
  
  const incorrect = total - score;
  const scorePercentage = Math.round((score / total) * 100);
  
  const getScoreMessage = () => {
    if (score === total) return "Perfect Score! You're a true movie buff!";
    if (scorePercentage >= 80) return "Excellent! You know your movies!";
    if (scorePercentage >= 60) return "Great job! You're doing well!";
    if (scorePercentage >= 40) return "Not bad! Keep watching more movies!";
    return "Keep binge-watching & you'll improve!";
  };

  return (
    <div className="score-page">
      <div className="score-container">
        {/* Header */}
        <div className="score-header">
          <h1>Quiz Completed!</h1>
          <p className="score-subtitle">Here's how you performed on your movie trivia challenge</p>
        </div>

        {/* Score Display */}
        <div className="score-display">
          <div className="score-main">{score} / {total}</div>
          <div className="score-percentage">{scorePercentage}% Correct</div>
          <div className="score-message">{getScoreMessage()}</div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">{score}</span>
            <span className="stat-label">Correct</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{incorrect}</span>
            <span className="stat-label">Incorrect</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{scorePercentage}%</span>
            <span className="stat-label">Accuracy</span>
          </div>
        </div>

        {/* Review Section */}
        {userAnswers.length > 0 && (
          <div className="review-section">
            <div className="review-header">
              <h3 className="review-title">Question Review</h3>
              <button 
                className="toggle-review" 
                onClick={() => setShowReview(!showReview)}
              >
                {showReview ? 'Hide Review' : 'Show Review'}
              </button>
            </div>

            {showReview && (
              <div className="questions-review">
                {userAnswers.map((answer, index) => (
                  <div 
                    key={index} 
                    className={`question-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}
                  >
                    <div className="question-text">
                      Q{index + 1}: {answer.question}
                    </div>
                    <div className="answer-comparison">
                      <div className="answer-row">
                        <div className={`answer-icon ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                          {answer.isCorrect ? '✓' : '✗'}
                        </div>
                        <span className="answer-label">Your Answer:</span>
                        <span className="answer-text">{answer.userAnswer}</span>
                      </div>
                      {!answer.isCorrect && (
                        <div className="answer-row correct-answer">
                          <div className="answer-icon">✓</div>
                          <span className="answer-label">Correct Answer:</span>
                          <span className="answer-text">{answer.correctAnswer}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="action-buttons">
          <a href="/home" className="home-button">Back to Home</a>
          <a href="/home" className="retry-button">Try Another Quiz</a>
        </div>
      </div>
    </div>
  );
}

function ScoreLoading() {
  return (
    <div className="score-page">
      <div className="score-container">
        <h1>Loading score...</h1>
      </div>
    </div>
  );
}

export default function ScorePage() {
  return (
    <Suspense fallback={<ScoreLoading />}>
      <ScoreContent />
    </Suspense>
  );
}