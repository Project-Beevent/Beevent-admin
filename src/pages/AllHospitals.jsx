import { useQuery } from "@tanstack/react-query";
import HospitalsTable from "../components/hospitals/HospitalsTable";
import { mockHospitals } from "../data/mockHospitals";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { apiUrl } from "../data/url";

export default function AllHospitals() {
  const { isLoading, error, data:hospitals } = useQuery({
    queryKey: ["hospitals"],
    queryFn: async () => {
      const result  = await axios.get(`${apiUrl}/hospitals`);
      console.log(result);
      return result.data
    },
  });

  return (
    <div className="m-auto w-4/5 pt-12">
      <div className="flex justify-start items-center gap-4">
        <h1 className="text-4xl text-primary mb-8">Hospitals</h1>
      </div>
      {isLoading && <LoadingSpinner />}
      {error && <Navigate to="/error" />}
      {hospitals && <HospitalsTable hospitals={hospitals} />}
    </div>
  );
}
