if(process.env.NODE_ENV !== 'production'){
  // console.log(process.env.NODE_ENV)
  // console.log(process.env.NODE_ENV!=='production')
  require('dotenv').config()
}

//passport + session + flash + method override for authenticating user and session variables for login
//login_database and user_database are for logging in and registering information on users respectively
const express = require('express');
const app = express()
const cors = require('cors');
const port = 3001
const dataRouter = require('./routes/data')
const scRouter = require('./routes/sc')
const user_connect = require('./user_database')
const general_health_connect = require('./general_health_database')
const session = require('express-session')
const passport = require('passport')
const flash = require('express-flash')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override')
const initializePassport = require('./passport-config')
const login_connect = require('./login_database')


initializePassport(passport)

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(methodOverride('_method'))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors())
app.set('view engine', 'ejs')

app.use(function (req, res, next) {
  //might not need these first three unless using a local react app running on port 3000
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');

  res.header('Access-Control-Allow-Origin', '*');


  //these prevent back arrowing into sensitive fields once logged out
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');

  res.header("Access-Control-Allow-Credentials", 'true');

  res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
})

  next();
});

app.get('/login', checkNotAuthenticated, (req, res) => {
  //if already logged in, redirects to home
  // res.render('data/login', {})
  //console.log("not Logged in")
  // res.cookie('message', "test")

  //req.session.messages will be an array of strings in our case
  // console.log(req.session.messages)
  // console.log(req.session.messages.length)
  res.cookie('message', req.session.messages.pop())
  res.cookie('loggedin', false)
  res.redirect('http://localhost:3000/login')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: 'http://localhost:3000/login',
  failureFlash: true,
  failureMessage: true,
}))

//initial rendering printing out everything in database 
app.get('/', checkAuthenticated, async (req, res) => {
    try{
      // console.log("app/")
      // console.log(req.user.username)
      // console.log("end of app comments")
      // main page once logged in
      res.cookie('loggedin', true)
      res.cookie('username', req.session.passport.user)
      let test = await login_connect.getUserByUsername({username: req.session.passport.user})
      res.cookie("login_id", test.login_id)

      let patient_data = await user_connect.getUser({PK: test.login_id})
      let patient_id = patient_data.patient_id;
      res.cookie("patient_id", patient_id)

      let general_health_data = await general_health_connect.getUser({PK: patient_id})
      if(typeof general_health_data !== undefined){
        res.cookie("general_health_id", general_health_data.general_health_id)
      }
      // console.log(req.session)
      res.redirect('http://localhost:3000/home')
      // res.render('data/home', {username: req.user.username})
    } catch (e) {
      console.log(e)
      console.log("primary app / error: " + e)
      res.redirect('http://localhost:3000/home')
    }
  })

app.delete('/logout', (req, res, next) => {
  //logout function now async, needs a next call
  // console.log("logout called")
  req.logOut(function (err) {
    if (err) {
      console.log(err)
      return next(err);
    }
    // console.log("cookies in req:")
    // console.log(req.cookies)
    // res.cookie('loggedin', false)
    // res.cookie('username', '')
    let cookiesToClear = req.cookies;
    for(let key in cookiesToClear){
      res.clearCookie(key)
    }
    res.redirect('http://localhost:3000/login')
  })
})

app.get('/allData', checkAuthenticated, async (req, res) => {
  //displays all current information in user database
  const allData = await user_connect.getAllUsers()
  res.render('data/index', {data: allData})
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

app.use('/data', dataRouter)
app.use('/sc', scRouter)

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// ReactDOM.render(<App />, document.getElementById('root'));

