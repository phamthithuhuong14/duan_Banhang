import { Product } from "src/types/Product";

const reducerPro = (state: any, action: any) => {
  switch (action.type) {
    case "SET_PRODUCT":
      return action.payload;
    case "ADD_PRODUCT":
      return [...state, action.payload];
    case "DELETE_PRODUCT":
      return state.filter((item: Product) => item._id != action.payload);
    case "UPDATE_PRODUCT":
      return state.map((item: Product) => {
        if (item._id == action.payload.id) return action.payload;
        return item;
      });
    default:
      return state;
  }
};
export default reducerPro;
