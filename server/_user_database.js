const {Pool, Client} = require('pg')
const pool = new Pool({
  user: 'test',
  host: 'localhost',
  database: 'firstdb',
  password: 'test',
  port: 5432,
});

// const pool = new Pool({
//   user: 'postgres',
//   host: '10.49.216.178',
//   database: 'test',
//   password: '.eBRbM-$^*iTlMM"',
//   port: 5432,
// });

//handles adding, getting, and querying information from users database
let db_name = "first_users"

pool.connect()

const getAllUsers = () => {
    return new Promise(function(resolve, reject) {
      pool.query('select * from '+db_name, (error, results) => {
        //console.log(error, results)
        if (error) {
          //alert("Did not get any merchants!")
          reject(error)
        }
        // console.log("Why is getallusers coming to test")
        // console.log(results.rows)
        //should return a list of json with our users
        resolve(results.rows);
      })
    }) 
  }


const addUser = (body) => {
  return new Promise( function(resolve, reject) {
    const { first_name, last_name, ssn, email, age } = body
    pool.query('INSERT INTO ' +db_name+ ' (first_name, last_name, ssn, email, age) VALUES ($1, $2, $3, $4, $5) RETURNING *', [first_name, last_name, ssn, email, age], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows[0])
    })
  })
}



  const deleteUser = (ssn_passed) => {
    return new Promise(function(resolve, reject) {
      const ssn = ssn_passed;
      // console.log("username we are trying to delete: "+ ssn);
      pool.query('DELETE FROM '+ db_name +' WHERE ssn = $1', [ssn], (error, results) => {
        if (error) {
          console.log("User database delete error: " + error);
          reject(error)
        }
        resolve(`user deleted with ssn: ${ssn}`)
      })
    })
  }

  const getUser = (body) => {
    return new Promise(function (resolve, reject) {
      const  { PK } = body
      pool.query('SELECT FROM ' + db_name + 'WHERE ssn = $1', [PK], (error, results) => {
        if(error) {
          console.log("User database delete error: " + error)
          reject(error)
        }
        console.log(results)
        resolve(results.rows[0])
      })
    })
  }
  
  module.exports = {
    getAllUsers,
    addUser,
    deleteUser,
    getUser,
  }
  