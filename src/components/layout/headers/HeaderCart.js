"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteItemFromLocalStorage } from "@/app/redux/features/AddtoCart/AddtoCartSlice";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import ButtonSecondary from "@/components/shared/buttons/ButtonSecondary";
import Nodata from "@/components/shared/no-data/Nodata";
import countDiscount from "@/libs/countDiscount";
import countTotalPrice from "@/libs/countTotalPrice";
import modifyAmount from "@/libs/modifyAmount";
import Image from "next/image";
import Link from "next/link";

const HeaderCart = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.AddtoCart?.cartItems);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }
  
  const totalProduct = mounted ? cartProducts?.length : 0;
  const totalPrice = mounted ? countTotalPrice(cartProducts) : 0;

  return (
    <div
      id="ltn__utilize-cart-menu"
      className="ltn__utilize ltn__utilize-cart-menu"
    >
      <div className="ltn__utilize-menu-inner ltn__scrollbar">
        <div className="ltn__utilize-menu-head">
          <span className="ltn__utilize-menu-title">Cart</span>
          <button className="ltn__utilize-close">×</button>
        </div>
        <div className="mini-cart-product-area ltn__scrollbar">
          {!totalProduct ? (
            <Nodata text={"Empty Cart!"} />
          ) : (
            cartProducts?.map((product, idx) => {
              const { netPrice } = countDiscount(
                product.price,
                product.discount
              );
              return (
                <div
                  key={product.id || idx}
                  className="mini-cart-item clearfix"
                >
                  <div className="mini-cart-img">
                    <Link href={`/products/${product.id}`}>
                      <Image
                        src={
                          product?.documents?.[0]?.encoded_name
                            ? `https://himaliyansalt.innovationpixel.com/storage/app/public/products/${product.documents[0].encoded_name}`
                            : "/img/placeholder-product.jpg"
                        }
                        alt={product.name || "Product"}
                        width={100}
                        height={100}
                        style={{ width: "100%", height: "auto" }}
                      />
                    </Link>
                    <span
                      onClick={() =>
                        dispatch(deleteItemFromLocalStorage({ product }))
                      }
                      className="mini-cart-item-delete"
                    >
                      <i className="icon-cancel"></i>
                    </span>
                  </div>
                  <div className="mini-cart-info">
                    <h6>
                      <Link href={`/products/${product.id}`}>
                        {product.name?.length > 22
                          ? `${product.name?.slice(0, 22)}...`
                          : product.name}
                      </Link>
                    </h6>
                    <span className="mini-cart-quantity">
                      {product.quantity} x ${modifyAmount(netPrice)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
          {cartProducts.length > 0 && (
        <div className="mini-cart-footer">
            
              <div className="mini-cart-sub-total">
                <h5>
                  Subtotal: <span>${totalPrice.toFixed(2)}</span>
                </h5>
              </div>
              <div className="btn-wrapper">
                <ButtonPrimary text={"View Cart"} path={"/cart"} />
                <ButtonSecondary text={"Checkout"} path={"/checkout"} />
              </div>
            
          <p>Free Shipping on All Orders Over $100!</p>
        </div>
          )}
      </div>
    </div>
  );
};

export default HeaderCart;
