const mysql = require('mysql2');



const pool = mysql.createPool({
    host: 'autorack.proxy.rlwy.net', 
    user: 'root',   
    password: 'PRACsyWVjamzeRcOfXnZrUPghPbpDkPq',
    database: 'railway',
    port: 20949,
    connectTimeout: 10000 
  });
  


module.exports = pool.promise();  
//this db is not important that is why I expossed this values in my dbjs
