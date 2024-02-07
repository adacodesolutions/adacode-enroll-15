import React, { useState } from "react";
import "./Form.scss";

const Form = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    qualification: "Other",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
  };
  return (
    <div>
      <section className="form_contianer">
        <h5>--- Fill up your details ---</h5>
        <form onSubmit={handleSubmit}>
          <label>Full Name*</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your name"
            onChange={handleInputChange}
            value={formData.fullName}
          />
          <label>Mobile Number*</label>
          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            onChange={handleInputChange}
            value={formData.mobileNumber}
          />
          <label>Email *</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
            value={formData.email}
          />
          <label>Qualification</label>
          <select
            name="qualification"
            onChange={handleInputChange}
            value={formData.qualification}
          >
            <option>Plus Two</option>
            <option>ITI or Deploma</option>
            <option>Graduate</option>
            <option>Masteres</option>
            <option>Other</option>
          </select>
          <button>Apply Now</button>
        </form>
      </section>
    </div>
  );
};

export default Form;
