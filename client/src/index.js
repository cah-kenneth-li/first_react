import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import Cookies from 'js-cookie';
// import { useState, useEffect } from "react";
//import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import {
  Navigation,
  Footer,
  Home,
  About,
  Login,
  Register,
  Logout,
  PatientRegister,
  MyHealth,
  GeneralHealthRegister,
  DataRequest,
  ListRequest,
} from "./components";

console.log("index.js")

const root = ReactDOM.createRoot(document.getElementById('root'));

// const loggedin = false;

root.render(
  <>
    {/* <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
  </Router> */}

  <Router>
      {/* <Navigation /> */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/myHealth" element={<MyHealth />} />
        <Route path="/patientRegister" element={<PatientRegister />} />
        <Route path="/generalHealthRegister" element={<GeneralHealthRegister />} />
        {/* <Route path="/dataRequest" element={<DataRequest />} /> */}
        <Route path="/listRequest" element={<ListRequest />} />
        <Route path="*" element={<Login />}/>
      </Routes>
      <Footer />
  </Router>

  {/* {(loggedin) ? (<p>logged in</p>) : (<p>not logged in</p>)} */}
  </>,

  //document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
