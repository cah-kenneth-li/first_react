import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';

export default function MyHealth(){
    const [data, setData] = useState("");
    const [patient_id, setpatient_id] = useState(Cookies.get('patient_id'))  
    const [login_id, setlogin_id] = useState(Cookies.get('login_id'))  

    useEffect( () => {
        // fetch("http://localhost:3001/data/getMyHealth", {
        //     method: "POST",
        //     body: {
        //         patient_id: patient_id,
        //         login_id: login_id,
        //     },

        //     mode: "no-cors",

        //     headers: {
        //         'Content-Type': 'application/json'
        //     }

        // }).then(
        //     response => response.json()
        // ).then(
        //     data => {
        //         setData(data)
        //         console.log(data)
        //     }
        // )

        const fetchData = async() => {
            const result = await fetch('http://localhost:3001/data/getMyHealth', {
                method: "POST",
                body: JSON.stringify({
                    patient_id: patient_id,
                    login_id: login_id
                }),

                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const jsonResult = await result.json()
            setData(jsonResult)
            console.log(jsonResult)
        }
        fetchData()
    }, [])
    return(
        <>
        <div className="card mt-4">
            <div class="card-body">
                <h4 className="card-title">
                    {data.firstName+" "+data.lastName}
                </h4>
            </div>

        </div>
        </>
        // <p>{data}</p>
    )
}