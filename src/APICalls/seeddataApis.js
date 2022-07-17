const { config } = require("bluebird");
const apiConfig = require("../config/api.json");
const utils = require("./utils");

module.exports = axios => {
    const getSeedData = (userId, token) => {
        let request = axios({
            url: utils.constructURI("getseeddata", {}, {
                userId,
            }),
            method: apiConfig.getseeddata.method,
            headers: {
                authorization: token
            }
        });
        return request
        .then(response => response.data);
    };

    const editSeedData = (userId, token, body) => {
        let request = axios({
            url: utils.constructURI("editseeddata", {}, {
                userId,
            }),
            method: apiConfig.editseeddata.method,
            headers: {
                authorization: token
            },
            data: body
        });
        return request
        .then(response => response.data);
    };

    const getHomeScreenTemplate = (userId, token) => {
        let request = axios({
            url: utils.constructURI("gethomescreentemplate", {}, {
                userId,
            }),
            method: apiConfig.gethomescreentemplate.method,
            headers: {
                authorization: token
            }
        });
        return request
        .then(response => response.data);
    };

    const editHomeScreenTemplate = (userId, token, body) => {
        let request = axios({
            url: utils.constructURI("edithomescreentemplate", {}, {
                userId,
            }),
            method: apiConfig.edithomescreentemplate.method,
            headers: {
                authorization: token
            },
            data: body
        });
        return request
        .then(response => response.data);
    };

    return {
        getSeedData,
        editSeedData,
        getHomeScreenTemplate,
        editHomeScreenTemplate,
    }
};