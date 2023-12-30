import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { FaRegNewspaper } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div className="p-8 shadow-xl h-full flex flex-col items-start justify-between">
      <h1 className="text-red-600 text-5xl">KanVer</h1>

      <ul className="mt-16 w-full">
        <Link to="/requests">
          <li
            className={`mt-4 p-2 text-xl hover:bg-red-200 hover:rounded-xl flex items-center gap-3 ${
              pathname === "/requests" && "bg-red-600 text-white rounded-xl"
            }`}
          >
            <FaUser /> Requests
          </li>
        </Link>
        <Link to="/users">
          <li
            className={`mt-4 p-2 text-xl hover:bg-red-200 hover:rounded-xl flex items-center gap-3 ${
              pathname === "/users" && "bg-red-600 text-white rounded-xl"
            }`}
          >
            <FaRegNewspaper /> Users
          </li>
        </Link>
      </ul>

      <div>
        <p className="mb-2">Logged as <b>Admin</b></p>
<button className="flex items-center gap-3 text-xl "><MdLogout /> Logout</button>

      </div>
    </div>
  );
}
