import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authActions } from '../store';
import { frontendurl } from '../../url';

function AdminLoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
 
    const [form, setForm] = useState({
        username: '',
        password: '',
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
            const response = await axios.post(`${frontendurl}/api/v4/login`, form);
            toast.success(response.data.message);
            localStorage.setItem("adminLoginId", response.data.id);
            dispatch(authActions.adminLogin());
            navigate('/Admin');
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className='flex justify-center items-center h-full'>
            <form className='max-w-[400px] w-full mx-auto bg-white p-8' onSubmit={handleSignIn}>
                <h2 className='text-4xl font-bold text-center py-4'>3WayAssist Admin</h2>
                <div className='flex flex-col mb-4'>
                    <label>Username</label>
                    <input className='border relative bg-gray-100 p-2 rounded-md'
                    name='username'
                    value={form.username}
                    onChange={handleChange}
                    type="text" />
                </div>
                
                <div className='flex flex-col'>
                    <label>Password</label>
                    <input className='border relative bg-gray-100 p-2 rounded-md' 
                    name='password'
                    value={form.password}
                    onChange={handleChange}
                    type="password" />
                </div>
                
                <button className='w-full py-3 mt-8 bg-purple-900 hover:bg-purple-600 relative text-white rounded-md' type="submit">
                    Sign In
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default AdminLoginPage;
