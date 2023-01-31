import React from "react";
import Home from "./Home";
import { HashRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
     
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      
    </div>
  );
};

export default App;
