'use client';
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./home.css";

export default function HomePage() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState("easy");

  const router = useRouter();

  const handleStartQuiz = () => {
    if (!selectedMovie) {
      alert("Please select a movie first.");
      return;
    }
    router.push(`/questions?movie=${encodeURIComponent(selectedMovie)}&numQuestions=${numQuestions}&difficulty=${difficulty}`);
  };

  return (
    <div className="home-container">
      <Link href="/login" className="back-button">Back to Login</Link>

      <div className="quiz-container">
        <h1>Hey User, welcome to your Quiz Dashboard!</h1>

        <div className="movie-section">
          <h3>Action Movies</h3>
          <div className="movie-posters">
            <img src="/movie4.webp" alt="Venom" onClick={() => setSelectedMovie("venom")} className={selectedMovie === "venom" ? "selected" : ""} />
            <img src="/movie6.jpg" alt="Beast" onClick={() => setSelectedMovie("beast")} className={selectedMovie === "beast" ? "selected" : ""} />
            <img src="/movie7.jpg" alt="Black Widow" onClick={() => setSelectedMovie("blackwidow")} className={selectedMovie === "blackwidow" ? "selected" : ""} />
          </div>

          <h3>Thriller Movies</h3>
          <div className="movie-posters">
            <img src="/movie1.webp" alt="Inception" onClick={() => setSelectedMovie("inception")} className={selectedMovie === "inception" ? "selected" : ""} />
            <img src="/movie2.jpeg" alt="Joker" onClick={() => setSelectedMovie("joker")} className={selectedMovie === "joker" ? "selected" : ""} />
          </div>

          <h3>Romantic & Sci-Fi</h3>
          <div className="movie-posters">
            <img src="/movie3.jpg" alt="Avatar" onClick={() => setSelectedMovie("avatar")} className={selectedMovie === "avatar" ? "selected" : ""} />
            <img src="/movie5.jpg" alt="Interstellar" onClick={() => setSelectedMovie("interstellar")} className={selectedMovie === "interstellar" ? "selected" : ""} />
          </div>

          <h3>AirtelXtreme Specials</h3>
          <div className="movie-posters">
            <img src="/movie6.jpg" alt="Beast" onClick={() => setSelectedMovie("beast")} className={selectedMovie === "beast" ? "selected" : ""} />
          </div>
        </div>

        <div className="quiz-options">
          <div className="quiz-option">
            <label>Number of Questions:</label>
            <input
              type="number"
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
              min="1"
              max="15"
            />
          </div>

          <div className="quiz-option">
            <label>Difficulty:</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <button onClick={handleStartQuiz} className="start-quiz-btn">Start Quiz</button>
        </div>
      </div>
    </div>
  );
}
