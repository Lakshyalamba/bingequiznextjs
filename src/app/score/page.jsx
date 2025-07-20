'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import './score.css';

// Tell Next.js this is a dynamic page
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Component that uses searchParams
function ScoreContent() {
  const searchParams = useSearchParams();
  const score = parseInt(searchParams?.get('score') || 0);
  const total = parseInt(searchParams?.get('total') || 10);
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

// Loading fallback component
function ScoreLoading() {
  return (
    <div className="score-page">
      <div className="score-container">
        <h1>Loading score...</h1>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function ScorePage() {
  return (
    <Suspense fallback={<ScoreLoading />}>
      <ScoreContent />
    </Suspense>
  );
}