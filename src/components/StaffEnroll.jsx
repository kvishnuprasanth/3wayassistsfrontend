import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { authActions } from '../store';
import {Typography , Button} from 'antd';
import { useNavigate } from 'react-router-dom';
import { frontendurl } from '../../url';

const StaffEnroll = () => {
  const navigate = useNavigate()
  const isadmin = useSelector((state) => state.isAdminLoggedIn);
  const [form, setForm] = useState({
    fullName: '',
    staffId: '',
    work: '',
    email: '',
    contactNo: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormIncomplete = Object.values(form).some(value => value.trim() === '');
    if (isFormIncomplete) {
      toast.error("Please fill all the fields.");
      return;
    }

    try {
      const response = await axios.post(`${frontendurl}/api/v3/staffregister`, form);
      toast.success(response.data.message);
      // Optionally, reset the form here
      setForm({
        fullName: '',
        staffId: '',
        work: '',
        email: '',
        contactNo: '',
      });
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
    {!isadmin && (
      <div style={{ padding: '16px' }}>
        <Typography.Paragraph style={{ marginBottom: '16px' }}>
          You need to login as an Admin to access this page. Click the button below to login as admin.
        </Typography.Paragraph>
        <Button
          style={{ marginBottom: '16px', backgroundColor: 'purple', color: 'white', border: 'none' }}
          onClick={() => navigate('/Adminlogin')}
        >
          Login as Admin
        </Button>
        <Typography.Paragraph>
          If you want to raise a ticket or want to explore about us, click the button below.
        </Typography.Paragraph>
        <Button
          style={{ backgroundColor: 'purple', color: 'white', border: 'none' }}
          onClick={() => navigate('/')}
        >
          Home
        </Button>
      </div>
    )}
    {isadmin && (<div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl mb-6">Enroll New Staff</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
           type='text'
            name='fullName'
            value={form.fullName} 
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Staff ID</label>
          <input
            name='staffId'
            type="text"
            value={form.staffId} 
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Designation</label>
          <input
            type="text"
            name='work'
            value={form.work} 
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            name='email'
            type="email"
            value={form.email} 
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contact Number</label>
          <input
            type="text"
            name='contactNo'
            value={form.contactNo} 
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-purple-500 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-purple-700"
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>) }
    </>
  );
};

export default StaffEnroll;
