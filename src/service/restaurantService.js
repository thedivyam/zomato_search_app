import Axios from "../util/zomato_api";
import { toast } from "react-toastify";

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
}) => {
  let data;
  try {
    if (categoryId !== 0 && cuisineName !== "Select Cuisine")
      data = await Axios.get(
        `/search?entity_id=${locationId}&entity_type=city&cuisines=${cuisineName}&category=${categoryId}`
      );
    else if (categoryId === 0 && cuisineName !== "Select Cuisine")
      data = await Axios.get(
        `/search?entity_id=${locationId}&entity_type=city&cuisines=${cuisineName}`
      );
    else if (categoryId !== 0 && cuisineName === "Select Cuisine")
      data = await Axios.get(
        `/search?entity_id=${locationId}&entity_type=city&category=${categoryId}`
      );
    else
      data = await Axios.get(
        `/search?entity_id=${locationId}&entity_type=city&count=18&start=0`
      );
    return data.data;
  } catch (e) {
    console.log(e);
    toast.error("Cannot fetch Location", {
      autoClose: 2000,
    });
  }
};

export const searchRestaurant = async ({ locationId, restaurantName }) => {
  try {
    const { data } = await Axios.get(
      `/search?entity_id=${locationId}&entity_type=city&q=${restaurantName}&count=18&start=0`
    );
    console.log(data);
    return data;
  } catch (e) {
    toast.error("No such restaurant found", {
      autoClose: 2000,
    });
  }
};

export const getRestaurant = async (restaurantId) => {
  try {
    const { data } = await Axios.get(`/restaurant?res_id=${restaurantId}`);
    return data;
  } catch (e) {
    toast.error("Cannot fetch Restaurant", {
      autoClose: 2000,
    });
  }
};
