import React, { useState } from 'react';
import { frontendurl } from '../../url';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
function StaffLoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    staffId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${frontendurl}/api/v3/login`, form);
      toast.success(response.data.message);
      localStorage.setItem("staffLoginId", response.data.id);
      dispatch(authActions.staffLogin());
      navigate('/staff');
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className='flex justify-center items-center h-full'>
      <form className='max-w-[400px] w-full mx-auto bg-white p-8' onSubmit={handleSignIn}>
        <h2 className='text-4xl font-bold text-center py-4'>3WayAssist Staff</h2>
        <div className='flex flex-col mb-4'>
          <label>Email</label>
          <input
            className='border relative bg-gray-100 p-2 rounded-md'
            type="text"
            name='email'
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col'>
          <label>Staff ID</label>
          <input
            className='border relative bg-gray-100 p-2 rounded-md'
            type="password"
            name='staffId'
            value={form.staffId}
            onChange={handleChange}
          />
        </div>
        <button className='w-full py-3 mt-8 bg-purple-900 hover:bg-purple-600 relative text-white rounded-md' type="submit">
          Sign In
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default StaffLoginPage;
