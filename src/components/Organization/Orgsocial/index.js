import React from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import GoogleImg from "../../../assets/orgs/google.png";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import useStyles from "./styles";
import { signInWithGoogle, signInWithProviderID } from "../../../store/actions";
import { useDispatch } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { Grid } from "@material-ui/core";

const Orgsocial= () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const firebase = useFirebase();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Box className={classes.row} sx={{ marginBottom: 15 }}>
          <Grid
            className={classes.link}
            // onClick={() => signInWithProviderID("facebook")(firebase, dispatch)}
            data-testId="facebookButton"
          >
            <FacebookIcon className={classes.fb}>
              <span className="sm-text">Facebook</span>
            </FacebookIcon>
            <Typography className={classes.text}>
            Organization's Facebook Page
            </Typography>
          </Grid>
          
          <Grid
            className={classes.link}
            // onClick={() => signInWithProviderID("github")(firebase, dispatch)}
            data-testId="githubButton"
          >
            <GitHubIcon className={classes.git}>
              <span className="sm-text">Github</span>
            </GitHubIcon>
            <Typography className={classes.text}>
            Organization's Github Account
            </Typography>
          </Grid>
        </Box>
        <Box className={classes.row}>
          <Grid
            className={classes.link}
            // onClick={() => signInWithGoogle()(firebase, dispatch)}
            data-testId="googleButton"
          >
            <img src={GoogleImg} alt="google" className={classes.button} />
            <Typography className={classes.text}>
              Organization's Google Account
            </Typography>
          </Grid>
          <Grid
            className={classes.link}
            // onClick={() => signInWithProviderID("twitter")(firebase, dispatch)}
            data-testId="twitterButton"
          >
            <TwitterIcon className={classes.tw}>
              <span className="sm-text">Twitter</span>
            </TwitterIcon>
            <Typography className={classes.text}>
            Organization's Twitter Account
            </Typography>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Orgsocial;
