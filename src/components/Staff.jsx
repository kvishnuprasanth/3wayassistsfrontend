import React from 'react'

const Staff = ({task,deleteTicket}) => {
  return (
    <div className='flex justify-between items-center bg-violet-700 text-white
    py-3 px-4 rounded-md cursor-pointer overflow-hidden '>
      <input className='rounded-md bg-black p-2 hover:scale-110 transition duration-300' type='file'/>
      <p className='font-primary whitespace-nowrap
      overflow-hidden overflow-ellipsis'>{task.task}</p>
      <div className='flex items-center gap-x-4'>
        <button className='bg-black p-2 rounded-md hover:scale-110 transition duration-300' onClick={()=>deleteTicket(task.id)} >Close the ticket</button>
        
      </div>

    </div>
  )
}

export default Staff