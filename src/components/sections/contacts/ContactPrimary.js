"use client";

import { request } from "@/api/axiosInstance";
import { useEffect, useState } from "react";

const ContactPrimary = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bundleSize: "Other",
    otherBundle: "",
    message: "",
    agree: false,
  });

  const [showOtherInput, setShowOtherInput] = useState(true);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {

    const { name, value, checked } = e.target;

    setFormData((prev) => {
      let updated = {
        ...prev,
        [name]: name === "agree" ? checked : value,
      };

      if (name === "bundleSize") {
        setShowOtherInput(value === "Other");
        if (value !== "Other") {
          updated.otherBundle = "";
        }
      }

      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    if (
      !formData.bundleSize ||
      (formData.bundleSize === "Other" && !formData.otherBundle)
    ) {
      setStatus("Please select a bundle size or enter a custom one.");
      return;
    }

    const bundleValue =
      formData.bundleSize === "Other"
        ? formData.otherBundle
        : formData.bundleSize;

    const data = new FormData();
    data.append("type", "Contact Form");
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("bundle_size", bundleValue);
    data.append("message", formData.message);
    data.append("save_info", 1);

    try {
      await request({
        url: "SaveContactForm",
        method: "POST",
        data: data,
      });
        setStatus("Thanks! Your inquiry has been submitted.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          bundleSize: "",
          otherBundle: "",
          message: "",
          agree: false,
        });
        setShowOtherInput(false);
    } catch (error) {
      setStatus("Failed to send inquiry.");
    }
  };

  return (
    <div className="ltn__contact-message-area mb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="ltn__form-box contact-form-box box-shadow white-bg">
              <h4 className="title-2">Get a Larger Bundle</h4>
              <p>
                Fill out the form below to request a quote for bulk Himalayan
                salt bundles.
              </p>
              <form id="contact-form" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-item input-item-name ltn__custom-icon">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-item input-item-email ltn__custom-icon">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="input-item input-item-phone ltn__custom-icon">
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
                  </div>

                  {/* <div className="col-md-6 gap-2 d-flex justify-content-between">
                    <div className="input-item w-100 input-item-select">
                      <select
                        name="bundleSize"
                        value={formData.bundleSize}
                        onChange={handleChange}
                        // className="nice-select"
                      >
                        <option value="">Select Bundle Size</option>
                        <option value="200kg">200 KG</option>
                        <option value="500kg">500 KG</option>
                        <option value="1000kg">1000 KG</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <button
                        type="button"
                        className="btn theme-btn-1 mt-1 btn-effect-1 text-uppercase"
                        onClick={handleOtherClick}
                      >
                        Other
                      </button>
                    </div>
                  </div> */}

                  {showOtherInput && (
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="otherBundle"
                        value={formData.otherBundle}
                        onChange={handleChange}
                        placeholder="Enter custom bundle size (e.g., 1500 KG)"
                        required
                        className="input-item"
                      />
                    </div>
                  )}
                </div>

                <div className="input-item input-item-textarea ltn__custom-icon mt-3">
                  <textarea
                    name="message"
                    placeholder="Enter message or special instructions"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <p>
                  <label className="input-info-save mb-0">
                    <input
                      type="checkbox"
                      name="agree"
                      checked={formData.agree}
                      onChange={handleChange}
                    />{" "}
                    Save my information for next time.
                  </label>
                </p>

                <div className="btn-wrapper mt-0">
                  <button
                    className="btn theme-btn-1 btn-effect-1 text-uppercase"
                    type="submit"
                    disabled={!formData.agree}
                  >
                    Request Bulk Quote
                  </button>
                </div>

                {status && (
                  <p
                    className="form-messege mb-0 mt-20"
                    style={{
                      color: status.includes("Failed") ? "red" : "green",
                    }}
                  >
                    {status}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPrimary;
