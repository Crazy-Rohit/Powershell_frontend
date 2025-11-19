/*!
=========================================================
* Vision UI Free React - Advanced Dashboard (Charts + Metrics Only)
=========================================================
*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { Line, Bar, Pie, Radar } from "react-chartjs-2";
import "chart.js/auto";

// MUI
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";

// Vision UI Components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { API_BASE } from "../../api";

const socket = io(API_BASE, {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  // === FETCH DATA ===
  const fetchData = async () => {
    try {
      const [m, a] = await Promise.all([
        axios.get(`${API_BASE}/metrics`, { withCredentials: true }),
        axios.get(`${API_BASE}/analysis`, { withCredentials: true }),
      ]);
      setMetrics(m.data);
      setAnalysis(a.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  // === SOCKET REALTIME UPDATE ===
  useEffect(() => {
    fetchData();
    socket.on("db_update", fetchData);
    return () => socket.off("db_update");
  }, []);

  if (loading || !metrics || !analysis) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <VuiBox display="flex" justifyContent="center" alignItems="center" height="70vh">
          <CircularProgress color="info" />
        </VuiBox>
      </DashboardLayout>
    );
  }

  // === CHART DATASETS ===
  const activityOverTime = {
    labels: analysis.activity_over_time?.x || [],
    datasets: [
      {
        label: "Activity Count",
        data: analysis.activity_over_time?.y || [],
        borderColor: "#42a5f5",
        backgroundColor: "rgba(66, 165, 245, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const topApps = {
  labels: analysis.top_apps?.x || [],   // app names on X-axis
  datasets: [
    {
      label: "Usage Count",
      data: analysis.top_apps?.y || [], // numeric counts as bar values
      backgroundColor: "#26a69a",
    },
  ],
};

  const hourlyActivity = {
    labels: analysis.hourly_activity?.x || [],
    datasets: [
      {
        label: "Activity by Hour",
        data: analysis.hourly_activity?.y || [],
        backgroundColor: "#ffca28",
      },
    ],
  };


const hourlyActivityOptions = {
  scales: {
    x: {
      ticks: {
        callback: (value) => {
          // value is the label like "10", "21", etc.
          const h = parseInt(value, 10);
          if (Number.isNaN(h)) return value; // fallback if not a number

          const suffix = h >= 12 ? "p.m." : "a.m.";
          let displayHour = h % 12;
          if (displayHour === 0) displayHour = 12; // 0 -> 12, 12 -> 12

          return `${displayHour}:00 ${suffix}`;
        },
        color: "#ffffff",
      },
    },
    y: {
      ticks: {
        color: "#ffffff",
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        color: "#ffffff",
      },
    },
  },
};
  
  
  const categoryDist = {
    labels: analysis.category_distribution?.labels || [],
    datasets: [
      {
        label: "Category",
        data: analysis.category_distribution?.values || [],
        backgroundColor: [
          "#42a5f5",
          "#66bb6a",
          "#ffa726",
          "#ab47bc",
          "#ef5350",
          "#26a69a",
        ],
      },
    ],
  };

  const screenshotsOverTime = {
    labels: analysis.screenshots_over_time?.x || [],
    datasets: [
      {
        label: "Screenshots",
        data: analysis.screenshots_over_time?.y || [],
        borderColor: "#f06292",
        backgroundColor: "rgba(240,98,146,0.3)",
        fill: true,
      },
    ],
  };

  const radarChart = {
    labels: ["System", "Application", "Browser", "Communication", "Other"],
    datasets: [
      {
        label: "Usage Intensity",
        data: [40, 60, 75, 50, 30],
        backgroundColor: "rgba(63,81,181,0.2)",
        borderColor: "#3f51b5",
        pointBackgroundColor: "#3f51b5",
      },
    ],
  };

  // === RENDER DASHBOARD ===
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        {/* === TOP 6 CARDS === */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} xl={2}>
            <Card style={{ padding: "20px", background: "rgba(10,15,35,0.9)" }}>
              <VuiTypography color="white" variant="h6">
                Total Active Time
              </VuiTypography>
              <VuiTypography color="info" variant="h4" fontWeight="bold">
                {metrics.total_active_time} hrs
              </VuiTypography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} xl={2}>
            <Card style={{ padding: "20px", background: "rgba(10,15,35,0.9)" }}>
              <VuiTypography color="white" variant="h6">
                Total Apps
              </VuiTypography>
              <VuiTypography color="info" variant="h4" fontWeight="bold">
                {metrics.total_apps}
              </VuiTypography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} xl={2}>
            <Card style={{ padding: "20px", background: "rgba(10,15,35,0.9)" }}>
              <VuiTypography color="white" variant="h6">
                Most Used App
              </VuiTypography>
              <VuiTypography color="info" variant="h5" fontWeight="bold">
                {metrics.most_used_app}
              </VuiTypography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} xl={2}>
            <Card style={{ padding: "20px", background: "rgba(10,15,35,0.9)" }}>
              <VuiTypography color="white" variant="h6">
                Total Screenshots
              </VuiTypography>
              <VuiTypography color="info" variant="h4" fontWeight="bold">
                {metrics.total_screenshots}
              </VuiTypography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} xl={2}>
            <Card style={{ padding: "20px", background: "rgba(10,15,35,0.9)" }}>
              <VuiTypography color="white" variant="h6">
                Top Category
              </VuiTypography>
              <VuiTypography color="info" variant="h5" fontWeight="bold">
                {metrics.top_category}
              </VuiTypography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} xl={2}>
            <Card style={{ padding: "20px", background: "rgba(10,15,35,0.9)" }}>
              <VuiTypography color="white" variant="h6">
                Last Updated
              </VuiTypography>
              <VuiTypography color="info" variant="h6">
                {new Date().toLocaleTimeString()}
              </VuiTypography>
            </Card>
          </Grid>
        </Grid>

        {/* === VISUALIZATIONS === */}
        <VuiBox mt={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card style={{ background: "rgba(10,15,35,0.9)", padding: "20px" }}>
                <VuiTypography color="white" variant="h6" mb={2}>
                  Activity Over Time
                </VuiTypography>
                <Line data={activityOverTime} />
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card style={{ background: "rgba(10,15,35,0.9)", padding: "20px" }}>
                <VuiTypography color="white" variant="h6" mb={2}>
                  Top Applications
                </VuiTypography>
                <Bar data={topApps} />
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card style={{ background: "rgba(10,15,35,0.9)", padding: "20px" }}>
                <VuiTypography color="white" variant="h6" mb={2}>
                  Hourly Activity
                </VuiTypography>
                <Bar data={hourlyActivity} options={hourlyActivityOptions}/>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card style={{ background: "rgba(10,15,35,0.9)", padding: "20px" }}>
                <VuiTypography color="white" variant="h6" mb={2}>
                  Screenshots Over Time
                </VuiTypography>
                <Line data={screenshotsOverTime} />
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card style={{ background: "rgba(10,15,35,0.9)", padding: "20px" }}>
                <VuiTypography color="white" variant="h6" mb={2}>
                  Category Distribution
                </VuiTypography>
                <Pie data={categoryDist} />
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card style={{ background: "rgba(10,15,35,0.9)", padding: "20px" }}>
                <VuiTypography color="white" variant="h6" mb={2}>
                  Application Usage Radar
                </VuiTypography>
                <Radar data={radarChart} />
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
      </VuiBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
