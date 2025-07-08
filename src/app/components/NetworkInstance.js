import axios from "axios";

const NetworkInstance = () => {
  return axios.create({
    baseURL: "https://api.assetlocka.com",
  });
};

export default NetworkInstance;
