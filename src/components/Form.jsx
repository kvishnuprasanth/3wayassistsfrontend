import React, { useState } from 'react'


const Form = ({CreateTicket}) => {
    const [value, setValue] = useState('')
    const handleSubmit = e => {
        e.preventDefault()
        CreateTicket(value);
        setValue('')
    }
  return (
    <div className='bg-grey-400'>
    <form className='bg-grey mb-4 font-primary w-full' onSubmit ={handleSubmit}>
        <input type="text" className='outline-none bg-transparent
        border border-black p-4 w-[300px] text-white mb-8 
        rounded placeholder:text-grey hover:scale-110 transition duration-300
        ' placeholder='Raise a ticket'
        onChange={(e) => setValue(e.target.value)} value={value}/>
      
        <button className='bg-purple-600 border-none p-2
        text-white cursor-pointer rounded ml-2 hover:scale-110 transition duration-300'>Add Ticket
     
        </button>
    </form>
    </div>
  )
}

export default Form