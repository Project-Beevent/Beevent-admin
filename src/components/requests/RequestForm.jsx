import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

/**id ler int mi yoksda string mi */

const requestDefaultValues = {
  ownerId: "",
  bloodType: "",
  requestDate: "",
  status: "",
  title: "",
  description: "",
  hospitalId: "",
  //donorId: "",
};

const requestSchema = yup.object().shape({
  ownerId: yup.string().required("this field is required"),
  bloodType: yup.string().required("this field is required"),
  requestDate: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format 'yyyy-mm-dd'")
    .required("This field is required"),
  status: yup.string().required("this field is required"),
  title: yup.string().required("this field is required"),
  description: yup.string().required("this field is required"),
  hospitalId: yup.string().required("this field is required"),
  donorId: yup.string().required("this field is required"),
});

export default function RequestForm() {
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

  const onSubmitHandler = (data) => {
    console.log(data);
  };

  return (

      <form onSubmit={handleSubmit(onSubmitHandler)} className="">
        <div className="mb-12">

        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="ownerId">Owner Id</label>
          <input
            className="input input-bordered w-full "
            type="text"
            id="ownerId"
            {...register("ownerId")}
            placeholder="Owner Id"
          />
          <p className="text-error">{errors.ownerId?.message}</p>
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="bloodType">Gender</label>

          <select
            name="bloodType"
            {...register("bloodType")}
            className="input input-bordered w-full "
          >
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="AB+">AB+</option>
            <option value="O+">O+</option>
            <option value="A-">A-</option>
            <option value="B-">B-</option>
            <option value="AB-">AB-</option>
            <option value="O-">O-</option>
          </select>
          <p className="text-error">{errors.bloodType?.message}</p>
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="requestDate">Request Date</label>
          <input
            className="input input-bordered w-full "
            type="date"
            id="requestDate"
            {...register("requestDate")}
            placeholder="Request Date"
          />
          <p className="text-error">{errors.requestDate?.message}</p>
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
