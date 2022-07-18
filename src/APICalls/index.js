import axios from "axios";
import userApi from "./userApi";
import authApi from "./authApis";
import productApi from "./productApi";
import categoryApi from "./categoryApis";
import uploadApi from "./uploadFile";
import offerApi from "./offerApis";
import seedDataApi from "./seeddataApis";
import couponApi from "./couponApis";
import orderApi from "./orderApis";

export default {
  userApis: () => userApi(axios),
  authApis: () => authApi(axios),
  productApis: () => productApi(axios),
  categoryApis: () => categoryApi(axios),
  uploadApis: () => uploadApi(axios),
  orderApis: () => orderApi(axios),
  offerApis: () => offerApi(axios),
  seedataApis: () => seedDataApi(axios),
  couponApis: () => couponApi(axios),
};
