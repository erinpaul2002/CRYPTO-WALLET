import React, { useState } from 'react';
import { supabase } from '../config/supabaseClient'; // Import your Supabase client
import '../styles/signup.css'
const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNumber: '',
    address: '',
    country: '',
    state: '',
    pincode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from('user').insert([
        {
          userid: 'sample-uuid-generated-on-the-client-side',
          firstname: formData.firstName,
          lastname: formData.lastName,
          dateofbirth: formData.dateOfBirth,
          phoneno: formData.phoneNumber,
          address: formData.address,
          country: formData.country,
          state: formData.state,
          pincode: formData.pincode,
        },
      ]);
      if (error) {
        throw error;
      }
      console.log('User data inserted:', data);
      // Clear the form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        phoneNumber: '',
        address: '',
        country: '',
        state: '',
        pincode: '',
      });
    } catch (error) {
      console.error('Error inserting user data:', error.message);
    }
  };
  

  return (
    <div>
      <h2>Signup</h2>
      <form className="signup-form"onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dateofbirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneno"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </label>
        <label>
          State:
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </label>
        <label>
          Pincode:
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;

