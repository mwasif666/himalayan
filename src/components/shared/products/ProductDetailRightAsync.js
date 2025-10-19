"use client";
import controlModal from "@/libs/controlModal";
import countDiscount from "@/libs/countDiscount";
import modifyAmount from "@/libs/modifyAmount";
import { useCartContext } from "@/providers/CartContext";
import { useWishlistContext } from "@/providers/WshlistContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCommonContext } from "@/providers/CommonContext";
import moment from "moment";
import countCommentLength from "@/libs/countCommentLength";
import modifyNumber from "@/libs/modifyNumber";
import { FaPlus } from "react-icons/fa";
import { PiMinusBold } from "react-icons/pi";

const ProductDetailsRightAsync = ({ product }) => {
  const { name, title, price, reviews, discount, disc, size, color } = product;

  const value = useCommonContext();
  const { addProductToCart } = useCartContext();
  const { addProductToWishlist } = useWishlistContext();

  // states
  const [quantity, setQuantity] = useState(1);
  const [currentColor, setCurrentColor] = useState(color);
  const [currentSize, setCurrentSize] = useState(size?.toLowerCase());
  const [purchaseDate, setPurchaseDate] = useState(null);

  // variables
  const { type } = value ? value : {};
  const { netPrice } = countDiscount(price, discount || disc);
  const netPriceModified = modifyAmount(netPrice);
  const priceModified = modifyAmount(price);
  const reviewsLength = countCommentLength(reviews);
  const purchaseDateMilliseconds = moment(purchaseDate)?.valueOf();

  const productToSave = {
    ...product,
    color: currentColor,
    size: currentSize,
    quantity,
    purchaseDate: purchaseDateMilliseconds,
  };

  useEffect(() => {
    const currentDate = Date.now();
    const calanderFormat = moment(currentDate).format("YYYY-MM-DD");
    setPurchaseDate(calanderFormat);
  }, []);

  // ✅ Handle Increment and Decrement
  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="modal-product-info shop-details-info pl-0" id="details">
      {/* ratings */}
      <div className="product-ratting">
        <ul>
          <li>
            <Link href="#">
              <i className="fas fa-star"></i>
            </Link>
          </li>
          <li>
            <Link href="#">
              <i className="fas fa-star"></i>
            </Link>
          </li>
          <li>
            <Link href="#">
              <i className="fas fa-star"></i>
            </Link>
          </li>
          <li>
            <Link href="#">
              <i className="fas fa-star-half-alt"></i>
            </Link>
          </li>
          <li>
            <Link href="#">
              <i className="far fa-star"></i>
            </Link>
          </li>
          <li className="review-total">
            <Link href="#">({modifyNumber(reviewsLength)} Reviews)</Link>
          </li>
        </ul>
      </div>

      {/* title */}
      <h3
        style={{
          fontSize: "25px",
        }}
      >
        {name || title}
      </h3>

      {/* price */}
      <div className="product-price text-nowrap">
        <span
          style={{
            fontSize: "35px",
          }}
        >
          ${netPriceModified}
        </span>{" "}
        <del
          style={{
            fontSize: "25px",
          }}
        >
          ${priceModified}
        </del>
      </div>

      {/* add to cart */}
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
                onChange={(e) =>
                  setQuantity(
                    Number(e.target.value) > 0 ? Number(e.target.value) : 1
                  )
                }
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
                addProductToCart(productToSave);
              }}
              href="#"
              className="theme-btn-1 btn btn-effect-1"
              title="Add to Cart"
              data-bs-toggle="modal"
              data-bs-target="#add_to_cart_modal"
            >
              <i className="fas fa-shopping-cart"></i> <span>ADD TO CART</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* add to wishlist */}
      <div className="ltn__product-details-menu-3">
        <ul>
          <li>
            <Link
              onClick={(e) => {
                e.preventDefault();
                addProductToWishlist(productToSave);
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

      <hr />

      {/* safe checkout section */}
      {type ? (
        <>
          {/* <hr />
          <div className="ltn__safe-checkout">
            <h5>Guaranteed Safe Checkout</h5>
            <Image
              src="/img/icons/payment-2.png"
              alt="Payment Image"
              height={35}
              width={350}
            />
          </div> */}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductDetailsRightAsync;
