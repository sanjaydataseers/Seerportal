const path = require('path');
const mysql = require('mysql2');
require('dotenv').config({path: path.resolve(__dirname,'.env')})

async function runquery(query) {
  const connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER_DB,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_INDIA_DEV,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
  });
  connection.connect(async function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
  let results = await new Promise((resolve, reject) => {
    connection.query(query, function (err, result, fields) {
      if (err) reject(err);
      //  console.log(result);
      resolve(result);
    });
  });
  //pool.close()
  return results;
} 


module.exports = runquery;
