const apiConfig = require("../config/api.json");
const utils = require("./utils");

module.exports = axios => {
    const getAllProducts = async (userId, token) => {
        let response;
        try {
            response = await axios({
                url: utils.constructURI("getallproducts", {}, {
                    userId
                }),
                method: apiConfig.getallproducts.method,
                headers: {
                    authorization: token
                }
            });
        } catch (err) {
            console.log(" === ERROR === ", err);
        }
        return response.data;
    };

    const addNewProduct = (userId, token, body) => {
        let request = axios({
            url: utils.constructURI("addnewproduct", {}, {
                userId
            }),
            method: apiConfig.addnewproduct.method,
            headers: {
                authorization: token
            },
            data: body
        });
        return request
        .then(response => response.data);
    };

    const getProduct = (userId, token, productId) => {
        let request = axios({
            url: utils.constructURI("getproduct", {}, {
                userId,
                productId,
            }),
            method: apiConfig.getproduct.method,
            headers: {
                authorization: token
            }
        });
        return request
        .then(response => response.data);
    };

    const updateProduct = (userId, token, productId, body) => {
        let request = axios({
            url: utils.constructURI("updateproduct", {}, {
                userId,
                productId
            }),
            method: apiConfig.updateproduct.method,
            data: body,
            headers: {
                authorization: token
            }
        });
        return request
        .then(response => response.data);
    };

    const deleteProduct = (userId, token, productId) => {
        let request = axios({
            url: utils.constructURI("deleteproduct", {}, {
                userId,
                productId,
            }),
            method: apiConfig.deleteproduct.method,
            headers: {
                authorization: token
            }
        });
        return request
        .then(response => response.data);
    };  

    const fetchProductNames = (userId, token, productIds) => {
        let request = axios({
            url: utils.constructURI("getproductnames", {}, {
                userId,
            }),
            method: apiConfig.getproductnames.method,
            headers: {
                authorization: token
            },
            data: {
                productIds,
            }
        });
        return request
        .then(response => response.data);
    };

    const fetchProductByName = (userId, token, name) => {
        let request = axios({
            url: utils.constructURI("getproductbyname", {}, {
                userId,
                productName: name
            }),
            method: apiConfig.getproductbyname.method,
            headers: {
                authorization: token
            }
        });
        return request
        .then(response => response.data);
    };

    return {
        getAllProducts,
        addNewProduct,
        getProduct,
        updateProduct,
        deleteProduct,
        fetchProductNames,
        fetchProductByName,
    };
};