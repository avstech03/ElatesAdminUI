const apiConfig = require("../config/api.json");
const utils = require("./utils");

module.exports = axios => {
    const uploadFile = (userId, token, data) => {
        let request = axios({
            url: utils.constructURI("upload", {}, {userId}),
            data: data,
            method: apiConfig.upload.method,
            headers: {
                authorization: token
            }
        });
        return request
        .then(response => response.data);
    };

    return {
        uploadFile,
    };
};