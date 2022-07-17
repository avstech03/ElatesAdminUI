const apiConfig = require('../config/api.json');
const utils = require('./utils');

module.exports = axios => {
    const getOrders = (userId, token, queryParams) => {
        let request = axios({
            url: utils.constructURI("getOrders", queryParams, {
                userId,
            }),
            method: apiConfig.getOrders.method,
            headers: {
                authorization: token
            }
        });
        return request
        .then(response => response.data);
    };
    
    const editOrder = (userId, token, orderId, body) => {
        let request = axios({
            url: utils.constructURI("editorder", {}, {
                userId,
                orderId,
            }),
            method: apiConfig.editorder.method,
            headers: {
                authorization: token
            },
            data: body
        });
        return request
        .then(response => response.data);
    }

    return {
        getOrders,
        editOrder,
    }
}