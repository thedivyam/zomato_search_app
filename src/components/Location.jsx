import React from "react";
import {
  withStyles,
  Table,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@material-ui/core";
import { useHistory } from "react-router";

const Locations = ({ locations }) => {
  const history = useHistory();

  const locationClick = (id) => {
    history.push(`/location/${id}`);
  };

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#2D2D2D",
      color: "#fff",
      borderBottomColor: "#000",
    },
    body: {
      fontSize: 16,
      color: "#fff",
      borderBottomColor: "#000",
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: "#212121",
      },
      "&:nth-of-type(even)": {
        backgroundColor: "#2D2D2D",
      },
    },
  }))(TableRow);

  return (
    <Box width={"100%"}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ fontWeight: "bold" }}>
                Name
              </StyledTableCell>
              <StyledTableCell style={{ fontWeight: "bold" }}>
                Country
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations.map((location) => (
              <StyledTableRow
                key={location.id}
                style={{ cursor: "pointer" }}
                onClick={() => locationClick(location.id)}
              >
                <StyledTableCell component="th" scope="row">
                  {location.name}
                </StyledTableCell>
                <StyledTableCell>
                  <img
                    src={location.country_flag_url}
                    className="flag"
                    width={"15vw"}
                    alt="flag"
                    style={{ marginRight: "5px" }}
                  />
                  {location.country_name}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Locations;
