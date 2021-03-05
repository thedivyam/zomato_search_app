import { toast } from "react-toastify";
import axios from "../util/zomato_api";

export const getAllLocations = async (location) => {
  try {
    const { data } = await axios.get(`/cities?q=${location}`);
    return data.location_suggestions;
  } catch (e) {
    console.log(e);
    toast.error("Cannot find location", {
      autoClose: 2000,
    });
  }
};
