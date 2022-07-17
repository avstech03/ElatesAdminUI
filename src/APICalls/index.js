import axios from "axios";

export default {
    userApis: () => require("./userApi")(axios),
    authApis: () => require("./authApis")(axios),
    productApis: () => require("./productApi")(axios),
    categoryApis: () => require("./categoryApis")(axios),
    uploadApis: () => require("./uploadFile")(axios),
    orderApis: () => require("./orderApis")(axios),
    offerApis: () => require("./offerApis")(axios),
    seedataApis: () => require("./seeddataApis")(axios),
    couponApis: () => require("./couponApis")(axios),
};