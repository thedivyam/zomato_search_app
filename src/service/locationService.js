// Imporing the necessary dependencies
import { toast } from "react-toastify";
import axios from "../util/zomato_api";

// Function to make API call for getting the locations
// suggestions based on the search input using Axios
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
