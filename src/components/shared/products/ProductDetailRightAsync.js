"use client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { PiMinusBold } from "react-icons/pi";
import { addItemsToLocalStorage } from "@/app/redux/features/AddtoCart/AddtoCartSlice";
import { useWishlistContext } from "@/providers/WshlistContext";
import { useDispatch } from "react-redux";
import countDiscount from "@/libs/countDiscount";
import modifyAmount from "@/libs/modifyAmount";
import Link from "next/link";
import Swal from "sweetalert2";
import ProductRating from "../cards/ProductRating";
import styles from "../../../style/ProductDetailRightAsync.module.css";

const ProductDetailsRightAsync = ({ product }) => {
  const { name, title, price, reviews, discount } = product;

  const { addToWhishlist } = useWishlistContext();
  const { netPrice } = countDiscount(price, discount);
  const netPriceModified = modifyAmount(netPrice);
  const priceModified = modifyAmount(price);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  
  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const addToCart = (product) => {
    dispatch(addItemsToLocalStorage({ product, quantity }));
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: `${product?.name} added to cart!`,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };

  return (
    <div className="modal-product-info shop-details-info pl-0" id="details">
      <>
        <ProductRating reviews={reviews} isProductDetail={true} />
      </>
      <h3>{name || title}</h3>

      <div className="product-price text-nowrap">
        <span className={styles.netPrice}>${netPriceModified}</span>
        {discount > 0 && (
          <del className={styles.discount_price}>${priceModified}</del>
        )}
      </div>
      <div className="ltn__product-details-menu-2">
        <ul>
          <li>
            <div className="cart-plus-minus d-flex align-items-center justify-content-center">
              <button
                type="button"
                className="cart-plus-minus-box"
                onClick={handleDecrement}
              >
                <PiMinusBold />
              </button>
              <input
                type="text"
                value={quantity}
                onChange={(e) => {
                  const value = e.target.value;
                  let newQuantity;
                  if (value === "") {
                    newQuantity = value;
                  } else {
                    const numberValue = Number(value);
                    newQuantity = numberValue > 0 ? numberValue : 1;
                  }
                  setQuantity(newQuantity);
                }}
                className="cart-plus-minus-box text-center mx-2"
                style={{ width: "60px" }}
              />
              <button
                type="button"
                className="cart-plus-minus-box"
                onClick={handleIncrement}
              >
                <FaPlus />
              </button>
            </div>
          </li>
          <li>
            <Link
              onClick={(e) => {
                e.preventDefault();
                addToCart({ ...product, quantity });
              }}
              href="#"
              className="theme-btn-1 btn btn-effect-1"
              title="Add to Cart"
            >
              <i className="fas fa-shopping-cart"></i> <span>ADD TO CART</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="ltn__product-details-menu-3">
        <ul>
          <li>
            <Link
              onClick={(e) => {
                e.preventDefault();
                addToWhishlist({ ...product, quantity: 1 });
              }}
              href="#"
              title="Wishlist"
              data-bs-toggle="modal"
              data-bs-target="#liton_wishlist_modal"
            >
              <i className="far fa-heart"></i> <span>Add to Wishlist</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDetailsRightAsync;
