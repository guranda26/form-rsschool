import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Main: React.FC = () => {
  const formData = useSelector((state: RootState) => state.form);

  const getFieldStyle = (fieldName: keyof typeof formData) => {
    if (formData && formData[fieldName]) {
      return { border: "2px solid green", transition: "border 0.5s ease" };
    }
    return {};
  };

  return (
    <section>
      <h1>Main Route</h1>
      <h2>Form Data</h2>
      <div style={getFieldStyle("name")}>
        <label>Name:</label>
        <input type="text" defaultValue={formData.name || ""} readOnly />
      </div>

      <div style={getFieldStyle("age")}>
        <label>Age:</label>
        <input type="number" defaultValue={formData.age || 0} readOnly />
      </div>

      <div style={getFieldStyle("email")}>
        <label>Email:</label>
        <input type="email" defaultValue={formData.email || ""} readOnly />
      </div>

      <div style={getFieldStyle("picture")}>
        <label>Picture:</label>
        {formData.picture ? (
          <img
            src={formData.picture}
            alt="Uploaded"
            style={{ maxWidth: "200px", maxHeight: "200px" }}
          />
        ) : (
          <p>No picture available</p>
        )}
      </div>

      <div style={getFieldStyle("country")}>
        <label>Country:</label>
        <input type="text" defaultValue={formData.country || ""} readOnly />
      </div>
    </section>
  );
};

export default Main;
