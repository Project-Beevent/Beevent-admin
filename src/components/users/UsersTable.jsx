import React from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function UsersTable({ users, deleteUser }) {
  return (
    <div className="overflow-x-auto overflow-y-auto h-[80vh]">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr className="text-xl">
            <th>Edit</th>
            <th>Delete</th>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone</th>
            <th>Blood Type</th>
            <th>Gender</th>
            <th>TC no</th>
            <th>Age</th>
            <th>Last Donation Date</th>
            <th>Donation Count</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-xl">
              <td>
                <Link to={`/users/edit/${user.id}`}>
                  <button>
                    <FaEdit />
                  </button>
                </Link>
              </td>
              <td>
                <button onClick={()=>{deleteUser(user.id)}}>
                  <RiDeleteBin6Fill />
                </button>
              </td>
              <td>{user.id}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.phone}</td>
              <td>{user.bloodType}</td>
              <td>{user.gender}</td>
              <td>{user.tcNo}</td>
              <td>{user.age}</td>
              <td>{user.lastDonationDate.reverse().join("-")}</td>
              <td>{user.donationCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
