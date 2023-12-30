import React, { useState } from "react";

export default function RequestFilter({setFilters}) {
  const [bloodType, setBloodType] = useState("");
  const [city, setCity] = useState("");

    const onClickHandler = (e) => {
        setFilters({city, bloodType});
    }

  return (
    <div className="mt-4 p-4 border rounded flex justify-start items-center gap-4">
      
        <input
          type="text"
          className="input input-bordered placeholder:text-black"
          placeholder="City"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <select
          name="bloodType"
          className="input input-bordered placeholder:text-black"
          placeholder="Blood Type"
          value={bloodType}
          onChange={(e) => setBloodType(e.target.value)}
        >
          <option value="">All</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <button className="btn btn-primary btn-outline" onClick={onClickHandler}>Filter</button>
      
    </div>
  );
}
