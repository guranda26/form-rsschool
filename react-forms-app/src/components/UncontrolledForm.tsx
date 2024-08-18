import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setUncontrolledFormData } from "../redux/slices/formSlice";
import * as Yup from "yup";
import { validationSchema } from "../utlis/validationSchema";
import { useNavigate } from "react-router-dom";

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const UncontrolledForm: React.FC = () => {
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const data: Record<string, unknown> = {};

    formData.forEach(async (value, key) => {
      if (key === "termsAccepted") {
        data[key] = value === "on";
      } else if (key === "picture") {
        const files = formData.getAll(key);
        if (files.length > 0) {
          const file = files[0] as File;
          try {
            data[key] = await convertToBase64(file);
          } catch (error) {
            setErrors([error as string, "Failed to convert picture to base64"]);
            return;
          }
        } else {
          setErrors(["Picture is required"]);
          return;
        }
      } else {
        data[key] = value;
      }
    });

    setTimeout(async () => {
      try {
        await validationSchema.validate(data, { abortEarly: false });
        dispatch(setUncontrolledFormData(data));
        navigate("/", {
          state: {
            formData: data,
            successMessage: "Form submitted successfully!",
          },
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          setErrors(err.errors);
        } else {
          setErrors(["An unexpected error occurred"]);
        }
      }
    }, 100);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" />
      </div>

      <div>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" name="gender">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="picture">Upload Picture:</label>
        <input type="file" id="picture" name="picture" />
      </div>

      <div>
        <label htmlFor="country">Country:</label>
        <input type="text" id="country" name="country" />
      </div>

      <div>
        <label htmlFor="terms">Accept Terms and Conditions:</label>
        <input type="checkbox" id="terms" name="termsAccepted" />
      </div>

      <button type="submit">Submit</button>

      {errors.length > 0 && (
        <div>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
    </form>
  );
};

export default UncontrolledForm;
