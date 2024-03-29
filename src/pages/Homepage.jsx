// Imporing the necessary dependencies
import React, { useState } from "react";
import { getAllLocations } from "../service/locationService";
import Locations from "../components/Location";
import { toast } from "react-toastify";
import { Box, TextField } from "@material-ui/core";
import { Button } from "reactstrap";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const HomePage = () => {
  // Declaring and initialising the state variables
  const [location, setLocation] = useState("New Delhi");
  const [locations, setLocations] = useState([]);

  // Function which searches the location using
  // getAllLocations() function from locationService.js
  const getLocations = async () => {
    if (location === "")
      toast.error("Search cannot be blank!", {
        autoClose: 2000,
      });

    const locations = await getAllLocations(location);
    setLocations(locations);

    if (!locations?.length)
      toast.error("No Locations found with this name", {
        autoClose: 2000,
      });
  };

  // Handling the location text change
  const locationChange = (e) => {
    const { value } = e.target;
    setLocation(value);
  };

  // Handling the search button click
  const formHandler = (e) => {
    e.preventDefault();
    getLocations();
  };

  // Creating a custom theme
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#CB202D",
      },
      secondary: {
        main: "#2D2D2D",
      },
    },
    typography: {
      body1: {
        fontSize: 18,
      },
    },
  });

  // View
  return (
    <div>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        mt={"5.5rem"}
      >
        <form onSubmit={formHandler}>
          <Box
            display={"flex"}
            mt={3}
            style={{ width: "500px" }}
            minWidth={"300px"}
            maxWidth={"500px"}
          >
            <Box mr={"1.2rem"} style={{ flexGrow: "1" }}>
              <ThemeProvider theme={theme}>
                <TextField
                  id="outlined-helperText"
                  label="Enter City"
                  variant="outlined"
                  value={location}
                  onChange={locationChange}
                  style={{ width: "100%" }}
                  color="secondary"
                />
              </ThemeProvider>
            </Box>
            <Button
              type={"submit"}
              variant="contained"
              color="primary"
              style={{ flexDirection: "revert" }}
            >
              Search
            </Button>
          </Box>
        </form>
        <br />
        {locations && locations.length ? (
          <Box width={"95vw"} maxWidth={"1000px"} my={"3rem"}>
            <Locations locations={locations} />
          </Box>
        ) : null}
      </Box>
    </div>
  );
};

export default HomePage;
