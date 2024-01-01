import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import {apiUrl} from "../../data/url"
import { toast } from "react-toastify";


/**id ler int mi yoksda string mi */

const requestDefaultValues = {
  userId: "",
  bloodType: "",
  dateRequested: "",
  status: "",
  title: "",
  description: "",
  hospitalId: "",

};

const requestSchema = yup.object().shape({
  userId: yup.string().required("this field is required"),
  bloodType: yup.string().required("this field is required"),
  dateRequested: yup
    .string()
    .required("This field is required"),
  status: yup.string().required("this field is required"),
  title: yup.string().required("this field is required"),
  description: yup.string().required("this field is required"),
  hospitalId: yup.string().required("this field is required"),
  //donorId: yup.string().required("this field is required"),
});

export default function RequestForm() {
  const queryClient = useQueryClient();
  const params = useParams();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    watch,
  } = useForm({
    defaultValues: requestDefaultValues,
    resolver: yupResolver(requestSchema),
  });

  const {data: request, isLoading,error} = useQuery({
    queryKey: ["request", params.id],
    queryFn: async () => {
      const result = await axios.get(`${apiUrl}/blood_requests/${params.id}`);
      console.log(result.data)
      return result.data;
    },
    enabled: !!params.id,
  });



  const {mutate:submitRequest} = useMutation({
    mutationFn: async (body) => {
      const {hospitalId, userId, ...Body} = body;
      const postUrl = `${apiUrl}/blood_requests/users/${userId}/hospitals/${hospitalId}` 
      const editUrl = `${apiUrl}/blood_requests/${params.id}`
      const parameter = params.id ?`/${params.id}` : "";
      const method = params.id ? "PUT" : "POST";
      const response = await axios({
          url: params.id ? editUrl : postUrl,
          method,
          data: Body,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Request created successfully");
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      if (!params.id) {
          reset();
          return;
      }
      navigate("/requests");
  },
  onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message);
  },
  });

  const onSubmitHandler = (data) => {
    submitRequest(data);
    console.log(data);
  };

  useEffect(() => {
    if (!request) return;
    const [y,m,d] = request.dateRequested;
    const formattedDate = `${y}-${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
    setValue("userId", request.user.id);
    setValue("bloodType", request.bloodType);
    setValue("dateRequested", formattedDate);
    setValue("status", request.status);
    setValue("title", request.title);
    setValue("description", request.description);
    setValue("hospitalId", request.hospital.id);
  }, [request, setValue]);

  return (

      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
        <div className="mb-12">

        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="userId">Owner Id</label>
          <input
            className="input input-bordered w-full "
            type="text"
            id="userId"
            {...register("userId")}
            placeholder="Owner Id"
          />
          <p className="text-error">{errors.userId?.message}</p>
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="bloodType">Blood Type</label>

          <select
            name="bloodType"
            {...register("bloodType")}
            className="input input-bordered w-full "
          >
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="AB+">AB+</option>
            <option value="A-">A-</option>
            <option value="B-">B-</option>
            <option value="AB-">AB-</option>
            <option value="0+">0+</option>
            <option value="0-">0-</option>
          </select>
          <p className="text-error">{errors.bloodType?.message}</p>
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="dateRequested">Request Date</label>
          <input
            className="input input-bordered w-full "
            type="date"
            id="dateRequested"
            {...register("dateRequested")}
            placeholder="Request Date"
          />
          <p className="text-error">{errors.dateRequested?.message}</p>
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="status">Status</label>
          <input
            className="input input-bordered w-full "
            type="text"
            id="status"
            {...register("status")}
            placeholder="Status"
          />
          <p className="text-error">{errors.status?.message}</p>
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="title">Title</label>
          <input
            className="input input-bordered w-full "
            type="text"
            id="title"
            {...register("title")}
            placeholder="Title"
          />
          <p className="text-error">{errors.title?.message}</p>
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="description">Description</label>
          <input
            className="input input-bordered w-full "
            type="text"
            id="description"
            {...register("description")}
            placeholder="Description"
          />
          <p className="text-error">{errors.description?.message}</p>
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="hospitalId">Hospital Id</label>
          <input
            className="input input-bordered w-full "
            type="text"
            id="hospitalId"
            {...register("hospitalId")}
            placeholder="Hospital Id"
          />
          <p className="text-error">{errors.hospitalId?.message}</p>
        </div>
        {/* < div className="flex flex-col gap-1 my-2">
          <label htmlFor="donorId">Donor Id</label>
          <input
            className="input input-bordered w-full "
            type="text"
            id="donorId"
            {...register("donorId")}
            placeholder="Donor Id"
          />
          <p className="text-error">{errors.donorId?.message}</p>
        </> */}
        </div>
        <div className="flex flex-row gap-4 justify-start">
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="button" className="btn btn-primary btn-outline" onClick={() => reset()}>
            Clear
          </button>
        </div>
      </form>
 
  );
}
