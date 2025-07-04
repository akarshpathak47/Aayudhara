// Register.js
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
    const res = await fetch(`http://localhost:5000/api/donor/search`);
    const donors = await res.json();
    return donors.some(
      d => d.email === formData.email || d.phone === formData.phone
    );
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

    const res = await fetch('http://localhost:5000/api/donor/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('Request submitted successfully!');
    } else {
      alert('Failed to submit request.');
    }
  };

  const sendEmailOTP = async () => {
    if (!formData.email) return alert('Please enter your email first');

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
      <h2>Request Donation</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <div className="verify-btn-wrapper">
          {!emailVerified && !otpSent && (
            <button type="button" className="verify-button" onClick={sendEmailOTP}>Verify</button>
          )}
          {emailVerified && <span style={{ color: 'green', marginLeft: '10px' }}>✅</span>}
        </div>

        {otpSent && !emailVerified && (
          <div className="otp-entry">
            <input
              type="text"
              placeholder="Enter OTP"
              value={emailOTP}
              onChange={(e) => setEmailOTP(e.target.value)}
            />
            <button type="button" onClick={verifyEmailOTP}>Verify OTP</button>
            <button type="button" onClick={sendEmailOTP} style={{ backgroundColor: '#ffc107', marginTop: '8px' }}>
              Resend OTP
            </button>
          </div>
        )}

        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          maxLength={10}
          placeholder="10-digit phone"
        />

        <label>City</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} required />

        <label>Address</label>
        <textarea name="address" value={formData.address} onChange={handleChange} required />

        <div className="gender-wrapper">
          <label>Gender</label>
          <div className="gender-group">
            <label><input type="radio" name="gender" value="male" onChange={handleChange} required /> Male</label>
            <label><input type="radio" name="gender" value="female" onChange={handleChange} required /> Female</label>
            <label><input type="radio" name="gender" value="other" onChange={handleChange} required /> Other</label>
          </div>
        </div>

        <label>Blood Group</label>
        <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="A+">A+</option><option value="A-">A-</option>
          <option value="B+">B+</option><option value="B-">B-</option>
          <option value="O+">O+</option><option value="O-">O-</option>
          <option value="AB+">AB+</option><option value="AB-">AB-</option>
        </select>

        <label>Age</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} required min="18" />

        <button type="submit" className="submit-button">Request Donation</button>
      </form>
    </div>
  );
};

export default Register;