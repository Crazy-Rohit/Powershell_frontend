import React from "react";
import Plot from "react-plotly.js";
import PropTypes from "prop-types";

const PlotlyChart = ({ data }) => {
  if (!data || !data.data) {
    return <p style={{ color: "white" }}>Loading chart...</p>;
  }

  return (
    <Plot
      data={data.data}
      layout={{
        ...data.layout,
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        font: { color: "#fff" },
        autosize: true,
      }}
      style={{ width: "100%", height: "100%" }}
      config={{ displayModeBar: false, responsive: true }}
    />
  );
};

PlotlyChart.propTypes = {
  data: PropTypes.object,
};

export default PlotlyChart;
