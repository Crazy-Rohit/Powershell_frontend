import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Card } from "@mui/material";
import { API_BASE } from "../../api";


function AnalysisCard({ title, chart }) {
  return (
    <Card style={{ padding: "1rem", margin: "1rem 0" }}>
      <h3>{title}</h3>
      {chart ? (
        <img
          src={`data:image/png;base64,${chart}`}
          alt={title}
          style={{ width: "100%", maxHeight: "300px", objectFit: "contain" }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </Card>
  );
}

export default function AnalysisDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE}/analysis`, { withCredentials: true })
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <p>Loading analysis...</p>;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <AnalysisCard title="Activity Over Time" chart={data.activity_over_time?.chart} />
      </Grid>
      <Grid item xs={12} md={6}>
        <AnalysisCard title="Top Devices" chart={data.top_devices?.chart} />
      </Grid>
      <Grid item xs={12} md={6}>
        <AnalysisCard title="Activity Type Distribution" chart={data.activity_types?.chart} />
      </Grid>
      <Grid item xs={12} md={6}>
        <AnalysisCard title="Hourly Activity Trend" chart={data.hourly_activity?.chart} />
      </Grid>
    </Grid>
  );
}
