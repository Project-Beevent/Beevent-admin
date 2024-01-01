import React from 'react'
import RequestForm from '../components/requests/RequestForm'

export default function EditRequest() {
  return (
    <div className='m-auto w-4/5 pt-12' >
      <h1 className="text-4xl text-primary mb-4">Edit Request</h1>
      <RequestForm></RequestForm>
    </div>
  )
}
