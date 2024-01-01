import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { FaRegNewspaper } from "react-icons/fa6";
import { FaHospital } from "react-icons/fa";
import { MdGpsFixed } from "react-icons/md";
import { MdLogout } from "react-icons/md";

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div className=" h-full flex flex-col items-start justify-between">
      <h1 className="text-red-600 text-5xl sm:hidden xl:block">KanVer</h1>

      <ul className="mt-16 w-full">
        <Link to="/requests">
          <li
            className={`mt-4 p-2 text-xl hover:bg-red-200 hover:rounded-xl flex items-center gap-3 ${
              pathname === "/requests" && "bg-red-600 text-white rounded-xl"
            }`}
          >
            {/* <FaUser /> Requests */}
            <span className="sm:block sm:text-2xl ">
              {" "}
              <FaUser />
            </span>
            <span className="sm:hidden xl:block">Requests</span>
          </li>
        </Link>
        <Link to="/users">
          <li
            className={`mt-4 p-2 text-xl hover:bg-red-200 hover:rounded-xl flex items-center gap-3 ${
              pathname === "/users" && "bg-red-600 text-white rounded-xl"
            }`}
          >
            {/* <FaRegNewspaper /> Users */}
            <span className="sm:block sm:text-2xl ">
              {" "}
              <FaRegNewspaper />
            </span>
            <span className="sm:hidden xl:block">Users</span>
          </li>
        </Link>
        <Link to="/locations">
          <li
            className={`mt-4 p-2 text-xl hover:bg-red-200 hover:rounded-xl flex items-center gap-3 ${
              pathname === "/locations" && "bg-red-600 text-white rounded-xl"
            }`}
          >
            {/* <MdGpsFixed /> Locations */}
            <span className="sm:block sm:text-2xl ">
              {" "}
              <MdGpsFixed />
            </span>
            <span className="sm:hidden xl:block">Locations</span>
          </li>
        </Link>
        <Link to="/hospitals">
          <li
            className={`mt-4 p-2 text-xl hover:bg-red-200 hover:rounded-xl flex items-center gap-3  ${
              pathname === "/hospitals" && "bg-red-600 text-white rounded-xl"
            }`}
          >
            <span className="sm:block sm:text-2xl ">
              {" "}
              <FaHospital />
            </span>
            <span className="sm:hidden xl:block">Hospitals</span>
          </li>
        </Link>
      </ul>

      <div>
        <p className="mb-2 sm:hidden xl:block">
          Logged as <b>Admin</b>
        </p>
        <button className="flex items-center gap-3 text-xl sm:">
          {/* <MdLogout /> Logout */}
          <span className="sm:block sm:text-2xl ">
              {" "}
              <MdLogout />
            </span>
            <span className="sm:hidden xl:block">Logout</span>
        </button>
      </div>
    </div>
  );
}
