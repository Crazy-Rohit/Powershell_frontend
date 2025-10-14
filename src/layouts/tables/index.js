/*!
=========================================================
* Vision UI Free React - Real-Time Tables (MongoDB)
=========================================================
*/

import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

// MUI
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";

// Vision UI
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Table component (your existing one)
import Table from "examples/Tables/Table";

import { API_BASE } from "../../api";  


const socket = io(API_BASE, {
  transports: ["websocket", "polling"],
  withCredentials: true,
}); // match Flask server

function Tables() {
  const [userColumns, setUserColumns] = useState([]);
  const [userRows, setUserRows] = useState([]);
  const [screenColumns, setScreenColumns] = useState([]);
  const [screenRows, setScreenRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // === FETCH FUNCTION ===
  const fetchTables = async () => {
    try {
      const [userRes, screenRes] = await Promise.all([
        axios.get(`${API_BASE}/table/user_logs`, { withCredentials: true }),
        axios.get(`${API_BASE}/table/screenshots`, { withCredentials: true }),
      ]);

      // User Logs
      if (userRes.data?.columns?.length) {
        const cols = userRes.data.columns.map((c) => ({
          name: c,
          align: "left",
        }));
        setUserColumns(cols);
        setUserRows(userRes.data.rows);
      }

      // Screenshot Logs
      if (screenRes.data?.columns?.length) {
        const cols2 = screenRes.data.columns.map((c) => ({
          name: c,
          align: "left",
        }));
        setScreenColumns(cols2);
        setScreenRows(screenRes.data.rows);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error loading tables:", err);
    }
  };

  // === INITIAL LOAD + REAL-TIME SOCKET ===
  useEffect(() => {
    fetchTables();

    socket.on("db_update", () => {
      console.log("🔁 MongoDB updated — refreshing tables...");
      fetchTables();
    });

    return () => socket.off("db_update");
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <VuiBox display="flex" justifyContent="center" alignItems="center" height="70vh">
          <CircularProgress color="info" />
        </VuiBox>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <Grid container spacing={3}>
          {/* === USER LOGS TABLE === */}
          <Grid item xs={12}>
            <Card style={{ background: "rgba(10,15,35,0.9)", padding: "20px" }}>
              <VuiTypography variant="h5" color="white" fontWeight="bold" mb={2}>
                User Activity Logs (Live)
              </VuiTypography>
              {userColumns.length > 0 ? (
                <Table columns={userColumns} rows={userRows} />
              ) : (
                <VuiTypography color="text">No data found.</VuiTypography>
              )}
            </Card>
          </Grid>

          {/* === SCREENSHOT LOGS TABLE === */}
          <Grid item xs={12}>
            <Card style={{ background: "rgba(10,15,35,0.9)", padding: "20px" }}>
              <VuiTypography variant="h5" color="white" fontWeight="bold" mb={2}>
                Screenshot Logs (Live)
              </VuiTypography>
              {screenColumns.length > 0 ? (
                <Table columns={screenColumns} rows={screenRows} />
              ) : (
                <VuiTypography color="text">No screenshot data found.</VuiTypography>
              )}
            </Card>
          </Grid>
        </Grid>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
