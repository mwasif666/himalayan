"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import modifyNumber from "@/libs/modifyNumber";
import styles from "../../../style/CheckoutDetail.module.css";
import { useWishlistContext } from "@/providers/WshlistContext";
import countDiscount from "@/libs/countDiscount";
import modifyAmount from "@/libs/modifyAmount";
import { useDispatch } from "react-redux";
import { addItemsToLocalStorage } from "@/app/redux/features/AddtoCart/AddtoCartSlice";
import Swal from "sweetalert2";

const CheckoutDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addProductToWishlist } = useWishlistContext();
  const { netPrice } = countDiscount(product?.price, product?.discount);
  const netPriceModified = modifyAmount(netPrice);
  const priceModified = modifyAmount(product?.price);

  const dispatch = useDispatch();

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
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
    <div className="flex flex-col md:flex-row w-full">
      <div className="w-full md:w-1/2 p-4 flex justify-center items-center">
        <div className="relative w-full bg-gray-100 overflow-hidden">
          <Image
            src={
              `https://himaliyansalt.innovationpixel.com/storage/app/public/products/${product?.documents?.[0]?.encoded_name}` ??
              `/img/banner/banner.png`
            }
            alt={product?.name}
            width={1000}
            height={1000}
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 p-4">
        <div className="product-ratting">
          <ul>
            <li>
              <Link href="#">
                <i className="fas fa-star"></i>
              </Link>
            </li>{" "}
            <li>
              <Link href="#">
                <i className="fas fa-star"></i>
              </Link>
            </li>{" "}
            <li>
              <Link href="#">
                <i className="fas fa-star"></i>
              </Link>
            </li>{" "}
            <li>
              <Link href="#">
                <i className="fas fa-star-half-alt"></i>
              </Link>
            </li>{" "}
            <li>
              <Link href="#">
                <i className="far fa-star"></i>
              </Link>
            </li>{" "}
            <li className="review-total">
              <Link href="#"> ( {modifyNumber(0)} Reviews )</Link>
            </li>
          </ul>
        </div>
        <h2 className="text-2xl font-bold mb-2">{product?.name}</h2>

        <div className="text-2xl font-semibold text-[#592D48] mb-4">
          <span>${netPriceModified}</span>{" "}
          <del className="text-[#9f8595]">${priceModified}</del>
        </div>

        <div className="flex items-center mb-6">
          <span className="mr-3">Quantity:</span>
          <div className="flex items-center border-1 border-black">
            <button
              onClick={decreaseQuantity}
              className="px-3 py-1 text-lg font-bold"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              className="w-16 text-center border-x outline-none"
            />
            <button
              onClick={increaseQuantity}
              className="px-3 py-1 text-lg font-bold"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-[#592D48] text-white py-3 rounded-md mb-3 hover:bg-[#592D48] transition-colors"
        >
          ADD TO CART
        </button>

        <div className="flex justify-between items-center">
          <ul className={styles.whislist}>
            <li>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  addProductToWishlist(productToSave);
                }}
                href="#"
                className=""
                title="Wishlist"
                data-bs-toggle="modal"
                data-bs-target="#liton_wishlist_modal"
              >
                <i className="far fa-heart"></i> <span>Add to Wishlist</span>
              </Link>
            </li>{" "}
          </ul>
          <ul className={styles.share}>
            <li>Share:</li>{" "}
            <li>
              <Link href="https://www.facebook.com" title="Facebook">
                <i className="fab fa-facebook-f"></i>
              </Link>
            </li>{" "}
            <li>
              <Link href="https://x.com" title="Twitter">
                <i className="fab fa-twitter"></i>
              </Link>
            </li>{" "}
            <li>
              <Link href="https://www.linkedin.com" title="Linkedin">
                <i className="fab fa-linkedin"></i>
              </Link>
            </li>{" "}
            <li>
              <Link href="https://www.instagram.com" title="Instagram">
                <i className="fab fa-instagram"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetail;
