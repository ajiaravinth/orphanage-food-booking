import axios from "axios";
import jwt from "jsonwebtoken";
export const NodeURL = "http://localhost:1001/";

const request = (options) => {
  let AUTH_TOKEN = localStorage.getItem("admin_authToken");
  let token_check = jwt.decode(AUTH_TOKEN ? AUTH_TOKEN : "");
  let client = axios.create({
    baseURL: NodeURL,
  });
  let ADMIN_ID = token_check ? token_check.id : "";
  client.defaults.headers.common["authorization"] = AUTH_TOKEN;

  const onSuccess = (response) => {
    if (response && response.data && response.data.status === "00") {
      window.location.href = "/";
      localStorage.removeItem("admin_authToken");
    }
    return response.data;
  };

  const onError = (error) => {
    return Promise.reject(error.response || error.message);
  };
  return client(options).then(onSuccess).catch(onError);
};

export default request;