import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {apiUrl} from "../../data/url"
import { toast } from "react-toastify";

const userDefaultValues = {
  fullName: "",
  email: "",
  password: "",
  gender: "",
  phone: "",
  bloodType: "",
  lastDonationDate: "",
  donationCount: "0",//int
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
  phone: yup.string().required("this field is required"),
  bloodType: yup.string().required("this field is required"),
  lastDonationDate: yup.string().required("this field is required"),
  donationCount: yup
    .number()
    .typeError("please provide an integer value")
    .integer()
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
  const queryClient = useQueryClient();
  const params = useParams();
  const navigate = useNavigate();
 
  const {mutate:submitUser} = useMutation({
    mutationFn: async (body) => {
      const parameter = params.id ?`/${params.id}` : "";
      const method = params.id ? "PUT" : "POST";
      const response = await axios({
          url: `${apiUrl}/users${parameter}`,
          method,
          data: body,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("User created successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      if (!params.id) {
          reset();
          return;
      }
      navigate("/users");
  },
  onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message);
  },
  });
 
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

  const {data: user, isLoading,error} = useQuery({
    queryKey: ["users", params.id],
    queryFn: async () => {
      const result = await axios.get(`${apiUrl}/users/${params.id}`);
      return result.data;
    },
    enabled: !!params.id,
  });

  useEffect(() => {
    if (!user) return;
    const [y,m,d] = user.lastDonationDate;
    const formattedDate = `${y}-${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
    setValue("fullName", user.fullName);
    setValue("email", user.email);
    setValue("password", user.password);
    setValue("gender", user.gender);
    setValue("phone", user.phone);
    setValue("bloodType", user.bloodType);
    setValue("lastDonationDate", formattedDate);
    setValue("donationCount", user.donationCount);
    setValue("tcNo", user.tcNo);
    setValue("age", user.age);
  }, [user, setValue]);


  const onSubmitHandler = (data) => {
    //const body = { ...data, numOfClosets: parseInt(data.numOfClosets) };
    console.log(data)
    submitUser(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
        <div className="mb-12">
      <div className="flex flex-col gap-1 my-2">
          <label htmlFor="fullName">Full Name</label>
          <input
          className="input input-bordered w-full "
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
          className="input input-bordered w-full "
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
            className="input input-bordered w-full "
            type="password"
            id="password"
            {...register("password")}
            placeholder="Password"
          />
          <p className="text-error">{errors.password?.message}</p>
        </div>

        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="gender">Gender</label>

          <select name="gender" {...register("gender")} className="input input-bordered w-full ">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <p className="text-error">{errors.gender?.message}</p>
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="bloodType">Blood Type</label>

          <select name="bloodType" {...register("bloodType")} 
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
          <label htmlFor="phone">Phone Number</label>
          
          <input
            type="text"
            id="phone"
            {...register("phone")}
            placeholder="Phone Number"
            className="input input-bordered w-full "
          />
          <p className="text-error">{errors.phone?.message}</p>
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="lastDonationDate">Last Donation Time</label>
          <input
            type="date"
            id="lastDonationDate"
            {...register("lastDonationDate")}
            placeholder="Last Donation Time"
            className="input input-bordered w-full "
          />
          <p className="text-error">{errors.lastDonationDate?.message}</p>
        </div>

        {/* BURDA İNT DÖNÜŞÜMÜ YAPMAK LAZIM */}
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="donationCount">Donation Count</label>
          <input
            type="number"
            id="donationCount"
            {...register("donationCount")}
            placeholder="Donation Count"
            className="input input-bordered w-full "
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
            className="input input-bordered w-full "
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
            className="input input-bordered w-full "
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
