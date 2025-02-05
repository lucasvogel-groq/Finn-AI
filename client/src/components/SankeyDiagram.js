import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal, sankeyCenter } from "d3-sankey";

const SankeyDiagram = ({ width = 370, height = 350, percentages }) => {
  const svgRef = useRef();

  useEffect(() => {
    const data = {
      nodes: [
        { name: "Income", color: "#2ECC71" },
        { name: "Housing", color: "#3498DB" },
        { name: "Savings", color: "#3498DB" },
        { name: "Investments", color: "#3498DB" },
        { name: "Dining", color: "#3498DB" },
        { name: "Discretionary", color: "#3498DB" },
      ],
      links: [
        {
          source: 0,
          target: 1,
          value: parseInt(percentages?.housing_utilities || "500", 10),
          color: "#3498DB",
        },
        {
          source: 0,
          target: 2,
          value: parseInt(percentages?.savings || "1000", 10),
          color: "#3498DB",
        },
        {
          source: 0,
          target: 3,
          value: parseInt(percentages?.investments || "400", 10),
          color: "#3498DB",
        },
        {
          source: 0,
          target: 4,
          value: parseInt(percentages?.dining || "300", 10),
          color: "#3498DB",
        },
        {
          source: 0,
          target: 5,
          value: parseInt(percentages?.discretionary || "200", 10),
          color: "#3498DB",
        },
      ],
    };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const sankeyGenerator = sankey()
      .nodeAlign(sankeyCenter)
      .nodeWidth(20)
      .nodePadding(15)
      .extent([
        [10, 10],
        [width - 10, height - 10],
      ]);

    const sankeyData = sankeyGenerator({
      nodes: data.nodes.map((d) => ({ ...d })),
      links: data.links.map((d) => ({ ...d })),
    });

    // Create links
    const link = svg
      .append("g")
      .selectAll("path")
      .data(sankeyData.links)
      .enter()
      .append("path")
      .attr("d", sankeyLinkHorizontal())
      .attr("fill", "none")
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", 1)
      .transition()
      .duration(1000) // 1-second animation
      .ease(d3.easeCubicOut) // Smooth easing
      .attr("stroke-width", (d) => Math.max(1, d.width))
      .attr("stroke-opacity", 0.6);

    // Create nodes
    const node = svg
      .append("g")
      .selectAll("rect")
      .data(sankeyData.nodes)
      .enter()
      .append("rect")
      .attr("x", (d) => d.x0)
      .attr("y", (d) => d.y0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("width", sankeyGenerator.nodeWidth())
      .attr("fill", (d) => d.color)
      .attr("stroke", "#000")
      .style("opacity", 0)
      .transition()
      .duration(800)
      .style("opacity", 1);

    // Add node labels
    svg
      .append("g")
      .selectAll("text")
      .data(sankeyData.nodes)
      .enter()
      .append("text")
      .attr("x", (d) => (d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6))
      .attr("y", (d) => (d.y0 + d.y1) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d) => (d.x0 < width / 2 ? "start" : "end"))
      .text((d) => d.name)
      .attr("font-size", "16px")
      .attr("fill", "#fff");
  }, [width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default SankeyDiagram;
