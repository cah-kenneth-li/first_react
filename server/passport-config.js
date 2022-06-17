const localStrategy = require('passport-local').Strategy
const login_connect = require('./login_database')
const bcrypt = require('bcrypt')
const { getAllUsers } = require('./user_database')


function initialize(passport){
    const authenticateUser = async (username, password, done) => {
        try{
            console.log("got here")
            const user = await getUserByUsername(username)
            // console.log(user)
            // console.log(user.username)
            // console.log(user.password)

            if(user==null){
            //   console.log('user was not found')
              return done(null, false, {message: 'No user with that username'})
            }

            if (await bcrypt.compare(password, user.password)){
                // console.log(user)
                return done(null, user)
            } else{
                // console.log("password incorrect")
                return done(null, false, { message: 'Password Incorrect'})
            }
        } catch(e) {
            // console.log("caught error")
            console.log(e)
            return done(e)
        }

    }

    passport.use(new localStrategy({ usernameField: 'username', passwordField: 'password'}, authenticateUser))
    passport.serializeUser((user, done) => {
        // console.log("Serializer (user): ")
        // console.log(user)

        done(null, user.username)
    })
    passport.deserializeUser(async (username, done) => {
        // as far as i know, used to search for users in session
        try{
            let result = await getUserByUsername(username)
            // console.log("deserialize test: ")
            // console.log(username)
            // console.log(result)
            // return await done(null, getUserByUsername(username))
            return await done(null, result)
        } catch (e) {
            console.log("passport-config file deserializeuser error: ")
            console.log(e)
        }
    })
}

async function getUserByUsername(username) {
    try{
        return await login_connect.getUserByUsername({username: username});
    } catch (e) {
        console.log(e)
        return null;
    }
}

module.exports = initialize