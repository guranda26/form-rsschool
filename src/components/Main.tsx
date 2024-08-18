import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import "./Main.css";

const Main: React.FC = () => {
  const formData = useSelector((state: RootState) => state.form);

  const getFieldStyle = (fieldName: keyof typeof formData) => {
    if (formData && formData[fieldName]) {
      return { border: "2px solid green", transition: "border 0.5s ease" };
    }
    return {};
  };

  return (
    <section className="form-container">
      <h1>Fill Form Data</h1>
      <div style={getFieldStyle("name")} className="form-group">
        <label>Name:</label>
        <input type="text" defaultValue={formData.name || ""} readOnly />
      </div>

      <div style={getFieldStyle("age")} className="form-group">
        <label>Age:</label>
        <input type="number" defaultValue={formData.age || 0} readOnly />
      </div>

      <div style={getFieldStyle("email")} className="form-group">
        <label>Email:</label>
        <input type="email" defaultValue={formData.email || ""} readOnly />
      </div>

      <div style={getFieldStyle("picture")} className="form-group">
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

      <div style={getFieldStyle("country")} className="form-group">
        <label>Country:</label>
        <input type="text" defaultValue={formData.country || ""} readOnly />
      </div>
    </section>
  );
};

export default Main;
