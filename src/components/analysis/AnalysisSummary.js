import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Card } from "@mui/material";
import { API_BASE } from "../../api";

function SummaryCard({ title, value }) {
  return (
    <Card style={{ padding: "1rem", margin: "0.5rem" }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </Card>
  );
}

export default function AnalysisSummary() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE}/analysis`, { withCredentials: true })
      .then(res => setSummary(res.data.summary))
      .catch(err => console.error(err));
  }, []);

  if (!summary) return <p>Loading summary...</p>;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <SummaryCard title="Total Records" value={summary.timestamp?.count || "-"} />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard title="Unique Devices" value={summary.device_id?.unique || "-"} />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard title="Most Common Activity" value={summary.activity_type?.top || "-"} />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard title="Avg Activity Value" value={summary.activity_value?.mean?.toFixed(2) || "-"} />
      </Grid>
    </Grid>
  );
}
