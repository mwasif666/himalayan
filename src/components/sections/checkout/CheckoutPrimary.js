/* eslint-disable jsx-a11y/role-supports-aria-props */
"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthContext";
import { useSearchParams } from "next/navigation";
import { request } from "@/api/axiosInstance";
import { useSelector } from "react-redux";
import CheckoutProduct from "@/components/shared/checkout/CheckoutProduct";
import Nodata from "@/components/shared/no-data/Nodata";
import modifyAmount from "@/libs/modifyAmount";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
const paymnetImage3 = "/img/icons/payment-3.png";

const CheckoutPrimary = () => {
  const { userId, isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isPlaceOrder, setIsPlaceOrder] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  // controlled form state populated from userDetail after it loads
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company_name: "",
    company_address: "",
    address: "",
    apartment: "",
    town: "",
    city: "",
    country: "",
    zip_code: "",
    create_account: false,
    order_note: "",
  });
  const [errors, setErrors] = useState({});
  const [isCallFromProduct, setIsCallFromProduct] = useState(false);
  const searchParams = useSearchParams();
  const source = searchParams?.get("source");
  const cartProducts = useSelector((state) => state.AddtoCart?.cartItems);
  const checkOutCartProducts = useSelector(
    (state) => state.AddtoCart?.checkoutCartItems
  );

  const setCartDataAsPerType = () => {
    if (source === "product") {
      setIsCallFromProduct(true);
    }
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
      console.error(error);
    } finally {
      setDetailLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    if (userId) {
      getUserDetail();
    }
    setCartDataAsPerType();
  }, [userId]);
  // populate form values when userDetail arrives
  useEffect(() => {
    if (!userDetail) return;
    const normalizeCountry = (c) => {
      if (!c) return "";
      const v = String(c).toLowerCase();
      if (v.includes("united kingdom") || v.includes("uk"))
        return "United Kingdom";
      if (v.includes("united states") || v.includes("us") || v.includes("usa"))
        return "United States";
      if (v.includes("saudi")) return "Saudi Arabia";
      if (v.includes("china")) return "China";
      if (v.includes("canada")) return "Canada";
      if (v.includes("australia")) return "Australia";
      if (v.includes("morocco")) return "Morocco";
      return c;
    };

    setForm((prev) => ({
      ...prev,
      first_name: userDetail?.billing_details?.first_name || "",
      last_name: userDetail?.billing_details?.last_name || "",
      email: userDetail?.billing_details?.email || "",
      phone: userDetail?.billing_details?.phone || "",
      company_name: userDetail?.billing_details?.company_name || "",
      company_address: userDetail?.billing_details?.company_address || "",
      address: userDetail?.billing_details?.address || "",
      apartment: userDetail?.billing_details?.apartment || "",
      town: userDetail?.billing_details?.town || "",
      city: userDetail?.billing_details?.city || "",
      country: normalizeCountry(userDetail?.billing_details?.country) || "",
      zip_code: userDetail?.billing_details?.zip_code || "",
      create_account: userDetail?.billing_details?.create_account === 1,
    }));
  }, [userDetail]);
  if (!mounted) return null;

  const getSubTotal = (item) => {
    let subTotal = 0;
    if (Array.isArray(item)) {
      item.forEach((prod) => {
        subTotal += Number(prod?.quantity) * Number(prod?.price);
      });
    } else {
      subTotal += Number(item?.quantity) * Number(item?.price);
    }
    return subTotal;
  };

  const shipping = 15;
  const totalPrice = modifyAmount(
    getSubTotal(isCallFromProduct ? checkOutCartProducts : cartProducts) +
      shipping
  );

  const handlePlaceOrder = () => {
    const payloadProducts = isCallFromProduct
      ? checkOutCartProducts
      : cartProducts;
    const validation = validateForm(form, payloadProducts);
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      const firstError = Object.values(validation)[0];
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: firstError,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    placeOrder();
  };

  function validateForm(values, products) {
    const errs = {};
    if (!values.first_name || values.first_name.trim() === "") {
      errs.first_name = "First name is required";
    }
    if (!values.last_name || values.last_name.trim() === "") {
      errs.last_name = "Last name is required";
    }
    if (!values.email || values.email.trim() === "") {
      errs.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      errs.email = "Email is invalid";
    }
    if (!values.phone || values.phone.trim() === "") {
      errs.phone = "Phone is required";
    }
    if (!values.address || values.address.trim() === "") {
      errs.address = "Address is required";
    }
    if (!values.city || values.city.trim() === "") {
      errs.city = "City/State is required";
    }
    if (!values.country || values.country.trim() === "") {
      errs.country = "Country is required";
    }
    if (!values.zip_code || values.zip_code.trim() === "") {
      errs.zip_code = "Zip code is required";
    }
    if (!products || (Array.isArray(products) && products.length === 0)) {
      errs.products = "No products in cart";
    }
    return errs;
  }

  const placeOrder = async () => {
    try {
      const payloadProducts = isCallFromProduct
        ? checkOutCartProducts
        : cartProducts;
      const formData = new FormData();
      formData.append("first_name", form.first_name || "");
      formData.append("last_name", form.last_name || "");
      formData.append("email", form.email || "");
      formData.append("phone", form.phone || "");
      formData.append("company_name", form.company_name || "");
      formData.append("company_address", form.company_address || "");
      formData.append("address", form.address || "");
      formData.append("apartment", form.apartment || "");
      formData.append("town", form.town || "");
      formData.append("city", form.city || "");
      formData.append("country", form.country || "");
      formData.append("zip_code", form.zip_code || "");
      formData.append("create_account", form.create_account ? "1" : "0");
      formData.append("order_note", form.order_note || "");

      let products = [];
      const subTotal = getSubTotal(payloadProducts);
      formData.append("sub_total", subTotal.toString());

      if (Array.isArray(payloadProducts)) {
        payloadProducts.forEach((product) => {
          products.push({
            product_id: product.id,
            quantity: product.quantity || 1,
          });
        });
      } else {
        products.push({
          product_id: payloadProducts.id,
          quantity: payloadProducts.quantity || 1,
        });
      }

      formData.append("products", JSON.stringify(products[0]));

      const response = await request({
        url: `placeOrder`,
        method: "POST",
        data: formData,
      });

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Order placed successfully!",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Error placing order:", error);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Failed to place order!",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div className="ltn__checkout-area mb-105">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="ltn__checkout-inner">
              {/* login */}
              <div className="ltn__checkout-single-content ltn__returning-customer-wrap">
                {!isAuthenticated && (
                  <h5>
                    Returning customer?{" "}
                    <Link
                      className="ltn__secondary-color"
                      href="#ltn__returning-customer-login"
                      data-bs-toggle="collapse"
                    >
                      Click here to login
                    </Link>
                  </h5>
                )}
                <div
                  id="ltn__returning-customer-login"
                  className="collapse ltn__checkout-single-content-info"
                >
                  <div className="ltn_coupon-code-form ltn__form-box">
                    <p>Please login your accont.</p>
                    <form action="#">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="input-item input-item-name ltn__custom-icon">
                            <input
                              type="text"
                              name="ltn__name"
                              placeholder="Enter your name"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-item input-item-email ltn__custom-icon">
                            <input
                              type="email"
                              name="ltn__email"
                              placeholder="Enter email address"
                            />
                          </div>
                        </div>
                      </div>
                      <button className="btn theme-btn-1 btn-effect-1 text-uppercase">
                        Login
                      </button>
                      <label className="input-info-save mb-0">
                        <input type="checkbox" name="agree" /> Remember me
                      </label>
                      <p className="mt-30">
                        <Link href="/register">Lost your password?</Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
              {/* coupon */}
              <div className="ltn__checkout-single-content ltn__coupon-code-wrap">
                <h5>
                  Have a coupon?{" "}
                  <Link
                    className="ltn__secondary-color"
                    href="#ltn__coupon-code"
                    data-bs-toggle="collapse"
                  >
                    Click here to enter your code
                  </Link>
                </h5>
                <div
                  id="ltn__coupon-code"
                  className="collapse ltn__checkout-single-content-info"
                >
                  <div className="ltn__coupon-code-form">
                    <p>If you have a coupon code, please apply it below.</p>
                    <form action="#">
                      <input
                        type="text"
                        name="coupon-code"
                        placeholder="Coupon code"
                      />
                      <button className="btn theme-btn-2 btn-effect-2 text-uppercase">
                        Apply Coupon
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              {/* buyer info */}
              <div className="ltn__checkout-single-content mt-50">
                <h4 className="title-2">Billing Details</h4>
                <div className="ltn__checkout-single-content-info">
                  <form>
                    <h6>Personal Information</h6>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="input-item input-item-name ltn__custom-icon">
                          <input
                            type="text"
                            name="first_name"
                            placeholder="First name"
                            value={form.first_name}
                            onChange={(e) =>
                              setForm((s) => ({
                                ...s,
                                first_name: e.target.value,
                              }))
                            }
                          />
                          {errors.first_name && (
                            <p className="input-error">{errors.first_name}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-item-name ltn__custom-icon">
                          <input
                            type="text"
                            name="last_name"
                            placeholder="Last name"
                            value={form.last_name}
                            onChange={(e) =>
                              setForm((s) => ({
                                ...s,
                                last_name: e.target.value,
                              }))
                            }
                          />
                          {errors.last_name && (
                            <p className="input-error">{errors.last_name}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-item-email ltn__custom-icon">
                          <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            value={form.email}
                            onChange={(e) =>
                              setForm((s) => ({ ...s, email: e.target.value }))
                            }
                          />
                          {errors.email && (
                            <p className="input-error">{errors.email}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-item-phone ltn__custom-icon">
                          <input
                            type="text"
                            name="phone"
                            placeholder="Phone number"
                            value={form.phone}
                            onChange={(e) =>
                              setForm((s) => ({ ...s, phone: e.target.value }))
                            }
                          />
                          {errors.phone && (
                            <p className="input-error">{errors.phone}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-item-website ltn__custom-icon">
                          <input
                            type="text"
                            name="company_name"
                            placeholder="Company name (optional)"
                            value={form.company_name}
                            onChange={(e) =>
                              setForm((s) => ({
                                ...s,
                                company_name: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-item-website ltn__custom-icon">
                          <input
                            type="text"
                            name="company_address"
                            placeholder="Company address (optional)"
                            value={form.company_address}
                            onChange={(e) =>
                              setForm((s) => ({
                                ...s,
                                company_address: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-4 col-md-6">
                        <h6>Country</h6>
                        <div className="input-item">
                          <select
                            value={form.country}
                            onChange={(e) =>
                              setForm((s) => ({
                                ...s,
                                country: e.target.value,
                              }))
                            }
                          >
                            <option value="">Select Country</option>
                            <option value="Australia">Australia</option>
                            <option value="Canada">Canada</option>
                            <option value="China">China</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="United Kingdom">
                              United Kingdom
                            </option>
                            <option value="United States">United States</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12">
                        <h6>Address</h6>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="input-item">
                              <input
                                type="text"
                                name="address"
                                placeholder="House number and street name"
                                value={form.address}
                                onChange={(e) =>
                                  setForm((s) => ({
                                    ...s,
                                    address: e.target.value,
                                  }))
                                }
                              />
                              {errors.address && (
                                <p className="input-error">{errors.address}</p>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-item">
                              <input
                                type="text"
                                name="apartment"
                                placeholder="Apartment, suite, unit etc. (optional)"
                                value={form.apartment}
                                onChange={(e) =>
                                  setForm((s) => ({
                                    ...s,
                                    apartment: e.target.value,
                                  }))
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-6">
                        <h6>Town / City</h6>
                        <div className="input-item">
                          <input
                            type="text"
                            name="town"
                            placeholder="Town / City"
                            value={form.town}
                            onChange={(e) =>
                              setForm((s) => ({ ...s, town: e.target.value }))
                            }
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <h6>State</h6>
                        <div className="input-item">
                          <input
                            type="text"
                            name="city"
                            placeholder="State"
                            value={form.city}
                            onChange={(e) =>
                              setForm((s) => ({ ...s, city: e.target.value }))
                            }
                          />
                          {errors.city && (
                            <p className="input-error">{errors.city}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <h6>Zip</h6>
                        <div className="input-item">
                          <input
                            type="text"
                            name="zip_code"
                            placeholder="Zip"
                            value={form.zip_code}
                            onChange={(e) =>
                              setForm((s) => ({
                                ...s,
                                zip_code: e.target.value,
                              }))
                            }
                          />
                          {errors.zip_code && (
                            <p className="input-error">{errors.zip_code}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {!isAuthenticated && (
                      <p>
                        <label className="input-info-save mb-0">
                          <input
                            type="checkbox"
                            name="create_account"
                            checked={!!form.create_account}
                            onChange={(e) =>
                              setForm((s) => ({
                                ...s,
                                create_account: e.target.checked,
                              }))
                            }
                          />{" "}
                          Create an account?
                        </label>
                      </p>
                    )}

                    <h6>Order Notes (optional)</h6>
                    <div className="input-item input-item-textarea ltn__custom-icon">
                      <textarea
                        name="ltn__message"
                        placeholder="Notes about your order, e.g. special notes for delivery."
                        value={form.order_note}
                        onChange={(e) =>
                          setForm((s) => ({ ...s, order_note: e.target.value }))
                        }
                      ></textarea>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* payment methods */}
          <div className="col-lg-6">
            <div className="ltn__checkout-payment-method mt-50">
              <h4 className="title-2">Payment Method</h4>

              <div id="checkoutAccordion" className="accordion">
                {/* <!-- card --> */}
                <div className="card ">
                  <h5
                    className="collapsed ltn__card-title"
                    data-bs-toggle="collapse"
                    data-bs-target="#chechoutCollapseOne"
                    aria-expanded="false"
                  >
                    Check payments
                  </h5>
                  <div
                    id="chechoutCollapseOne"
                    className="accordion-collapse collapse"
                    data-bs-parent="#checkoutAccordion"
                  >
                    <div className="card-body">
                      <p>
                        Please send a check to Store Name, Store Street, Store
                        Town, Store State / County, Store Postcode.
                      </p>
                    </div>
                  </div>
                </div>
                {/* <!-- card --> */}
                <div className="card">
                  <h5
                    className="ltn__card-title"
                    data-bs-toggle="collapse"
                    data-bs-target="#chechoutCollapseTwo"
                    aria-expanded="true"
                  >
                    Cash on delivery{" "}
                    <Image
                      src="/img/icons/cash.png"
                      alt="#"
                      width={131}
                      height={110}
                    />
                  </h5>
                  <div
                    id="chechoutCollapseTwo"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#checkoutAccordion"
                  >
                    <div className="card-body">
                      <p>Pay with cash upon delivery.</p>
                    </div>
                  </div>
                </div>
                {/* <!-- card --> */}
                <div className="card">
                  <h5
                    className="ltn__card-title"
                    data-bs-toggle="collapse"
                    data-bs-target="#chechoutCollapseThree"
                    aria-expanded="false"
                  >
                    ApplePay{" "}
                    <Image
                      src="/img/icons/applepay.png"
                      alt="#"
                      width={131}
                      height={110}
                    />
                  </h5>
                  <div
                    id="chechoutCollapseThree"
                    className="accordion-collapse collapse"
                    data-bs-parent="#checkoutAccordion"
                  >
                    <div className="card-body">
                      <p>Apple Pay is the modern way to pay.</p>
                    </div>
                  </div>
                </div>
                {/* <!-- card --> */}
                <div className="card">
                  <h5
                    className="collapsed ltn__card-title"
                    data-bs-toggle="collapse"
                    data-bs-target="#chechoutCollapseFour"
                    aria-expanded="false"
                  >
                    PayPal{" "}
                    <Image
                      src={paymnetImage3}
                      width={319}
                      height={110}
                      style={{ maxWidth: "131px" }}
                      alt="#"
                    />
                  </h5>
                  <div
                    id="chechoutCollapseFour"
                    className="accordion-collapse collapse"
                    data-bs-parent="#checkoutAccordion"
                  >
                    <div className="card-body">
                      <p>
                        Pay via PayPal; you can pay with your credit card if you
                        don’t have a PayPal account.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ltn__payment-note mt-30 mb-30">
                <p>
                  Your personal data will be used to process your order, support
                  your experience throughout this website, and for other
                  purposes described in our privacy policy.
                </p>
              </div>
              {errors.products && (
                <p className="input-error mb-2">{errors.products}</p>
              )}
              <button
                onClick={handlePlaceOrder}
                className="btn theme-btn-1 btn-effect-1 text-uppercase"
                type="submit"
              >
                Place order
              </button>
            </div>
          </div>
          <div className="col-lg-6">
            {isCallFromProduct ? (
              checkOutCartProducts ? (
                <div className="shoping-cart-total mt-50">
                  <h4 className="title-2">Cart Totals</h4>
                  <table className="table">
                    <tbody>
                      <CheckoutProduct product={checkOutCartProducts} />
                      <tr>
                        <td>Shipping and Handling</td>
                        <td>${modifyAmount(shipping)}</td>
                      </tr>
                      <tr>
                        <td>Vat</td>
                        <td>$00.00</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Order Total</strong>
                        </td>
                        <td>
                          <strong>${totalPrice}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <Nodata text="No Product!" />
              )
            ) : Array.isArray(cartProducts) && cartProducts.length > 0 ? (
              <div className="shoping-cart-total mt-50">
                <h4 className="title-2">Cart Totals</h4>
                <table className="table">
                  <tbody>
                    {cartProducts.map((product, idx) => (
                      <CheckoutProduct key={idx} product={product} />
                    ))}
                    <tr>
                      <td>Shipping and Handling</td>
                      <td>${modifyAmount(shipping)}</td>
                    </tr>
                    <tr>
                      <td>Vat</td>
                      <td>$00.00</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Order Total</strong>
                      </td>
                      <td>
                        <strong>${totalPrice}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <Nodata text="No Product!" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPrimary;
