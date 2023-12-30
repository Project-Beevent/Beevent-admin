import React from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaCircleInfo } from "react-icons/fa6";

export default function RequestsTable({ requests }) {


  return (
    <div className="overflow-x-auto overflow-y-auto h-[80vh]">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr className="text-xl">
            <th>Edit</th>
            <th>Delete</th>
            <th>Details</th>
            <th>Id</th>
            <th>Title</th>
            <th>Request Date</th>
            <th>Owner Name</th>
            <th>Owner Phone</th>
            <th>Blood Type</th>
            <th>Status</th>
            <th>City</th>
            <th>Hospital</th>
          </tr>
        </thead>
        <tbody>

          {requests.map((request) => (
            <tr key={request.id} className="text-xl">
              <td>
                <button>
                  <FaEdit />
                </button>
              </td>
              <td>
                <button>
                  <RiDeleteBin6Fill />
                </button>
              </td>
              <td>
                <button>
                  <FaCircleInfo />
                </button>
              </td>
              <td>{request.id}</td>
              <td>{request.title}</td>
              <td>{request.dateRequested}</td>
              <td>{request.user.fullName}</td>
              <td>{request.user.phone}</td>
              <td>{request.bloodType}</td>
              <td>{request.status}</td>
              <td>{request.hospital.location.city}</td>
              <td>{request.hospital.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
