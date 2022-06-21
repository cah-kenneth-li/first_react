const {Pool, Client} = require('pg')
const bcrypt = require ('bcrypt');
const pool = new Pool({
  user: 'postgres',
  host: '10.49.216.178',
  database: 'test',
  password: '.eBRbM-$^*iTlMM"',
  port: 5432,
});
let db_name = "first_login"

pool.connect()

const login = (body) => {
  return new Promise(function(resolve, reject) {
    //use the login function in passport-config instead of this
    //functions are essentially the same, but the other one configures passport for session variables
    
    let username = body.username;
    let preHashPassword = body.password;
    // console.log(db_name)
    let data = pool.query('SELECT * FROM '+db_name+' WHERE username = $1', [username], (error, results) => {
      // console.log(results)
      // console.log(results.rows[0])
      // console.log(results.rows[0].username)
      // console.log(results.rows[0].password)
      //console.log(error, results)
      if (error) {
        //alert("Did not get any merchants!")
        reject(error)
      }

      if(results==null){
        reject("No user with this username")
      }

      try{
        bcrypt.compare(preHashPassword, results.rows[0].password)
        // console.log("worked")
        resolve("successful")
      } catch(e) {
        console.log(e)
        // console.log(results.rows[0].password)
        // console.log(preHashPassword)
        // console.log("not work")
        reject(e)
      }
    })
  }) 
}

const getPass = (body) => {

}

const getUserByUsername = (body) => {
  return new Promise( async function(resolve, reject) {
    let username = body.username;
    let data = await pool.query('SELECT * FROM '+db_name+' WHERE username = $1', [username], (error, results) => {
      if(error){
        reject(error)
      }

      if(results == null){
        console.log("getUserByUsername: No user with this username")
        reject(null);
      }
      else{
        resolve(results.rows[0]);
      }

    })
  })
}

const register = (body) => {
  //store user into database with unique salt to test for password in login
  return new Promise( async function(resolve, reject) {
    let {username, password, email} = body;
    const saltRounds = 10;
    try{
      const hashedPassword = await bcrypt.hash(password, saltRounds)
      pool.query('INSERT INTO ' + db_name + ' (username, password, email) VALUES ($1, $2, $3) RETURNING *', [username, hashedPassword, email], (error, results) => {
        if(error){
          console.log("login database register: " + error)
          reject(error)
        }
        else{
          resolve(results)
        }
      })
    } catch (err) {
      reject (err)
    }
  })
}


const edit = (body) => {
  return new Promise(function(resolve, reject) {
    const PK = body;
    console.log("username we are trying to delete: "+ PK);
    pool.query('DELETE FROM first_users WHERE ssn = $1', [PK], (error, results) => {
      if (error) {
        console.log(error);
        reject(error)
      }
      resolve(`Merchant deleted with username: ${PK}`)
    })
  })
}

async function test(){
  try{
    // await register( {
    //   username: "test",
    //   password: "test",
    //   email: "test",
    // })

    let what = await getUserByUsername({username: "test"})
    console.log(what);
  } catch (e) {
    console.log("caught error")
    console.log(e)
  }
}

// test()
  
  module.exports = {
    login,
    register,
    edit,
    getUserByUsername,
  }
  