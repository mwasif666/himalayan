"use client";
import React, { useState } from "react";
import { useWishlistContext } from "@/providers/WshlistContext";
import { useProductContext } from "@/providers/ProductContext";
import { addItemsToLocalStorage } from "@/app/redux/features/AddtoCart/AddtoCartSlice";
import { useDispatch } from "react-redux";
import countDiscount from "@/libs/countDiscount";
import modifyAmount from "@/libs/modifyAmount";
import Image from "next/image";
import Link from "next/link";
import CheckoutDetailModal from "@/components/shared/modals/CheckoutDetailModal";
import Swal from "sweetalert2";
import ProductRating from "./ProductRating";


const ProductCardPrimary = ({ product}) => {
  const { name, price, discount, id, reviews} = product
  ? product
  : {};
  // const {userId} = useAuth();
  const dispatch = useDispatch();
  const priceModified = modifyAmount(price);
  const { setCurrentProduct } = useProductContext();
  const { netPrice } = countDiscount(price, discount);
  const netPriceModified = modifyAmount(netPrice);
  const { addToWhishlist } = useWishlistContext();
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
        {/* {discount > 0  (
          <div className="product-badge">
            <ul>
              {discount > 0  ? (
                <li className="sale-badge">-{discount}%</li>
              ) : discount > 0 === "sale" ? (
                <li className="new-badge">{status}</li>
              ) : (
                <li className="sale-badge">{status}</li>
              )}
            </ul>
          </div>
        ) : (
          ""
        )} */}
         {discount > 0  ? (
          <div className="product-badge"><ul><li className="sale-badge">-{discount}%</li></ul></div>
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
       <ProductRating reviews={reviews} isProductDetail={false}/>

        <h2 className="product-title">
          <Link href={`/products/${id}`}>{name}</Link>
        </h2>
        <div className="product-price">
         {discount > 0 ? <><span>${netPriceModified}</span> <del>${priceModified}</del> </> :  <span>${netPriceModified}</span>}
        </div>
      </div>

      <CheckoutDetailModal open={open} setOpen={setOpen} product={product} />
    </div>
  );
};

export default ProductCardPrimary;
