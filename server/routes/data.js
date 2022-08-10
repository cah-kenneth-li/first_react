const express = require('express')
const database_connect = require('./../user_database')
const login_connect = require('./../login_database')
const general_health_connect = require('./../general_health_database')
const request_connect = require('./../request_database')
const passport = require('passport')
const router = express.Router()
const bodyParser = require('body-parser')


const initializePassport = require('./../passport-config')

let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({extended: false})

//this router will use 'data'

router.get('/new', checkAuthenticated, (req, res) => {
    //route for entering new data into patient database
    const person = {
        first_name: "",
        last_name: "",
        email: "",
        ssn: "",
        age: "",
    }
    res.render('./data/new', {person: person})
})

router.get('/delete', checkAuthenticated, (req, res) => {
    //deletes user from user database using PK
    //loads form for above
    //route for deleting from patient database using ssn
    res.render('./data/delete')
})

//not used
router.get('./:id', (req, res) => {
    const data = 80
    res.send(req.params.id)
})

router.post('/patientRegister', checkAuthenticated, async (req, res) => {
    //once form in /views/data/new.ejs is completed, use this
    //function to actually add to users database

    //input to be added to database
    const person = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        login_id: req.body.login_id,
        etheriumAddress: req.body.ethAddress,
    }
    //let newUser = {first_name: req.body.first_name, req.body.last_name, req.body.email, ssn, age}
    
    try{
        // console.log("got here")
        let data = await database_connect.addUser(person).then(response => {
            
            // console.log("this never completes for some reason")
            res.redirect("http://localhost:3000/patientRegister")
        })
        //console.log("successfully added!")
        //res.render('/data/index')
        //res.redirect(`/data/${person.id}`)
    } catch(e){
        console.log("this failed in data router/patientRegister, reason: ")
        console.log(e)
        res.cookie("failure", "Could Not Register")
        //res.redirect('/')
        // res.render('./data/new', {person: person})
        res.redirect("http://localhost:3000/patientRegister")
    }
    //res.redirect('/')
})

router.post('/deleter', checkAuthenticated, async (req, res) => {
    //in form, ssn is 3 different fields
    let ssn1 = req.body.ssn;
    let ssn2 = req.body.ssn2;
    let ssn3 = req.body.ssn3;
    //combining into one ssn
    let ssn = ssn1+ssn2+ssn3;
    console.log("ssn: " + ssn)

    try{
        //console.log("got here")
        await database_connect.deleteUser(ssn).then(response => {
            res.redirect('/')
        })
    } catch(e){
        console.log("this failed, reason: ")
        console.log(e)
        res.render('./data/delete', {person: person})
    }
})

router.get('/login', checkAuthenticated, (req, res) => {
    res.render('data/login', {})
  })

router.post('/userlogin', checkAuthenticated, async (req, res) => {
    //figure out how to know if login was a success
    let username = req.body.username;
    let password = req.body.password;

    try{
        await login_connect.login({username: username, password: password})
        //console.log("does this still run")
        res.render('data/home', {username: username, success: "Successfully Logged In"})
    } catch(e){
        console.log("data: not work")
        res.render('data/home', {username: username, failure: e})
    }
})

router.get('/registerForm', (req, res) => {
    //loads register form
    res.render('./data/register', {})
})

router.post('/register', async (req, res) => {
    //puts register form data in database
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    console.log("in register in data router")
    try{
        let result = await login_connect.register({username: username, password: password, email: email})
        //console.log("WHY IS IT NOT WAITING "+result)
        res.cookie('success', 'Successfully Registered')
        res.redirect('http://localhost:3000/register')
        // res.render('./data/register', {success: "Successfully Registered", username: username})
    } catch(e){
        console.log(e)
        res.cookie('failure', e)
        res.redirect('http://localhost:3000/register')
        // res.render('./data/register', {failure: "Could not register", username: username, error: e})

    }
    // let result = await login_connect.register({username: username, password: password})
    // console.log("WHY IS IT NOT WAITING "+result)
    // if(result){
    //     res.render('./data/register', {success: "Successfully Registered", username: username})
    // }
    // else{
    //     res.render('./data/register', {failure: "Could not register", username: username})
    // }

})

router.post("/getMyHealth", async (req, res) => {
    try{
        let PK = req.body.patient_id;
        console.log(req.body)
        let data = await general_health_connect.getUser({PK: PK})
        console.log(data)
        res.send(data)
    } catch (e) {
        console.log("/getmyhealth error: " +e)
        res.send({message: "Something went wrong"})
    }
})

router.post("/getMyPatient", async (req, res) => {
    try{
        let login_id = req.body.login_id;
        console.log(login_id)
        console.log(req.body)
        let data = await database_connect.getUser({PK: login_id})

        res.send(data)
    } catch (e) {
        console.log("/getmyhealth error: " +e)
        res.send({message: "Something went wrong"})
    }
})

router.post("/generalHealthRegister", async (req, res) => {
    try{
        let {systolicBloodPressure, diastolicBloodPressure, bmi, height, weight, ethnicity, patient_id} = req.body;
        // let systolicBloodPressure = req.body.systolicBloodPressure;
        // let diastolicBloodPressure = req.body.diastolicBloodPressure;
        // let bmi = req.body.bmi;
        // let height = req.body.height;
        // let weight = req.body.weight;
        // let ethnicity = req.body.ethnicity;
        // let patient_id = req.body.patient_id;
        console.log(req.body)

        let bloodPressure = systolicBloodPressure + "/" + diastolicBloodPressure;

        let data = {
            bloodPressure: bloodPressure,
            bmi: bmi,
            height: height,
            weight: weight,
            ethnicity: ethnicity,
            patient_id: patient_id,
        }
        let result = await general_health_connect.addRecord(data)
        res.cookie("success", "Successfully added health record")
        res.cookie("general_health_id", result.general_health_id)
        res.redirect('http://localhost:3000/generalHealthRegister')

    } catch (e) {
        console.log("/generalHealthRegister error: " +e)
        console.log(e)
        res.cookie("failure", e)
        res.redirect('http://localhost:3000/generalHealthRegister')
    }
})

router.post("/newRequest", checkAuthenticated, async (req, res) => {
    try{
        let { id, number, general, fields, constraints } = req.body;
        let result = await request_connect.addRequest(req.body);
        res.cookie("success", "Successfully added health record")
        res.redirect('http://localhost:3000/dataRequest')
    } catch (e) {
        console.log("./newRequest error: ")
        console.log(e)
        res.redirect('http://localhost:3000/dataRequest')
    }
})

function checkAuthenticated(req, res, next) {
    // console.log("checking if authenticated")
    if (req.isAuthenticated()) {
      // console.log("This session is authenticated in server.js")
      return next()
    }
  
    res.redirect('http://localhost:3000/login')
  }

  function checkNotAuthenticated(req, res, next) {
    // console.log("checkNotAuthenticated()")
  
    if (req.isAuthenticated()) {
      // console.log("is authenticated from check if not function")
      return res.redirect('http://localhost:3000/home')
    }
    next()
}

async function getUserByUsername(username){

}

module.exports = router