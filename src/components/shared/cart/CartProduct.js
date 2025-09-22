/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { deleteItemFromLocalStorage } from "@/app/redux/features/AddtoCart/AddtoCartSlice";
import countDiscount from "@/libs/countDiscount";
import countTotalPrice from "@/libs/countTotalPrice";
import modifyAmount from "@/libs/modifyAmount";
import sliceText from "@/libs/sliceText";
import { useCartContext } from "@/providers/CartContext";
import { useProductContext } from "@/providers/ProductContext";
import { useWishlistContext } from "@/providers/WshlistContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const CartProduct = ({
  product,
  setUpdateProducts,
  updateProducts,
  setIsUpdate,
  isWishlist,
}) => {
  const {
    id,
    name,
    price,
    quantity: quantity1,
    discount,
    documents,
    color,
  } = product;
  const dispatch = useDispatch();
  
  // dom referance
  const inputRef = useRef(null);
  // hooks
  const { addProductToCart } = useCartContext();
  const { deleteProductFromWishlist } = useWishlistContext();
  const [quantity, setQuantity] = useState(quantity1);
  const { setCurrentProduct } = useProductContext();
  // variables
  const { netPrice } = countDiscount(price, discount);
  const totalPrice = countTotalPrice([{ ...product, quantity }]);
  const netPriceModified = modifyAmount(netPrice);
  const totalPiceModified = modifyAmount(totalPrice);
  const isQuantiy = quantity > 1;

  //   get quantity
  useEffect(() => {
    if (!isWishlist) {
      const inputParent = inputRef.current;
      const input = inputParent.querySelector("input");
      setTimeout(() => {
        const increament = inputParent.querySelector(".inc");
        const decreament = inputParent.querySelector(".dec");

        increament.addEventListener("click", () => {
          setQuantity(parseInt(input.value));
          setIsUpdate(true);
        });
        decreament.addEventListener("click", () => {
          setQuantity(parseInt(input.value));
          setIsUpdate(true);
        });
      }, 500);
    }
  }, [isWishlist]);
  // handle updated products
  useEffect(() => {
    if (!isWishlist) {
      const newUptedProducts = [...updateProducts]?.map((product) =>
        id === product?.id ? { ...product, quantity } : product
      );
      setUpdateProducts(newUptedProducts);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWishlist, quantity]);
  return (
    <tr onMouseEnter={() => setCurrentProduct(product)}>
      <td
        className="cart-product-remove"
        onClick={() =>dispatch(deleteItemFromLocalStorage(product))}
      >
        x
      </td>
      <td className="cart-product-image">
        <Link href={`/products/${id}`}>
          <Image
            src={
              documents?.[0]?.encoded_name
                ? `https://himaliyansalt.innovationpixel.com/storage/app/public/products/${documents[0].encoded_name}`
                : "/img/placeholder-product.jpg"
            }
            alt={name || "Product"}
            height={1000}
            width={1000}
          />
        </Link>
      </td>
      <td className="cart-product-info">
        <h4>
          <Link href={`/products/${id}`}>{sliceText(name, 30)}</Link>
        </h4>
      </td>
      <td className="cart-product-price">${netPriceModified}</td>
      {isWishlist ? (
        <td className="cart-product-stock">In Stock</td>
      ) : (
        <td className="cart-product-quantity">
          <div className="cart-plus-minus" ref={inputRef}>
            <input
              value={quantity}
              type="text"
              name="qtybutton"
              className="cart-plus-minus-box"
              onChange={(e) => {
                setQuantity(
                  !parseInt(e.target.value) ? 1 : parseInt(e.target.value)
                );
                setIsUpdate(true);
              }}
            />
          </div>
        </td>
      )}

      {isWishlist ? (
        <td
          className="cart-product-add-cart"
          onClick={() =>
            addProductToCart({
              ...product,
              quantity,
            })
          }
        >
          <Link
            className="submit-button-1"
            href="#"
            title="Add to Cart"
            data-bs-toggle="modal"
            data-bs-target="#add_to_cart_modal"
          >
            Add to Cart
          </Link>
        </td>
      ) : (
        <td className="cart-product-subtotal">${totalPiceModified}</td>
      )}
    </tr>
  );
};

export default CartProduct;
