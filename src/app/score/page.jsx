'use client';
import { useSearchParams } from 'next/navigation';
import './score.css';

export default function ScorePage() {
  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get('score'));
  const total = parseInt(searchParams.get('total'));
  const incorrect = total - score;
  const scorePercentage = (score / total) * 100;
  const incorrectPercentage = (incorrect / total) * 100;

  return (
    <div className="score-page">
      <div className="score-container">
        <h1>Your Quiz Result</h1>
        
        <div className="score-details">
          <p className="score">
            <span className="highlight">{score}</span> / <span className="highlight">{total}</span>
          </p>
        </div>

        <p className="message">
          {score === total
            ? "Perfect Score! You're a true fan!"
            : score > total / 2
            ? "Great job! You know your stuff!"
            : "Keep watching movies and listening to music, you'll get better!"}
        </p>

        <div className="score-breakdown">
          <p>Incorrect: <span className="highlight">{incorrect}</span> ({Math.round(incorrectPercentage)}%)</p>
          <p>Score Percentage: <span className="highlight">{Math.round(scorePercentage)}%</span></p>
        </div>

        <a href="/home" className="home-button">Go Back to Home</a>
      </div>
    </div>
  );
}
