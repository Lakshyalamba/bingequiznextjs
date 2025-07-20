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
        <h1>🎉 Quiz Completed!</h1>

        <div className="score-details">
          <p className="score">
            🎯 <span className="highlight">{score}</span> / <span className="highlight">{total}</span>
          </p>
        </div>

        <p className="message">
          {score === total
            ? "🏆 Perfect Score! You're a true movie buff!"
            : score > total / 2
            ? "🔥 Great job! You know your stuff!"
            : "📺 Keep binge-watching & you'll improve!"}
        </p>

        <div className="score-breakdown">
          ❌ Incorrect: <span className="highlight">{incorrect}</span> ({Math.round(incorrectPercentage)}%)<br />
          ✅ Score Percentage: <span className="highlight">{Math.round(scorePercentage)}%</span>
        </div>

        <a href="/home" className="home-button">🔙 Go Back to Home</a>
      </div>
    </div>
  );
}
