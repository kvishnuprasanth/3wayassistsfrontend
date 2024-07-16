import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { frontendurl } from '../../url';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Ticket() {
  const [array, setArray] = useState([]);
  const [form, setForm] = useState({
    contactNo: '',
    flatNo: '',
    buildingName: '',
    street: '',
    city: '',
    postalCode: '',
    issue: ''
  });
  const [id, setId] = useState(null);

  // Load id from session storage when component mounts
  useEffect(() => {
    const sessionId = localStorage.getItem('id');
    if (sessionId) {
      setId(sessionId);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const afterSubmission = async (e) => {
    e.preventDefault();
    const isFormIncomplete = Object.values(form).some(value => value.trim() === '');
    if (isFormIncomplete) {
      toast.error("Please fill all the fields.");
    } else if (id) {
      try {
        await axios.post(`${frontendurl}/api/allList/addTickets`, { ...form, id });
        setArray([...array, form]);
        setForm({
          contactNo: '',
          flatNo: '',
          buildingName: '',
          street: '',
          city: '',
          postalCode: '',
          issue: '',
        });
        toast.success("Your ticket has been added.");
      } catch (error) {
        toast.error("There was an error submitting your ticket.");
      }
    } else {
      toast.error("Please login to raise a ticket.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className='flex justify-center items-center h-full'>
        <form className='max-w-[1000px] w-full mx-auto bg-white p-8'>
          <h2 className='text-4xl font-bold text-center py-4'>3WayAssist</h2>
          <div className='flex flex-col mb-4'>
            <label>Contact No.</label>
            <input className='border relative bg-gray-100 p-2' name="contactNo" value={form.contactNo} onChange={handleChange} type="tel" required />
          </div>
          <div className='flex flex-col mb-4'>
            <label>Building Name</label>
            <input className='border relative bg-gray-100 p-2' name="buildingName" value={form.buildingName} onChange={handleChange} type="text" required />
          </div>
          <div className='flex flex-col mb-4'>
            <label>Flat Number</label>
            <input className='border relative bg-gray-100 p-2' name="flatNo" value={form.flatNo} onChange={handleChange} type="text" required />
          </div>
          <div className='flex flex-col mb-4'>
            <label>Street</label>
            <input className='border relative bg-gray-100 p-2' name="street" value={form.street} onChange={handleChange} type="text" required />
          </div>
          <div className='flex flex-col mb-4'>
            <label>City</label>
            <input className='border relative bg-gray-100 p-2' name="city" value={form.city} onChange={handleChange} type="text" required />
          </div>
          <div className='flex flex-col mb-4'>
            <label>Postal Code</label>
            <input className='border relative bg-gray-100 p-2' name="postalCode" value={form.postalCode} onChange={handleChange} type="text" required />
          </div>
          <div className='flex flex-col mb-4'>
            <label>Issue</label>
            <textarea className='border relative bg-gray-100 p-2' name="issue" value={form.issue} onChange={handleChange} rows="5" required></textarea>
          </div>
          <button className='w-full py-3 mt-8 bg-purple-800 hover:bg-purple-600 relative text-white' onClick={afterSubmission}>Proceed</button>
        </form>
      </div>
    </>
  );
}
