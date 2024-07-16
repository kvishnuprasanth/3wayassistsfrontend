import React, { Component, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUp =()=> {
    const navigate = useNavigate()
    const [cfmPassword,setcfmPassword] = useState("")

    
    const [data, setdata] = useState({
        fullName:"",
        email:"",
        contactNo:"",
        password:"",
    })
    const updatecfmPassword = (e) => {
        const {name , value} = e.target
        setcfmPassword(value)
    }
    const update = (e) => {
        const { name, value } = e.target;

        setdata({
          ...data,
          [name]: value
        });
    }
    const submit=async(e)=>{
        e.preventDefault()
        if(data.password === cfmPassword){
            await axios.post(`http://localhost:${process.env.PORT}/api/v1/register`, data)
            .then((response)=>{
                console.log(response)
                setdata({
                    fullName:"",
                    email:"",
                    contactNo:"",
                    password:"",
                    cfmPassword:"",
                    })
                    setcfmPassword("")
                    alert(response.data.message)
                    navigate("/Login")
            })
            
        } else {
            alert("need to provide same password")
            setdata({
                password:"",
                cfmPassword:"",
                })
            
        }
    }
    return (
      <div className='flex justify-center items-center h-full'>
        <form className='max-w-[400px] w-full mx-auto bg-white p-8' onSubmit={submit}>
            <h2 className='text-4xl font-bold text-center py-4'>3WayAssist</h2>
           
            <div className='flex flex-col mb-4 rounded-md'>
                <label>Full Name</label>
                <input className='border relative bg-gray-100 p-2' value={data.fullName} name="fullName" onChange={update} type="text" />
            </div>
        
            <div className='flex flex-col mb-4 rounded-md'>
                <label>Email</label>
                <input className='border relative bg-gray-100 p-2' value={data.email} name="email" onChange={update} type="email" />
            </div>
            <div className='flex flex-col mb-4 rounded-md'>
                <label>Contact Number</label>
                <input className='border relative bg-gray-100 p-2' value={data.contactNo} name="contactNo"  onChange={update} type="tel" />
            </div>
            <div className='flex flex-col mb-4 rounded-md'>
                <label>Password</label>
                <input className='border relative bg-gray-100 p-2 ' value={data.password} name="password" onChange={update} type="password" />
            </div>
            <div className='flex flex-col mb-4 rounded-md'>
                <label>Confirm Password</label>
                <input className='border relative bg-gray-100 p-2' value={cfmPassword} name="cfmPassword" onChange={updatecfmPassword} type="password" />
            </div>
            <button className='w-full py-3 mt-8 bg-purple-900 hover:bg-purple-600 relative text-white rounded-md ' type="submit" >Sign Up</button>
        </form>
    </div>
    )
  
}
export default SignUp