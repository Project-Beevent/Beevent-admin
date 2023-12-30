import React from "react";

export default function LocationsTable({ locations }) {

  console.log("locations")
  console.log(locations)
  return (
    <div className="overflow-x-auto overflow-y-auto h-[80vh]">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr className="text-xl">
            <th>Id</th>
            <th>City</th>
            <th>Distinct</th>
            <th>Neighbourhood</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}

          {locations.map((location) => (
            <tr key={location.id} className="text-xl">
              <td>{location.id}</td>
              <td>{location.city}</td>
              <td>{location.district}</td>
              <td>{location.mahalle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
