import React from "react";
import { NavLink } from "react-router-dom";
import Cookies from 'js-cookie';
import { useState, useEffect, useRef } from "react";



export default function Navigation() {

  const [login, setLogin] = useState('');
  const linkRef = useRef();
  const [linkRefText, setLinkRefText] =useState("Log in");


  useEffect( () => {
    let status = Cookies.get("loggedin")
    setLogin(status)


    if(login===true){
      // linkRef.to('/logout')
      console.log(linkRef)
      setLinkRefText("log out")
      linkRef.current.style.visibility="hidden"
    } else {
      // linkRef.to('/login')
      console.log(linkRef)
      linkRef.current.href="http://localhost:3000/about"

      setLinkRefText("log in")
    }
    // (login==true) ? (
    //   linkRef.to('/logout')
    //   // linkRefText="log out"
    //   // <li className="nav-item">
    //   //   <NavLink className="nav-link" to="/logout">
    //   //     Sign Out
    //   //   </NavLink>
    //   // </li>
    //  ) : (
    //   linkRef.to('/login')
    //   // linkRefText="Log in"
    //  )
  }, [])

  

  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/home">
            React Multi-Page Website
          </NavLink>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">
                  Home
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <p> {login} </p>
              {/* {(login===true) ? (

                <></>
                // <li className="nav-item">
                //   <NavLink className="nav-link" to="/logout">
                //     Sign Out
                //   </NavLink>
                // </li>
              ) : (
                <li className="nav-item" key='login'>
                  <NavLink className="nav-link" to="/login">
                    Log in
                  </NavLink>
                </li>                
              )} */}
              <li className="nav-item" key='login'>
                <NavLink ref={linkRef} className="nav-link" to="/login">
                  {linkRefText}
                </NavLink>
              </li>    

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}


