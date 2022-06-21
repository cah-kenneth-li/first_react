import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';

export default function PatientRegister(){
    const [success, setSuccess] = useState("");
    const [failure, setFailure] = useState("");


    
    useEffect( () => {
        setSuccess(Cookies.get('success'))
        setFailure(Cookies.get('failure'))
    }, [])

    return(
        <div className="container">
            <form action="http://localhost:3001/data/register" method="POST">
                
                <div className="form-group">
                    <label htmlFor="firstName"> First Name: </label>
                    <input required type="text" name = "firstName" id="firstName" className="form-control"/>
                </div>

                <div class="form-group">
                    <label for="email"> Last Name: </label>
                    <input required type="lastName" name = "lastName" id="lastName" class="form-control"/>
                </div>
                
                <div className="form-group">
                    <label htmlFor="password"> Password: </label>
                    <input required type="text" name = "password" id="password" className="form-control"/>
                </div>

                <div className="form-group">
                    <label htmlFor="dob"> Date of Birth: </label>
                    <input required type="date" name = "dob" id="dob" className="form-control"/>
                </div>

                <div className="form-group">
                    <label htmlFor="ethAddress"> Password: </label>
                    <input required type="text" name = "ethAddress" id="ethAddress" className="form-control"/>
                </div>

                <a href="/register" className="btn btn-secondary"> Cancel </a>
                <button type="submit" className="btn btn-primary"> Register </button>
            </form>

            <p className="text-success"> {success} </p>
            <p className="text-danger"> {failure} </p>
        </div>
    )
}
