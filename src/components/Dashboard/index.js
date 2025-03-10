import React, { useEffect, useState } from "react";

import Alert from "@material-ui/lab/Alert";

import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import PersonIcon from "@material-ui/icons/Person";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import PublicIcon from "@material-ui/icons/Public";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import BusinessIcon from "@material-ui/icons/Business";

import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  checkOrgHandleExists,
  checkUserHandleExists,
  clearProfileEditError,
  setUpInitialData
} from "../../store/actions";

import countryList from "../../helpers/countryList";
import orgUser from "../../assets/images/org-user.svg";
import profileUser from "../../assets/images/profile-user.svg";
import Fade from "react-reveal/Fade";

import {
  validateName,
  validateHandle,
  validateCountry,
  validateOrgWebsite
} from "../../helpers/validations";
import PropTypes from "prop-types";

const Dashboard = ({ background = "white", textColor = "black" }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showOrgForm, setShowOrgForm] = useState(null);
  const [focusLeft, setFocusLeft] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const errorProp = useSelector(({ auth }) => auth.profile.error);
  const loadingProp = useSelector(({ auth }) => auth.profile.loading);
  const [name, setName] = useState("");
  const [nameValidateError, setNameValidateError] = useState(false);
  const [nameValidateErrorMessage, setNameValidateErrorMessage] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgNameValidateError, setOrgNameValidateError] = useState(false);
  const [orgNameValidateErrorMessage, setOrgNameValidateErrorMessage] =
    useState("");
  const [handle, setHandle] = useState("");
  const [handleValidateError, setHandleValidateError] = useState(false);
  const [handleValidateErrorMessage, setHandleValidateErrorMessage] =
    useState("");
  const [orgHandle, setOrgHandle] = useState("");
  const [orgHandleValidateError, setOrgHandleValidateError] = useState(false);
  const [orgHandleValidateErrorMessage, setOrgHandleValidateErrorMessage] =
    useState("");
  const [country, setCountry] = useState("");
  const [countryValidateError, setCountryValidateError] = useState(false);
  const [orgCountry, setOrgCountry] = useState("");
  const [orgCountryValidateError, setOrgCountryValidateError] = useState(false);
  const [orgWebsite, setOrgWebsite] = useState("");
  const [orgWebsiteValidateError, setOrgWebsiteValidateError] = useState(false);
  const [orgWebsiteValidateErrorMessage, setOrgWebsiteValidateErrorMessage] =
    useState("");

  const displayName = useSelector(
    ({
      firebase: {
        profile: { displayName }
      }
    }) => displayName
  );
  const children = [];

  for (let i = 0; i < countryList.length; i++) {
    children.push(
      <MenuItem key={countryList[i].code} value={countryList[i].name}>
        {countryList[i].name}
      </MenuItem>
    );
  }

  useEffect(() => {
    setShowImage(false);
    setTimeout(() => {
      setShowImage(focusLeft ? "user" : "org");
    }, 200);
  }, [focusLeft]);

  useEffect(() => setError(errorProp), [errorProp]);
  useEffect(() => setLoading(loadingProp), [loadingProp]);

  useEffect(
    () => () => {
      clearProfileEditError()(dispatch);
    },
    [dispatch]
  );

  const validated = () => {
    if (showOrgForm) {
      const nameValid = validateName(
        name,
        setNameValidateError,
        setNameValidateErrorMessage,
        "Please enter your name",
        "Please enter a real name"
      );
      const orgNameValid = validateName(
        orgName,
        setOrgNameValidateError,
        setOrgNameValidateErrorMessage,
        "Please enter organization name",
        "Please enter a real name"
      );
      const countryValid = validateCountry(country, setCountryValidateError);
      const orgCountryValid = validateCountry(
        orgCountry,
        setOrgCountryValidateError
      );
      const orgWebsiteValid = validateOrgWebsite(
        orgWebsite,
        setOrgWebsiteValidateError,
        setOrgWebsiteValidateErrorMessage
      );
      if (
        nameValid &&
        orgNameValid &&
        countryValid &&
        orgCountryValid &&
        orgWebsiteValid
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      const nameValid = validateName(
        name,
        setNameValidateError,
        setNameValidateErrorMessage,
        "Please enter your name",
        "Please enter a real name"
      );
      const countryValid = validateCountry(country, setCountryValidateError);
      if (nameValid && countryValid) {
        return true;
      } else {
        return false;
      }
    }
  };

  const onSubmit = async () => {
    validateHandle(
      checkUserHandleExists,
      firebase,
      dispatch,
      handle,
      setHandleValidateError,
      setHandleValidateErrorMessage,
      "Please enter a handle",
      "User handle can only contain lowercase alphanumeric characters",
      "User handle cannot be less than 6 characters",
      `The handle ${handle} is already taken`
    ).then(async validateUserHandle => {
      if (showOrgForm) {
        validateHandle(
          checkOrgHandleExists,
          firebase,
          dispatch,
          orgHandle,
          setOrgHandleValidateError,
          setOrgHandleValidateErrorMessage,
          "Please enter a handle",
          "Organization handle can only contain lowercase alphanumeric characters",
          "Organization handle cannot be less than 6 characters",
          `The handle ${orgHandle} is already taken`
        ).then(async validateOrgHandle => {
          if (validated() && validateOrgHandle && validateUserHandle) {
            setError("");
            await setUpInitialData({
              orgData: showOrgForm,
              name,
              handle,
              country,
              org_handle: orgHandle,
              org_name: orgName,
              org_website: orgWebsite,
              org_country: orgCountry
            })(firebase, firestore, dispatch);
          }
        });
      } else {
        if (validated() && validateUserHandle) {
          setError("");
          await setUpInitialData({
            orgData: showOrgForm,
            name,
            handle,
            country
          })(firebase, firestore, dispatch);
        }
      }
    });
  };

  //OnChange
  const onChangeName = name => setName(name);
  const onChangeOrgName = orgName => setOrgName(orgName);
  const onChangeHandle = handle => setHandle(handle);
  const onChangeOrgHandle = orgHandle => setOrgHandle(orgHandle);
  const onChangeCountry = country => setCountry(country);
  const onChangeOrgCountry = orgCountry => setOrgCountry(orgCountry);
  const onChangeOrgWebsite = orgWebsite => setOrgWebsite(orgWebsite);

  const onFocusHandle = () => {
    setHandleValidateError(false);
    setHandleValidateErrorMessage("");
  };

  return (
    <div className="home-row" style={{ background: background }}>
      <Grid container alignItems="center" justify="space-between">
        <Grid xs={12} className="col-pad-24 pt-32" item={true}>
          <h2 className="mb-0 center" style={{ color: textColor }}>
            Welcome to CodeLabz!
          </h2>
          <h3 className="mb-0 center" style={{ color: textColor }}>
            Let's complete your profile before we dive in.
          </h3>
        </Grid>
        <Grid xs={12} sm={12} md={showOrgForm ? 8 : 6} item={true}>
          {error && (
            <Grid container>
              <Grid xs={12} className="col-pad-24 pr-12 pb-0">
                <Alert variant="outlined" severity="error">
                  {error}
                </Alert>
              </Grid>
            </Grid>
          )}

          <Grid container>
            <Grid
              xs={12}
              sm={12}
              md={showOrgForm ? 6 : 12}
              className="col-pad-24 pr-12 pt-8 pb-24 div-transition"
              onFocus={() => setFocusLeft(true)}
              item={true}
            >
              <Card className="auth-form-col" style={{ margin: "0 auto" }}>
                <Box mt={2} mb={2} m={3}>
                  <Box
                    fontSize={16}
                    fontWeight="fontWeightBold"
                    m={1}
                    style={{ color: textColor }}
                  >
                    Your Details
                  </Box>
                </Box>

                <Divider />

                <Box m={3}>
                  <TextField
                    error={nameValidateError}
                    label="User Name"
                    variant="outlined"
                    placeholder={displayName ? displayName : ""}
                    value={name}
                    onChange={event => onChangeName(event.target.value)}
                    helperText={
                      nameValidateError ? nameValidateErrorMessage : null
                    }
                    fullWidth
                    autoComplete="handle"
                    required
                    style={{ marginBottom: "15px" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon style={{ color: "rgba(0,0,0,.25)" }} />
                        </InputAdornment>
                      )
                    }}
                  />
                  <TextField
                    error={handleValidateError}
                    label="User Handle"
                    variant="outlined"
                    placeholder="User Handle"
                    value={handle}
                    onChange={event => onChangeHandle(event.target.value)}
                    helperText={
                      handleValidateError ? handleValidateErrorMessage : null
                    }
                    fullWidth
                    autoComplete="handle"
                    required
                    onFocus={onFocusHandle}
                    style={{ marginBottom: "15px" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlineIcon
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        </InputAdornment>
                      )
                    }}
                  />
                  <FormControl
                    variant="outlined"
                    error={countryValidateError}
                    fullWidth
                  >
                    <InputLabel style={{ color: textColor }}>
                      User Country
                    </InputLabel>
                    <Select
                      label="User Country"
                      children={children}
                      style={{ width: "100%" }}
                      value={country}
                      onChange={event => onChangeCountry(event.target.value)}
                    ></Select>
                  </FormControl>
                </Box>
                <Divider></Divider>
                <Box m={3}>
                  <Button
                    size="small"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={() => setShowOrgForm(!showOrgForm)}
                  >
                    {showOrgForm === false
                      ? "I want to create an organization"
                      : showOrgForm === true
                      ? "I don't want to create an organization"
                      : "I want to create an organization"}
                  </Button>
                </Box>
              </Card>
            </Grid>
            <Grid
              xs={showOrgForm ? 12 : null}
              md={showOrgForm ? 6 : null}
              className="col-pad-24 pl-12 pr-12 pt-8"
              onFocus={() => setFocusLeft(false)}
              item={true}
            >
              {showOrgForm && (
                <Card>
                  <Box mt={2} mb={2} m={3}>
                    <Typography>
                      <Box fontSize={16} fontWeight="fontWeightBold" m={1}>
                        <p className="mb-0 " style={{ color: textColor }}>
                          Organization Details
                        </p>
                      </Box>
                    </Typography>
                  </Box>

                  <Divider />

                  <Box m={3}>
                    <TextField
                      error={orgNameValidateError}
                      label="Organization Name"
                      variant="outlined"
                      placeholder="Organiztion Name"
                      value={orgName}
                      onChange={event => onChangeOrgName(event.target.value)}
                      helperText={
                        orgNameValidateError
                          ? orgNameValidateErrorMessage
                          : null
                      }
                      fullWidth
                      autoComplete="handle"
                      required
                      style={{ marginBottom: "15px" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationCityIcon
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          </InputAdornment>
                        )
                      }}
                    />
                    <TextField
                      error={orgHandleValidateError}
                      label="Organization Handle"
                      variant="outlined"
                      placeholder="Organiztion Handle"
                      value={orgHandle}
                      onChange={event => onChangeOrgHandle(event.target.value)}
                      helperText={
                        orgHandleValidateError
                          ? orgHandleValidateErrorMessage
                          : null
                      }
                      fullWidth
                      autoComplete="orgHandle"
                      required
                      style={{ marginBottom: "15px" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <BusinessIcon
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          </InputAdornment>
                        )
                      }}
                    />
                    <FormControl
                      variant="outlined"
                      error={orgCountryValidateError}
                      fullWidth
                    >
                      <InputLabel style={{ color: textColor }}>
                        Organization Country
                      </InputLabel>
                      <Select
                        label="Organization Country"
                        children={children}
                        style={{ width: "100%" }}
                        showSearch={true}
                        value={orgCountry}
                        onChange={event =>
                          onChangeOrgCountry(event.target.value)
                        }
                      ></Select>
                    </FormControl>
                  </Box>

                  <Box m={3}>
                    <TextField
                      error={orgWebsiteValidateError}
                      label="Organization Website"
                      variant="outlined"
                      placeholder="Organization Website"
                      value={orgWebsite}
                      onChange={event => onChangeOrgWebsite(event.target.value)}
                      helperText={
                        orgWebsiteValidateError
                          ? orgWebsiteValidateErrorMessage
                          : null
                      }
                      fullWidth
                      autoComplete="orgWebsite"
                      required
                      style={{ marginBottom: "15px" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PublicIcon style={{ color: "rgba(0,0,0,.25)" }} />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Box>
                </Card>
              )}
            </Grid>

            <Grid xs={12} className="center pl-24 pr-12 pb-32 pt-8" item={true}>
              <Button
                size="small"
                fullWidth
                variant="contained"
                color="primary"
                disableElevation
                className="auth-form-col"
                onClick={onSubmit}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={showOrgForm ? 4 : 6}
          className="col-pad-24 pl-12 pt-8"
          item={true}
        >
          <Fade right={true} when={showImage}>
            <img
              src={showImage === "user" ? profileUser : orgUser}
              alt="Background for auth"
              width="100%"
              className="dash-image"
            />
          </Fade>
        </Grid>
      </Grid>
    </div>
  );
};

Dashboard.prototype = {
  background: PropTypes.string,
  textColor: PropTypes.string,
};
export default Dashboard;
