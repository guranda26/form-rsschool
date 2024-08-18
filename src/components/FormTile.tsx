import React from "react";

export interface FormTileProps {
  formData?: {
    name?: string;
    age?: number;
    email?: string;
    password?: string;
    confirmPassword?: string;
    gender?: string;
    picture?: string;
    country?: string;
    termsAccepted?: boolean;
  };
}

const FormTile: React.FC<FormTileProps> = ({ formData }) => {
  if (!formData) {
    return <div className="form-tile">No data available</div>;
  }

  const {
    name,
    age,
    email,
    password,
    confirmPassword,
    gender,
    picture,
    termsAccepted,
    country,
  } = formData;

  return (
    <div className="form-tile">
      <p>Name: {name || "N/A"}</p>
      <p>Age: {age !== undefined ? age : "N/A"}</p>
      <p>Email: {email || "N/A"}</p>
      <p>Password: {password || "N/A"}</p>
      <p>Confirm Password: {confirmPassword || "N/A"}</p>
      <p>Gender: {gender || "N/A"}</p>
      <p>Picture: {picture || "N/A"}</p>
      <p>Country: {country || "N/A"}</p>
      <p>Terms Accepted: {termsAccepted ? "Yes" : "No"}</p>
    </div>
  );
};

export default FormTile;
