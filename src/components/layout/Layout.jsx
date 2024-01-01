import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
    <main className='grid grid-cols-12 h-[100vh]'>
        <div className='shadow-xl xl:col-span-2 sm:col-span-2 
        xl:p-8 sm:p-4
        xl:flex xl:justify-center xl:items-center
        sm:flex sm:justify-center sm:items-center'>
        <Sidebar />
        </div>
        <div className='xl:col-span-10 sm:col-span-10'>
        <h1 className="text-red-600 text-5xl ml-12 mt-12 xs:block xl:hidden">KanVer</h1>
        <Outlet />
        </div>
    </main>


    </>
  );
}