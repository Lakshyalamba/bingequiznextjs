'use client';
import "./landingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src="/logo.png" alt="BingeQuiz Logo" />
          <span>BingeQuiz</span>
        </div>
        <div className="auth-button">
          <a href="/login" className="btn">Get Started</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Movie Quiz Challenge</h1>
          <p>Test your cinema knowledge with exciting trivia from blockbuster hits to indie gems!</p>
          <a href="/login" className="cta-button">Start Quiz Now</a>
        </div>
        
        <div className="stats">
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Questions</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">25+</span>
            <span className="stat-label">Movies</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Players</span>
          </div>
        </div>
      </section>

      {/* Featured Movie Posters */}
      <section className="movie-section">
        <h2>Featured Movies</h2>
        <div className="movie-posters">
          <img src="/movie1.webp" alt="Inception" title="Inception - Mind-bending thriller" />
          <img src="/movie2.jpeg" alt="Joker" title="Joker - Psychological masterpiece" />
          <img src="/movie3.jpg" alt="Avatar" title="Avatar - Epic sci-fi adventure" />
          <img src="/movie4.webp" alt="Venom" title="Venom - Symbiotic action" />
          <img src="/movie5.jpg" alt="Interstellar" title="Interstellar - Space odyssey" />
          <img src="/movie6.jpg" alt="Beast" title="Beast - Action thriller" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose BingeQuiz?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h3>Test Your Knowledge</h3>
            <p>Challenge yourself with questions from your favorite movies across all genres and decades.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h3>Compete & Win</h3>
            <p>Climb the leaderboards and prove you're the ultimate movie buff among your friends.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h3>Discover New Films</h3>
            <p>Learn about movies you've never seen and expand your cinematic horizons.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
