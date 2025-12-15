import React from 'react';
import './Second.css';
import Video from './VideoComponent.js';
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

function Second() {
  const navigate = useNavigate();

  const handleDonorRegister = () => {
    navigate('/Register');
  };

  const handleReceiverRegister = () => {
    navigate('/DonorSearch');
  };

  return (
    <div className="wrapper">
      <Video />
      
      <div className="second">
        <h2 className="quote">
          EACH DROP OF BLOOD IS LIKE A BREATH FOR SOMEONE,
          <span>EVERY DROP COUNTS</span>
        </h2>

        <div className="quotesecond">
          <p className="text">
            Let's Move Forward To Take An <span>Initiative</span>
          </p>

          <div className="main-content">
            {/* Left Section - Donor Button */}
            <div className="left-section">
              <div className="button-section">
                <h3 className="button-label">Save Lives Today</h3>
                <p className="button-description">
                  Join thousands of heroes making a difference in their community
                </p>
                <button 
                  className="action-button donor" 
                  onClick={handleDonorRegister}
                >
                  <span>Become a Donor</span>
                  <GoArrowRight className="button-icon" />
                </button>
              </div>
            </div>

            {/* Center Section - Welcome Message */}
            <div className="center-section">
              <div className="welcome-container">
                <h1 className="welcome-title">Welcome to</h1>
                <h1 className="brand-name">Aayudhara</h1>
                <div className="welcome-subtitle">
                  <p>Connecting Hearts, Saving Lives</p>
                </div>
              </div>
            </div>

            {/* Right Section - Receiver Button */}
            <div className="right-section">
              <div className="button-section">
                <h3 className="button-label">Find Hope Here</h3>
                <p className="button-description">
                  Access life-saving blood when you need it most, quickly and safely
                </p>
                <button 
                  className="action-button receiver" 
                  onClick={handleReceiverRegister}
                >
                  <span>Find Blood</span>
                  <GoArrowRight className="button-icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Second;