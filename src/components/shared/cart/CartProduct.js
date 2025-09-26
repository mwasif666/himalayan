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
  const { deleteWhislist, getAllWhislist } = useWishlistContext();
  const [quantity, setQuantity] = useState(quantity1);
  const { setCurrentProduct } = useProductContext();
  // variables
  const { netPrice } = countDiscount(price, discount);
  const totalPrice = countTotalPrice([{ ...product, quantity }]);
  const netPriceModified = modifyAmount(netPrice);
  const totalPiceModified = modifyAmount(totalPrice);
  const isQuantiy = quantity > 1;

  useEffect(() => {
    if (!isWishlist) {
      const newUptedProducts = [...updateProducts]?.map((product) =>
        id === product?.id ? { ...product, quantity } : product
      );
      setUpdateProducts(newUptedProducts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWishlist, quantity]);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
    setIsUpdate(true);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    setIsUpdate(true);
  };

  const deleteProduct = (product) => {
    if (isWishlist) {
      deleteWhislist(product);
      getAllWhislist()
    } else {
      dispatch(deleteItemFromLocalStorage({ product }));
    }
  };

  return (
    <tr onMouseEnter={() => setCurrentProduct(product)}>
      <td
        className="cart-product-remove"
        onClick={() => deleteProduct(product)}
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
          <div className="flex items-center w-fit border-1 border-black">
            <button
              onClick={decreaseQuantity}
              className="px-3 py-2 text-lg font-bold text-gray-800 transition"
            >
              −
            </button>

            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-16 text-center border-x border-black outline-none focus:ring-1 focus:ring-black"
            />

            <button
              onClick={increaseQuantity}
              className="px-3 py-2 text-lg font-bold text-gray-800 transition"
            >
              +
            </button>
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
