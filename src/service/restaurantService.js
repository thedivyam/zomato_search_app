// Importing axios to call the ZomatoAPI
import Axios from "../util/zomato_api";
// Import Toastify
import { toast } from "react-toastify";

// This function will call the ZomatoAPI and
// fetch all the categories and handle the errors.
export const getAllCategories = async () => {
  try {
    const { data } = await Axios.get(`/categories`);
    return data.categories;
  } catch (e) {
    toast.error("Cannot fetch Categories", {
      autoClose: 2000,
    });
  }
};

// This function will call the ZomatoAPI and fetch all the
// cuisines for the given locationID and handle the errors.
export const getAllCuisines = async (locationId) => {
  try {
    const { data } = await Axios.get(`/cuisines?city_id=${locationId}`);
    return data.cuisines;
  } catch (e) {
    toast.error("Cannot fetch Cuisines", {
      autoClose: 2000,
    });
  }
};

export const getAllRestaurants = async ({
  locationId,
  categoryId,
  cuisineName,
  start,
  query,
}) => {
  let data;
  try {
    //All three parameters are given
    if (categoryId !== 0 && cuisineName !== "Select Cuisine" && query !== "")
      data = await Axios.get(
        `/search?entity_id=${locationId}&entity_type=city&cuisines=${cuisineName}&category=${categoryId}&q=${query}&start=${start}`
      );
    //Cuisine and Query is given
    else if (
      categoryId === 0 &&
      cuisineName !== "Select Cuisine" &&
      query !== ""
    )
      data = await Axios.get(
        `/search?entity_id=${locationId}&entity_type=city&cuisines=${cuisineName}&q=${query}&start=${start}`
      );
    //Category and Query is given
    else if (
      categoryId !== 0 &&
      cuisineName === "Select Cuisine" &&
      query !== ""
    )
      data = await Axios.get(
        `/search?entity_id=${locationId}&entity_type=city&category=${categoryId}&q=${query}&start=${start}`
      );
    //Category and Cuisine is given
    else if (
      categoryId !== 0 &&
      cuisineName !== "Select Cuisine" &&
      query === ""
    ) {
      data = await Axios.get(
        `/search?entity_id=${locationId}&entity_type=city&cuisines=${cuisineName}&category=${categoryId}&start=${start}`
      );
    }
    //Only query given
    else if (
      categoryId === 0 &&
      cuisineName === "Select Cuisine" &&
      query !== ""
    ) {
      data = await Axios.get(
        `/search?entity_id=${locationId}&entity_type=city&q=${query}&start=${start}`
      );
    }
    //Only category given
    else if (
      categoryId !== 0 &&
      cuisineName === "Select Cuisine" &&
      query === ""
    ) {
      data = await Axios.get(
        `/search?entity_id=${locationId}&entity_type=city&category=${categoryId}&start=${start}`
      );
    }
    //Only cuisine given
    else if (
      categoryId !== 0 &&
      cuisineName !== "Select Cuisine" &&
      query !== ""
    ) {
      data = await Axios.get(
        `/search?entity_id=${locationId}&entity_type=city&cuisines=${cuisineName}&start=${start}`
      );
    }
    //Nothing is given
    else
      data = await Axios.get(
        `/search?entity_id=${locationId}&entity_type=city&start=${start}`
      );
    return data.data;
  } catch (e) {
    console.log(e);
    toast.error("Cannot fetch Location", {
      autoClose: 2000,
    });
  }
};
