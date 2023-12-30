import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const userDefaultValues = {
  fullName: "",
  email: "",
  password: "",
  gender: "",
  phoneNumber: "",
  bloodType: "",
  lastDonationTime: "",
  donationCount: "",
  tcNo: "",
  age: "",
};

const userSchema = yup.object().shape({
  fullName: yup.string().required("this field is required"),
  email: yup
    .string()
    .email("please give a correct email format")
    .required("this field is required"),
  password: yup.string().required("this field is required"),
  gender: yup.string().required("this field is required"),
  phoneNumber: yup.string().required("this field is required"),
  bloodType: yup.string().required("this field is required"),
  lastDonationTime: yup.string().required("this field is required"),
  donationCount: yup
    .number()
    .typeError("please provide an integer value")
    .integer()
    .positive("please provide an integer value")
    .required("this field is required"),
  tcNo: yup
    .string()
    .matches(/^\d{11}$/, "TC No must be 11 digits")
    .required("this field is required"),
  age: yup
    .number()
    .typeError("please provide an integer value")
    .integer()
    .positive("please provide an integer value")
    .required("this field is required"),
});

export default function UserForm() {
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
    defaultValues: userDefaultValues,
    resolver: yupResolver(userSchema),
  });

  const onSubmitHandler = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)} >
        <div className="mb-12">
      <div className="flex flex-col gap-1 my-2">
          <label htmlFor="fullName">Full Name</label>
          <input
          className="input input-bordered w-full max-w-xs"
            type="text"
            id="fullName"
            {...register("fullName")}
            placeholder="Full Name"
          />
          <p className="text-error">{errors.fullName?.message}</p>
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="email">Email</label>
          <input
          className="input input-bordered w-full max-w-xs"
            type="email"
            id="email"
            {...register("email")}
            placeholder="Email"
          />
          <p className="text-error">{errors.email?.message}</p>
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="password">Password</label>
          <input
            className="input input-bordered w-full max-w-xs"
            type="password"
            id="password"
            {...register("password")}
            placeholder="Password"
          />
          <p className="text-error">{errors.password?.message}</p>
        </div>

        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="gender">Gender</label>

          <select name="gender" {...register("gender")} className="input input-bordered w-full max-w-xs">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <p className="text-error">{errors.gender?.message}</p>
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="bloodType">Gender</label>

          <select name="bloodType" {...register("bloodType")} 
          className="input input-bordered w-full max-w-xs"
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
          <label htmlFor="phoneNumber">Phone Number</label>
          
          <input
            type="text"
            id="phoneNumber"
            {...register("phoneNumber")}
            placeholder="Phone Number"
            className="input input-bordered w-full max-w-xs"
          />
          <p className="text-error">{errors.phoneNumber?.message}</p>
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="lastDonationTime">Last Donation Time</label>
          <input
            type="date"
            id="lastDonationTime"
            {...register("lastDonationTime")}
            placeholder="Last Donation Time"
            className="input input-bordered w-full max-w-xs"
          />
          <p className="text-error">{errors.lastDonationTime?.message}</p>
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="donationCount">Donation Count</label>
          <input
            type="number"
            id="donationCount"
            {...register("donationCount")}
            placeholder="Donation Count"
            className="input input-bordered w-full max-w-xs"
          />
          <p className="text-error">{errors.donationCount?.message}</p>
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="tcNo">TC No</label>
          <input
            type="text"
            id="tcNo"
            {...register("tcNo")}
            placeholder="TC No"
            className="input input-bordered w-full max-w-xs"
          />
          <p className="text-error">{errors.tcNo?.message}</p>
          </div>
          <div className="flex flex-col gap-1 my-2">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age")}
            placeholder="Age"
            className="input input-bordered w-full max-w-xs"
          />
          <p className="text-error">{errors.age?.message}</p>
          </div>

</div>
        <div className="flex flex-row gap-4 justify-start">
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="button" className="btn btn-primary btn-outline" onClick={() => reset()}>
            Clear
          </button>
        </div>

      </form>
    </div>
  );
}
