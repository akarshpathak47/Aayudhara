import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    gender: '',
    bloodGroup: '',
    age: ''
  });

  const [emailVerified, setEmailVerified] = useState(false);
  const [emailOTP, setEmailOTP] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'email') {
      setEmailVerified(false);
      setOtpSent(false);
    }
  };

  const checkDuplicate = async () => {
    // NOTE: Simplified error handling for frontend example
    try {
        const res = await fetch(`http://localhost:5000/api/donor/search`);
        const donors = await res.json();
        return donors.some(
          d => d.email === formData.email || d.phone === formData.phone
        );
    } catch(error) {
        console.error("Error checking duplicates:", error);
        // Assuming no duplicate in case of a fetch error for simplicity
        return false; 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailVerified) return alert("Please verify your email first.");
    if (isNaN(formData.age) || +formData.age < 18) {
      return alert('Age must be 18 or older.');
    }
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      return alert('Phone must be exactly 10 digits.');
    }

    const isDuplicate = await checkDuplicate();
    if (isDuplicate) return alert('Email or phone already exists.');

    try {
        const res = await fetch('http://localhost:5000/api/donor/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
    
        if (res.ok) {
          alert('Donation request submitted successfully! Thank you.');
          // Optionally clear form
          setFormData({
            fullname: '', email: '', phone: '', city: '', address: '',
            gender: '', bloodGroup: '', age: ''
          });
          setEmailVerified(false);
          setEmailOTP('');
          setOtpSent(false);
        } else {
          alert('Failed to submit request.');
        }
    } catch (error) {
        console.error("Submission error:", error);
        alert('An unexpected error occurred during submission.');
    }
  };

  const sendEmailOTP = async () => {
    if (!formData.email) return alert('Please enter your email first');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return alert('Please enter a valid email address');

    try {
      const res = await fetch('http://localhost:5000/api/otp/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });

      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
        alert('OTP sent to your email.');
      } else {
        alert('Failed to send OTP');
      }
    } catch (err) {
      console.error(err);
      alert('Error sending OTP');
    }
  };

  const verifyEmailOTP = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/otp/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: emailOTP })
      });

      const data = await res.json();
      if (data.success) {
        setEmailVerified(true);
        setOtpSent(false);
        alert('Email verified successfully');
      } else {
        alert('Invalid OTP');
      }
    } catch (err) {
      console.error(err);
      alert('Error verifying OTP');
    }
  };

  return (
    <div className="form-container">
      <h2>❤️ Request Blood Donation</h2>
      <p className="form-tagline">Please fill out the form accurately to help us find a donor quickly.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input 
                type="text" 
                id="fullname" 
                name="fullname" 
                value={formData.fullname} 
                onChange={handleChange} 
                required 
                placeholder="e.g., Jane Doe"
            />
        </div>

        <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                placeholder="email@example.com"
                disabled={emailVerified} // Disable input after verification
            />

            <div className="email-verification-section">
              {emailVerified ? (
                <span className="verification-status success">
                  <span className="icon">✅</span> Email Verified
                </span>
              ) : (
                <>
                  {!otpSent ? (
                    <button type="button" className="action-button verify-button" onClick={sendEmailOTP} disabled={!formData.email}>
                      Send Verification Code
                    </button>
                  ) : (
                    <div className="otp-entry">
                        <input
                          type="text"
                          placeholder="Enter 6-digit OTP"
                          className="otp-input"
                          value={emailOTP}
                          onChange={(e) => setEmailOTP(e.target.value)}
                          maxLength={6}
                        />
                        <div className="otp-buttons">
                            <button type="button" className="action-button verify-otp-button" onClick={verifyEmailOTP} disabled={emailOTP.length !== 6}>
                              Verify OTP
                            </button>
                            <button type="button" className="action-button resend-otp-button" onClick={sendEmailOTP}>
                              Resend
                            </button>
                        </div>
                    </div>
                  )}
                </>
              )}
            </div>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            maxLength={10}
            placeholder="10-digit number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required placeholder="e.g., Mumbai" />
        </div>

        <div className="form-group">
          <label htmlFor="address">Full Address</label>
          <textarea id="address" name="address" value={formData.address} onChange={handleChange} required placeholder="Street, landmark, pincode" />
        </div>

        <div className="form-group gender-age-group">
          <div className="gender-wrapper">
            <label>Gender</label>
            <div className="gender-group">
              <label className="radio-label"><input type="radio" name="gender" value="male" onChange={handleChange} checked={formData.gender === 'male'} required /> Male</label>
              <label className="radio-label"><input type="radio" name="gender" value="female" onChange={handleChange} checked={formData.gender === 'female'} required /> Female</label>
              <label className="radio-label"><input type="radio" name="gender" value="other" onChange={handleChange} checked={formData.gender === 'other'} required /> Other</label>
            </div>
          </div>

          <div className="age-wrapper">
            <label htmlFor="age">Age</label>
            <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required min="18" placeholder="Must be 18+" />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="bloodGroup">Required Blood Group</label>
          <select id="bloodGroup" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option><option value="A-">A-</option>
            <option value="B+">B+</option><option value="B-">B-</option>
            <option value="O+">O+</option><option value="O-">O-</option>
            <option value="AB+">AB+</option><option value="AB-">AB-</option>
          </select>
        </div>

        <button type="submit" className="submit-button" disabled={!emailVerified}>
          Submit Donation Request
        </button>
      </form>
    </div>
  );
};

export default Register;