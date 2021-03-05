import React, { useState } from "react";
import { getAllLocations } from "../service/locationService";
import Locations from "../components/Location";
import { toast } from "react-toastify";
import { Box, TextField } from "@material-ui/core";
import { Button } from "reactstrap";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const HomePage = () => {
  const [location, setLocation] = useState("New Delhi");
  const [locations, setLocations] = useState([]);

  const getLocations = async () => {
    if (location === "") toast.error("Search cannot be blank!");

    const locations = await getAllLocations(location);
    setLocations(locations);

    if (!locations?.length) toast.error("No Locations found with this name");
  };

  const locationChange = (e) => {
    const { value } = e.target;
    setLocation(value);
  };

  const formHandler = (e) => {
    e.preventDefault();
    getLocations();
  };

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
      // Tell Material-UI what's the font-size on the html element is.
      body1: {
        fontSize: 18,
      },
    },
  });

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
