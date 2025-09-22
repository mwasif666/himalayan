"use client";
import useSweetAlert from "@/hooks/useSweetAlert";
import addItemsToLocalstorage from "@/libs/addItemsToLocalstorage";
import getItemsFromLocalstorage from "@/libs/getItemsFromLocalstorage";
import { createContext, useContext, useEffect, useState } from "react";
import getAllProducts from "@/libs/getAllProducts";
import { request } from "@/api/axiosInstance";
import axios from "axios";

const wishlistContext = createContext(null);
const WishlistContextProvider = ({ children }) => {
  const [wishlistStatus, setWishlistStatus] = useState(null);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const creteAlert = useSweetAlert();
  useEffect(() => {
    const demoProducts = getAllProducts()
      ?.slice(0, 2)
      ?.map((product, idx) => ({ ...product, quantity: 1 }));

    const wishlistProductFromLocalStorage =
      getItemsFromLocalstorage("wishlist");

    if (!wishlistProductFromLocalStorage) {
      setWishlistProducts(demoProducts);
      addItemsToLocalstorage("wishlist", demoProducts);
    } else [setWishlistProducts(wishlistProductFromLocalStorage)];
  }, []);
  // add  product from localstorage cart
  const addProductToWishlist = (currentProduct) => {
    const { id: currentId, title: currentTitle } = currentProduct;

    const modifyableProduct = wishlistProducts?.find(
      ({ id, title }) => id === currentId && title === currentTitle
    );

    const isAlreadyExist = modifyableProduct ? true : false;

    if (isAlreadyExist) {
      // creteAlert("error", "Failed ! Already exist in wishlist.");
      setWishlistStatus("exist");
    } else {
      let currentProducts = [...wishlistProducts, currentProduct];
      setWishlistProducts(currentProducts);
      addItemsToLocalstorage("wishlist", currentProducts);
      // creteAlert("success", "Success! added to wishlist.");
      setWishlistStatus("added");
    }
  };

  // delete product from localstorage cart
  const deleteProductFromWishlist = (currentId, currentTitle) => {
    const currentProducts = wishlistProducts?.filter(
      ({ id, title }) => id !== currentId || title !== currentTitle
    );
    setWishlistProducts(currentProducts);
    addItemsToLocalstorage("wishlist", currentProducts);
    creteAlert("success", "Success! deleted from wishlist.");
    setWishlistStatus("deleted");
  };

  const [loading, setLoading] = useState(false);
  const userId = 1;

  const addToWhishlist = async (prod) => {
    const formData = new FormData();
    formData.append("product_id", prod.id);
    formData.append("user_id", userId);
    try {
      setLoading(true);
      const response = await axios.post(
        "https://himaliyansalt.innovationpixel.com/public/AddProductToWishlist",
        formData
      );
      if (response.data.message === "Product already in wishlist.") {
        setWishlistStatus("exist");
      } else {
        setWishlistStatus("added");
      }
    } catch (error) {
      setWishlistStatus("failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteWhislist = async (prod) => {
    try {
      setLoading(true);
      await request({
        url: `RemoveProductToWishlist/${prod.id}`,
        method: "DELETE",
      });
      setWishlistStatus("deleted");
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAllWhislist = async () => {
    try {
      setLoading(true);
      const response = await request({
        url: `GetUserAllWishlists/1`,
        method: "GET",
      });
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await getAllWhislist();
      const serverWishlist = response?.data || [];

      setWishlistProducts(serverWishlist);
      addItemsToLocalstorage("wishlist", serverWishlist);
    } catch (error) {
      const wishlistProductFromLocalStorage =
        getItemsFromLocalstorage("wishlist") || [];
      setWishlistProducts(wishlistProductFromLocalStorage);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <wishlistContext.Provider
      value={{
        wishlistProducts,
        setWishlistProducts,
        addProductToWishlist,
        deleteProductFromWishlist,
        // actuall work above work will remove when feel complete
        wishlistStatus,
        deleteWhislist,
        getAllWhislist,
        addToWhishlist,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
};
export const useWishlistContext = () => {
  const value = useContext(wishlistContext);
  return value;
};
export default WishlistContextProvider;
