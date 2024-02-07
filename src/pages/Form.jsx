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
  const handlePayment = () => {
    var options = {
      key: "rzp_test_smoqKU73vlbB3h",
      key_secret: "TBZEpNqqYgQoRv3fAXPMUSY5",
      amount: 100000,
      currency: "INR",
      name: "ADACODE_SOLUTIONS",
      description: "15 Days Master Class Program",
      handler: function (response) {
        alert(response.razorpay_payment_id);
      },
      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.mobileNumber,
      },
      notes: {
        address: "Razorpay Corporate office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <div>
      <section className="form_contianer">
        <h5>--- Fill up your details ---</h5>
        <form onSubmit={handleSubmit}>
          <label>
            Full Name<span className="aster"> *</span>
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your name"
            onChange={handleInputChange}
            value={formData.fullName}
            required
          />
          <label>
            Mobile Number<span className="aster"> *</span>
          </label>
          <input
            type="tel"
            name="mobileNumber"
            placeholder="Mobile Number"
            onChange={handleInputChange}
            value={formData.mobileNumber}
            required
          />
          <label>
            Email <span className="aster">*</span>
          </label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
            value={formData.email}
            required
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
          <button onClick={handlePayment}>Apply Now</button>
        </form>
      </section>
    </div>
  );
};

export default Form;
