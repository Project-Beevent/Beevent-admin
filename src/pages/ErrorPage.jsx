import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg flex items-center justify-center flex-col gap-4" >
        <h1 className="text-4xl font-bold">Oops! Something went wrong.</h1>
        <p className="text-gray-600">We apologize, but it seems like there was an error.</p>
        <Link to="/requests">
            <button className='btn btn-primary' >Return To Main Page</button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;