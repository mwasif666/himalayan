"use client";
import React, { useEffect, useState } from "react";
import { request } from "@/api/axiosInstance";
import { useAuth } from "@/providers/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AccountPrimary = () => {
  const router = useRouter();
  const { logout, userId } = useAuth();
  const [detailLoading, setDetailLoading] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const validationFunction = () => {
    let newErrors = {};

    if (!userDetail?.billing_details?.first_name?.trim()) {
      newErrors.first_name = "First name is required";
    }

    if (!userDetail?.billing_details?.last_name?.trim()) {
      newErrors.last_name = "Last name is required";
    }

    if (!userDetail?.user?.name?.trim()) {
      newErrors.name = "Display name is required";
    }

    if (!userDetail?.user?.email?.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(userDetail.user.email)) {
        newErrors.email = "Enter a valid email address";
      }
    }

    if (passwords.current || passwords.new || passwords.confirm) {
      if (!passwords.current) {
        newErrors.current = "Enter current password";
      }
      if (!passwords.new) {
        newErrors.new = "Enter new password";
      } else if (passwords.new.length < 6) {
        newErrors.new = "New password must be at least 6 characters";
      }
      if (passwords.new !== passwords.confirm) {
        newErrors.confirm = "New password and confirm password do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const getUserDetail = async () => {
    try {
      setDetailLoading(true);
      const response = await request({
        url: `GetLoggedInUserDetail?id=${userId}`, 
        method: "GET",
      });
      setUserDetail(response.data);
    } catch (error) {
      console.error("Failed to fetch user detail:", error);
    } finally {
      setDetailLoading(false);
    }
  };

  useEffect(() => {
    if (userId) getUserDetail();
  }, [userId]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    setTimeout(() => router.push("/login"), 50);
  };

  const updateUserDetail = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    if (!validationFunction()) return;

    try {
      setDetailLoading(true);
      const payload = {
        ...userDetail,
        current_password: passwords.current || undefined,
        new_password: passwords.new || undefined,
      };

      await request({
        url: `UpdateUserDetail`,
        method: "POST",
        data: payload,
      });

      setPasswords({ current: "", new: "", confirm: "" });
      setErrors({});
      setSuccessMessage("Profile updated successfully.");
      getUserDetail();
    } catch (error) {
      const resp = error?.response;
      if (resp?.status === 422 && resp?.data) {
        const backendErrors = resp.data.errors || {};
        const mapped = {};
        Object.keys(backendErrors).forEach((key) => {
          const val = backendErrors[key];
          if (Array.isArray(val)) mapped[key] = val.join(" ");
          else mapped[key] = String(val);
        });
        const normalized = {};
        Object.entries(mapped).forEach(([k, v]) => {
          const simpleKey = k.split(".").pop(); 
          normalized[simpleKey] = v;
        });

        setErrors((prev) => ({ ...prev, ...normalized }));
      } else {
        setErrors({
          global: "Failed to update user details. Please try again.",
        });
        console.error("Update error", error);
      }
    } finally {
      setDetailLoading(false);
    }
  };

  const handleBillingChange = (field) => (e) => {
    const value = e.target.value;
    setUserDetail((prev) => ({
      ...prev,
      billing_details: {
        ...(prev?.billing_details || {}),
        [field]: value,
      },
    }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleUserChange = (field) => (e) => {
    const value = e.target.value;
    setUserDetail((prev) => ({
      ...prev,
      user: {
        ...(prev?.user || {}),
        [field]: value,
      },
    }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handlePasswordChange = (field) => (e) => {
    const value = e.target.value;
    setPasswords((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <div className="liton__wishlist-area pb-70">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* PRODUCT TAB AREA START */}
            <div className="ltn__product-tab-area">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="ltn__tab-menu-list mb-50">
                      <div className="nav">
                        <Link
                          className="active show"
                          data-bs-toggle="tab"
                          href="#liton_tab_1_1"
                        >
                          Dashboard <i className="fas fa-home"></i>
                        </Link>
                        <Link data-bs-toggle="tab" href="#liton_tab_1_2">
                          Orders <i className="fas fa-file-alt"></i>
                        </Link>
                        <Link data-bs-toggle="tab" href="#liton_tab_1_5">
                          Account Details <i className="fas fa-user"></i>
                        </Link>
                        <Link href="#" onClick={handleLogout}>
                          Logout <i className="fas fa-sign-out-alt"></i>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-8">
                    <div className="tab-content">
                      <div
                        className="tab-pane fade active show"
                        id="liton_tab_1_1"
                      >
                        <div className="ltn__myaccount-tab-content-inner">
                          <p>
                            Hello <strong>{userDetail?.user?.name}</strong> (not{" "}
                            <strong>{userDetail?.user?.name}</strong>?{" "}
                            <small>
                              <Link href="/login">Log out</Link>
                            </small>
                            )
                          </p>
                          <p>
                            From your account dashboard you can view your{" "}
                            <span>recent orders</span>, manage your{" "}
                            <span>shipping and billing addresses</span>, and{" "}
                            <span>edit your password and account details</span>.
                          </p>
                        </div>
                      </div>

                      <div className="tab-pane fade" id="liton_tab_1_2">
                        <div className="ltn__myaccount-tab-content-inner">
                          <div className="table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>Order</th>
                                  <th>Date</th>
                                  <th>Status</th>
                                  <th>Total</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {userDetail?.orders?.length === 0 ? (
                                  <tr>
                                    <td colSpan={5} className="text-center">
                                      No Order found!
                                    </td>
                                  </tr>
                                ) : (
                                  userDetail?.orders?.map((item) => (
                                    <tr key={item?.id}>
                                      <td>{item?.order_no || "#"}</td>
                                      <td>{item?.ordered_on}</td>
                                      <td>{item?.status}</td>
                                      <td>${item?.sub_total}</td>
                                      <td>
                                        <Link href="/cart">View</Link>
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      <div className="tab-pane fade" id="liton_tab_1_5">
                        <div className="ltn__myaccount-tab-content-inner">
                          <p>
                            The following addresses will be used on the checkout
                            page by default.
                          </p>

                          <div className="ltn__form-box">
                            <form onSubmit={updateUserDetail}>
                              {/* Global error */}
                              {errors.global && (
                                <p
                                  className="error-text"
                                  style={{ marginBottom: 12 }}
                                >
                                  {errors.global}
                                </p>
                              )}
                              {successMessage && (
                                <p style={{ color: "green", marginBottom: 12 }}>
                                  {successMessage}
                                </p>
                              )}

                              <div className="row mb-50">
                                <div className="col-md-6">
                                  <label>First name:</label>
                                  <input
                                    type="text"
                                    className={
                                      errors.first_name ? "input-error" : ""
                                    }
                                    value={
                                      userDetail?.billing_details?.first_name ||
                                      ""
                                    }
                                    name="first_name"
                                    onChange={handleBillingChange("first_name")}
                                  />
                                  {errors.first_name && (
                                    <p className="error-text">
                                      {errors.first_name}
                                    </p>
                                  )}
                                </div>

                                <div className="col-md-6">
                                  <label>Last name:</label>
                                  <input
                                    type="text"
                                    className={
                                      errors.last_name ? "input-error" : ""
                                    }
                                    value={
                                      userDetail?.billing_details?.last_name ||
                                      ""
                                    }
                                    name="last_name"
                                    onChange={handleBillingChange("last_name")}
                                  />
                                  {errors.last_name && (
                                    <p className="error-text">
                                      {errors.last_name}
                                    </p>
                                  )}
                                </div>

                                <div className="col-md-6">
                                  <label>Display Name:</label>
                                  <input
                                    type="text"
                                    className={errors.name ? "input-error" : ""}
                                    value={userDetail?.user?.name || ""}
                                    name="name"
                                    onChange={handleUserChange("name")}
                                  />
                                  {errors.name && (
                                    <p className="error-text">{errors.name}</p>
                                  )}
                                </div>

                                <div className="col-md-6">
                                  <label>Display Email:</label>
                                  <input
                                    type="email"
                                    className={
                                      errors.email ? "input-error" : ""
                                    }
                                    value={userDetail?.user?.email || ""}
                                    name="email"
                                    onChange={handleUserChange("email")}
                                  />
                                  {errors.email && (
                                    <p className="error-text">{errors.email}</p>
                                  )}
                                </div>
                              </div>

                              <fieldset>
                                <legend>Password change</legend>
                                <div className="row">
                                  <div className="col-md-12">
                                    <label>
                                      Current password (leave blank to leave
                                      unchanged):
                                    </label>
                                    <input
                                      type="password"
                                      className={
                                        errors.current ? "input-error" : ""
                                      }
                                      placeholder="Current password"
                                      value={passwords.current}
                                      onChange={handlePasswordChange("current")}
                                    />
                                    {errors.current && (
                                      <p className="error-text">
                                        {errors.current}
                                      </p>
                                    )}

                                    <label style={{ marginTop: 10 }}>
                                      New password (leave blank to leave
                                      unchanged):
                                    </label>
                                    <input
                                      type="password"
                                      className={
                                        errors.new ? "input-error" : ""
                                      }
                                      placeholder="New password"
                                      value={passwords.new}
                                      onChange={handlePasswordChange("new")}
                                    />
                                    {errors.new && (
                                      <p className="error-text">{errors.new}</p>
                                    )}

                                    <label style={{ marginTop: 10 }}>
                                      Confirm new password:
                                    </label>
                                    <input
                                      type="password"
                                      className={
                                        errors.confirm ? "input-error" : ""
                                      }
                                      placeholder="Confirm new password"
                                      value={passwords.confirm}
                                      onChange={handlePasswordChange("confirm")}
                                    />
                                    {errors.confirm && (
                                      <p className="error-text">
                                        {errors.confirm}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </fieldset>

                              <div
                                className="btn-wrapper"
                                style={{ marginTop: 18 }}
                              >
                                <button
                                  type="submit"
                                  className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                  disabled={detailLoading}
                                  style={{ opacity: detailLoading ? 0.7 : 1 }}
                                >
                                  {detailLoading ? "Saving..." : "Save Changes"}
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* PRODUCT TAB AREA END */}
          </div>
        </div>
      </div>

      {/* Inline styles for validation UI */}
      <style jsx>{`
        .input-error {
          border: 1px solid red !important;
          outline: none;
          box-shadow: none;
        }
        .error-text {
          font-size: 13px;
          color: red;
          margin-top: 4px;
          margin-bottom: 0;
        }

        /* small spacing fix for labels/inputs */
        .ltn__form-box label {
          display: block;
          margin-top: 8px;
          margin-bottom: 6px;
          font-weight: 600;
        }
        .ltn__form-box input {
          width: 100%;
          padding: 8px 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default AccountPrimary;
