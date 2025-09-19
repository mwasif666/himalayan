"use client";
import { request } from "@/api/axiosInstance";
import Link from "next/link";
import React, { useState } from "react";

const LoginPrimary = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const data = new FormData();
      data.append("email", formData.email);
      data.append("password", formData.password);

      const response = await request({
        url: "LoginUser",
        method: "POST",
        data,
      });

      setMessage("✅ Logged in successfully!");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "❌ Invalid credentials, try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ltn__login-area pb-65">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area text-center">
              <h1 className="section-title">
                Sign In <br />
                To Your Account
              </h1>
              <p>
                Login to manage your orders, access wishlist, and enjoy exclusive
                member deals.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="account-login-inner">
              <form
                onSubmit={handleSubmit}
                className="ltn__form-box contact-form-box"
              >
                <input
                  type="text"
                  name="email"
                  placeholder="Email*"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password*"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div className="btn-wrapper mt-0">
                  <button
                    className="theme-btn-1 btn btn-block w-100"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "SIGN IN"}
                  </button>
                </div>
                {message && <p className="text-center mt-3">{message}</p>}
                {/* <div className="go-to-btn mt-20">
                  <Link
                    href="#"
                    title="Wishlist"
                    data-bs-toggle="modal"
                    data-bs-target="#ltn_forget_password_modal"
                  >
                    <small>FORGOTTEN YOUR PASSWORD?</small>
                  </Link>
                </div> */}
              </form>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="account-create text-center pt-50">
              <h4>{"DON'T"} HAVE AN ACCOUNT?</h4>
              <p>
                Add items to your wishlist, get personalised recommendations,
                <br />
                check out more quickly, track your orders and register today.
              </p>
              <div className="btn-wrapper">
                <Link href="/register" className="theme-btn-1 btn black-btn">
                  CREATE ACCOUNT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPrimary;
