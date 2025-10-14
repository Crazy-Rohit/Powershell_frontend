/*!
=========================================================
* Vision UI Free React - App.jsx (Auth-Protected, Non-breaking)
=========================================================
*/

import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

// MUI
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Vision UI Components
import VuiBox from "components/VuiBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Context
import { useVisionUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Routes
import routes from "routes";

// Authentication & Home
import Home from "layouts/home";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// 👇 Auth Context
import { useAuth } from "./context/AuthContext";

export default function App() {
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const { user, loading } = useAuth();

  // === Handle direction ===
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // === Reset scroll on navigation ===
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  // === Sidebar hover behavior ===
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // === Configurator Button ===
  const configsButton = (
    <VuiBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="info"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="white"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </VuiBox>
  );

  // === Determine if Home Page ===
  const isHomePage = pathname === "/";

  // === Auth Protection for Dashboard Pages ===
  const isAuthRoute =
    pathname === "/" ||
    pathname.startsWith("/authentication/sign-in") ||
    pathname.startsWith("/authentication/sign-up");

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          background: "#000",
        }}
      >
        Loading...
      </div>
    );
  }

  // Redirect unauthorized users away from dashboard
  // ✅ Allow homepage ("/") even when user is not logged in
const isPublicRoute =
  pathname === "/" ||
  pathname.startsWith("/authentication/sign-in") ||
  pathname.startsWith("/authentication/sign-up");

// ✅ Only protect real dashboard pages
if (!user && !isPublicRoute) {
  return <Redirect to="/" />;
}


  // === Main Render ===
  return (
    <ThemeProvider theme={direction === "rtl" ? themeRTL : theme}>
      <CssBaseline />

      {/* Hide Sidenav + Configurator on Home */}
      {!isHomePage && layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand=""
            brandName="RM UI"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}

      <Switch>
  {/* Home Page (default route) */}
  <Route
    exact
    path="/"
    render={() => {
      if (user) return <Redirect to="/dashboard" />; // logged-in users → Dashboard
      return <Home />; // logged-out users → Home page
    }}
  />

  {/* Auth Pages */}
  <Route exact path="/authentication/sign-in" component={SignIn} />
  <Route exact path="/authentication/sign-up" component={SignUp} />

  {/* Dashboard + other routes */}
  {routes.map((route) =>
    route.route ? (
      <Route exact path={route.route} component={route.component} key={route.key} />
    ) : null
  )}

  {/* Default Redirect */}
  <Redirect from="*" to="/" />
</Switch>

    </ThemeProvider>
  );
}
