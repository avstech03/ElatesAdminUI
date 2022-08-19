export const LOGIN = "LOGIN";
export const CHANGE_TAB = "CHANGE_TAB";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const TOGGLE_ADD_PRODUCT_MODAL = "TOGGLE_ADD_PRODUCT_MODAL";
export const ADD_NEW_PRODUCT = "ADD_NEW_PRODUCT";
export const TOGGLE_EDIT_PRODUCT_MODAL = "TOGGLE_EDIT_PRODUCT_MODAL";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";
export const TOGGLE_DELETE_PRODUCT_MODAL = "TOGGLE_DELETE_PRODUCT_MODAL";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const TOGGLE_ADD_CATEGORY_MODAL = "TOGGLE_ADD_CATEGORY_MODAL";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const TOGGLE_DELETE_CATEGORY_MODAL = "TOGGLE_DELETE_CATEGORY_MODAL";
export const TOGGLE_EDIT_CATEGORY_MODAL = "TOGGLE_EDIT_CATEGORY_MODAL";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const TOGGLE_EDIT_ORDER_MODAL = "TOGGLE_EDIT_ORDER_MODAL";
export const TOGGLE_ADD_OFFER_MODAL = "TOGGLE_ADD_OFFER_MODAL";
export const TOGGLE_EDIT_OFFER_MODAL = "TOGGLE_EDIT_OFFER_MODAL";
export const SET_ORDERS = "GET_ORDERS";
export const EDIT_ORDER = "EDIT_ORDER";
export const TOGGLE_EDIT_USER_MODAL = "TOGGLE_EDIT_USER_MODAL";
export const SET_COUPONS = "SET_COUPONS";
export const EDIT_COUPON = "EDIT_COUPON";
export const DELETE_COUPON = "DELETE_COUPON";
export const ADD_COUPON = "ADD_COUPON";
export const TOGGLE_ADD_COUPON = "TOGGLE_ADD_COUPON";
export const TOGGLE_EDIT_COUPON = "TOGGLE_EDIT_COUPON";
export const DELETE_CATEGORY = "DELETE_CATEGORY";

export const toggleAddCouponModal = () => {
  return {
    type: TOGGLE_ADD_COUPON,
  };
};

export const toggleEditCouponModal = () => {
  return {
    type: TOGGLE_EDIT_COUPON,
  };
};

export const setCoupons = (data) => {
  return {
    type: SET_COUPONS,
    data,
  };
};

export const addCoupon = (data) => {
  return {
    type: ADD_COUPON,
    data,
  };
};

export const editCoupon = (data) => {
  return {
    type: EDIT_COUPON,
    data,
  };
};

export const deleteCoupon = (data) => {
  return {
    type: DELETE_COUPON,
    data,
  };
};

export const loginAction = (data) => {
  return {
    type: LOGIN,
    data: data,
  };
};

export const changeTab = (data) => {
  return {
    type: CHANGE_TAB,
    tab: data,
  };
};

export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products: products,
  };
};

export const toggleAddProductModal = () => {
  return {
    type: TOGGLE_ADD_PRODUCT_MODAL,
  };
};

export const addNewProduct = (product) => {
  return {
    type: ADD_NEW_PRODUCT,
    product: product,
  };
};

export const toggleEditProductModal = () => {
  return {
    type: TOGGLE_EDIT_PRODUCT_MODAL,
  };
};

export const updateProduct = (productId, product) => {
  return {
    type: UPDATE_PRODUCT,
    productId,
    product,
  };
};

export const filterProducts = (name, category, brand) => {
  return {
    type: FILTER_PRODUCTS,
    name,
    category,
    brand,
  };
};

export const toggleDeleteProductModal = () => {
  return {
    type: TOGGLE_DELETE_PRODUCT_MODAL,
  };
};

export const deleteProduct = (productId) => {
  return {
    type: DELETE_PRODUCT,
    productId,
  };
};

export const deleteCategory = (categoryId) => {
  return {
    type: DELETE_CATEGORY,
    categoryId,
  };
};

export const getAllCategories = (categories) => {
  return {
    type: GET_ALL_CATEGORIES,
    categories,
  };
};

export const toggleAddCategoryModal = () => {
  return {
    type: TOGGLE_ADD_CATEGORY_MODAL,
  };
};

export const toggleAddOfferModal = () => {
  return {
    type: TOGGLE_ADD_OFFER_MODAL,
  };
};

export const toggleEditOfferModal = () => {
  return {
    type: TOGGLE_EDIT_OFFER_MODAL,
  };
};

export const toggleEditOrderModal = () => {
  return {
    type: TOGGLE_EDIT_ORDER_MODAL,
  };
};

export const addCategory = (category) => {
  return {
    type: ADD_CATEGORY,
    category,
  };
};

export const toggleDeleteCategoryModal = () => {
  return {
    type: TOGGLE_DELETE_CATEGORY_MODAL,
  };
};

export const toggleEditCategoryModal = (category) => {
  return {
    type: TOGGLE_EDIT_CATEGORY_MODAL,
  };
};

export const updateCategory = (categoryId, category) => {
  return {
    type: UPDATE_CATEGORY,
    categoryId,
    category,
  };
};

export const setOrders = (orders) => {
  return {
    type: SET_ORDERS,
    orders,
  };
};

export const editOrder = (order) => {
  return {
    type: EDIT_ORDER,
    order,
  };
};

export const toggleEditUser = () => {
  return {
    type: TOGGLE_EDIT_USER_MODAL,
  };
};
