import axios from "axios";

const instance = axios.create({
  baseURL: "http://apit.bluerickshaw.com/api",
});

export default instance;
