const express = require('express')
const passport = require('passport')
const router = express.Router()
const bodyParser = require('body-parser')
const Web3 = require('web3');
// const contract = require('@truffle/contract');
// const artifacts = require('./build/contracts/Contacts.json');
const CONTACT_ABI = require('./../contracts/db.json');
const { response } = require('express');
const CONTACT_ADDRESS = "0x043a49ac689a99d13c12290ab43bda59bdd40bb7";

let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({extended: false})

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider); 
} else {
    var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:3001'));
}



router.get('/getOrders', checkAuthenticated, async (req, res) => {
    //route for getting all requests from the smart contract
    console.log("./sc/getOrders called get")
    const accounts = await web3.eth.getAccounts();
    const sc = new web3.eth.Contract(CONTACT_ABI.abi, CONTACT_ADDRESS);
    
    let orders = await sc.methods.returnAllOrders();

    response.json(orders);
    // res.redirect("http://localhost:3000/patientRegister")
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

module.exports = router