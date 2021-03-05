import React, { useEffect, useState } from "react";
import { Box, MenuItem, Select, Toolbar, Typography } from "@material-ui/core";
import { Button, Input } from "reactstrap";
import {
  getAllCategories,
  getAllCuisines,
  getAllRestaurants,
  searchRestaurant,
} from "../service/restaurantService";
import ListRestaurant from "../components/ListRestaurant";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const RestaurantSearch = () => {
  const locationId = useParams().locationId;

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    id: 0,
    name: "Select Category",
  });

  const [cuisines, setCuisines] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState({
    cuisine_id: 0,
    cuisine_name: "Select Cuisine",
  });

  const [restaurantInput, setRestaurantInput] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getCategories();
    getCuisines();
    getRestaurants();
    // eslint-disable-next-line
  }, []);

  const getRestaurants = async () => {
    toast.success("Loading Restaurants", { autoClose: 2000 });
    const response = await getAllRestaurants({
      locationId: locationId,
      categoryId: selectedCategory.id,
      cuisineName: selectedCuisines.cuisine_name,
    });
    if (response?.restaurants?.length === 0)
      toast.error("No Restaurants found", { autoClose: 2000 });
    setRestaurants(response.restaurants);
  };

  const getCategories = async () => {
    const categories = await getAllCategories();
    setCategories(categories);
  };

  const getCuisines = async () => {
    const cuisines = await getAllCuisines(locationId);
    setCuisines(cuisines);
  };

  const categoryChangeHandler = (event) => {
    const { value: id } = event.target;
    const selectedCategory = categories.find(
      (category) => category.categories.id === id
    );

    if (selectedCategory?.categories.id) {
      setSelectedCategory(selectedCategory.categories);
      getRestaurants();
    }
  };
  const cuisinesChangeHandler = (event) => {
    const { value: cuisine_id } = event.target;
    const selectedCuisines = cuisines.find(
      (cuisine) => cuisine.cuisine.cuisine_id === cuisine_id
    );

    if (selectedCuisines?.cuisine.cuisine_id) {
      setSelectedCuisines(selectedCuisines.cuisine);
      getRestaurants();
    }
  };

  const restaurantChangeHandler = (e) => {
    const { value } = e.target;
    setRestaurantInput(value);
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    if (restaurantInput === "")
      toast.error("Search input cannot be blank", { autoClose: 2000 });
    else {
      const filteredRestaurants = await searchRestaurant({
        locationId: locationId,
        restaurantName: restaurantInput,
      });
      setRestaurants(filteredRestaurants.restaurants);
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

  const classes = useStyles();

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

          <Box className={classes.ml}>
            <ListRestaurant restaurants={restaurants} />
          </Box>
        </main>
      </div>
    </>
  );
};

export default RestaurantSearch;
