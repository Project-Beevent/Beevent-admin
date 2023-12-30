import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { Fragment } from "react";
import { Link, Navigate } from "react-router-dom";
import { apiUrl } from "../data/url";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import UsersTable from "../components/users/UsersTable";

export default function AllUsers() {

  const { isLoading, error, data:users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const result  = await axios.get(`${apiUrl}/users`);
      console.log(result);
      return result.data
    },
  });


  return (
    <div className="m-auto w-4/5 pt-12">
      <div className="flex justify-start items-center gap-4">
        <h1 className="text-4xl text-primary">Users</h1>
        <Link to="/users/new">
          <button className="btn btn-primary  btn-outline btn-sm">
            Add New User
          </button>
        </Link>
      </div>
      
      {isLoading && <LoadingSpinner />}
      {error && <Navigate to="/error" />}
      {users && <UsersTable users={users} />}
    </div>
  );
}
