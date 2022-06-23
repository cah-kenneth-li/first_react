import React from "react";
import { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
import './buttons.css'

export default function Home() {

  const [username, setUsername] = useState(Cookies.get('username'));
  const [login_id, setlogin_id] = useState(Cookies.get('login_id'))
  const [patient_id, setpatient_id] = useState(Cookies.get('patient_id'))  
  
  useEffect( () => {
      // console.log("in useeffect")
      setUsername(Cookies.get('username'))

      if(typeof username !== 'undefined' && username!==''){
        console.log("username="+username)
        // console.log(typeof username !== 'undefined')
        // console.log(username !== '')
      }
      else{
        console.log("not logged in")
        console.log("username="+username)
        // console.log(typeof username !== 'undefined')
        // console.log(username !== '')
        window.location.href = "http://localhost:3000/login";
      }
    }, [])


  return (
    <>
    <div className="container" id="loginTrue">
            <h1 className="mb-4"> Welcome to the prototype {username} </h1>
            <br/>
            <a href="/patientRegister" className="btn-lg test-button btn btn-success"> Register Patient</a>
            <br/>
            <a href="/data/delete" className="btn-lg test-button btn btn-success"> Delete Data</a>
            <br/>
            <a href="/generalHealthRegister" className="btn-lg test-button btn btn-success"> Add General Health Records</a>
            <br/>
            <a href="/myDoctors" className="btn-lg test-button btn btn-success"> Doctors (to be added)</a>
            <br/>
            <a href="/data/allMeds" className="btn-lg test-button btn btn-success"> Medication (to be added)</a>
            <br/>
            <a href="/myHealth" className="btn-lg test-button btn btn-success"> Health History / Diagnosis </a>    
            <br/>            
            {/* <form action="/logout?_method=DELETE" method="POST">
                <button class="btn-lg test-button test-danger-button btn btn-danger" type="submit"> Log Out </button>
            </form> */}

            <form action="http://localhost:3001/logout?_method=DELETE" method="POST">
                <button className="btn-lg test-button test-danger-button btn btn-danger" type="submit"> Log Out </button>
            </form>
            <p> {login_id} </p>
            <p> {patient_id} </p>
        </div>
        </>
  );
}