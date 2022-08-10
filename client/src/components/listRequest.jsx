import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
// import Web3 from 'web3';

export default function ListRequest(){
    const [success, setSuccess] = useState("");
    const [failure, setFailure] = useState("");
    const [requests, setRequests] = useState([]);
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

        async function fetcher() {
          const response = await fetch('http://localhost:3001/sc/getOrders');        
          console.log(response);
          const contacts = await response.json();

          setRequests(contacts);
        }

        console.log("in listRequest.jsx")

        fetcher()
        console.log(requests)
    }, [])
    let counter = 0;

    // let { id, number, general, fields, constraints } = req.body;
    return(
        <>
        <div>
            <ul>
      {
              requests.map(request => (
                      <li key={counter++}>
                              <p>Number: {request.number}</p>
                              <span>Payment: {request.payment}</span>
                      </li>
              ))
      }
      </ul>
    </div>
        </>
    )
}