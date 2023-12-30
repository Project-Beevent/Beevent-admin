import React, { Fragment } from 'react'
import RequestForm from '../components/requests/RequestForm'

export default function AddRequest() {
  return (
    <div className='m-auto w-4/5 pt-12' >
      <h1 className="text-4xl text-primary mb-4">Add New Request</h1>
      <RequestForm></RequestForm>
    </div>
  )
}
