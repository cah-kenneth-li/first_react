import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';

export default function Register(){
    const [success, setSuccess] = useState("");
    const [failure, setFailure] = useState("");


    
    useEffect( () => {
        setSuccess(Cookies.get('success'))
        setFailure(Cookies.get('failure'))
        Cookies.remove('success')
        Cookies.remove('failure')
    }, [])

    return(
        <div className="container">
            <form action="http://localhost:3001/data/register" method="POST">
                
                <div className="form-group">
                    <label htmlFor="username"> Username: </label>
                    <input required type="text" name = "username" id="username" className="form-control"/>
                </div>

                <div class="form-group">
                    <label for="email"> Email: </label>
                    <input required type="email" name = "email" id="email" class="form-control"/>
                </div>
                
                <div className="form-group">
                    <label htmlFor="password"> Password: </label>
                    <input required type="text" name = "password" id="password" className="form-control"/>
                </div>

                <a href="/register" className="btn btn-secondary"> Cancel </a>
                <button type="submit" className="btn btn-primary"> Register </button>
            </form>

            <p className="text-success"> {success} </p>
            <p className="text-danger"> {failure} </p>
        </div>
    )
}
