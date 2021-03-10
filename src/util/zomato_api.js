// Importing Axios
import axios from "axios";

//Using Axios to make Zomato API calls
const Axios = axios.create({
  baseURL: "https://developers.zomato.com/api/v2.1",
  headers: {
    "user-key": process.env.REACT_APP_ZOMATO_API_KEY,
    "content-type": "application/json",
  },
});

export default Axios;
