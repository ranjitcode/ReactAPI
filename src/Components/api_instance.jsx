import Axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const instance = Axios.create({
  baseURL,
});
export default instance;
