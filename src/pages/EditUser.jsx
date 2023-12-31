import React from 'react'
import UserForm from '../components/users/UserForm'

export default function EditUser() {
  return (
    <div className='m-auto w-4/5 pt-12' >
      <h1 className="text-4xl text-primary mb-4">Edit User</h1>
      <UserForm></UserForm>
    </div>
  )
}