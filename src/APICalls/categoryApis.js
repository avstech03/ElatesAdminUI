const apiConfig = require("../config/api.json");
const utils = require("./utils");

module.exports = axios => {
    const getAllCategories = (userId, token) => {
        let request = axios({
            url: utils.constructURI("getallcategories", {}, {
                userId,
            }),
            method: apiConfig.getallcategories.method,
            headers: {
                authorization: token
            }
        });
        return request
        .then(response => response.data);
    };

    const addCategory = (userId, token, body) => {
        let request = axios({
            url: utils.constructURI("addcategory", {}, {
                userId
            }),
            method: apiConfig.addcategory.method,
            headers: {
                authorization: token
            },
            data: body
        });
        return request
        .then(response => response.data);
    };

    const updateCategory = (userId, token, categoryId, body) => {
        let request = axios({
            url: utils.constructURI("updatecategory", {}, {
                userId,
                categoryId,
            }),
            method: apiConfig.updatecategory.method,
            headers: {
                authorization: token
            },
            data: body
        });
        return request
            .then(response => response.data);
    };

    return {
        getAllCategories,
        addCategory,
        updateCategory,
    };
};