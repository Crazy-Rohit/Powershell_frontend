/*!
=========================================================
* Vision UI Free React - v1.0.0
=========================================================
*/

import { useState, useEffect } from "react";

// @mui material components
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";

// Custom styles
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";

// Context
import {
  useVisionUIController,
  setOpenConfigurator,
  setTransparentSidenav,
  setFixedNavbar,
  setSidenavColor,
  setTransparentNavbar,   // ✅ for Navbar transparent/opaque
} from "context";

function Configurator() {
  const [controller, dispatch] = useVisionUIController();
  const {
    openConfigurator,
    transparentSidenav,
    fixedNavbar,
    sidenavColor,
    transparentNavbar,
  } = controller;

  const [disabled, setDisabled] = useState(false);
  const sidenavColors = ["primary", "info", "success", "warning", "error"];

  useEffect(() => {
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }
    window.addEventListener("resize", handleDisabled);
    handleDisabled();
    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
  const handleTransparentSidenav = () => setTransparentSidenav(dispatch, true);
  const handleWhiteSidenav = () => setTransparentSidenav(dispatch, false);
  const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar);

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      {/* === Header === */}
      <VuiBox
        backgroundColor="black"
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={3}
        pb={0.8}
        px={3}
      >
        <VuiBox>
          <VuiTypography color="white" variant="h5" fontWeight="bold">
            Vision UI Configurator
          </VuiTypography>
          <VuiTypography variant="body2" color="white" fontWeight="bold">
            See our dashboard options.
          </VuiTypography>
        </VuiBox>

        <Icon
          sx={({ typography: { size, fontWeightBold }, palette: { white } }) => ({
            fontSize: `${size.md} !important`,
            fontWeight: `${fontWeightBold} !important`,
            stroke: `${white.main} !important`,
            strokeWidth: "2px",
            cursor: "pointer",
            mt: 2,
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </VuiBox>

      <Divider light />

      {/* === Body === */}
      <VuiBox pt={1.25} pb={3} px={3}>
        {/* Sidenav Colors */}
        <VuiBox>
          <VuiTypography variant="h6" color="white">
            Sidenav Colors
          </VuiTypography>
          <VuiBox mb={0.5} display="flex">
            {sidenavColors.map((color) => (
              <VuiButton
                key={color}
                onClick={() => setSidenavColor(dispatch, color)}
                sx={({ borders: { borderWidth }, palette: { white, dark }, transitions }) => ({
                  width: "24px",
                  height: "24px",
                  minWidth: "24px",
                  padding: 0,
                  border: `${borderWidth[1]} solid ${white.main}`,
                  borderColor: sidenavColor === color && dark.main,
                  marginRight: "8px",
                  transition: transitions.create("border-color", {
                    easing: transitions.easing.sharp,
                    duration: transitions.duration.shorter,
                  }),
                  backgroundImage: ({ functions: { linearGradient }, palette: { gradients } }) =>
                    linearGradient(gradients[color].main, gradients[color].state),
                })}
              />
            ))}
          </VuiBox>
        </VuiBox>

        {/* === Sidenav Type Toggle (Transparent / Opaque) === */}
        {window.innerWidth >= 1440 && (
          <VuiBox mt={3} lineHeight={1}>
            <VuiTypography variant="h6" color="white">
              Sidenav Type
            </VuiTypography>
            <VuiTypography variant="button" color="text" fontWeight="regular">
              Choose between 2 different sidenav types.
            </VuiTypography>

            <VuiBox display="flex" mt={2}>
              <VuiButton
                color="info"
                variant={transparentSidenav ? "contained" : "outlined"}
                onClick={handleTransparentSidenav}
                disabled={disabled}
                fullWidth
                sx={{ mr: 1 }}
              >
                Transparent
              </VuiButton>
              <VuiButton
                color="info"
                variant={!transparentSidenav ? "contained" : "outlined"}
                onClick={handleWhiteSidenav}
                disabled={disabled}
                fullWidth
              >
                Opaque
              </VuiButton>
            </VuiBox>
          </VuiBox>
        )}

        {/* === Navbar Fixed === */}
        <VuiBox mt={3} mb={2} lineHeight={1}>
          <VuiTypography variant="h6" color="white">
            Navbar Fixed
          </VuiTypography>
          <VuiSwitch checked={fixedNavbar} onChange={handleFixedNavbar} color="info" />
        </VuiBox>

        {/* === Navbar Type Toggle (Transparent / Opaque) === */}
        <VuiBox mt={3} mb={2} lineHeight={1}>
          <VuiTypography variant="h6" color="white">
            Navbar Type
          </VuiTypography>
          <VuiTypography variant="button" color="text" fontWeight="regular">
            Choose between transparent and opaque navbar.
          </VuiTypography>

          <VuiBox display="flex" mt={2}>
            <VuiButton
              color="info"
              variant={transparentNavbar ? "contained" : "outlined"}
              onClick={() => setTransparentNavbar(dispatch, true)}
              fullWidth
              sx={{ mr: 1 }}
            >
              Transparent
            </VuiButton>
            <VuiButton
              color="info"
              variant={!transparentNavbar ? "contained" : "outlined"}
              onClick={() => setTransparentNavbar(dispatch, false)}
              fullWidth
            >
              Opaque
            </VuiButton>
          </VuiBox>
        </VuiBox>
      </VuiBox>
    </ConfiguratorRoot>
  );
}

export default Configurator;
