// src/layouts/profile/components/Header/index.js
import { Card, Grid, Avatar, Button } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import profilePic from "assets/images/team-2.jpg";
import useProfile from "hooks/useProfile";

function Header() {
  const { user, loading } = useProfile();

  return (
    <VuiBox
      position="relative"
      mb="40px"
      sx={{
        background: "linear-gradient(135deg, #0d102d 0%, #1b256e 100%)",
        borderRadius: "16px",
        padding: "16px",
      }}
    >
      <Card
        sx={{
          background: "transparent",
          boxShadow: "none",
          pt: 2,
          pb: 2,
          pl: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Grid container alignItems="center">
          {/* Left: Avatar + User info */}
          <Grid item xs={12} md={6} lg={8} display="flex" alignItems="center">
            <Avatar src={profilePic} alt="profile" sx={{ width: 70, height: 70, mr: 2 }} />
            <div>
              <VuiTypography color="white" variant="h6" fontWeight="bold">
                {loading ? "Loading..." : user?.name || "Guest User"}
              </VuiTypography>
              <VuiTypography color="text" variant="button" fontWeight="regular">
                {loading ? "" : user?.email || "No email found"}
              </VuiTypography>
              {!loading && user?.created_at && (
                <VuiTypography color="text" variant="caption" fontWeight="regular" display="block">
                  Member since: {new Date(user.created_at).toLocaleDateString()}
                </VuiTypography>
              )}
              {!loading && user?.last_login && (
                <VuiTypography color="text" variant="caption" fontWeight="regular" display="block">
                  Last login: {new Date(user.last_login).toLocaleString()}
                </VuiTypography>
              )}
            </div>
          </Grid>

          {/* Right: Buttons */}
          <Grid item xs={12} md={6} lg={4} display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#1a73e8", color: "#fff", borderRadius: "10px", px: 3, textTransform: "none" }}
            >
              Overview
            </Button>
            <Button
              variant="outlined"
              sx={{ borderColor: "#42a5f5", color: "#42a5f5", borderRadius: "10px", px: 3, textTransform: "none" }}
            >
              Projects
            </Button>
          </Grid>
        </Grid>
      </Card>
    </VuiBox>
  );
}

export default Header;
