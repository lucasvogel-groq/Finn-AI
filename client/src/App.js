import React, { useState } from "react";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
import Loading from "./components/pages/Loading";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/loading" element={<Loading></Loading>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
