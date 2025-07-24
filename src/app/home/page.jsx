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
      {/* Back & Logout */}
      <Link href="/login" className="back-button">🔙 Back to Login</Link>
      <button onClick={handleLogout} className="logout-button">🚪 Logout</button>

      {/* Main Quiz Section */}
      <div className="quiz-container">
        <h1>🎬 Welcome to Your Movie Quiz Dashboard!</h1>
        <p className="quote">✨ *"Why so serious?" Dive into fun trivia and test your movie brain!* 🎥</p>

        <div className="movie-section">
          <h3>💥 Action Blockbusters</h3>
          <div className="movie-posters">
            <img src="/movie4.webp" alt="Venom" onClick={() => setSelectedMovie("venom")} className={selectedMovie === "venom" ? "selected" : ""} />
            <img src="/movie6.jpg" alt="Beast" onClick={() => setSelectedMovie("beast")} className={selectedMovie === "beast" ? "selected" : ""} />
            <img src="/movie7.jpg" alt="Black Widow" onClick={() => setSelectedMovie("blackwidow")} className={selectedMovie === "blackwidow" ? "selected" : ""} />
            <img src="/movie8.jpg" alt="Twisters" onClick={() => setSelectedMovie("twisters")} className={selectedMovie === "twisters" ? "selected" : ""} />
            <img src="/movie10.jpeg" alt="Wanted" onClick={() => setSelectedMovie("wanted")} className={selectedMovie === "wanted" ? "selected" : ""} />
            <img src="/movie13.jpeg" alt="Clash of the Titans" onClick={() => setSelectedMovie("clashofthetitans")} className={selectedMovie === "clashofthetitans" ? "selected" : ""} />
            <img src="/movie14.jpeg" alt="Rambo" onClick={() => setSelectedMovie("rambo")} className={selectedMovie === "rambo" ? "selected" : ""} />
          </div>

          <h3>🧠 Mind-Bending Thrillers</h3>
          <div className="movie-posters">
            <img src="/movie1.webp" alt="Inception" onClick={() => setSelectedMovie("inception")} className={selectedMovie === "inception" ? "selected" : ""} />
            <img src="/movie2.jpeg" alt="Joker" onClick={() => setSelectedMovie("joker")} className={selectedMovie === "joker" ? "selected" : ""} />
            <img src="/movie9.jpeg" alt="Watcher" onClick={() => setSelectedMovie("watcher")} className={selectedMovie === "watcher" ? "selected" : ""} />
            <img src="/movie11.jpeg" alt="Shutter Island" onClick={() => setSelectedMovie("shutterisland")} className={selectedMovie === "shutterisland" ? "selected" : ""} />
            <img src="/movie18.jpeg" alt="Zodiac" onClick={() => setSelectedMovie("zodiac")} className={selectedMovie === "zodiac" ? "selected" : ""} />
          </div>

          <h3>💞 Sci-Fi & Romance</h3>
          <div className="movie-posters">
            <img src="/movie3.jpg" alt="Avatar" onClick={() => setSelectedMovie("avatar")} className={selectedMovie === "avatar" ? "selected" : ""} />
            <img src="/movie5.jpg" alt="Interstellar" onClick={() => setSelectedMovie("interstellar")} className={selectedMovie === "interstellar" ? "selected" : ""} />
            <img src="/movie12.jpeg" alt="The Gorge" onClick={() => setSelectedMovie("thegorge")} className={selectedMovie === "thegorge" ? "selected" : ""} />
            <img src="/movie16.jpeg" alt="Passengers" onClick={() => setSelectedMovie("passengers")} className={selectedMovie === "passengers" ? "selected" : ""} />
            <img src="/movie17.jpeg" alt="The Fountain" onClick={() => setSelectedMovie("fountain")} className={selectedMovie === "fountain" ? "selected" : ""} />
          </div>

          <h3>📱 AirtelXtreme Picks</h3>
          <div className="movie-posters">
            <img src="/movie6.jpg" alt="Beast" onClick={() => setSelectedMovie("beast")} className={selectedMovie === "beast" ? "selected" : ""} />
            <img src="/lover.jpeg" alt="Lover" onClick={() => setSelectedMovie("lover")} className={selectedMovie === "lover" ? "selected" : ""} />
            <img src="/qismat.jpeg" alt="Qismat" onClick={() => setSelectedMovie("qismat")} className={selectedMovie === "qismat" ? "selected" : ""} />
            <img src="/raazi.jpeg" alt="Raazi" onClick={() => setSelectedMovie("raazi")} className={selectedMovie === "raazi" ? "selected" : ""} />
            <img src="/bhaagmilkhabhaag.jpeg" alt="Bhaag Milkha Bhaag" onClick={() => setSelectedMovie("bhaagmilkhabhaag")} className={selectedMovie === "bhaagmilkhabhaag" ? "selected" : ""} />
            <img src="/3idiots.jpeg" alt="3 Idiots" onClick={() => setSelectedMovie("3idiots")} className={selectedMovie === "3idiots" ? "selected" : ""} />
          </div>
        </div>

        <div className="quiz-options">
          <div className="quiz-option">
            <label>📝 Number of Questions:</label>
            <input
              type="number"
              value={numQuestions}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value < 1) {
                  setNumQuestions(1);
                } else if (value > 10) {
                  alert("⚠️ Maximum 10 questions allowed.");
                  setNumQuestions(10);
                } else {
                  setNumQuestions(value);
                }                
              }}
              min="1"
              max="10"
            />

          </div>

          <div className="quiz-option">
            <label>🎯 Difficulty:</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">😊 Easy</option>
              <option value="medium">😎 Medium</option>
              <option value="hard">🧠 Hard</option>
            </select>
          </div>
        </div>

        <button onClick={handleStartQuiz} className="start-quiz-btn">
          🚀 Let's Begin!
        </button>
      </div>
    </div>
  );
}