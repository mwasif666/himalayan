"use client";
import useSweetAlert from "@/hooks/useSweetAlert";
import addItemsToLocalstorage from "@/libs/addItemsToLocalstorage";
import getItemsFromLocalstorage from "@/libs/getItemsFromLocalstorage";
import { createContext, useContext, useEffect, useState } from "react";

const cartContext = createContext(null);

const CartContextProvider = ({ children }) => {
  const [cartStatus, setCartStatus] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const creteAlert = useSweetAlert();

  useEffect(() => {
    const cartProductFromLocalStorage = getItemsFromLocalstorage("cart");
    if (cartProductFromLocalStorage) {
      setCartProducts(cartProductFromLocalStorage);
    }
  }, []);

  // Add product to cart
  const addProductToCart = (currentProduct, isDecreament, isTotalQuantity) => {
    const { id: currentId, title: currentTitle } = currentProduct;

    const modifyableProduct = cartProducts?.find(
      ({ id, title }) => id === currentId && title === currentTitle
    );

    const previousQuantity = modifyableProduct?.quantity || 0;
    const currentQuantity = currentProduct?.quantity;

    let currentProducts;

    if (isTotalQuantity) {
      // Update quantity directly
      currentProducts = cartProducts?.map((product) =>
        product.id === currentId && product?.title === currentTitle
          ? {
              ...product,
              quantity: currentProduct.quantity,
            }
          : product
      );

      if (previousQuantity < currentQuantity) {
        setCartStatus("increased");
      } else if (previousQuantity > currentQuantity) {
        setCartStatus("decreased");
      }
    } else {
      const isAlreadyExist = modifyableProduct ? true : false;

      if (isAlreadyExist) {
        // Update existing product quantity
        currentProducts = cartProducts?.map((product) =>
          product.id === currentId && product?.title === currentTitle
            ? {
                ...product,
                quantity: isDecreament
                  ? Math.max(1, product.quantity - currentProduct?.quantity) // Ensure quantity doesn't go below 1
                  : product.quantity + currentProduct?.quantity,
              }
            : product
        );

        if (isDecreament) {
          setCartStatus("decreased");
        } else {
          setCartStatus("increased");
        }
      } else {
        // Add new product to cart
        currentProducts = [...cartProducts, { ...currentProduct, quantity: 1 }];
        setCartStatus("added");
        creteAlert("success", "Success! Added to cart.");
      }
    }

    setCartProducts(currentProducts);
    addItemsToLocalstorage("cart", currentProducts);
  };

  // Delete product from cart
  const deleteProductFromCart = (currentId, currentTitle) => {
    const currentProducts = cartProducts?.filter(
      ({ id, title }) => id !== currentId || title !== currentTitle
    );
    setCartProducts(currentProducts);
    addItemsToLocalstorage("cart", currentProducts);
    creteAlert("success", "Success! Removed from cart.");
    setCartStatus("deleted");
  };

  // Clear entire cart
  const clearCart = () => {
    setCartProducts([]);
    addItemsToLocalstorage("cart", []);
    setCartStatus("cleared");
  };

  return (
    <cartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProductToCart,
        deleteProductFromCart,
        clearCart,
        cartStatus,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export const useCartContext = () => {
  const value = useContext(cartContext);
  return value;
};

export default CartContextProvider;
