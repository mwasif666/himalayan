"use client";
import { useEffect, useState } from "react";
import { useCommonContext } from "@/providers/CommonContext";
import { useWishlistContext } from "@/providers/WshlistContext";
import { FaPlus } from "react-icons/fa";
import { PiMinusBold } from "react-icons/pi";
import { addItemsToLocalStorage } from "@/app/redux/features/AddtoCart/AddtoCartSlice";
import { useDispatch } from "react-redux";
import countDiscount from "@/libs/countDiscount";
import modifyAmount from "@/libs/modifyAmount";
import Link from "next/link";
import moment from "moment";
import countCommentLength from "@/libs/countCommentLength";
import Swal from "sweetalert2";
import ProductRating from "../cards/ProductRating";
import styles from "../../../style/ProductDetailRightAsync.module.css";

const ProductDetailsRightAsync = ({ product }) => {
  const { name, title, price, reviews, discount, disc, size, color } = product;

  const value = useCommonContext();
  const { addProductToWishlist } = useWishlistContext();

  const [quantity, setQuantity] = useState(1);
  const [currentColor, setCurrentColor] = useState(color);
  const [currentSize, setCurrentSize] = useState(size?.toLowerCase());
  const [purchaseDate, setPurchaseDate] = useState(null);

  const { type } = value ? value : {};
  const { netPrice } = countDiscount(price, discount || disc);
  const netPriceModified = modifyAmount(netPrice);
  const priceModified = modifyAmount(price);
  const reviewsLength = countCommentLength(reviews);
  const purchaseDateMilliseconds = moment(purchaseDate)?.valueOf();
  const dispatch = useDispatch();

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

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const addToCart = (product) => {
    dispatch(addItemsToLocalStorage({ product }));
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
      {/* ratings */}
      <>
        <ProductRating reviews={reviews} isProductDetail={true} />
      </>
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
