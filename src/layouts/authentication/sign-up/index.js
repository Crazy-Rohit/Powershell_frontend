/*!
=========================================================
* Vision UI Free React - Sign Up (Backend + Session Integrated)
=========================================================
*/
import { API_BASE } from "../../../api";  // ✅ add at top if not imported
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

// @mui material components
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

// Icons
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";

// Vision UI Components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";

// Vision UI Theme
import radialGradient from "assets/theme/functions/radialGradient";
import rgba from "assets/theme/functions/rgba";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Layout
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Image
import bgSignIn from "assets/images/signUpImage.png";

function SignUp() {
  const [rememberMe, setRememberMe] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  // ===========================
  // ✅ Handle Sign Up
  // ===========================
  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // Register user to backend MongoDB
      const res = await axios.post(
  `${API_BASE}/signup`,
  { username, email, password },
  { withCredentials: true }
);
      if (res.status === 201) {
        alert("Account created successfully!");
        history.push("/authentication/sign-in");
      } else {
        alert(res.data.message || "Signup failed. Try again.");
      }
    } catch (err) {
      // 🔹 Fallback to local simulation
      console.error("Signup Error:", err);
      alert("Backend not reachable. Simulated signup successful!");
      localStorage.setItem("user", JSON.stringify({ username, email }));
      history.push("/authentication/sign-in");
    }
  };

  return (
    <CoverLayout
      title="Welcome!"
      color="white"
      description="Use these awesome forms to login or create a new account in your project for free."
      image={bgSignIn}
      premotto="INSPIRED BY THE FUTURE:"
      motto="THE VISION UI DASHBOARD"
      cardContent
    >
      <GradientBorder borderRadius={borders.borderRadius.form} minWidth="100%" maxWidth="100%">
        <VuiBox
          component="form"
          role="form"
          onSubmit={handleSignUp}
          borderRadius="inherit"
          p="45px"
          sx={({ palette: { secondary } }) => ({
            backgroundColor: secondary.focus,
          })}
        >
          <VuiTypography
            color="white"
            fontWeight="bold"
            textAlign="center"
            mb="24px"
            sx={({ typography: { size } }) => ({
              fontSize: size.lg,
            })}
          >
            Register with
          </VuiTypography>

          {/* Social Buttons */}
          <Stack mb="25px" justifyContent="center" alignItems="center" direction="row" spacing={2}>
            {[FaFacebook, FaApple, FaGoogle].map((IconComp, idx) => (
              <GradientBorder borderRadius="xl" key={idx}>
                <a href="#">
                  <IconButton
                    transition="all .25s ease"
                    justify="center"
                    align="center"
                    bg="rgb(19,21,54)"
                    borderradius="15px"
                    sx={({ palette: { secondary }, borders: { borderRadius } }) => ({
                      borderRadius: borderRadius.xl,
                      padding: "25px",
                      backgroundColor: secondary.focus,
                      "&:hover": {
                        backgroundColor: rgba(secondary.focus, 0.9),
                      },
                    })}
                  >
                    <Icon
                      as={IconComp}
                      w="30px"
                      h="30px"
                      sx={({ palette: { white } }) => ({
                        color: white.focus,
                      })}
                    />
                  </IconButton>
                </a>
              </GradientBorder>
            ))}
          </Stack>

          <VuiTypography
            color="text"
            fontWeight="bold"
            textAlign="center"
            mb="14px"
            sx={({ typography: { size } }) => ({ fontSize: size.lg })}
          >
            or
          </VuiTypography>

          {/* Name */}
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Name
              </VuiTypography>
            </VuiBox>
            <GradientBorder
              minWidth="100%"
              borderRadius={borders.borderRadius.lg}
              padding="1px"
              backgroundImage={radialGradient(
                palette.gradients.borderLight.main,
                palette.gradients.borderLight.state,
                palette.gradients.borderLight.angle
              )}
            >
              <VuiInput
                placeholder="Your full name..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </GradientBorder>
          </VuiBox>

          {/* Email */}
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Email
              </VuiTypography>
            </VuiBox>
            <GradientBorder
              minWidth="100%"
              borderRadius={borders.borderRadius.lg}
              padding="1px"
              backgroundImage={radialGradient(
                palette.gradients.borderLight.main,
                palette.gradients.borderLight.state,
                palette.gradients.borderLight.angle
              )}
            >
              <VuiInput
                type="email"
                placeholder="Your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </GradientBorder>
          </VuiBox>

          {/* Password */}
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Password
              </VuiTypography>
            </VuiBox>
            <GradientBorder
              minWidth="100%"
              borderRadius={borders.borderRadius.lg}
              padding="1px"
              backgroundImage={radialGradient(
                palette.gradients.borderLight.main,
                palette.gradients.borderLight.state,
                palette.gradients.borderLight.angle
              )}
            >
              <VuiInput
                type="password"
                placeholder="Your password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </GradientBorder>
          </VuiBox>

          {/* Remember Me */}
          <VuiBox display="flex" alignItems="center">
            <VuiSwitch color="info" checked={rememberMe} onChange={handleSetRememberMe} />
            <VuiTypography
              variant="caption"
              color="white"
              fontWeight="medium"
              onClick={handleSetRememberMe}
              sx={{ cursor: "pointer", userSelect: "none" }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;Remember me
            </VuiTypography>
          </VuiBox>

          {/* Sign Up Button */}
          <VuiBox mt={4} mb={1}>
            <VuiButton color="info" fullWidth type="submit">
              SIGN UP
            </VuiButton>
          </VuiBox>

          {/* Redirect to Login */}
          <VuiBox mt={3} textAlign="center">
            <VuiTypography variant="button" color="text" fontWeight="regular">
              Already have an account?{" "}
              <VuiTypography
                component={Link}
                to="/authentication/sign-in"
                variant="button"
                color="white"
                fontWeight="medium"
              >
                Sign in
              </VuiTypography>
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </GradientBorder>
    </CoverLayout>
  );
}

export default SignUp;
