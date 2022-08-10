import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';

export default function MyHealth(){
    const [gen_health_data, setgen_health_data] = useState("");
    const [patient_data, setpatient_data] = useState("");
    const [patient_id, setpatient_id] = useState(Cookies.get('patient_id'))  
    const [login_id, setlogin_id] = useState(Cookies.get('login_id'))
    const [gen_health_id, setgen_health_id] = useState(Cookies.get('general_health_id'))  

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
                    login_id: login_id,
                    general_health_id: gen_health_id,
                }),

                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const jsonResult = await result.json()
            setgen_health_data(jsonResult)
            console.log(jsonResult)
        }
        console.log(gen_health_id)
        console.log(patient_id)
        console.log(login_id)
        fetchData()
    }, [])

    return(
        <>
        <div className="card mt-4">
            <div class="card-body">
                <h4 className="card-title">
                    {gen_health_data.firstName+" "+gen_health_data.lastName}
                </h4>
            </div>

        </div>

        <a href="/home" className="btn btn-secondary"> Back </a>

        </>
        // <p>{data}</p>
    )
}