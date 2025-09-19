"use client";
import { request } from "@/api/axiosInstance";
import Link from "next/link";
import React, { useState } from "react";

const RegisterPrimary = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validate = () => {
    let tempErrors = {};

    if (!formData.firstname) tempErrors.firstname = "First name is required";
    if (!formData.lastname) tempErrors.lastname = "Last name is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email format";
    }
    if (!formData.password) tempErrors.password = "Password is required";
    if (formData.password && formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.confirmpassword)
      tempErrors.confirmpassword = "Confirm password is required";
    if (
      formData.password &&
      formData.confirmpassword &&
      formData.password !== formData.confirmpassword
    ) {
      tempErrors.confirmpassword = "Passwords do not match";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validate()) return;

    setLoading(true);

    try {
      const data = new FormData();
      data.append("firstname", formData.firstname);
      data.append("lastname", formData.lastname);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("confirmpassword", formData.confirmpassword);

      const response = await request({
        url: "RegisterNewUser",
        method: "POST",
        data: data ,
      });

      setMessage("✅ Account created successfully!");
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmpassword: "",
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "❌ Something went wrong, try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ltn__login-area pb-110">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area text-center">
              <h1 className="section-title">
                Register <br />
                Your Account
              </h1>
              <p>
                Register an account to manage your orders, save favorites, <br />
                and enjoy exclusive deals designed just for you.
              </p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="account-login-inner">
              <form
                onSubmit={handleSubmit}
                className="ltn__form-box contact-form-box"
              >
                <input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  value={formData.firstname}
                  onChange={handleChange}
                  className={errors.firstname ? "border border-danger" : ""}
                />
                {errors.firstname && (
                  <small className="text-danger">{errors.firstname}</small>
                )}

                <input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  value={formData.lastname}
                  onChange={handleChange}
                  className={errors.lastname ? "border border-danger" : ""}
                />
                {errors.lastname && (
                  <small className="text-danger">{errors.lastname}</small>
                )}

                <input
                  type="text"
                  name="email"
                  placeholder="Email*"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border border-danger" : ""}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}

                <input
                  type="password"
                  name="password"
                  placeholder="Password*"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "border border-danger" : ""}
                />
                {errors.password && (
                  <small className="text-danger">{errors.password}</small>
                )}

                <input
                  type="password"
                  name="confirmpassword"
                  placeholder="Confirm Password*"
                  value={formData.confirmpassword}
                  onChange={handleChange}
                  className={errors.confirmpassword ? "border border-danger" : ""}
                />
                {errors.confirmpassword && (
                  <small className="text-danger">{errors.confirmpassword}</small>
                )}

                <label className="checkbox-inline">
                  <input type="checkbox" required /> I consent to Herboil
                  processing my personal data in accordance with the consent form
                  and the privacy policy.
                </label>
                <label className="checkbox-inline">
                  <input type="checkbox" required /> By clicking {`"create account"`},
                  I consent to the privacy policy.
                </label>

                <div className="btn-wrapper text-center">
                  <button
                    className="theme-btn-1 btn reverse-color btn-block"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "CREATE ACCOUNT"}
                  </button>
                </div>
              </form>

              {message && <p className="text-center mt-3">{message}</p>}

              <div className="by-agree text-center">
                <p>By creating an account, you agree to our:</p>
                <p>
                  <Link href="#">
                    TERMS OF CONDITIONS &nbsp; &nbsp; | &nbsp; &nbsp; PRIVACY
                    POLICY
                  </Link>
                </p>
                <div className="go-to-btn mt-50">
                  <Link href="/login">ALREADY HAVE AN ACCOUNT ?</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPrimary;
