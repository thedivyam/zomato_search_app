//Importing the restaurantService and ListRestaurant
import ListRestaurant from "../components/ListRestaurant";
import {
  getAllCategories,
  getAllCuisines,
  getAllRestaurants,
  // searchRestaurant,
} from "../service/restaurantService";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
// Import Toastify
import { toast } from "react-toastify";
// Imports from PaperKit-UI
import { Button, Input } from "reactstrap";
// Imports from MaterialUI
import { Box, MenuItem, Select, Toolbar, Typography } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

// Function to search and filter the
// restaurant and render them accordingly
const RestaurantSearch = () => {
  const locationId = useParams().locationId;

  // Declaring State variables and initialising them
  const [start, setStart] = useState(0);
  const [categories, setCategories] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [restaurantInput, setRestaurantInput] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    id: 0,
    name: "Select Category",
  });
  const [selectedCuisines, setSelectedCuisines] = useState({
    cuisine_id: 0,
    cuisine_name: "Select Cuisine",
  });
  // State variables declaration end

  // Calling the necessary functions on render
  useEffect(() => {
    getCategories();
    getCuisines();
    getRestaurants(selectedCategory, selectedCuisines, 0);
    // eslint-disable-next-line
  }, []);

  // Make an API call by calling the function from restaurantService.js
  const getRestaurants = async (
    selectedCategory,
    selectedCuisines,
    start = 0
  ) => {
    toast.success("Searching Restaurants", { autoClose: 2000 });
    const response = await getAllRestaurants({
      locationId: locationId,
      categoryId: selectedCategory.id,
      cuisineName: selectedCuisines.cuisine_name,
      start: start,
      query: restaurantInput,
    });

    if (response.restaurants.length === 0)
      toast.error("No Restaurants found", { autoClose: 2000 });
    else {
      setRestaurants(response.restaurants);
    }
  };

  // Make an API call to get all the categories from Zomato
  const getCategories = async () => {
    const categories = await getAllCategories();
    setCategories(categories);
  };

  // Make an API call to get all the cuisines for the given location
  const getCuisines = async () => {
    const cuisines = await getAllCuisines(locationId);
    setCuisines(cuisines);
  };

  // Handling the category change
  const categoryChangeHandler = (event) => {
    const { value: id } = event.target;
    const selectedCategory = categories.find(
      (category) => category.categories.id === id
    );
    if (selectedCategory?.categories.id) {
      setSelectedCategory(selectedCategory.categories);
      setStart(0);
      setRestaurants([]);
      getRestaurants(selectedCategory.categories, selectedCuisines, 0);
    }
  };

  // Handling the cuisines change
  const cuisinesChangeHandler = (event) => {
    const { value: cuisine_id } = event.target;
    const selectedCuisines = cuisines.find(
      (cuisine) => cuisine.cuisine.cuisine_id === cuisine_id
    );

    if (selectedCuisines?.cuisine.cuisine_id) {
      setSelectedCuisines(selectedCuisines.cuisine);
      setStart(0);
      setRestaurants([]);
      getRestaurants(selectedCategory, selectedCuisines.cuisine, 0);
    }
  };

  //Handling the text input change in the form
  const restaurantChangeHandler = (e) => {
    const { value } = e.target;
    setRestaurantInput(value);
  };

  // Handle the Restaurant Search using the user input
  const searchHandler = async (e) => {
    e.preventDefault();
    if (restaurantInput === "")
      toast.error("Search input cannot be blank", { autoClose: 2000 });
    else {
      setStart(0);
      setRestaurants([]);
      getRestaurants(selectedCategory, selectedCuisines, 0);
    }
  };

  // Load more restaurants when the end of list is reached
  const getMore = async () => {
    toast.success("Searching Restaurants", { autoClose: 2000 });
    const response = await getAllRestaurants({
      locationId: locationId,
      categoryId: selectedCategory.id,
      cuisineName: selectedCuisines.cuisine_name,
      start: start + 20,
      query: restaurantInput,
    });
    setStart(start + 20);
    if (response.restaurants.length !== 0) {
      setRestaurants([...restaurants, ...response.restaurants]);
    } else {
      toast.error("All restaurants already displayed", { autoClose: 2000 });
    }
  };

  //Custom Styles
  const drawerWidth = 240;
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      backgroundColor: "#2D2D2D",
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: "#2D2D2D",
      color: "#fff",
    },
    drawerContainer: {
      overflow: "auto",
    },
    content: {
      flexGrow: 1,
      width: "calc(100% - 240px)",
    },
    listPadding: {
      paddingLeft: "5px",
      paddingRight: "5px",
    },
    ml: {
      marginLeft: "2rem",
    },
    select: {
      backgroundColor: "#212121",
      color: "#fff",
      width: "195px",
    },
    icon: {
      fill: "#fff",
    },
  }));

  // custom theme to modify the MaterialUI default styles
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#CB202D",
      },
      secondary: {
        main: "#212121",
      },
    },
    typography: {
      body1: {
        fontSize: 18,
      },
    },
  });
  // Initializing the custom styles
  const classes = useStyles();

  // View
  return (
    <>
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List className={classes.listPadding}>
              <ListItem>
                <ThemeProvider theme={theme}>
                  <Typography variant="body1">Filters</Typography>
                </ThemeProvider>
              </ListItem>
              <ListItem>
                <ThemeProvider theme={theme}>
                  <Select
                    value={selectedCategory.id}
                    onChange={categoryChangeHandler}
                    style={{ minWidth: "140px", color: "#fff" }}
                    variant="outlined"
                    className={classes.select}
                    inputProps={{
                      classes: {
                        icon: classes.icon,
                      },
                    }}
                    color="primary"
                  >
                    <MenuItem value={0} disabled style={{ display: "none" }}>
                      Select Category
                    </MenuItem>
                    {categories?.map((data) => {
                      const category = data.categories;
                      return (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </ThemeProvider>
              </ListItem>
              <ListItem>
                <Box style={{ marginRight: "20px" }}>
                  <ThemeProvider theme={theme}>
                    <Select
                      value={selectedCuisines.cuisine_id}
                      onChange={cuisinesChangeHandler}
                      style={{ minWidth: "140px", color: "#fff" }}
                      variant="outlined"
                      className={classes.select}
                      inputProps={{
                        classes: {
                          icon: classes.icon,
                        },
                      }}
                      color="primary"
                    >
                      <MenuItem value={0} disabled style={{ display: "none" }}>
                        Select Cuisine
                      </MenuItem>

                      {cuisines?.map((data) => {
                        const cuisine = data.cuisine;
                        return (
                          <MenuItem
                            key={cuisine.cuisine_id}
                            value={cuisine.cuisine_id}
                          >
                            {cuisine.cuisine_name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </ThemeProvider>
                </Box>
              </ListItem>
            </List>
            <List></List>
          </div>
        </Drawer>
        <main className={classes.content}>
          <Box
            display="flex"
            flexWrap="wrap"
            alignContent="flex-end"
            pt={"2rem"}
            px={"2rem"}
            pb={"2rem"}
          >
            {/* Input and button to take user's search string
            and show filtered restaurants. */}
            <form onSubmit={searchHandler}>
              <Box display={"flex"}>
                <Box mr={"1rem"} width={"300px"}>
                  <Input
                    fullwidth="true"
                    placeholder={"Enter Restaurant Name"}
                    onChange={restaurantChangeHandler}
                    value={restaurantInput}
                  />
                </Box>
                <Button type={"submit"} variant="contained" color="primary">
                  Search
                </Button>
              </Box>
            </form>
          </Box>

          {/* Display the search results using ListRestaurant.jsx. */}
          <Box className={classes.ml}>
            <ListRestaurant restaurants={restaurants} />
          </Box>
          <Box px={"2rem"} pb={"2rem"} display="flex" justifyContent="center">
            <Button
              onClick={() => {
                getMore();
              }}
              color="primary"
            >
              load more{" "}
            </Button>
          </Box>
        </main>
      </div>
    </>
  );
};

export default RestaurantSearch;
