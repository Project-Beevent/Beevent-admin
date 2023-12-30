import React, { Fragment } from "react";
import LocationsTable from "../components/Locations/LocationsTable";
import { mockLocations } from "../data/mockLocations";
import axios from "axios";
import { apiUrl } from "../data/url";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { Navigate } from "react-router-dom";

export default function AllLocations() {
  const { isLoading, error, data:locations } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const result  = await axios.get(`${apiUrl}/locations`);
      console.log(result);
      return result.data
    },
  });

  return (
    <div className="m-auto w-4/5 pt-12">
      <div className="flex justify-start items-center gap-4">
        <h1 className="text-4xl text-primary mb-8">Locations</h1>
      </div>
      {isLoading && <LoadingSpinner />}
      {error && <Navigate to="/error" />}
      {locations && <LocationsTable locations={locations} />}
    </div>
  );
}
