/*!
=========================================================
* Vision UI Free React - Home Page (MVP Version)
=========================================================
*/

import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Typography, Card, Grid } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

const Home = () => {
  const history = useHistory();

  // ✅ If already signed in, redirect to dashboard automatically
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      history.push("/dashboard");
    }
  }, [history]);

  return (
    <VuiBox
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at 50% 50%, #0d102d 0%, #05081b 80%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Card
        sx={{
          background: "linear-gradient(145deg, rgba(10,15,50,0.95), rgba(30,40,120,0.8))",
          borderRadius: "24px",
          padding: "48px 64px",
          textAlign: "center",
          boxShadow: "0px 0px 40px rgba(0,0,0,0.4)",
          maxWidth: "600px",
        }}
      >
        <VuiTypography variant="h3" color="white" fontWeight="bold" mb={2}>
          Welcome to Powershell Dashboard
        </VuiTypography>

        <Typography
          variant="body1"
          style={{
            color: "#B0BEC5",
            marginBottom: "32px",
          }}
        >
          Your intelligent analytics platform to monitor user activity, system performance,
          and insights in real time.
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(90deg, #1a73e8, #42a5f5)",
                color: "#fff",
                px: 5,
                py: 1.5,
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: "bold",
              }}
              onClick={() => history.push("/authentication/sign-in")}
            >
              Sign In
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#42a5f5",
                color: "#42a5f5",
                px: 5,
                py: 1.5,
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: "bold",
              }}
              onClick={() => history.push("/authentication/sign-up")}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>

        <Typography
          variant="caption"
          style={{
            color: "#90A4AE",
            marginTop: "24px",
            display: "block",
          }}
        >
          © 2025 IntelliH Systems. All rights reserved.
        </Typography>
      </Card>
    </VuiBox>
  );
};

export default Home;
