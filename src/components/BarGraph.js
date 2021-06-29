import { Spin } from "antd";
import React from "react";
import Chart from "react-google-charts";
import { LoadingOutlined } from "@ant-design/icons";

export default function BarGraph({ faveCountriesArr }) {
  return (
    <Chart
      height="700px"
      chartType="Bar"
      loader={
        <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />} />
      }
      data={[["Country", "Total Population"], ...faveCountriesArr]}
      options={{
        // Material chart options
        chart: {
          title: "Population of Countries",
          subtitle: "Based on countries that you selected",
        },
        hAxis: {
          title: "Total Population",
          minValue: 0,
        },
        vAxis: {
          title: "Country",
        },
        bars: "horizontal",
        axes: {
          y: {
            15: { side: "right" },
          },
        },
      }}
    />
  );
}
