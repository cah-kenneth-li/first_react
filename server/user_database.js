const {Pool, Client} = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: '10.49.216.178',
  database: 'test',
  password: '.eBRbM-$^*iTlMM"',
  port: 5432,
});

//handles adding, getting, and querying information from users database
let db_name = "first_patient"

pool.connect()

const getAllUsers = () => {
    return new Promise(function(resolve, reject) {
      pool.query('select * from '+db_name, (error, results) => {
        // console.log(error, results)
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
    const { firstName, lastName, dob, login_id, etheriumAddress } = body
    pool.query('INSERT INTO public.' +db_name+ ' ("firstName", "lastName", dob, login_id, "etheriumAddress") VALUES ($1, $2, $3, $4, $5) RETURNING *', [firstName, lastName, dob, login_id, etheriumAddress], (error, results) => {
      if (error) {
        reject(error)
      }

      // console.log(results)
      // console.log(results==null)
      // console.log(results===null)

      if(results==null){
        console.log("should be reject")
        reject("Already added")
      }
      else{
        resolve(results.rows[0])
      }
    })
  })
}


  const deleteUser = (body) => {
    return new Promise(function(resolve, reject) {
      const PK = body;
      // console.log("username we are trying to delete: "+ ssn);
      pool.query('DELETE FROM '+ db_name +' patient_id = $1', [PK], (error, results) => {
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
      // console.log("PK: "+ PK)
      pool.query('SELECT * FROM ' + db_name + ' WHERE login_id = $1', [PK], (error, results) => {
        if(error) {
          console.log("User database getUser error: " + error)
          reject(error)
        }
        // console.log(results)
        resolve(results.rows[0])
      })
    })
  }

async function test(){
  try{
    await addUser( {
      firstName: "dasfd",
      lastName: "testd",
      dob: Date.now(),
      login_id: 123,
      etheriumAddress: "asdfd",
    })
    console.log("date.now = " + Date.now())
    let what = await getAllUsers();
    console.log("translated date: "+what[0].dob.toLocaleString())
  } catch (e) {
    console.log("caught error")
    console.log(e)
  }
}

//test()


  module.exports = {
    getAllUsers,
    addUser,
    deleteUser,
    getUser,
  }