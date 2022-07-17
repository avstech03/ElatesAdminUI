const apiConfig = require('../config/api.json');
const utils = require('./utils');

module.exports = axios => {
    const getOffers = (userId, token) => {
        let request = axios({
            url: utils.constructURI("getoffers", {}, {
                userId,
            }),
            method: apiConfig.getoffers.method,
            headers: {
                authorization: token
            }
        });
        return request
        .then(response => response.data);
    }

    const addOffer = (userId, token, body) => {
        let request = axios({
            url: utils.constructURI("addoffer", {}, {
                userId,
            }),
            method: apiConfig.addoffer.method,
            headers: {
                authorization: token
            },
            data: body
        });
        return request
        .then(response => response.data);
    };

    const editOffer = (userId, token, offerId, body) => {
        let request = axios({
            url: utils.constructURI("editoffer", {}, {
                userId,
                offerId,
            }),
            method: apiConfig.editoffer.method,
            headers: {
                authorization: token
            },
            data: body
        });
        return request
        .then(response => response.data);
    }

    const deleteOffer = (userId, token, offerId) => {
        let request =axios({
            url: utils.constructURI("editoffer", {}, {
                userId,
                offerId,
            }),
            method: apiConfig.deleteoffer.method,
            headers: {
                authorization: token
            }
        });
        return request
        .then(response => response.data);
    }

    return {
        getOffers,
        addOffer,
        editOffer,
        deleteOffer,
    };
}