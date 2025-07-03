import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterDonor.css';

const RegisterDonor = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: '',
    city: '',
    phone: '',
    dob: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Donor Registered:', formData);

    // TODO: Send data to backend or database

    navigate('/RegisterSuccess');
  };

  return (
    <div className="register-container">
      <h2>📝 Register as a Donor</h2>

      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          required
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        <input
          type="text"
          name="city"
          placeholder="Your City"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
};

export default RegisterDonor;
