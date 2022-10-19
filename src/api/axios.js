import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3500",
  // baseURL: "http://192.168.0.37:3500/",
});
