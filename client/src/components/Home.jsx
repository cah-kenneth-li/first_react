import React from "react";
import { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
import './buttons.css'

export default function Home() {

  const [username, setUsername] = useState(Cookies.get('username'));
  // let history = useHistory();
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
    // <div className="home">
    //   <div class="container">
    //     <div class="row align-items-center my-5">
    //       <div class="col-lg-7">
    //       </div>
    //       <div class="col-lg-5">
    //         <h1 class="font-weight-light">Home page</h1>
    //         <p>
    //           Lorem Ipsum is simply dummy text of the printing and typesetting
    //           industry. Lorem Ipsum has been the industry's standard dummy text
    //           ever since the 1500s, when an unknown printer took a galley of
    //           type and scrambled it to make a type specimen book.
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
    <div className="container" id="loginTrue">
            <h1 className="mb-4"> Welcome to the prototype {username} </h1>
            <br/>
            <a href="/patientRegister" className="btn-lg test-button btn btn-success"> Register Patient</a>
            <br/>
            <a href="/data/delete" className="btn-lg test-button btn btn-success"> Delete Data</a>
            <br/>
            <a href="/allData" className="btn-lg test-button btn btn-success"> View All Data</a>
            <br/>
            <a href="/myDoctors" className="btn-lg test-button btn btn-success"> Doctors (to be added)</a>
            <br/>
            <a href="/data/allMeds" className="btn-lg test-button btn btn-success"> Medication (to be added)</a>
            <br/>
            <a href="/data/allHealth" className="btn-lg test-button btn btn-success"> Health History / Diagnosis </a>    
            <br/>            
            {/* <form action="/logout?_method=DELETE" method="POST">
                <button class="btn-lg test-button test-danger-button btn btn-danger" type="submit"> Log Out </button>
            </form> */}

            <form action="http://localhost:3001/logout?_method=DELETE" method="POST">
                <button className="btn-lg test-button test-danger-button btn btn-danger" type="submit"> Log Out </button>
            </form>
        </div>
        </>
  );
}