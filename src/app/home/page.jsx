'use client';
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import "./home.css";

export default function HomePage() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState("easy");

  const router = useRouter();

  const handleStartQuiz = () => {
    if (!selectedMovie) {
      alert("🍿 Please select a movie first!");
      return;
    }
    router.push(`/questions?movie=${selectedMovie}&numQuestions=${numQuestions}&difficulty=${difficulty}`);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <h1>BingeQuiz</h1>
          </div>
          <div className="user-actions">
            <Link href="/login" className="back-button">← Back</Link>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <h1>Movie Quiz Challenge</h1>
          <p>Test your cinema knowledge with our extensive collection of movie trivia from blockbusters to classics</p>
        </section>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">25+</span>
            <span className="stat-label">Movies</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">500+</span>
            <span className="stat-label">Questions</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">3</span>
            <span className="stat-label">Difficulty Levels</span>
          </div>
        </div>

        {/* Action Movies */}
        <section className="category-section">
          <div className="category-header">
            <h2 className="category-title">Action Blockbusters</h2>
            <p className="category-description">High-octane adventures with explosive action sequences and heroic protagonists</p>
          </div>
          <div className="movie-grid">
            <div className={`movie-card ${selectedMovie === "venom" ? "selected" : ""}`} onClick={() => setSelectedMovie("venom")}>
              <img src="/movie4.webp" alt="Venom" className="movie-poster" />
              <div className="movie-info">
                <h3 className="movie-title">Venom</h3>
                <p className="movie-year">2018</p>
                <p className="movie-genre">Superhero • Action</p>
              </div>
            </div>
            <div className={`movie-card ${selectedMovie === "beast" ? "selected" : ""}`} onClick={() => setSelectedMovie("beast")}>
              <img src="/movie6.jpg" alt="Beast" className="movie-poster" />
              <div className="movie-info">
                <h3 className="movie-title">Beast</h3>
                <p className="movie-year">2022</p>
                <p className="movie-genre">Action • Thriller</p>
              </div>
            </div>
            <div className={`movie-card ${selectedMovie === "blackwidow" ? "selected" : ""}`} onClick={() => setSelectedMovie("blackwidow")}>
              <img src="/movie7.jpg" alt="Black Widow" className="movie-poster" />
              <div className="movie-info">
                <h3 className="movie-title">Black Widow</h3>
                <p className="movie-year">2021</p>
                <p className="movie-genre">Marvel • Action</p>
              </div>
            </div>
            <div className={`movie-card ${selectedMovie === "wanted" ? "selected" : ""}`} onClick={() => setSelectedMovie("wanted")}>
              <img src="/movie10.jpeg" alt="Wanted" className="movie-poster" />
              <div className="movie-info">
                <h3 className="movie-title">Wanted</h3>
                <p className="movie-year">2008</p>
                <p className="movie-genre">Action • Crime</p>
              </div>
            </div>
            <div className={`movie-card ${selectedMovie === "rambo" ? "selected" : ""}`} onClick={() => setSelectedMovie("rambo")}>
              <img src="/movie14.jpeg" alt="Rambo" className="movie-poster" />
              <div className="movie-info">
                <h3 className="movie-title">Rambo</h3>
                <p className="movie-year">2008</p>
                <p className="movie-genre">Action • War</p>
              </div>
            </div>
          </div>
        </section>

        {/* Thriller Movies */}
        <section className="category-section">
          <div className="category-header">
            <h2 className="category-title">Mind-Bending Thrillers</h2>
            <p className="category-description">Psychological masterpieces that will twist your mind and challenge your perception</p>
          </div>
          <div className="movie-grid">
            <div className={`movie-card ${selectedMovie === "inception" ? "selected" : ""}`} onClick={() => setSelectedMovie("inception")}>
              <img src="/movie1.webp" alt="Inception" className="movie-poster" />
              <div className="movie-info">
                <h3 className="movie-title">Inception</h3>
                <p className="movie-year">2010</p>
                <p className="movie-genre">Sci-Fi • Thriller</p>
              </div>
            </div>
            <div className={`movie-card ${selectedMovie === "joker" ? "selected" : ""}`} onClick={() => setSelectedMovie("joker")}>
              <img src="/movie2.jpeg" alt="Joker" className="movie-poster" />
              <div className="movie-info">
                <h3 className="movie-title">Joker</h3>
                <p className="movie-year">2019</p>
                <p className="movie-genre">Drama • Thriller</p>
              </div>
            </div>
            <div className={`movie-card ${selectedMovie === "shutterisland" ? "selected" : ""}`} onClick={() => setSelectedMovie("shutterisland")}>
              <img src="/movie11.jpeg" alt="Shutter Island" className="movie-poster" />
              <div className="movie-info">
                <h3 className="movie-title">Shutter Island</h3>
                <p className="movie-year">2010</p>
                <p className="movie-genre">Mystery • Thriller</p>
              </div>
            </div>
            <div className={`movie-card ${selectedMovie === "zodiac" ? "selected" : ""}`} onClick={() => setSelectedMovie("zodiac")}>
              <img src="/movie18.jpeg" alt="Zodiac" className="movie-poster" />
              <div className="movie-info">
                <h3 className="movie-title">Zodiac</h3>
                <p className="movie-year">2007</p>
                <p className="movie-genre">Crime • Mystery</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sci-Fi Movies */}
        <section className="category-section">
          <div className="category-header">
            <h2 className="category-title">Sci-Fi & Adventure</h2>
            <p className="category-description">Epic space adventures and futuristic tales that transcend time and dimensions</p>
          </div>
          <div className="movie-grid">
            <div className={`movie-card ${selectedMovie === "avatar" ? "selected" : ""}`} onClick={() => setSelectedMovie("avatar")}>
              <img src="/movie3.jpg" alt="Avatar" className="movie-poster" />
              <div className="movie-info">
                <h3 className="movie-title">Avatar</h3>
                <p className="movie-year">2009</p>
                <p className="movie-genre">Sci-Fi • Adventure</p>
              </div>
            </div>
            <div className={`movie-card ${selectedMovie === "interstellar" ? "selected" : ""}`} onClick={() => setSelectedMovie("interstellar")}>
              <img src="/movie5.jpg" alt="Interstellar" className="movie-poster" />
              <div className="movie-info">
                <h3 className="movie-title">Interstellar</h3>
                <p className="movie-year">2014</p>
                <p className="movie-genre">Sci-Fi • Drama</p>
              </div>
            </div>
            <div className={`movie-card ${selectedMovie === "passengers" ? "selected" : ""}`} onClick={() => setSelectedMovie("passengers")}>
              <img src="/movie16.jpeg" alt="Passengers" className="movie-poster" />
              <div className="movie-info">
                <h3 className="movie-title">Passengers</h3>
                <p className="movie-year">2016</p>
                <p className="movie-genre">Sci-Fi • Romance</p>
              </div>
            </div>
          </div>
        </section>

        {/* Indian Cinema */}
        <section className="category-section">
          <div className="category-header">
            <h2 className="category-title">Indian Cinema</h2>
            <p className="category-description">Bollywood and regional masterpieces that touched millions of hearts</p>
          </div>
          <div className="movie-grid">
            <div className={`movie-card ${selectedMovie === "raazi" ? "selected" : ""}`} onClick={() => setSelectedMovie("raazi")}>
              <img src="/raazi.jpeg" alt="Raazi" className="movie-poster" />
              <div className="movie-info">
                <h3 className="movie-title">Raazi</h3>
                <p className="movie-year">2018</p>
                <p className="movie-genre">Drama • Thriller</p>
              </div>
            </div>
            <div className={`movie-card ${selectedMovie === "3idiots" ? "selected" : ""}`} onClick={() => setSelectedMovie("3idiots")}>
              <img src="/3idiots.jpeg" alt="3 Idiots" className="movie-poster" />
              <div className="movie-info">
                <h3 className="movie-title">3 Idiots</h3>
                <p className="movie-year">2009</p>
                <p className="movie-genre">Comedy • Drama</p>
              </div>
            </div>
            <div className={`movie-card ${selectedMovie === "bhaagmilkhabhaag" ? "selected" : ""}`} onClick={() => setSelectedMovie("bhaagmilkhabhaag")}>
              <img src="/bhaagmilkhabhaag.jpeg" alt="Bhaag Milkha Bhaag" className="movie-poster" />
              <div className="movie-info">
                <h3 className="movie-title">Bhaag Milkha Bhaag</h3>
                <p className="movie-year">2013</p>
                <p className="movie-genre">Biography • Drama</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Configuration */}
        <section className="quiz-config">
          <h2 className="config-title">Quiz Configuration</h2>
          
          {selectedMovie && (
            <div className="selected-movie">
              <h3>Selected: {selectedMovie.charAt(0).toUpperCase() + selectedMovie.slice(1)}</h3>
              <p>Ready to test your knowledge about this amazing movie!</p>
            </div>
          )}

          <div className="config-options">
            <div className="config-group">
              <label className="config-label">Number of Questions</label>
              <input
                className="config-input"
                type="number"
                value={numQuestions}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value < 1) {
                    setNumQuestions(1);
                  } else if (value > 10) {
                    alert("Maximum 10 questions allowed.");
                    setNumQuestions(10);
                  } else {
                    setNumQuestions(value);
                  }
                }}
                min="1"
                max="10"
              />
            </div>

            <div className="config-group">
              <label className="config-label">Difficulty Level</label>
              <select
                className="config-select"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <button 
            className="start-button" 
            onClick={handleStartQuiz}
            disabled={!selectedMovie}
          >
Start Quiz Challenge
          </button>
        </section>
      </main>
    </div>
  );
}