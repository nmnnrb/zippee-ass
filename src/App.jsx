import { useState } from "react";
import "./App.css";
import Cards from "./components/Cards.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Login from "./components/Login.jsx";
import Data from "./components/Data.jsx";

function App() {
 

 
  return (
    
    <div>
           <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Data />} />
      </Routes>
    </Router>

    </div>
  );
}

export default App;
