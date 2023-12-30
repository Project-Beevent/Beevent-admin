import React from "react";

export default function HospitalsTable({ hospitals }) {
  return (
    <div className="overflow-x-auto overflow-y-auto h-[80vh]">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr className="text-xl">
            <th>Id</th>
            <th>Name</th>
            <th>Phone</th>
            <th>City</th>
            <th>Distinct</th>
            <th>Neighbourhood</th>
          </tr>
        </thead>
        <tbody>

          {hospitals.map((hospital) => (
            <tr key={hospital.id} className="text-xl">
              <td>{hospital.id}</td>
              <td>{hospital.name}</td>
              <td>{hospital.phone}</td>
              <td>{hospital.location.city}</td>
              <td>{hospital.location.district}</td>
              <td>{hospital.location.mahalle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
