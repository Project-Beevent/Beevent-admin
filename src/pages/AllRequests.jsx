import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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
  let city = "",
    bloodType = "";
  if (filters.city) {
    city += `city=${filters.city}`;
  }
  if (filters.bloodType) {
    bloodType += `blood_type=${filters.bloodType}`.replace("+", "%2B").replace("-", "%2D");
  }

  if (city && bloodType) {
    query += `${city}&${bloodType}`;
  } else if (city) {
    query += city;
  } else if (bloodType) {
    query += bloodType;
  } else query = "";
  return query;
};

export default function AllRequests() {
  const [filters, setFilters] = useState({ city: "", bloodType: "" });

  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: requests,
  } = useQuery({
    queryKey: ["requests", filters],
    queryFn: async () => {
      let url = `${apiUrl}/blood_requests${buildQuery(filters)}`;
      console.log(url);
      const result = await axios.get(url);
      console.log("BU NE AMK");
      console.log(result.data);
      return result.data;
    },
  });

  const { mutate: deleteRequest } = useMutation({
    mutationFn: async (id) => {
      const result = await axios.delete(`${apiUrl}/blood_requests/${id}`);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["requests"]);
      toast.success("Request deleted successfully");
    },
    onDelete: (error) => {
      console.log(error);
      toast.error(error.response.data.message);
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

      <RequestFilter setFilters={setFilters} />

      {isLoading && <LoadingSpinner />}
      {error && <Navigate to="/error" />}
      {requests && (
        <RequestsTable requests={requests} deleteRequest={deleteRequest} />
      )}
    </div>
  );
}
