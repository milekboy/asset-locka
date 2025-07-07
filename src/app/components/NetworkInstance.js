import axios from "axios";

const NetworkInstance = () => {
  return axios.create({
    baseURL: "http://api.assetlocka.com",
  });
};

export default NetworkInstance;
