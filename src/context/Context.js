import { createContext, useReducer } from "react";

export const Cartcontext = createContext();
export const Context = (props) => {
  const reducer = (state, action) => {
    switch (action.type) {
      // Add Items to Cart
      case "ADD":
        const tempstate = state.filter((item) => action.payload.id === item.id);

        if (tempstate.length > 0) {
          return state;
        } else {
          return [...state, { ...action.payload, currentQuantity: 1 }];
        }
      // Increase Items to Cart
      case "INCREASE":
        const tempstate1 = state.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, currentQuantity: item.currentQuantity + 1 };
          } else {
            return item;
          }
        });

        return tempstate1;
      // Decrease Items to Cart
      case "DECREASE":
        const tempstate2 = state.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, currentQuantity: item.currentQuantity - 1 };
          } else {
            return item;
          }
        });

        return tempstate2;

      // Remove Items to Cart
      case "REMOVE":
        const tempstate3 = state.filter(
          (item) => item.id !== action.payload.id
        );

        return tempstate3;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, []);
  const info = { state, dispatch };

  return (
    <Cartcontext.Provider value={info}>{props.children}</Cartcontext.Provider>
  );
};
