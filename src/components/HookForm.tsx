import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { validationSchema } from "../utlis/validationSchema";
import { useDispatch } from "react-redux";
import { updateField } from "../redux/slices/formSlice";
import "../App.css";

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  termsAccepted: boolean;
  picture: string;
  country: string;
}

const HookForm: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      age: 0,
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      termsAccepted: false,
      picture: "",
      country: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const convert2base64 = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result?.toString() || null;
      setImage(base64String);
      dispatch(updateField({ field: "picture", value: base64String || "" }));
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const fileSizeLimit = 5 * 1024 * 1024;
      const allowedExtensions = ["image/jpeg", "image/png"];

      if (file.size > fileSizeLimit) {
        alert("File size exceeds the 5MB limit");
        return;
      }

      if (!allowedExtensions.includes(file.type)) {
        alert("Invalid file type. Only JPEG and PNG are allowed.");
        return;
      }

      convert2base64(file);
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("controlled file", data);
    const { ...rest } = data;
    Object.entries(rest).forEach(([field, value]) => {
      dispatch(updateField({ field: field as keyof FormData, value }));
    });
    dispatch(updateField({ field: "picture", value: image || "" }));
    reset();
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Form 2</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input id="name" {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input id="age" type="number" {...register("age")} />
          {errors.age && <p>{errors.age.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select id="gender" {...register("gender")}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p>{errors.gender.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="picture">Upload Picture:</label>
          <input
            id="picture"
            type="file"
            {...register("picture")}
            onChange={handleFileChange}
          />
          {errors.picture && <p>{errors.picture.message}</p>}
          {image ? <img src={image} alt="Uploaded" width="450" /> : null}
        </div>
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <input id="country" type="text" {...register("country")} />
          {errors.country && <p>{errors.country.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="terms">Accept Terms and Conditions:</label>
          <input
            id="terms"
            type="checkbox"
            className="checkbox"
            {...register("termsAccepted")}
          />
          {errors.termsAccepted && <p>{errors.termsAccepted.message}</p>}
        </div>
        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default HookForm;
