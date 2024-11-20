import { db } from "../data/db";
import { CartItems, Guitar } from "../types/index";

export type CartActions =
  | { type: "add-to-cart"; payload: { item: Guitar } }
  | { type: "remove-from-cart"; payload: { id: Guitar["id"] } }
  | { type: "increase -quantity"; payload: { id: Guitar["id"] } }
  | { type: "decrement-quantity"; payload: { id: Guitar["id"] } }
  | { type: "clear-cart" };

export type CartState = {
  data: Guitar[];
  cart: CartItems[];
};
const initialCart = () : CartItems[] => {
  const localStorageCart = localStorage.getItem('cart')
  return localStorageCart ? JSON.parse(localStorageCart) : []
}
export const initialState: CartState = {
  data: db,
  cart: initialCart(),
};

const MAX_ITEMS = 10;
const MIN_ITEMS = 1;

export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  if (action.type === "add-to-cart") {
    const itemExits = state.cart.find(
      (guitar) => guitar.id === action.payload.item.id
    );
    let updateCart: CartItems[] = [];
    if (itemExits) {
      updateCart = state.cart.map((item) => {
        if (action.payload.item.id === item.id) {
          if (item.quantity < MAX_ITEMS) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        } else {
          return item;
        }
      });
    } else {
      const newItems = { ...action.payload.item, quantity: 1 };
      updateCart = [...state.cart, newItems];
    }
    return {
      ...state,
      cart: updateCart,
    };
  }
  if (action.type === "remove-from-cart") {
    const cart = state.cart.filter((item) => item.id !== action.payload.id);
    return {
      ...state,
      cart,
    };
  }
  if (action.type === "increase -quantity") {
    const cart = state.cart.map((item) => {
      if (item.id === action.payload.id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    return {
      ...state,
      cart,
    };
  }

  if (action.type === "decrement-quantity") {
    const cart = state.cart.map((item) => {
      if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    return {
      ...state,
      cart,
    };
  }

  if (action.type === "clear-cart") {
    return {
      ...state,
      cart : []
    };
  }

  return state;
};
