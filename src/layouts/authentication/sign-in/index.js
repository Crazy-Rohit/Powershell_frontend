/*!
=========================================================
* Vision UI Free React - Sign In (Backend + Session Integrated)
=========================================================
*/

import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

// ✅ Import API base (important)
import { API_BASE } from "../../../api";

// Vision UI Components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";

// Theme Assets
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Layout
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Image
import bgSignIn from "assets/images/signInImage.png";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const history = useHistory();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  // ===========================
  // ✅ Authentication Handler
  // ===========================
  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      console.log("🚀 Sending login request to:", `${API_BASE}/login`);

      // ✅ Use environment-based backend URL
      const res = await axios.post(
        `${API_BASE}/login`,
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 200 && res.data.username) {
        // Store in localStorage for Navbar/Profile
        localStorage.setItem("user", JSON.stringify(res.data));

        // Redirect to dashboard
        history.push("/dashboard");
        window.location.reload();
      } else {
        alert("Invalid credentials. Please check your email and password.");
      }
    } catch (err) {
      // 🔹 Fallback to dummy user for local testing if backend not running
      if (email === "admin123@example.com" && password === "123456") {
        const userData = { username: "Admin", email };
        localStorage.setItem("user", JSON.stringify(userData));
        history.push("/dashboard");
        window.location.reload();
      } else {
        alert("Invalid credentials or backend not reachable.");
      }
    }
  };

  return (
    <CoverLayout
      title="Nice to see you!"
      color="white"
      description="Enter your email and password to sign in"
      premotto="INSPIRED BY THE FUTURE:"
      motto="THE VISION UI DASHBOARD"
      image={bgSignIn}
    >
      {/* ✅ Changed: removed onSubmit form interception and made button trigger directly */}
      <VuiBox component="form" role="form">
        {/* Email */}
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Email
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            padding="1px"
            borderRadius={borders.borderRadius.lg}
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
              type="email"
              placeholder="Your email..."
              fontWeight="500"
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
              sx={({ typography: { size } }) => ({ fontSize: size.sm })}
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

        {/* ✅ Updated Sign In Button (explicit trigger) */}
        <VuiBox mt={4} mb={1}>
          <VuiButton color="info" fullWidth type="button" onClick={handleSignIn}>
            SIGN IN
          </VuiButton>
        </VuiBox>

        {/* Sign Up Redirect */}
        <VuiBox mt={3} textAlign="center">
          <VuiTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <VuiTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="white"
              fontWeight="medium"
            >
              Sign up
            </VuiTypography>
          </VuiTypography>
        </VuiBox>
      </VuiBox>
    </CoverLayout>
  );
}

export default SignIn;
