import React from "react";

export const PieChart = ({ data }) => {
  // Calculate total sales
  const totalSales = data.reduce((acc, item) => acc + item.sales, 0);

  // Function to calculate coordinates for an arc
  const calculateArc = (startAngle, endAngle, radius) => {
    const startX = radius + radius * Math.cos((Math.PI * startAngle) / 180);
    const startY = radius + radius * Math.sin((Math.PI * startAngle) / 180);
    const endX = radius + radius * Math.cos((Math.PI * endAngle) / 180);
    const endY = radius + radius * Math.sin((Math.PI * endAngle) / 180);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

    return `M${radius},${radius} L${startX},${startY} A${radius},${radius} 0 ${largeArcFlag} 1 ${endX},${endY} Z`;
  };

  // Identify the item with the largest sales
  const maxSales = Math.max(...data.map((item) => item.sales));

  // Generate paths for each segment
  let startAngle = 0;
  const paths = data.map((item) => {
    const salesPercentage = (item.sales / totalSales) * 360; // Convert sales to degrees
    const endAngle = startAngle + salesPercentage;
    const baseRadius = 50; // Base radius for the pie chart
    const outerRadius = baseRadius; // Constant outer radius for all segments
    const innerRadius = 30; // Constant inner radius for all segments

    // Calculate the stroke width for the largest segment
    const strokeWidth = item.sales === maxSales ? 8 : 4; // Larger stroke width for the largest segment

    const path = (
      <path
        key={item.name}
        d={calculateArc(startAngle, endAngle, outerRadius)}
        fill={item.color}
        stroke={item.color}
        strokeWidth={strokeWidth} // Set the stroke width for bolder segments
      />
    );
    startAngle = endAngle; // Update start angle for the next segment
    return path;
  });

  return (
    <svg width={177} height={187} viewBox="-4 0 110 100">
      {paths}
      <circle cx="50" cy="50" r="30" fill="white" />{" "}
      {/* Inner circle for donut effect */}
      <text
        x="50"
        y="45"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fontSize: "12px",
          lineHeight: "18px",
          fontWeight: 600,
          fontFamily: "'Poppins', sans-serif",
          fill: "#0e0d0d",
        }}
      >
        {Math.round((data[0].sales / totalSales) * 100)}%
      </text>
      <text
        x="50"
        y="55"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fontSize: "8px",
          lineHeight: "8px",
          fontWeight: 500,
          fontFamily: "'Poppins', sans-serif",
          fill: "#9A9A9A",
        }}
      >
        Total Sales
      </text>
    </svg>
  );
};
