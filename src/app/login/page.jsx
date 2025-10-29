'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import "./login.css";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/home");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created! You can now log in.");
        setIsLogin(true);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const toggleMode = () => setIsLogin(!isLogin);

  return (
    <div className="login-container">
      <Link href="/" className="back-button">← Back to Home</Link>

      <div className="form-box">
        <div className="form-icon"></div>
        <h2>{isLogin ? "Welcome Back!" : "Join BingeQuiz"}</h2>
        <p className="subtitle">
          {isLogin 
            ? "Ready to test your movie knowledge? Sign in to continue your cinematic journey!"
            : "Create your account and dive into the ultimate movie trivia experience!"}
        </p>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <input type="text" placeholder="Username" required />
            </div>
          )}
          <div className="input-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>
        {!isLogin && (
          <div className="benefits">
            <h4>✨ What You'll Get:</h4>
            <div className="benefit-item">
              <span></span>
              <span>Access to 500+ movie trivia questions</span>
            </div>
            <div className="benefit-item">
              <span></span>
              <span>Track your quiz scores and progress</span>
            </div>
            <div className="benefit-item">
              <span></span>
              <span>Compete with friends on leaderboards</span>
            </div>
            <div className="benefit-item">
              <span></span>
              <span>Discover new movies and genres</span>
            </div>
          </div>
        )}
        
        <div className="toggle-text">
          {isLogin ? "New to BingeQuiz?" : "Already have an account?"}{" "}
          <span className="toggle-link" onClick={toggleMode}>
            {isLogin ? "Create Account" : "Login Here"}
          </span>
        </div>
      </div>
    </div>
  );
}
