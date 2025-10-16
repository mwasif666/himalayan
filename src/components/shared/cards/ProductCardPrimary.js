"use client";
import { request } from "@/api/axiosInstance";
import countDiscount from "@/libs/countDiscount";
import modifyAmount from "@/libs/modifyAmount";
import { useCartContext } from "@/providers/CartContext";
import { useProductContext } from "@/providers/ProductContext";
import { useWishlistContext } from "@/providers/WshlistContext";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import CheckoutDetailModal from "@/components/shared/modals/CheckoutDetailModal";
import { addItemsToLocalStorage } from "@/app/redux/features/AddtoCart/AddtoCartSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";


const ProductCardPrimary = ({ product, isShowDisc=true}) => {
  const { name, price, discount, id, status, color } = product
  ? product
  : {};
  // const {userId} = useAuth();
  const { setCurrentProduct } = useProductContext();
  const { netPrice } = countDiscount(price, discount);
  const netPriceModified = modifyAmount(netPrice);
  const priceModified = modifyAmount(price);
  const { addToWhishlist } = useWishlistContext();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const addToCart = (product)=>{
    dispatch(addItemsToLocalStorage({product}));
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: `${product?.name} added to cart!`,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }

  return (
    <div
      className="ltn__product-item ltn__product-item-3 text-center"
      onMouseEnter={() => setCurrentProduct(product)}
    >
      <div className="product-img">
        <Link href={`/products/${id}`}>
          <Image
            src={`https://himaliyansalt.innovationpixel.com/storage/app/public/products/${product?.documents?.[0]?.encoded_name}` ?? `/img/banner/banner.png`}
            alt={name}
            width={1000}
            height={1000}
            // placeholder="blur"
          />
        </Link>
        {status || isShowDisc ? (
          <div className="product-badge">
            <ul>
              {isShowDisc ? (
                <li className="sale-badge">-{discount}%</li>
              ) : status === "sale" ? (
                <li className="new-badge">{status}</li>
              ) : (
                <li className="sale-badge">{status}</li>
              )}
            </ul>
          </div>
        ) : (
          ""
        )}
        <div className="product-hover-action">
          <ul>
            <li>
              <Link
                href="#"
                title="Quick View"
                onClick={(e) => {
                    e.preventDefault();
                    setOpen(true);
                  }}
              >
                <i className="far fa-eye"></i>
              </Link>
            </li>{" "}
            <li>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  addToCart({ ...product, quantity: 1 });
                }}
                href="#"
                title="Add to Cart"
                data-bs-toggle="modal"
                data-bs-target="#add_to_cart_modal"
              >
                <i className="fas fa-shopping-cart"></i>
              </Link>
            </li>{" "}
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
                <i className="far fa-heart"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="product-info">
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
            </li>
          </ul>
        </div>
        <h2 className="product-title">
          <Link href={`/products/${id}`}>{name}</Link>
        </h2>
        <div className="product-price">
          <span>${netPriceModified}</span> <del>${priceModified}</del>
        </div>
      </div>

      <CheckoutDetailModal open={open} setOpen={setOpen} product={product} />
    </div>
  );
};

export default ProductCardPrimary;
