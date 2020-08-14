import PRODUCTS from "../../data/dummy-data";
import {
  DELETE_PRODUCT,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  SET_PRODUCT,
} from "../actions/products";
import Product from "../../models/product";

const initState = {
  availProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((ele) => ele.ownerId === "u1"),
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      const userProducts = [...action.products];
      return {
        ...state,
        availProducts: userProducts,
        userProducts: userProducts.filter((ele) => ele.ownerId === "u1"),
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter((ele) => ele.id !== action.id),
      };
    case ADD_PRODUCT:
      const newProduct = new Product(
        action.id,
        "u1",
        action.prod.title,
        action.prod.img,
        action.prod.desc,
        action.prod.price
      );
      return {
        userProducts: state.userProducts.concat(newProduct),
        availProducts: state.availProducts.concat(newProduct),
      };
    case EDIT_PRODUCT:
      const index = state.userProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[index].ownerId,
        action.prod.title,
        action.prod.img,
        action.prod.desc,
        state.userProducts[index].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[index] = updatedProduct;
      const availIndex = state.availProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedAvailProducts = [...state.availProducts];
      updatedAvailProducts[availIndex] = updatedProduct;
      return {
        userProducts: updatedUserProducts,
        availProducts: updatedAvailProducts,
      };
    default:
      return state;
  }
};

export default reducer;