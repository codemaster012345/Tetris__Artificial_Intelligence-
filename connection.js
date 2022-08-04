const mysql=require('mysql');

const con=mysql.createConnection({
   host:"localhost",
   user:"root",
   password:"",
   database:"login"
});

con.connect((err)=>{
    if(err) throw err;
    console.log("Connections created");
})
module.exports.con=con;