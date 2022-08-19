import { combineReducers } from "redux";
import {
  LOGIN,
  CHANGE_TAB,
  SET_PRODUCTS,
  TOGGLE_ADD_PRODUCT_MODAL,
  ADD_NEW_PRODUCT,
  TOGGLE_EDIT_PRODUCT_MODAL,
  UPDATE_PRODUCT,
  FILTER_PRODUCTS,
  TOGGLE_DELETE_PRODUCT_MODAL,
  DELETE_PRODUCT,
  GET_ALL_CATEGORIES,
  TOGGLE_ADD_CATEGORY_MODAL,
  ADD_CATEGORY,
  TOGGLE_DELETE_CATEGORY_MODAL,
  TOGGLE_EDIT_CATEGORY_MODAL,
  UPDATE_CATEGORY,
  TOGGLE_EDIT_ORDER_MODAL,
  TOGGLE_ADD_OFFER_MODAL,
  TOGGLE_EDIT_OFFER_MODAL,
  SET_ORDERS,
  EDIT_ORDER,
  TOGGLE_EDIT_USER_MODAL,
  SET_COUPONS,
  ADD_COUPON,
  EDIT_COUPON,
  DELETE_COUPON,
  TOGGLE_ADD_COUPON,
  TOGGLE_EDIT_COUPON,
  DELETE_CATEGORY,
} from "./Actions";
import { createPath } from "history";
const _ = require("lodash");

const initialUserState = {
  users: [],
};
const initialProductsState = {
  products: [],
  filteredProducts: [],
};
const initialCategoriesState = {
  categories: [],
};

const initialCouponsState = {
  coupons: [],
};

const initialAuthState = {
  token: "",
  userId: "",
  username: "",
};
const initialOrdersState = {
  orders: [],
};
const initialTabState = {
  value: "",
};

const initialTogglerState = {
  addProductModal: false,
  editProductModal: false,
  deleteProductModal: false,
  addCategoryModal: false,
  deleteCategoryModal: false,
  editCategoryModal: false,
  editOrderModal: false,
  addOfferModal: false,
  editOfferModal: false,
  editUserModal: false,
  addCouponModal: false,
  editCouponModal: false,
};

const UserReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case "ADD_NEW_ADMIN":
      break;
    case "GET_ALL_USER":
      break;
    case "GET_USER_BY_ID":
      break;
    case "REMOVE_USER":
      break;
    case "EDIT_USER":
      break;
    default:
      return state;
  }
};

const TabReducer = (state = null, action) => {
  switch (action.type) {
    case CHANGE_TAB:
      return {
        ...state,
        value: action.tab,
      };
    default:
      return state;
  }
};

const AuthReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.data.token,
        userId: action.data.userId,
        username: action.data.username,
      };
    case "LOGOUT":
      break;
    default:
      return state;
  }
};

const ProductsReducer = (state = initialProductsState, action) => {
  let products = state.products;
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };
    case ADD_NEW_PRODUCT:
      products.push(action.product);
      return {
        ...state,
        products,
      };
    case UPDATE_PRODUCT:
      for (let i = 0; i < products.length; i++) {
        if (products[i]._id === action.product._id) {
          products[i] = action.product;
        }
      }
      return {
        ...state,
        products,
      };
    case FILTER_PRODUCTS:
      let filteredProducts = _.filter(state.products, (product) => {
        if (action.name && action.name !== product.name) return false;
        if (action.category && action.category !== product.category)
          return false;
        if (action.brand && action.brand !== product.brand) return false;
        return true;
      });
      return {
        ...state,
        filteredProducts,
      };
    case DELETE_PRODUCT:
      _.remove(products, (product) => {
        return product._id === action.productId;
      });
      return {
        ...state,
        products,
      };
    case "GET_PRODUCT_BY_ID":
      break;
    case "GET_ALL_PRODUCT":
      break;
    case "GET_PRODUCT_BY_NAME":
      break;
    default:
      return state;
  }
};

const CategoriesReducer = (state = initialCategoriesState, action) => {
  let categories = state.categories;
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    case ADD_CATEGORY:
      categories.push(action.category);
      return {
        ...state,
        categories,
      };
    case UPDATE_CATEGORY:
      for (let i = 0; i < categories.length; i++) {
        if (categories[i]._id === action.category._id) {
          categories[i] = action.category;
        }
      }
      return {
        ...state,
        categories,
      };
    case DELETE_CATEGORY:
      _.remove(categories, (category) => {
        return category._id === action.categoryId;
      });
      return {
        ...state,
        categories,
      };
      break;
    case "GET_CATEGORY_BY_ID":
      break;
    case "GET_ALL_CATEGORY":
      break;
    case "GET_CATEGORY_BY_NAME":
      break;
    default:
      return state;
  }
};

const OrdersReducer = (state = initialOrdersState, action) => {
  let orders = state.orders;
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };
      break;
    case EDIT_ORDER:
      for (let i = 0; i < orders.length; i++) {
        if (orders[i]._id === action.order._id) {
          orders[i] = action.order;
        }
      }
      return {
        ...state,
        orders: orders,
      };
    default:
      return state;
  }
};

const CouponReducer = (state = initialCouponsState, action) => {
  let coupons = state.coupons;
  switch (action.type) {
    case SET_COUPONS:
      return {
        ...state,
        coupons: action.data,
      };
    case ADD_COUPON:
      coupons.push(action.data);
      return {
        ...state,
        coupons: coupons,
      };
    case EDIT_COUPON:
      for (let i = 0; i < coupons.length; i++) {
        if (coupons[i]._id === action.data._id) coupons[i] = action.data;
      }
      return {
        ...state,
        coupons: coupons,
      };
    case DELETE_COUPON:
      _.remove(coupons, { _id: action.data._id });
      return {
        ...state,
        coupons: coupons,
      };
    default:
      return {
        ...state,
      };
  }
};

const ModalTogglerReducer = (state = initialTogglerState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_PRODUCT_MODAL:
      return {
        ...state,
        addProductModal: !state.addProductModal,
      };
    case TOGGLE_EDIT_PRODUCT_MODAL:
      return {
        ...state,
        editProductModal: !state.editProductModal,
      };
    case TOGGLE_DELETE_PRODUCT_MODAL:
      return {
        ...state,
        deleteProductModal: !state.deleteProductModal,
      };
    case TOGGLE_ADD_CATEGORY_MODAL:
      return {
        ...state,
        addCategoryModal: !state.addCategoryModal,
      };
    case TOGGLE_DELETE_CATEGORY_MODAL:
      return {
        ...state,
        deleteCategoryModal: !state.deleteCategoryModal,
      };
    case TOGGLE_EDIT_CATEGORY_MODAL:
      return {
        ...state,
        editCategoryModal: !state.editCategoryModal,
      };
    case TOGGLE_EDIT_ORDER_MODAL:
      return {
        ...state,
        editOrderModal: !state.editOrderModal,
      };
    case TOGGLE_ADD_OFFER_MODAL:
      return {
        ...state,
        addOfferModal: !state.addOfferModal,
      };
    case TOGGLE_EDIT_OFFER_MODAL:
      return {
        ...state,
        editOfferModal: !state.editOfferModal,
      };
    case TOGGLE_EDIT_USER_MODAL:
      return {
        ...state,
        editUserModal: !state.editUserModal,
      };
    case TOGGLE_ADD_COUPON:
      return {
        ...state,
        addCouponModal: !state.addCouponModal,
      };
    case TOGGLE_EDIT_COUPON:
      return {
        ...state,
        editCouponModal: !state.editCouponModal,
      };
    default:
      return state;
  }
};

export default combineReducers({
  tab: TabReducer,
  users: UserReducer,
  categories: CategoriesReducer,
  products: ProductsReducer,
  auth: AuthReducer,
  toggler: ModalTogglerReducer,
  orders: OrdersReducer,
  coupons: CouponReducer,
});
