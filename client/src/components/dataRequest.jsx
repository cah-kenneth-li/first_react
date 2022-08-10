import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
// import Web3 from 'web3';

export default function DataRequest(){

    window.addEventListener('load', function() {

        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof web3 !== 'undefined') {
          // Use Mist/MetaMask's provider
        //   web3js = new Web3(Web3.currentProvider);
        } else {
          // Handle the case where the user doesn't have web3. Probably
          // show them a message telling them to install Metamask in
          // order to use our app.
          console.log("What");
        }
      })


    const [success, setSuccess] = useState("");
    const [failure, setFailure] = useState("");
    const [login_id, setlogin_id] = useState(Cookies.get('login_id'))
    const [patient_id, setpatient_id] = useState(Cookies.get('patient_id'))
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

    // let { id, number, general, fields, constraints } = req.body;
    return(
        <div className="container">
            <form action="http://localhost:3001/data/newRequest" method="POST">
                
                <div className="form-group">
                    <label htmlFor="number"> Number of people requested: </label>
                    <input required type="number" name = "number" id="number" className="form-control"/>
                </div>

                <div className="form-group">
                    <label htmlFor="diastolicBloodPressure"> Diastolic Blood Pressure: </label>
                    <input required type="text" name = "diastolicBloodPressure" id="diastolicBloodPressure" className="form-control"/>
                </div>

                <div className="form-group">
                    <label htmlFor="bmi"> BMI: </label>
                    <input required type="text" name = "bmi" id="bmi" class="form-control"/>
                </div>

                <div className="form-group">
                    <label htmlFor="height"> Height: </label>
                    <input required type="number" name = "height" id="height" className="form-control"/>
                </div>

                <div className="form-group">
                    <label htmlFor="weight"> Weight: </label>
                    <input required type="number" name = "weight" id="weight" className="form-control"/>
                </div>

                <div className="form-group">
                    <label htmlFor="ethnicity"> Ethnicity: </label>
                    <input required type="text" name = "ethnicity" id="ethnicity" className="form-control"/>
                </div>

                <input type="hidden" id="patient_id" name="patient_id" value={patient_id}/>
            
                <a href="/home" className="btn btn-secondary"> Cancel </a>
                <button type="submit" className="btn btn-primary"> Register </button>
            </form>

            {/* <p>{login_id}</p> */}
            <p className="text-success"> {success} </p>
            <p className="text-danger"> {failure} </p>
        </div>
    )
}