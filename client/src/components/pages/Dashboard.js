import { React, useState, useEffect } from "react";
import { HeroHighlight, Highlight } from "../Hero-Highlight.js";
import { Response } from "../Response.js";
import { useLocation, useNavigate } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;

  const jsonData = JSON.parse(data);
  if (!data) {
    return (
      <div className="max-w-md mx-auto">
        <h1 className="text-xl font-bold">No Data Found</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }
  const styles = {
    titleContainer: {
      backgroundColor: "black",
      height: "40vh",
      color: "#ffffff",
      justifyContent: "top",
      alignItems: "center",
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
      padding: "0 20px",
    },
  };

  return (
    <>
      <HeroHighlight>
        <Response data={jsonData}></Response>
      </HeroHighlight>
    </>
  );
}

export default Dashboard;
