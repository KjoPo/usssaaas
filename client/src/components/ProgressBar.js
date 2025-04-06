import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { id: 'address', label: 'Verify Address' },
    { id: 'payment', label: 'Payment Information' },
    { id: 'otp', label: 'OTP Verification' }
  ];

  return (
    <div className="progress-container">
      {steps.map((step, index) => {
        const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
        const isActive = step.id === currentStep;
        
        return (
          <React.Fragment key={step.id}>
            <div className="progress-step">
              <div className={`step-circle ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
                <span>{index + 1}</span>
              </div>
              <div className="step-label">{step.label}</div>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`progress-connector ${isCompleted ? 'completed' : ''}`}></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProgressBar;