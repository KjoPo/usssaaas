import React, { useState, useEffect } from 'react';
import './CaptchaGate.css';
const CaptchaGate = ({ onVerified }) => {
  const [captcha, setCaptcha] = useState({ question: '', answer: '' });
  const [userAnswer, setUserAnswer] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const generateCaptcha = () => {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    const num1 =
      operation === '+' ? Math.floor(Math.random() * 10) + 1 :
      operation === '-' ? Math.floor(Math.random() * 10) + 6 :
      Math.floor(Math.random() * 5) + 1;
    const num2 =
      operation === '*' ? Math.floor(Math.random() * 5) + 1 :
      operation === '-' ? Math.floor(Math.random() * 5) + 1 :
      Math.floor(Math.random() * 10) + 1;
    const answer =
      operation === '+' ? num1 + num2 :
      operation === '-' ? num1 - num2 :
      num1 * num2;

    setCaptcha({ question: `${num1} ${operation} ${num2}`, answer: answer.toString() });
    setUserAnswer('');
    // Removed setError('') so that error message remains visible when answer is wrong.
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!userAnswer.trim()) {
      setError('Please enter the CAPTCHA answer.');
      setLoading(false);
      return;
    }

    // Simulate verification delay
    setTimeout(() => {
      if (userAnswer.trim() === captcha.answer) {
        sessionStorage.setItem('captchaVerified', 'true');
        onVerified();
      } else {
        setError('Captcha answer is wrong. Please try again.');
        generateCaptcha();
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="captcha-gate-container">
      <header className="usps-header">
        {/* <img src="/usps-logo.png" alt="USPS Logo" className="usps-logo" /> */}
        <h1>USPS Verification</h1>
      </header>
      
      <main className="captcha-gate-main">
        <form onSubmit={handleSubmit} className="captcha-form">
          <h2>Human Verification Required</h2>
          <p>Please solve this CAPTCHA to continue:</p>
          
          <div className={`captcha-display ${error ? 'captcha-error-shake' : ''}`}>
            <label>CAPTCHA: {captcha.question} = ?</label>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => {
                setUserAnswer(e.target.value);
                if(error) setError('');
              }}
              required
              placeholder="Enter answer"
              disabled={loading}
              className={`captcha-input ${error ? 'input-error' : ''}`}
            />
          </div>
          
          {error && (
            <div className="captcha-error-message error-show">
              {error}
            </div>
          )}
          
          <div className="captcha-footer">
            <button 
              type="button" 
              onClick={generateCaptcha}
              className="captcha-refresh"
              disabled={loading}
            >
              ↻ New CAPTCHA
            </button>
            
            <button 
              type="submit" 
              disabled={loading} 
              className="captcha-submit"
            >
              {loading ? (
                <>
                  <span className="captcha-spinner"></span> Verifying...
                </>
              ) : 'Continue'}
            </button>
          </div>
        </form>
      </main>
      
      <footer className="captcha-footer">
        <p>© {new Date().getFullYear()} United States Postal Service. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CaptchaGate;


