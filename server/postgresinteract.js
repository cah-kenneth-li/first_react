const {Pool, Client} = require('pg')
const pool = new Pool({
  user: 'test',
  host: 'localhost',
  database: 'firstdb',
  password: 'test',
  port: 5432,
});
db_name = "first_users"

pool.connect()

const getMerchants = () => {
    return new Promise(function(resolve, reject) {
      pool.query('select * from first_users', (error, results) => {
        //console.log(error, results)
        if (error) {
          //alert("Did not get any merchants!")
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  const createMerchant = (body) => {
    return new Promise(function(resolve, reject) {
      const { name } = body
      pool.query('INSERT INTO first_users (username) VALUES ($1) RETURNING *', [name], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new merchant has been added added: ${results.rows[0]}`)
      })
    })
  }



  const deleteMerchant = (ssn_passed) => {
    return new Promise(function(resolve, reject) {
      const ssn = ssn_passed;
      console.log("username we are trying to delete: "+ ssn);
      pool.query('DELETE FROM first_users WHERE ssn = $1', [ssn], (error, results) => {
        console.log(error);
        if (error) {
          reject(error)
        }
        resolve(`Merchant deleted with username: ${ssn}`)
      })
    })
  }
  
  module.exports = {
    getMerchants,
    createMerchant,
    deleteMerchant,
  }
  