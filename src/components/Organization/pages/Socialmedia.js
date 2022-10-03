import { Grid, makeStyles, Button, Typography } from "@material-ui/core";
import React from "react";
import Orgsocial from "../Orgsocial";

const useStyles = makeStyles(theme => ({
  root: {
    padding: 20
  },
  heading: {
    fontWeight: 100,
    fontSize: "1.6rem"
  }
}));
function Socialmedia() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid item spacing={3} data-testid="organization-socialmedia-page">
        <Typography className={classes.heading}>Social Media</Typography>
        <Orgsocial />
      </Grid>
    </React.Fragment>
  );
}
export default Socialmedia;
