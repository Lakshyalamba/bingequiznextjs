'use client';
import "./landingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-container">
      <div className="overlay" />

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src="/logo.png" alt="logo" />
          <span>BingeQuiz</span>
        </div>
        <div className="auth-button">
          <a href="/login" className="btn">Login / SignUp</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>🎥 Movie Quiz Challenge</h1>
          <p>"Test your cinema brainpower with fun & thrilling questions from your favorite films!"</p>
        </div>
      </section>

      {/* Featured Movie Posters */}
      <section className="movie-section">
        <h2>Most Popular Movies</h2>
        <div className="movie-posters">
          <img src="/movie1.webp" alt="Inception" title="Inception" />
          <img src="/movie2.jpeg" alt="Joker" title="Joker" />
          <img src="/movie3.jpg" alt="Avatar" title="Avatar" />
          <img src="/movie4.webp" alt="Venom" title="Venom" />
          <img src="/movie5.jpg" alt="Interstellar" title="Interstellar" />
          <img src="/movie6.jpg" alt="Beast" title="Beast" />
          <img src="/movie7.jpg" alt="Black Widow" title="Black Widow" />
        </div>
      </section>
    </div>
  );
}
