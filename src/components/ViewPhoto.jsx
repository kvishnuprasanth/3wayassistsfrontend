import React from 'react';

const ViewPhoto = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-6">Issue</h2>
        <div className="mb-4">
         
          <div className="border border-gray-300 rounded h-80 mb-4">
            
            <div className="bg-gray-200 h-full w-full flex items-center justify-center text-gray-500 text-lg">
              Photo Placeholder
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button
            className="bg-purple-500 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-purple-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPhoto;

