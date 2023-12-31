import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { Fragment, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { apiUrl } from "../data/url";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import RequestsTable from "../components/requests/RequestsTable";
import RequestFilter from "../components/requests/RequestFilter";
import { toast } from "react-toastify";

const buildQuery = (filters) => {
  let query = "?";
  if (filters.city) {
    query += `city=${filters.city}&`;
  }
  if (filters.bloodType) {
    query += `bloodType=${filters.bloodType}`;
  }
  return query;
}

export default function AllRequests() {

  const [filters, setFilters] = useState({city: "", bloodType: ""});

  const queryClient = useQueryClient();

  const { isLoading, error, data:requests } = useQuery({
    queryKey: ["requests", filters],
    queryFn: async () => {
      const result  = await axios.get(`${apiUrl}/blood_requests${buildQuery(filters)}`);
      return result.data
    },
  });

  const { mutate: deleteRequest } = useMutation({
    mutationFn: async (id) => {
      const result = await axios.delete(`${apiUrl}/users/${id}`);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User deleted successfully");
    },
    onDelete: (error) => {
      console.log(error);
      toast.error("User can not be deleted");
    },
  });

  return (
    <div className="m-auto w-4/5 pt-12">
      <div className="flex justify-start items-center gap-4">
        <h1 className="text-4xl text-primary">Requests</h1>
        <Link to="/requests/new">
          <button className="btn btn-primary  btn-outline btn-sm">
            Add New Request
          </button>
        </Link>
      </div>

      <RequestFilter setFilters={setFilters}/>
      
      {isLoading && <LoadingSpinner />}
      {error && <Navigate to="/error" />}
      {requests && <RequestsTable requests={requests} />}
    </div>
  );
}
