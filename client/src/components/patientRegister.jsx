import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';

export default function PatientRegister(){
    const [success, setSuccess] = useState("");
    const [failure, setFailure] = useState("");
    const [login_id, setlogin_id] = useState("")
    const [username, setUsername] = useState(Cookies.get('username'));;


    
    useEffect( () => {
        setUsername(Cookies.get('username'))

      if(typeof username === 'undefined' || username===''){
        window.location.href = "http://localhost:3000/login";
      }

        setSuccess(Cookies.get('success'))
        setFailure(Cookies.get('failure'))
        setlogin_id(Cookies.get('login_id'))
        Cookies.remove('success')
        Cookies.remove('failure')
    }, [])

    return(
        <div className="container">
            <form action="http://localhost:3001/data/patientRegister" method="POST">
                
                <div className="form-group">
                    <label htmlFor="firstName"> First Name: </label>
                    <input required type="text" name = "firstName" id="firstName" className="form-control"/>
                </div>

                <div class="form-group">
                    <label htmlFor="lastName"> Last Name: </label>
                    <input required type="text" name = "lastName" id="lastName" class="form-control"/>
                </div>

                <div className="form-group">
                    <label htmlFor="dob"> Date of Birth: </label>
                    <input required type="date" name = "dob" id="dob" className="form-control"/>
                </div>

                <div className="form-group">
                    <label htmlFor="ethAddress"> Etherium Address: </label>
                    <input required type="text" name = "ethAddress" id="ethAddress" className="form-control"/>
                </div>

                <input type="hidden" id="login_id" name="login_id" value={login_id}/>
            
                <a href="/home" className="btn btn-secondary"> Cancel </a>
                <button type="submit" className="btn btn-primary"> Register </button>
            </form>

            {/* <p>{login_id}</p> */}
            <p className="text-success"> {success} </p>
            <p className="text-danger"> {failure} </p>
        </div>
    )
}
