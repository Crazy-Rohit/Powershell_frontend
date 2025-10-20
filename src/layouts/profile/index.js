// src/layouts/profile/index.js
import { Grid, Card } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
import Welcome from "layouts/profile/components/Welcome";
import CarInformations from "layouts/profile/components/CarInformations";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import useProfile from "hooks/useProfile";

// Images (gallery)
import profile1 from "assets/images/profile-1.png";
import profile2 from "assets/images/profile-2.png";
import profile3 from "assets/images/profile-3.png";

function Overview() {
  const { user, loading } = useProfile();

  return (
    <DashboardLayout>
      <Header />

      <VuiBox mt={5} mb={3}>
        <Grid container spacing={3}>
          {/* Welcome Section */}
          <Grid item xs={12} xl={4} xxl={3}>
            <Welcome />
          </Grid>

          {/* Car Info Section */}
          // <Grid item xs={12} xl={5} xxl={6}>
          //   <CarInformations />
          // </Grid>

          {/* Profile Info Card */}
          <Grid item xs={12} xl={3} xxl={3}>
            <ProfileInfoCard
              title="Profile Information"
              description={
                loading
                  ? "Loading profile..."
                  : `Hi, I’m ${user?.name || "Guest"}. Welcome to your dashboard!`
              }
              info={{
                fullName: loading ? "Loading..." : user?.name || "Not available",
                email: loading ? "Loading..." : user?.email || "Not available",
                mobile: "(+91) 9876543210", // add real field later if you store it
                location: "India",          // add real field later if you store it
                memberSince: loading || !user?.created_at ? "—" : new Date(user.created_at).toLocaleDateString(),
                lastLogin: loading || !user?.last_login ? "—" : new Date(user.last_login).toLocaleString(),
              }}
              social={[
                { link: "https://www.facebook.com/", icon: <i className="fab fa-facebook" />, color: "facebook" },
                { link: "https://twitter.com/", icon: <i className="fab fa-twitter" />, color: "twitter" },
                { link: "https://www.instagram.com/", icon: <i className="fab fa-instagram" />, color: "instagram" },
              ]}
            />
          </Grid>
        </Grid>
      </VuiBox>

      {/* Bottom Section */}
      {/* <Grid container spacing={3} mb="30px">
        <Grid item xs={12} xl={3} height="100%">
          <PlatformSettings />
        </Grid>

        <Grid item xs={12} xl={9}>
          <Card>
            <VuiBox display="flex" flexDirection="column" height="100%">
              <VuiBox display="flex" flexDirection="column" mb="24px">
                <VuiTypography color="white" variant="lg" fontWeight="bold" mb="6px">
                  Projects
                </VuiTypography>
                <VuiTypography color="text" variant="button" fontWeight="regular">
                  Architects design houses
                </VuiTypography>
              </VuiBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} xl={4}>
                  <img src={profile1} alt="project 1" width="100%" style={{ borderRadius: "12px" }} />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <img src={profile2} alt="project 2" width="100%" style={{ borderRadius: "12px" }} />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <img src={profile3} alt="project 3" width="100%" style={{ borderRadius: "12px" }} />
                </Grid>
              </Grid>
            </VuiBox>
          </Card>
        </Grid>
      </Grid> */}

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
