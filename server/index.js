
require('dotenv').config()
const express = require('express')
const cors = require("cors");
const app = express()
app.use(cors())
// const bodyParser = require("body-parser");
const mysql = require('mysql')

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hr_information_system',
});

// app.use(bodyParser.urlencoded({extended:true}));
app.post("/register", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const level = "user";
    // const sqlSelect = ;
    db.query(
        "INSERT INTO `user`(`id`, `username`, `password`, `level`) VALUES (?,?,?,?)",
        ['',username, password,level],(err, result)=>{
       console.log(err);
    })
})

app.post("/login", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const level = "user";
    // const sqlSelect = ;
    db.query(
        "SELECT * FROM `user` WHERE username = ? AND password = ?",
        [username,password],
        (err, result)=>{
            if(err){
                res.send({err: err});
            }
                if(result.length > 0){
                    res.send(result)
                }else{
                    res.send({message: "Wrong username/password combination!"});
                     

                }
            
    //    console.log(err);
    });
});
// app.post("/setsitable", (req, res)=>{
//     const department = req.body.department;


//     db.query(
//         "SELECT * FROM `salaryincrease WHERE department = ?",
//         [department],
//         (err, result)=>{
//             if(err){
//                 res.send({err: err});
//             }
//                 if(result.length > 0){
//                     res.send(result)
//                 }else{
//                     res.send({message: "No data available"});
                    
//                 }
            
//     //    console.log(err);
//     });
// });

app.post("/setsitable", (req, res)=>{
    const department = req.body.department;
 
    // const sqlSelect = ;
    db.query(
        "SELECT * FROM `salaryincrease` WHERE department = ?",
        [department],
        (err, result)=>{
            if(err){
                res.send({err: err});
            }
                if(result.length > 0){
                    res.send(result)
                }else{
                    res.send({message: "Wrong username/password combination!"});
                    

                }
            
    //    console.log(err);
    });
});

app.get("/siadmin",(req, res)=>{
    db.query("SELECT * FROM `salaryincrease`", (err, rows, fields)=>{
        if(!err)
        {
        res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.listen(process.env.PORT, () =>{
    console.log('running on port 3001');
})