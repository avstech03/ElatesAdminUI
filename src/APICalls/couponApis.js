const apiConfig = require('../config/api.json');
const utils = require('./utils');

module.exports = axios => {
    const getCoupons = (userId, token) => {
        let request = axios({
            url: utils.constructURI("getcoupons", {}, {
                userId,
            }),
            method: apiConfig.getcoupons.method,
            headers: {
                authorization: token
            }
        });
        return request
        .then(response => response.data);
    };

    const addCoupon = (userId, token, body) => {
        let request = axios({
            url: utils.constructURI("addcoupon", {}, {
                userId,
            }),
            method: apiConfig.addcoupon.method,
            headers: {
                authorization: token
            },
            data: body
        });
        return request
        .then(response => response.data);
    };

    const editCoupon = (userId, token, body, couponId) => {
        let request = axios({
            url: utils.constructURI("editcoupon", {}, {
                userId,
                couponId
            }),
            method: apiConfig.editcoupon.method,
            headers: {
                authorization: token
            },
            data: body
        });
        return request
        .then(response => response.data);
    };

    const deleteCoupon = (userId, token, couponId) => {
        let request = axios({
            url: utils.constructURI("deletecoupon", {}, {
                userId,
                couponId,
            }),
            method: apiConfig.deletecoupon.method,
            headers: {
                authorization: token
            }
        });
        return request
        .then(response => response.data);
    };

    return {
        addCoupon,
        getCoupons,
        editCoupon,
        deleteCoupon
    }
}