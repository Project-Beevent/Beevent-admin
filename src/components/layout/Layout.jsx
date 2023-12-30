import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
    <main className='grid grid-cols-12 h-[100vh]'>
        <div className='col-span-2'>
        <Sidebar />
        </div>
        <div className='col-span-10'>
        <Outlet />
        </div>
    </main>


    </>
  );
}