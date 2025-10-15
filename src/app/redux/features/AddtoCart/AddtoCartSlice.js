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

const getInitialCheckoutCart = () => {
  if (typeof window !== "undefined") {
    try {
      return JSON.parse(localStorage.getItem("checkoutCartItems")) || [];
    } catch {
      return [];
    }
  }
  return [];
};

const clearCheckoutData = (state)=> {
  state.checkoutCartItems = [];
  if (typeof window !== "undefined") {
    localStorage.removeItem("checkoutCartItems");
  }
}


export const AddtoCartSlice = createSlice({
  name: "AddtoCart",
  initialState: {
    cartItems: getInitialCart(),
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    checkoutCartItems:getInitialCheckoutCart(),
    checkoutCartTotalQuantity: 0,
    checkoutCartTotalAmount: 0,
  },
  reducers: {
    addItemsToLocalStorage(state, action) {
      let product = action.payload.product;
      let quantity = action.payload.quantity || 1;
      let findProduct = state.cartItems.find((item) => item.id === product?.id);

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
    },

    addCheckoutItemsToLocalStorage(state, action){
      state.cartItems = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("cartItems");
      }
      clearCheckoutData(state);
      state.checkoutCartItems = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("checkoutCartItems", JSON.stringify(state.checkoutCartItems));
      }
    },

    removeCheckoutItemAfterPlaceOrder(state, _){
      clearCheckoutData(state);
    }
  },
});

export const {
  addItemsToLocalStorage,
  removeItemsFromLocalStorage,
  deleteItemFromLocalStorage,
  clearCartItemsFromLocalStorage,
  addItemsToLocalStorageInBulk,
  addCheckoutItemsToLocalStorage,
  removeCheckoutItemAfterPlaceOrder
} = AddtoCartSlice.actions;

export default AddtoCartSlice.reducer;
