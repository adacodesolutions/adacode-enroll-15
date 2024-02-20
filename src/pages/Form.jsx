import React, { useState } from "react";
import InvoicePDF from "../components/Invoice";
import "./Form.scss";
import { addDoc, collection } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { db } from "../App";

const Form = () => {
  const [paymentId, setPaymentId] = useState();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    qualification: "Other",
    course: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors({
        ...errors,
        email: "Please enter a valid email address",
      });
      return;
    }
    // Validate phone number
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.mobileNumber)) {
      setErrors({
        ...errors,
        mobileNumber: "Please enter a 10-digit mobile number",
      });
      return;
    }
    handlePayment();
  };

  const handleUserdata = async () => {
    try {
      const docRef = await addDoc(collection(db, "userdata"), {
        createdAt: serverTimestamp(),
        username: formData.fullName,
        phonenumber: formData.mobileNumber,
        email: formData.email,
        qualification: formData.qualification,
        course: formData.course,
      });
      console.log("Data Successfully submitted", docRef.id);
    } catch (error) {
      console.error("Error saving Data", error);
    }
  };
  const handlePayment = () => {
    var options = {
      key: import.meta.env.VITE_RAZORPAY_API_KEY,
      key_secret: import.meta.env.VITE_RAZORPAY_SECRETKEY,
      amount: 100000,
      currency: "INR",
      name: "ADACODE_SOLUTIONS",
      description: "15 Days Master Class Program",
      handler: function (response) {
        alert("Payment Successfull", response.razorpay_payment_id);
        setPaymentId(response.razorpay_payment_id);
        handleUserdata();
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
        color: "#770909",
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
          {errors.mobileNumber && (
            <div className="error">{errors.mobileNumber}</div>
          )}
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
          {errors.email && <div className="error">{errors.email}</div>}
          <label>Qualification</label>
          <select
            name="qualification"
            onChange={handleInputChange}
            value={formData.qualification}
          >
            <option>Plus Two</option>
            <option>ITI or Diploma</option>
            <option>Graduate</option>
            <option>Masters</option>
            <option>Other</option>
          </select>
          <label>Select Course</label>
          <select
            name="course"
            onChange={handleInputChange}
            value={formData.course}
          >
            <option>Embedded Systems and IoT</option>
            <option>MERN Stack</option>
            <option>Java Full Stack</option>
            <option>Python Full Stack</option>
            <option>Data Science</option>
            <option>Cloud Computing</option>
            <option>Flutter</option>
            <option>React Native</option>
            <option>Robotics</option>
          </select>

          {formData.mobileNumber != "" ? (
            <button onClick={handleSubmit}>Apply Now</button>
          ) : (
            <button disabled>Fill the form properly</button>
          )}
          {paymentId && (
            <InvoicePDF
              paymentId={formData.mobileNumber}
              userName={formData.fullName}
            />
          )}
        </form>
      </section>
    </div>
  );
};

export default Form;
