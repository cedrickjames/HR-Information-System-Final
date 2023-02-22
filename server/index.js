const express = require('express')
const bodyParser = require("body-parser");
const mysql = require('mysql')
const cors = require("cors");
const app = express()
app.use(express.json())
app.use(cors());

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
app.listen(3001, () =>{
    console.log('running on port 3001');
})