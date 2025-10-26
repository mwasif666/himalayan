import React, { useState } from "react";
import { useAuth } from "@/providers/AuthContext";
import { request } from "@/api/axiosInstance";
import ProductRating from "../cards/ProductRating";
import Link from "next/link";
import Swal from "sweetalert2";
import styles from "../../../style/GeneralClasses.module.css";

const ProductDetailsReviews = ({ product, reviews }) => {
  const { userId } = useAuth();
  const [formData, setFormData] = useState({
    rating: 0,
    review: "",
    name: "",
    email: "",
    website: "",
    phone: "",
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateReview = () => {
    let error = {};

    if (formData.rating === 0) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Please provide a rating",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      error.rating = "Please provide a rating";
    }
    if (formData.review.trim() === "") {
      error.review = "Please provide a review";
    }

    if (formData.email && formData.email.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        error.email = "Please enter a valid email";
      }
    }

    if (formData.website && formData.website.trim() !== "") {
      const urlRegex = /^(https?:\/\/)?([^\s.]+\.\S{2,})$/;
      if (!urlRegex.test(formData.website.trim())) {
        error.website = "Please enter a valid website URL";
      }
    }

    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const appendFormData = () => {
    const data = new FormData();
    data.append("user_id", userId);
    data.append("product_id", product.id);
    data.append("rating", formData.rating);
    data.append("review", formData.review);
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("website", formData.website);
    data.append("phone", formData.phone);
    return data;
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!validateReview()) return;
    try {
      setReviewSubmitted(true);

      await request({
        url: `SaveProductReview`,
        method: "POST",
        data: appendFormData(),
      });

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Review submitted successfully!",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      setFormData({
        rating: 0,
        review: "",
        name: "",
        email: "",
        website: "",
        phone: "",
      });
    } catch (error) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Failed to submit review. Please try again.",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } finally {
      setReviewSubmitted(false);
    }
  };

  return (
    <div className="ltn__shop-details-tab-content-inner">
      <h4 className="title-2">Customer Reviews</h4>
      <ProductRating reviews={reviews} isProductDetail={false} />
      <hr />

      {userId ? <div className="ltn__comment-reply-area ltn__form-box mb-30">
        <form onSubmit={submitReview}>
          <h4 className="title-2">Add a Review</h4>

          <div className="mb-30">
            <div className="add-a-review">
              <h6>Your Ratings:</h6>
              <div className="product-ratting">
                <ul>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <li
                      key={star}
                      onClick={() => setFormData({ ...formData, rating: star })}
                    >
                      <Link href="#">
                        <i
                          className={
                            star <= formData.rating
                              ? "fas fa-star"
                              : "far fa-star"
                          }
                        ></i>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="input-item input-item-textarea ltn__custom-icon">
            <textarea
              placeholder="Type your reviews...."
              value={formData.review}
              onChange={(e) =>
                setFormData({ ...formData, review: e.target.value })
              }
            ></textarea>
            {errors.review && (
              <p className={styles.validationError}>{errors.review}</p>
            )}
          </div>

          <div className="input-item input-item-name ltn__custom-icon">
            <input
              type="text"
              placeholder="Type your name...."
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="input-item input-item-email ltn__custom-icon">
            <input
              type="email"
              placeholder="Type your email...."
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className={styles.validationError}>{errors.email}</p>
            )}
          </div>

          <div className="input-item input-item-website ltn__custom-icon">
            <input
              type="text"
              placeholder="Type your website...."
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
            />
            {errors.website && (
              <p className={styles.validationError}>{errors.website}</p>
            )}
          </div>

          <div className="btn-wrapper">
            <button
              className="btn theme-btn-1 btn-effect-1 text-uppercase"
              type="submit"
              disabled={reviewSubmitted}
            >
              {reviewSubmitted ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div> : <p>Please <Link href="/login"><strong>login</strong></Link> to submit a review.</p>}
    </div>
  );
};

export default ProductDetailsReviews;
