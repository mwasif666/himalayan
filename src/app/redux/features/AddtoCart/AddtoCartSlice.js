import { createSlice } from "@reduxjs/toolkit";

const getInitialCart = () => {
  if (typeof window !== "undefined") {
    try {
      return JSON.parse(localStorage.getItem("cartItems")) || [];
    } catch {
      return [];
    }
  }
  return [];
};

export const AddtoCartSlice = createSlice({
  name: "AddtoCart",
  initialState: {
    cartItems: getInitialCart(),
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
  },
  reducers: {
    addItemsToLocalStorage(state, action) {
      let product = action.payload.product;
      let quantity = action.payload.quantity;
      let findProduct = state.cartItems.find((item) => item.id === product.id);

      if (findProduct) {
        findProduct.quantity += quantity;
      } else {
        state.cartItems.push({ ...product, quantity: quantity });
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    removeItemsFromLocalStorage(state, action) {
      let product = action.payload.product;
      let quantity = action.payload.quantity;
      let findProduct = state.cartItems.find((item) => item.id === product.id);

      if (findProduct && findProduct.quanity > 1) {
        findProduct.quantity -= quantity;
      } else if (findProduct && findProduct.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== product.id
        );
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    deleteItemFromLocalStorage(state, action) {
      let product = action.payload.product;
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== product.id
      );

      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    clearCartItemsFromLocalStorage(state) {
      state.cartItems = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("cartItems");
      }
    },
    addItemsToLocalStorageInBulk(state, action){
      state.cartItems = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    }
  },
});

export const {
  addItemsToLocalStorage,
  removeItemsFromLocalStorage,
  deleteItemFromLocalStorage,
  clearCartItemsFromLocalStorage,
  addItemsToLocalStorageInBulk
} = AddtoCartSlice.actions;

export default AddtoCartSlice.reducer;
