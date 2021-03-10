import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import placeHolder from "../assets/img/default-placeholder.png";

const useStyles = makeStyles((theme) =>
  createStyles({
    restaurantCard: {
      marginRight: "2rem",
      marginBottom: "2rem",
      backgroundColor: "#212121",
      color: "white",
      [theme.breakpoints.only("xs")]: {
        width: "25.5rem",
      },
    },
    image: {
      height: "300px",
      width: "100%",
      [theme.breakpoints.only("xs")]: {
        height: "250px",
      },
      [theme.breakpoints.only("sm")]: {
        height: "275px",
      },
    },
    bold: {
      fontWeight: "bold",
    },
  })
);

const ListRestaurant = ({ restaurants }) => {
  const classes = useStyles();
  return (
    <div style={{ width: "100%" }} className={classes.mr}>
      <Grid container>
        {restaurants.map((data) => {
          const restaurant = data.restaurant;
          return (
            <Grid
              item
              key={restaurant.id}
              xl={4}
              lg={4}
              md={4}
              sm={6}
              xs={12}
              style={{ flexGrow: "1" }}
            >
              <Card className={classes.restaurantCard}>
                <CardActionArea>
                  {restaurant?.featured_image !== "" ? (
                    <img
                      src={restaurant?.featured_image}
                      className={classes.image}
                      alt={""}
                    />
                  ) : (
                    <img src={placeHolder} className={classes.image} alt={""} />
                  )}
                  <CardContent>
                    <Typography variant="h5" component="h2" noWrap>
                      {restaurant?.name}
                    </Typography>
                    <Typography
                      inline="true"
                      variant="body2"
                      style={{ color: "#fff" }}
                      component="p"
                      align="left"
                      noWrap
                    >
                      {`Address: ${restaurant?.location?.address}`}
                      <br />
                      {`Timings: ${restaurant?.timings}`}
                    </Typography>
                    <Typography
                      className={classes.bold}
                      inline="true"
                      variant="body2"
                      style={{ color: "#fff" }}
                      component="p"
                    >
                      {`Ratings: ${restaurant?.user_rating?.aggregate_rating}`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default ListRestaurant;
