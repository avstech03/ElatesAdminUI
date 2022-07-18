const apiConfig = require("../config/api.json");
const utils = require("./utils");
const token = "asdfafsadf";

const userApi = (axios) => {
  const addNewAdminUser = async (data) => {
    let response;
    try {
      response = await axios({
        url: apiConfig.addNewAdmin.uri,
        method: apiConfig.addNewAdmin.method,
        headers: {
          authorization: token,
        },
      });
    } catch (err) {
      console.log(" === ERROR === ", err);
    }
    return response;
  };

  const getUsers = (userId, token, queryParams) => {
    let request = axios({
      url: utils.constructURI("getusers", queryParams, {
        userId,
      }),
      method: apiConfig.getusers.method,
      headers: {
        authorization: token,
      },
    });
    return request.then((response) => response.data);
  };

  const addToWallet = (userId, token, endUserId, amount) => {
    let request = axios({
      url: utils.constructURI(
        "addtowallet",
        { walletAmount: amount },
        {
          endUserId,
          userId,
        }
      ),
      method: apiConfig.addtowallet.method,
      headers: {
        authorization: token,
      },
    });
    return request.then((response) => response.data);
  };

  return {
    addNewAdminUser,
    getUsers,
    addToWallet,
  };
};

export default userApi;
