const apiConfig = require("../config/api.json");
const utils = require("./utils");

const authApi = (axios) => {
  const login = async (data) => {
    let response;
    try {
      response = await axios({
        url: utils.constructURI("login", data),
        method: apiConfig.login.method,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(" === ERROR === ", err.response);
      return err.response;
    }
    return response;
  };

  return {
    login,
  };
};

export default authApi;
