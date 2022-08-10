import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import "bootstrap-icons/font/bootstrap-icons.css";
import './inputs.css'
import { Form, Card, Alert, Button, InputGroup } from "react-bootstrap"



export default function Login(){
    // console.log('login.jsx loaded')

    const [message, setMessage] = useState("");
    
    
    useEffect( () => {
        setMessage(Cookies.get('message'))
    }, [])

    return(
        // <div className="container">
        //     <div className="form-group">
        //          <label for="username"> Username: </label>
        //          <input required type="text" name = "username" id="username" className="form-control"/>
        //      </div>

        //      <div className="form-group">
        //          <label for="password"> Password: </label>
        //          <input required type="password" name = "password" id="password" className="form-control"/>
        //      </div>

        //      <button type="submit" onClick={() => test()} className="btn btn-primary"> Log In </button>

        // </div>

        <>
        <br></br>
        <div className="container center card" id="loginform">

            <div className="container text-center" id="iconContainer">
                <i className=" bi-windows" style={{fontSize: "3rem"}}> </i>
            </div>

            <h2 className="text-center mb-4">Log In</h2>
            
            <form action="http://localhost:3001/login" method="POST">
                <div className="form-group">
                    <label htmlFor="username"> Username: </label>
                    <div className="input-group">
                        <div className="input-group-addon">
                            <i className="input-group-addon bi-person" style={{fontSize: "2rem"}}> </i>
                            {/* <i className="input-group-addon bi-person" style={{fontSize: "2rem"}}> </i> */}
                        </div>
                        <input required type="text" name = "username" id="username" className="form-control"/>
                    </div>
                </div>
                
                <div className="form-group">
                    <label htmlFor="password"> Password: </label>
                    <div className="input-group">
                        <div className="input-group-addon">
                            <i className="input-group-addon bi-key" style={{fontSize: "2rem"}}> </i>
                            {/* <i className="input-group-addon bi-person" style={{fontSize: "2rem"}}> </i> */}

                        </div>
                        <input required type="password" name = "password" id="password" className="form-control"/>
                    </div>
                </div>
        
                <a href="/register" className="btn btn-secondary"> Register </a>
                <button type="submit" className="btn btn-primary"> Log In </button>
            </form>
            {/* add in the danger text */}
            <p className="text-danger"> {message} </p>
        </div>
        </>
    );
}

// function test(body) {
//     let username = document.getElementById("username").value;
//     console.log(username);

//     let password = document.getElementById("password").value;
//     console.log(password);

//     //let {username, password} = body;
//     fetch("http://localhost:3001/login", {
//         method: "POST",
//         // redirect: 'follow',
//         body: JSON.stringify({
//             username: username,
//             password: password
//         }),

//         credentials: 'include', 
//     }).then(response => {
//         console.log("This is the response returned:")
//         console.log(response)
//         //redirects according to response of the fetch request
//         if(response.redirected){
//             // window.location.href = response.url;
//         }
        
        
//     }).catch(function(err) {
//         console.log(err)
//     })
// }