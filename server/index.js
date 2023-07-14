
require('dotenv').config()
const express = require('express')
const cors = require("cors");
const app = express()
const path = require('path');

app.use(cors({
    origin: '*'
  }));
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
    const name = req.body.fullname;
    const password = req.body.password;
    const confirmPass = req.body.confirmpassword;
    const level = "user";
    // const sqlSelect = ;
    if(confirmPass != password){
      res.send({message: "Passwords does not matched."});

    }
    else{
      db.query(
        "INSERT INTO `user`(`id`, `name`, `username`, `password`, `level`, `approved`) VALUES (?,?,?,?,?,?)",
        ['',name,username, password,level,0],(err, result)=>{
          if(err){
            res.send({err: err});
            return;
        }
            if(result){
              res.send({message: "Registered successfully. Please wait HR to approve your registration"});



                return;
            }else{
                res.send({message: "There is something wrong. Please contact your administrator."});
       

                return;
          
            }
    })
    }

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
                return;
            }
                if(result.length > 0){
                    res.send({result,message: "Success"});
                    return;
                }else{
                    res.send({message: "Wrong username/password combination!"});
                    return;
                     

                }
            
    //    console.log(err);
    });
});

app.post("/deactivate", (req, res)=>{
  const arrayOfUser = req.body.arrayofuser;
  db.query(
    "UPDATE `salaryincrease` SET `deactivated` = 1 WHERE id IN (?)",
    [ arrayOfUser],
    (err, result)=>{
      if(err){
          res.send({err: err});
      }else {
          if (result.affectedRows > 0) {
            res.send({ message: "Data updated successfully" });
          } else {
            res.send({ message: "There is an error in adding employee" });
          }
        }
      
//    console.log(err);
});

console.log(arrayOfUser);

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

app.post("/exportEmployees", (req, res)=>{
  const department = req.body.department;

  // const sqlSelect = ;
  db.query(
      "SELECT * from salaryincrease WHERE department = ? AND deactivated = 0 order by id desc",
      // "SELECT * FROM `salaryincrease` WHERE department = ?",
      [department],
      (err, result)=>{
          if(err){
              res.send({err: err});
              return;
          }
              if(result.length > 0){
                const message = 'Data found';
                res.send({ result: result, message: message });
                  return;
              }else{
                
                  res.send({message: "No Data Found"});
                  return;
                  

              }
          
  //    console.log(err);
  });
});
app.post("/setsitable", (req, res)=>{
    const department = req.body.department;
 
    // const sqlSelect = ;
    db.query(
        "SELECT u.*, IFNULL(h.dateModified, '') AS dateModified  FROM salaryincrease u  LEFT JOIN history h ON u.empNo = h.employeeId WHERE (h.id = (SELECT MAX(id) FROM history WHERE employeeId = u.empNo) OR h.id IS NULL) AND u.department = ? AND u.deactivated = 0 order by u.id desc",
        // "SELECT * FROM `salaryincrease` WHERE department = ?",
        [department],
        (err, result)=>{
            if(err){
                res.send({err: err});
                return;
            }
                if(result.length > 0){
                  const message = 'Data found';
                  res.send({ result: result, message: message });
                    return;
                }else{
                  
                    res.send({message: "No Data Found"});
                    return;
                    

                }
            
    //    console.log(err);
    });
});
app.post("/selectLatest", (req, res)=>{
  const userid = req.body.userid;

  // const sqlSelect = ;
  db.query(
      "SELECT * FROM `salaryincrease` WHERE empNo = ?",
      // "SELECT * FROM `salaryincrease` WHERE department = ?",
      [userid],
      (err, result)=>{
          if(err){
              res.send({err: err});
              return;
          }
              if(result.length > 0){
                const message = 'Data found';
                res.send({ result: result, message: message });
                  return;
              }else{
                
                  res.send({message: "No Data Found"});
                  return;
                  

              }
          
  //    console.log(err);
  });
});

app.post("/maintable", (req, res)=>{


  // const sqlSelect = ;
  db.query(
      `SELECT
      si.id AS id,
     si.empNo AS employeeId,
   COALESCE(MAX(CASE WHEN h.field = 'department' THEN h.hr_from END), si.department) AS department,
   COALESCE(MAX(CASE WHEN h.field = 'section' THEN h.hr_from END), si.section) AS section,
   COALESCE(MAX(CASE WHEN h.field = 'employeeName' THEN h.hr_from END), si.employeeName) AS employeeName,
   COALESCE(MAX(CASE WHEN h.field = 'sex' THEN h.hr_from END), si.sex) AS sex,
   COALESCE(MAX(CASE WHEN h.field = 'birthday' THEN h.hr_from END), si.birthday) AS birthday,
   COALESCE(MAX(CASE WHEN h.field = 'age' THEN h.hr_from END), si.age) AS age,
   COALESCE(MAX(CASE WHEN h.field = 'dateHired' THEN h.hr_from END), si.dateHired) AS dateHired,
   COALESCE(MAX(CASE WHEN h.field = 'serviceTerm' THEN h.hr_from END), si.serviceTerm) AS serviceTerm,
   COALESCE(MAX(CASE WHEN h.field = 'position' THEN h.hr_from END), si.position) AS 'position',
   COALESCE(MAX(CASE WHEN h.field = 'designation' THEN h.hr_from END), si.designation) AS designation,
   COALESCE(MAX(CASE WHEN h.field = 'class' THEN h.hr_from END), si.class) AS class,
   COALESCE(MAX(CASE WHEN h.field = 'level' THEN h.hr_from END), si.level) AS level,
   COALESCE(MAX(CASE WHEN h.field = 'salaryType' THEN h.hr_from END), si.salaryType) AS salaryType,
   COALESCE(MAX(CASE WHEN h.field = 'basicSalary' THEN h.hr_from END), si.basicSalary) AS basicSalary,
   COALESCE(MAX(CASE WHEN h.field = 'daily' THEN h.hr_from END), si.daily) AS daily,
   COALESCE(MAX(CASE WHEN h.field = 'monthlySalary' THEN h.hr_from END), si.monthlySalary) AS monthlySalary,
   COALESCE(MAX(CASE WHEN h.field = 'pPEPoint' THEN h.hr_from END), si.pPEPoint) AS pPEPoint,
   COALESCE(MAX(CASE WHEN h.field = 'pAllowance' THEN h.hr_from END), si.pAllowance) AS pAllowance,
   COALESCE(MAX(CASE WHEN h.field = 'pRank' THEN h.hr_from END), si.pRank) AS pRank,
   COALESCE(MAX(CASE WHEN h.field = 'tsPEPoint' THEN h.hr_from END), si.tsPEPoint) AS tsPEPoint,
   COALESCE(MAX(CASE WHEN h.field = 'tsAllowance' THEN h.hr_from END), si.tsAllowance) AS tsAllowance,
   COALESCE(MAX(CASE WHEN h.field = 'tsRank' THEN h.hr_from END), si.tsRank) AS tsRank,
   COALESCE(MAX(CASE WHEN h.field = 'leLicenseFee' THEN h.hr_from END), si.leLicenseFee) AS leLicenseFee,
   COALESCE(MAX(CASE WHEN h.field = 'lePEPoint' THEN h.hr_from END), si.lePEPoint) AS lePEPoint,
   COALESCE(MAX(CASE WHEN h.field = 'leAllowance' THEN h.hr_from END), si.leAllowance) AS leAllowance,
   COALESCE(MAX(CASE WHEN h.field = 'leRank' THEN h.hr_from END), si.leRank) AS leRank,
   COALESCE(MAX(CASE WHEN h.field = 'ceCertificateOnFee' THEN h.hr_from END), si.ceCertificateOnFee) AS ceLicenseFee,
   COALESCE(MAX(CASE WHEN h.field = 'cePEPoint' THEN h.hr_from END), si.cePEPoint) AS cePEPoint,
   COALESCE(MAX(CASE WHEN h.field = 'ceAllowance' THEN h.hr_from END), si.ceAllowance) AS ceAllowance,
   COALESCE(MAX(CASE WHEN h.field = 'ceRank' THEN h.hr_from END), si.ceRank) AS ceRank,
   COALESCE(MAX(CASE WHEN h.field = 'Specialization' THEN h.hr_from END), si.Specialization) AS Specialization,
   (SELECT MAX(dateOfEffectivity)
   FROM history
   WHERE employeeId = si.empNo
     AND dateOfEffectivity < (SELECT MAX(dateOfEffectivity)
                             FROM history
                             WHERE employeeId = si.empNo)
  ) AS second_max_dateOfEffectivity,
  h.dateOfEffectivity as dateOfEffectivity,
  (COALESCE(MAX(CASE WHEN h.field = 'monthlySalary' THEN h.hr_from END), si.monthlySalary)+
  COALESCE(MAX(CASE WHEN h.field = 'pAllowance' THEN h.hr_from END), si.pAllowance)+
  COALESCE(MAX(CASE WHEN h.field = 'tsAllowance' THEN h.hr_from END), si.tsAllowance)+
  COALESCE(MAX(CASE WHEN h.field = 'leLicenseFee' THEN h.hr_from END), si.leLicenseFee)+
  COALESCE(MAX(CASE WHEN h.field = 'leAllowance' THEN h.hr_from END), si.leAllowance)+
  COALESCE(MAX(CASE WHEN h.field = 'ceCertificateOnFee' THEN h.hr_from END), si.ceCertificateOnFee)+
  COALESCE(MAX(CASE WHEN h.field = 'ceAllowance' THEN h.hr_from END), si.ceAllowance)) AS total_sum,
  (si.monthlySalary  + si.pAllowance  + si.tsAllowance  + si.leLicenseFee  + si.leAllowance  + si.ceCertificateOnFee  + si.ceAllowance ) as total_sum_now,
   si.total,
   si.employeeName as newEmployeeName,
   si.empNo as newEmpNo,
   si.dateHired as newDateHired,
   si.section as newSection,
   si.department as newDepartment,
   si.position as newPosition,
   si.designation as newDesignation,
   si.class as newClass,
   si.level as newLevel,
   si.salaryType as newSalaryType,
   si.basicSalary as newBasicSalary,
   si.daily as newDaily,
   si.monthlySalary as newMonthly,
   si.pPEPoint as newpePoint,
   si.pAllowance as newPAllowance,
   si.pRank as newPeRank,
   si.tsPEPoint as newTsPePoint,
   si.tsAllowance as newTsAllowance,
   si.tsRank as newTsRank,
   si.leLicenseFee as newleLicenseFee,
   si.lePEPoint as newLePEPoint,
   si.leAllowance as newLEAllowance,
   si.leRank as newLeRank,
   si.ceCertificateOnFee as newceCertificateOnFee,
   si.cePEPoint as newCePePoint,
   si.ceAllowance as newCEAllowance,
   si.ceRank as newCeRank,
   si.Specialization as newSpecialization
  
 FROM
   salaryincrease si
 LEFT JOIN (
   SELECT
     h1.employeeId,
     h1.field,
     h1.hr_from,
     h1.dateOfEffectivity
     
   FROM
     history h1
     JOIN (
       SELECT
         employeeId,
         MAX(dateOfEffectivity) AS maxDate
       FROM
         history
       GROUP BY
         employeeId
     ) subquery ON h1.employeeId = subquery.employeeId AND h1.dateOfEffectivity = subquery.maxDate
   WHERE
     (h1.employeeId, h1.dateOfEffectivity, h1.field, h1.id) IN (
       SELECT
         employeeId,
         dateOfEffectivity,
         field,
         MAX(id)
       FROM
         history
       WHERE
         (employeeId, dateOfEffectivity, field) IN (
           SELECT
             employeeId,
             dateOfEffectivity,
             field
           FROM
             history
           GROUP BY
             employeeId,
             dateOfEffectivity,
             field
           HAVING
             MAX(id) = MAX(CASE WHEN dateOfEffectivity = subquery.maxDate THEN id END)
         )
       GROUP BY
         employeeId,
         dateOfEffectivity,
         field
     )
 ) h ON si.empNo = h.employeeId WHERE si.deactivated = 0
 GROUP BY
   si.empNo
 ORDER BY
   si.empNo;
    `,
      // "SELECT * FROM `salaryincrease` WHERE department = ?",
    
      (err, result)=>{
          if(err){
              res.send({err: err});
              return;
          }
              if(result.length > 0){
                  res.send(result)
                  return;
              }else{
                  res.send({message: "No Data Found"});
                  return;
                  

              }
          
  //    console.log(err);
  });
});

app.post("/setsitablebefore", (req, res)=>{
  const empNo = req.body.empNo;

  // const sqlSelect = ;
  db.query(
      `SELECT
      si.id AS id,
     si.empNo AS employeeId,
   COALESCE(MAX(CASE WHEN h.field = 'department' THEN h.hr_from END), si.department) AS department,
   COALESCE(MAX(CASE WHEN h.field = 'section' THEN h.hr_from END), si.section) AS section,
   COALESCE(MAX(CASE WHEN h.field = 'employeeName' THEN h.hr_from END), si.employeeName) AS employeeName,
   COALESCE(MAX(CASE WHEN h.field = 'sex' THEN h.hr_from END), si.sex) AS sex,
   COALESCE(MAX(CASE WHEN h.field = 'birthday' THEN h.hr_from END), si.birthday) AS birthday,
   COALESCE(MAX(CASE WHEN h.field = 'age' THEN h.hr_from END), si.age) AS age,
   COALESCE(MAX(CASE WHEN h.field = 'dateHired' THEN h.hr_from END), si.dateHired) AS dateHired,
   COALESCE(MAX(CASE WHEN h.field = 'serviceTerm' THEN h.hr_from END), si.serviceTerm) AS serviceTerm,
   COALESCE(MAX(CASE WHEN h.field = 'position' THEN h.hr_from END), si.position) AS 'position',
   COALESCE(MAX(CASE WHEN h.field = 'designation' THEN h.hr_from END), si.designation) AS designation,
   COALESCE(MAX(CASE WHEN h.field = 'class' THEN h.hr_from END), si.class) AS class,
   COALESCE(MAX(CASE WHEN h.field = 'level' THEN h.hr_from END), si.level) AS level,
   COALESCE(MAX(CASE WHEN h.field = 'salaryType' THEN h.hr_from END), si.salaryType) AS salaryType,
   COALESCE(MAX(CASE WHEN h.field = 'basicSalary' THEN h.hr_from END), si.basicSalary) AS basicSalary,
   COALESCE(MAX(CASE WHEN h.field = 'daily' THEN h.hr_from END), si.daily) AS daily,
   COALESCE(MAX(CASE WHEN h.field = 'monthlySalary' THEN h.hr_from END), si.monthlySalary) AS monthlySalary,
   COALESCE(MAX(CASE WHEN h.field = 'pPEPoint' THEN h.hr_from END), si.pPEPoint) AS pPEPoint,
   COALESCE(MAX(CASE WHEN h.field = 'pAllowance' THEN h.hr_from END), si.pAllowance) AS pAllowance,
   COALESCE(MAX(CASE WHEN h.field = 'pRank' THEN h.hr_from END), si.pRank) AS pRank,
   COALESCE(MAX(CASE WHEN h.field = 'tsPEPoint' THEN h.hr_from END), si.tsPEPoint) AS tsPEPoint,
   COALESCE(MAX(CASE WHEN h.field = 'tsAllowance' THEN h.hr_from END), si.tsAllowance) AS tsAllowance,
   COALESCE(MAX(CASE WHEN h.field = 'tsRank' THEN h.hr_from END), si.tsRank) AS tsRank,
   COALESCE(MAX(CASE WHEN h.field = 'leLicenseFee' THEN h.hr_from END), si.leLicenseFee) AS leLicenseFee,
   COALESCE(MAX(CASE WHEN h.field = 'lePEPoint' THEN h.hr_from END), si.lePEPoint) AS lePEPoint,
   COALESCE(MAX(CASE WHEN h.field = 'leAllowance' THEN h.hr_from END), si.leAllowance) AS leAllowance,
   COALESCE(MAX(CASE WHEN h.field = 'leRank' THEN h.hr_from END), si.leRank) AS leRank,
   COALESCE(MAX(CASE WHEN h.field = 'ceCertificateOnFee' THEN h.hr_from END), si.ceCertificateOnFee) AS ceLicenseFee,
   COALESCE(MAX(CASE WHEN h.field = 'cePEPoint' THEN h.hr_from END), si.cePEPoint) AS cePEPoint,
   COALESCE(MAX(CASE WHEN h.field = 'ceAllowance' THEN h.hr_from END), si.ceAllowance) AS ceAllowance,
   COALESCE(MAX(CASE WHEN h.field = 'ceRank' THEN h.hr_from END), si.ceRank) AS ceRank,
   COALESCE(MAX(CASE WHEN h.field = 'Specialization' THEN h.hr_from END), si.Specialization) AS Specialization,
   
   si.total,
   si.employeeName as newEmployeeName,
   si.empNo as newEmpNo,
   si.dateHired as newDateHired,
   si.section as newSection,
   si.department as newDepartment,
   si.position as newPosition,
   si.designation as newDesignation,
   si.class as newClass,
   si.level as newLevel,
   si.salaryType as newSalaryType,
   si.basicSalary as newBasicSalary,
   si.pAllowance as newPAllowance,
   si.Specialization as newSpecialization,
   si.leAllowance as newLEAllowance,
   si.ceAllowance as newCEAllowance,
   si.leLicenseFee as newleLicenseFee,
   si.ceCertificateOnFee as newceCertificateOnFee
  
 FROM
   salaryincrease si
 LEFT JOIN (
   SELECT
     h1.employeeId,
     h1.field,
     h1.hr_from
   FROM
     history h1
     JOIN (
       SELECT
         employeeId,
         MAX(dateOfEffectivity) AS maxDate
       FROM
         history
       GROUP BY
         employeeId
     ) subquery ON h1.employeeId = subquery.employeeId AND h1.dateOfEffectivity = subquery.maxDate
   WHERE
     (h1.employeeId, h1.dateOfEffectivity, h1.field, h1.id) IN (
       SELECT
         employeeId,
         dateOfEffectivity,
         field,
         MAX(id)
       FROM
         history
       WHERE
         (employeeId, dateOfEffectivity, field) IN (
           SELECT
             employeeId,
             dateOfEffectivity,
             field
           FROM
             history
           GROUP BY
             employeeId,
             dateOfEffectivity,
             field
           HAVING
             MAX(id) = MAX(CASE WHEN dateOfEffectivity = subquery.maxDate THEN id END)
         )
       GROUP BY
         employeeId,
         dateOfEffectivity,
         field
     )
 ) h ON si.empNo = h.employeeId WHERE si.empNo = ? AND si.deactivated = 0
 GROUP BY
   si.empNo
 ORDER BY
   si.empNo;
    `,
      // "SELECT * FROM `salaryincrease` WHERE department = ?",
      [empNo],
      (err, result)=>{
          if(err){
              res.send({err: err});
              return;
          }
              if(result.length > 0){
                  res.send(result)
                  return;
              }else{
                  res.send({message: "No Data Found"});
                  return;
                  

              }
          
  //    console.log(err);
  });
});


app.post("/positions", (req, res)=>{

  // const sqlSelect = ;
  db.query(
      "SELECT positionLevel FROM `allowancetable`",
      [],
      (err, result)=>{
          if(err){
              res.send({err: err});
          }
              if(result.length > 0){
                const message = 'Data found';
                res.send({ result: result, message: message });
              }else{
                  res.send({message: "No Data Found"});
                  

              }
          
  //    console.log(err);
  });
});
app.post("/basicallowancesettings", (req, res)=>{

  // const sqlSelect = ;
  db.query(
      "SELECT * FROM `basicallowancesettings`",
      [],
      (err, result)=>{
          if(err){
              res.send({err: err});
          }
              if(result.length > 0){
                const message = 'Data found';
                res.send({ result: result, message: message });
              }else{
                  res.send({message: "No Data Found"});
                  

              }
          
  //    console.log(err);
  });
});

app.post("/updateAllowance", (req, res)=>{
  const id = req.body.id;
  const positionLevel = req.body.positionLevel;
  const classs = req.body.class;
  const rs = req.body.rs;
  const r4 = req.body.r4;
  const r3 = req.body.r3;
  const r2 = req.body.r2;
  const r1 = req.body.r1;
  
  db.query(
    "UPDATE `allowancetable` SET `positionLevel`=?,`r1`=?,`r2`=?,`r3`=?,`r4`=?,`r5`=?,`class`=? WHERE `id` = ?",
    [positionLevel,r1,r2, r3,r4,rs, classs, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
        return;

      } else {
        if (result.affectedRows > 0) {
          res.send({result: result, message: "Data updated successfully" });
        return;
        } else {
          res.send({ message: "No matching record found" });
        return;
        }
      }
    })
});
app.post("/updateSalaryIncrement", (req, res)=>{

  const type = req.body.type;
    // const sqlSelect = ;
    if(type==="rank"){
      const dailyInc1 = req.body.dailyInc1;
      const dailyInc2 = req.body.dailyInc2;
      const dailyInc3 = req.body.dailyInc3;
      db.query(
        "UPDATE `basicallowancesettings` SET `d1`=?,`d2`=?,`d3`=? WHERE `id`='1'",
        [dailyInc1,dailyInc2, dailyInc3],
        (err, result) => {
          if (err) {
            res.send({ err: err });
            return;
  
          } else {
            if (result.affectedRows > 0) {
              res.send({result: result, message: "Data updated successfully" });
            return;
            } else {
              res.send({ message: "No matching record found" });
            return;
            }
          }
        })
    }
    else if(type ==="supervisor"){
      const dailyInc1 = req.body.dailyInc1;
      const dailyInc2 = req.body.dailyInc2;
      db.query(
        "UPDATE `basicallowancesettings` SET `m1`=?,`m2`=? WHERE `id`='1'",
        [dailyInc1, dailyInc2],
        (err, result) => {
          if (err) {
            res.send({ err: err });
            return;
  
          } else {
            if (result.affectedRows > 0) {
              res.send({ message: "Data updated successfully" });
            return;
            } else {
              res.send({ message: "No matching record found" });
            return;
            }
          }
        })
    }
    else if(type === "managerial"){
      const dailyInc1 = req.body.dailyInc1;
      const dailyInc2 = req.body.dailyInc2;
      const dailyInc3 = req.body.dailyInc3;
  
      db.query(
        "UPDATE `basicallowancesettings` SET `m3`=?,`m4`=?, `m5`=? WHERE `id`='1'",
        [dailyInc1, dailyInc2, dailyInc3],
        (err, result) => {
          if (err) {
            res.send({ err: err });
            return;
  
          } else {
            if (result.affectedRows > 0) {
              res.send({ message: "Data updated successfully" });
            return;
            } else {
              res.send({ message: "No matching record found" });
            return;
            }
          }
        })
    }
    else if(type ==="felow"){
      const dailyInc1 = req.body.dailyInc1;
      const dailyInc2 = req.body.dailyInc2;
      db.query(
        "UPDATE `basicallowancesettings` SET `f1`=?,`f2`=? WHERE `id`='1'",
        [dailyInc1, dailyInc2],
        (err, result) => {
          if (err) {
            res.send({ err: err });
            return;
  
          } else {
            if (result.affectedRows > 0) {
              res.send({ message: "Data updated successfully" });
            return;
            } else {
              res.send({ message: "No matching record found" });
            return;
            }
          }
        })
    }
  
  });
app.post("/updateSalary", (req, res)=>{

const type = req.body.type;
  // const sqlSelect = ;
  if(type==="rank"){
    const daily1 = req.body.daily1;
    const daily2 = req.body.daily2;
    const daily3 = req.body.daily3;
    db.query(
      "UPDATE `basicallowancesettings` SET `d1l1`=?,`d2l1`=?,`d3l1`=? WHERE `id`='1'",
      [daily1, daily2, daily3],
      (err, result) => {
        if (err) {
          res.send({ err: err });
          return;

        } else {
          if (result.affectedRows > 0) {
            res.send({result: result, message: "Data updated successfully" });
          return;
          } else {
            res.send({ message: "No matching record found" });
          return;
          }
        }
      })
  }
  else if(type ==="supervisor"){
    const daily1 = req.body.daily1;
    const daily2 = req.body.daily2;
    db.query(
      "UPDATE `basicallowancesettings` SET `m1l1`=?,`m2l1`=? WHERE `id`='1'",
      [daily1, daily2],
      (err, result) => {
        if (err) {
          res.send({ err: err });
          return;

        } else {
          if (result.affectedRows > 0) {
            res.send({ message: "Data updated successfully" });
          return;
          } else {
            res.send({ message: "No matching record found" });
          return;
          }
        }
      })
  }
  else if(type === "managerial"){
    const daily1 = req.body.daily1;
    const daily2 = req.body.daily2;
    const daily3 = req.body.daily3;

    db.query(
      "UPDATE `basicallowancesettings` SET `m3l1`=?,`m4l1`=?, `m5l1`=? WHERE `id`='1'",
      [daily1, daily2, daily3],
      (err, result) => {
        if (err) {
          res.send({ err: err });
          return;

        } else {
          if (result.affectedRows > 0) {
            res.send({ message: "Data updated successfully" });
          return;
          } else {
            res.send({ message: "No matching record found" });
          return;
          }
        }
      })
  }
  else if(type ==="felow"){
    const daily1 = req.body.daily1;
    const daily2 = req.body.daily2;
    db.query(
      "UPDATE `basicallowancesettings` SET `f1l1`=?,`f2l1`=? WHERE `id`='1'",
      [daily1, daily2],
      (err, result) => {
        if (err) {
          res.send({ err: err });
          return;

        } else {
          if (result.affectedRows > 0) {
            res.send({ message: "Data updated successfully" });
          return;
          } else {
            res.send({ message: "No matching record found" });
          return;
          }
        }
      })
  }

});
app.post("/allowancetable", (req, res)=>{

  // const sqlSelect = ;
  db.query(
      "SELECT * FROM `allowancetable`",
      [],
      (err, result)=>{
          if(err){
              res.send({err: err});
          }
              if(result.length > 0){
                const message = 'Data found';
                res.send({ result: result, message: message });
              }else{
                  res.send({message: "No Data Found"});
                  

              }
          
  //    console.log(err);
  });
});

app.post("/allowancetableB", (req, res)=>{

  // const sqlSelect = ;
  db.query(
      "SELECT * FROM `allowancetable` WHERE `annex` = 'Annex B'",
      [],
      (err, result)=>{
          if(err){
              res.send({err: err});
          }
              if(result.length > 0){
                const message = 'Data found';
                res.send({ result: result, message: message });
              }else{
                  res.send({message: "No Data Found"});
                  

              }
          
  //    console.log(err);
  });
});

app.post("/allowancetableC", (req, res)=>{

  // const sqlSelect = ;
  db.query(
      "SELECT * FROM `allowancetable` WHERE `annex` = 'Annex C'",
      [],
      (err, result)=>{
          if(err){
              res.send({err: err});
          }
              if(result.length > 0){
                const message = 'Data found';
                res.send({ result: result, message: message });
              }else{
                  res.send({message: "No Data Found"});
                  

              }
          
  //    console.log(err);
  });
});

app.post("/allowancetableD", (req, res)=>{

  // const sqlSelect = ;
  db.query(
      "SELECT * FROM `allowancetable` WHERE `annex` = 'Annex D'",
      [],
      (err, result)=>{
          if(err){
              res.send({err: err});
          }
              if(result.length > 0){
                const message = 'Data found';
                res.send({ result: result, message: message });
              }else{
                  res.send({message: "No Data Found"});
                  

              }
          
  //    console.log(err);
  });
});

app.post("/allowancetableDA2", (req, res)=>{

  // const sqlSelect = ;
  db.query(
      "SELECT * FROM `allowancetable` WHERE `annex` = 'Annex D A2'",
      [],
      (err, result)=>{
          if(err){
              res.send({err: err});
          }
              if(result.length > 0){
                const message = 'Data found';
                res.send({ result: result, message: message });
              }else{
                  res.send({message: "No Data Found"});
                  

              }
          
  //    console.log(err);
  });
});
app.post("/allowancetableDA3", (req, res)=>{

  // const sqlSelect = ;
  db.query(
      "SELECT * FROM `allowancetable` WHERE `annex` = 'Annex D A3'",
      [],
      (err, result)=>{
          if(err){
              res.send({err: err});
          }
              if(result.length > 0){
                const message = 'Data found';
                res.send({ result: result, message: message });
              }else{
                  res.send({message: "No Data Found"});
                  

              }
          
  //    console.log(err);
  });
});

app.post("/allowancetableDSpecial", (req, res)=>{

  // const sqlSelect = ;
  db.query(
      "SELECT * FROM `allowancetable` WHERE `annex` = 'Annex D Special'",
      [],
      (err, result)=>{
          if(err){
              res.send({err: err});
          }
              if(result.length > 0){
                const message = 'Data found';
                res.send({ result: result, message: message });
              }else{
                  res.send({message: "No Data Found"});
                  

              }
          
  //    console.log(err);
  });
});
app.post("/history", (req, res)=>{
    const empId = req.body.employeeID;
 
    // const sqlSelect = ;
    db.query(
        "SELECT * FROM `history` WHERE `employeeId` = ? order by id desc",
        [empId],
        (err, result)=>{
            if(err){
                res.send({err: err});
            }
                if(result.length > 0){
                  const message = 'Data found';
                  res.send({ result: result, message: message });
                }else{
                    res.send({message: "No Data Found"});
                    

                }
            
    //    console.log(err);
    });
});
app.post("/totalBefore", (req, res)=>{
  const empNo = req.body.empNo;
  const query = `SELECT
  si.empNo AS employeeId,
  (COALESCE(MAX(CASE WHEN h.field = 'monthlySalary' THEN h.hr_from END), si.monthlySalary)+
   COALESCE(MAX(CASE WHEN h.field = 'pAllowance' THEN h.hr_from END), si.pAllowance)+
   COALESCE(MAX(CASE WHEN h.field = 'tsAllowance' THEN h.hr_from END), si.tsAllowance)+
   COALESCE(MAX(CASE WHEN h.field = 'leLicenseFee' THEN h.hr_from END), si.leLicenseFee)+
   COALESCE(MAX(CASE WHEN h.field = 'leAllowance' THEN h.hr_from END), si.leAllowance)+
   COALESCE(MAX(CASE WHEN h.field = 'ceCertificateOnFee' THEN h.hr_from END), si.ceCertificateOnFee)+
   COALESCE(MAX(CASE WHEN h.field = 'ceAllowance' THEN h.hr_from END), si.ceAllowance)) AS total_sum,
   (si.monthlySalary + si.pAllowance + si.tsAllowance + si.leLicenseFee + si.leAllowance + si.ceCertificateOnFee+si.ceAllowance) as total_sum_now
FROM
  salaryincrease si
LEFT JOIN (
  SELECT
    h1.employeeId,
    h1.field,
    h1.hr_from
  FROM
    history h1
    JOIN (
      SELECT
        employeeId,
        MAX(dateOfEffectivity) AS maxDate
      FROM
        history
      GROUP BY
        employeeId
    ) subquery ON h1.employeeId = subquery.employeeId AND h1.dateOfEffectivity = subquery.maxDate
  WHERE
    (h1.employeeId, h1.dateOfEffectivity, h1.field, h1.id) IN (
      SELECT
        employeeId,
        dateOfEffectivity,
        field,
        MAX(id)
      FROM
        history
      WHERE
        (employeeId, dateOfEffectivity, field) IN (
          SELECT
            employeeId,
            dateOfEffectivity,
            field
          FROM
            history
          GROUP BY
            employeeId,
            dateOfEffectivity,
            field
          HAVING
            MAX(id) = MAX(CASE WHEN dateOfEffectivity = subquery.maxDate THEN id END)
        )
      GROUP BY
        employeeId,
        dateOfEffectivity,
        field
    )
) h ON si.empNo = h.employeeId WHERE si.empNo = ?
GROUP BY
  si.empNo
ORDER BY
  si.empNo;
  `;
  // const sqlSelect = ;
  db.query(
    query,[empNo],
      (err, result)=>{
          if(err){
              res.send({err: err});
          }
              if(result.length > 0){
                  res.send(result)
              }else{
                  res.send({message: "No Data Found"});
                  

              }
          
  //    console.log(err);
  });
});


app.post("/beforeData", (req, res)=>{
  const department = req.body.department;
  const selectedemployees = req.body.selectedemployees;
  console.log(selectedemployees)
  if(selectedemployees.length>0){
    const query = `SELECT
    si.empNo AS employeeId,
    COALESCE(MAX(CASE WHEN h.field = 'department' THEN h.hr_from END), si.department) AS department,
    COALESCE(MAX(CASE WHEN h.field = 'section' THEN h.hr_from END), si.section) AS section,
    COALESCE(MAX(CASE WHEN h.field = 'employeeName' THEN h.hr_from END), si.employeeName) AS employeeName,
    COALESCE(MAX(CASE WHEN h.field = 'sex' THEN h.hr_from END), si.sex) AS sex,
    COALESCE(MAX(CASE WHEN h.field = 'birthday' THEN h.hr_from END), si.birthday) AS birthday,
    COALESCE(MAX(CASE WHEN h.field = 'age' THEN h.hr_from END), si.age) AS age,
    COALESCE(MAX(CASE WHEN h.field = 'dateHired' THEN h.hr_from END), si.dateHired) AS dateHired,
    COALESCE(MAX(CASE WHEN h.field = 'serviceTerm' THEN h.hr_from END), si.serviceTerm) AS serviceTerm,
    COALESCE(MAX(CASE WHEN h.field = 'position' THEN h.hr_from END), si.position) AS 'position',
    COALESCE(MAX(CASE WHEN h.field = 'designation' THEN h.hr_from END), si.designation) AS designation,
    COALESCE(MAX(CASE WHEN h.field = 'class' THEN h.hr_from END), si.class) AS class,
    COALESCE(MAX(CASE WHEN h.field = 'level' THEN h.hr_from END), si.level) AS level,
    COALESCE(MAX(CASE WHEN h.field = 'salaryType' THEN h.hr_from END), si.salaryType) AS salaryType,
    COALESCE(MAX(CASE WHEN h.field = 'basicSalary' THEN h.hr_from END), si.basicSalary) AS basicSalary,
    COALESCE(MAX(CASE WHEN h.field = 'daily' THEN h.hr_from END), si.daily) AS daily,
    COALESCE(MAX(CASE WHEN h.field = 'monthlySalary' THEN h.hr_from END), si.monthlySalary) AS monthlySalary,
    COALESCE(MAX(CASE WHEN h.field = 'pPEPoint' THEN h.hr_from END), si.pPEPoint) AS pPEPoint,
    COALESCE(MAX(CASE WHEN h.field = 'pAllowance' THEN h.hr_from END), si.pAllowance) AS pAllowance,
    COALESCE(MAX(CASE WHEN h.field = 'pRank' THEN h.hr_from END), si.pRank) AS pRank,
    COALESCE(MAX(CASE WHEN h.field = 'tsPEPoint' THEN h.hr_from END), si.tsPEPoint) AS tsPEPoint,
    COALESCE(MAX(CASE WHEN h.field = 'tsAllowance' THEN h.hr_from END), si.tsAllowance) AS tsAllowance,
    COALESCE(MAX(CASE WHEN h.field = 'tsRank' THEN h.hr_from END), si.tsRank) AS tsRank,
    COALESCE(MAX(CASE WHEN h.field = 'leLicenseFee' THEN h.hr_from END), si.leLicenseFee) AS leLicenseFee,
    COALESCE(MAX(CASE WHEN h.field = 'lePEPoint' THEN h.hr_from END), si.lePEPoint) AS lePEPoint,
    COALESCE(MAX(CASE WHEN h.field = 'leAllowance' THEN h.hr_from END), si.leAllowance) AS leAllowance,
    COALESCE(MAX(CASE WHEN h.field = 'leRank' THEN h.hr_from END), si.leRank) AS leRank,
    COALESCE(MAX(CASE WHEN h.field = 'ceCertificateOnFee' THEN h.hr_from END), si.ceCertificateOnFee) AS ceLicenseFee,
    COALESCE(MAX(CASE WHEN h.field = 'cePEPoint' THEN h.hr_from END), si.cePEPoint) AS cePEPoint,
    COALESCE(MAX(CASE WHEN h.field = 'ceAllowance' THEN h.hr_from END), si.ceAllowance) AS ceAllowance,
    COALESCE(MAX(CASE WHEN h.field = 'ceRank' THEN h.hr_from END), si.ceRank) AS ceRank,
    COALESCE(MAX(CASE WHEN h.field = 'Specialization' THEN h.hr_from END), si.Specialization) AS Specialization,
    
    si.total,
    si.employeeName as newEmployeeName,
    si.empNo as newEmpNo,
    si.dateHired as newDateHired,
    si.section as newSection,
    si.department as newDepartment,
    si.position as newPosition,
    si.designation as newDesignation,
    si.class as newClass,
    si.level as newLevel,
    si.salaryType as newSalaryType,
    si.basicSalary as newBasicSalary,
    si.pAllowance as newPAllowance,
    si.Specialization as newSpecialization,
    si.leAllowance as newLEAllowance,
    si.ceAllowance as newCEAllowance,
    si.leLicenseFee as newleLicenseFee,
    si.ceCertificateOnFee as newceCertificateOnFee
   
  FROM
    salaryincrease si
  LEFT JOIN (
    SELECT
      h1.employeeId,
      h1.field,
      h1.hr_from
    FROM
      history h1
      JOIN (
        SELECT
          employeeId,
          MAX(dateOfEffectivity) AS maxDate
        FROM
          history
        GROUP BY
          employeeId
      ) subquery ON h1.employeeId = subquery.employeeId AND h1.dateOfEffectivity = subquery.maxDate
    WHERE
      (h1.employeeId, h1.dateOfEffectivity, h1.field, h1.id) IN (
        SELECT
          employeeId,
          dateOfEffectivity,
          field,
          MAX(id)
        FROM
          history
        WHERE
          (employeeId, dateOfEffectivity, field) IN (
            SELECT
              employeeId,
              dateOfEffectivity,
              field
            FROM
              history
            GROUP BY
              employeeId,
              dateOfEffectivity,
              field
            HAVING
              MAX(id) = MAX(CASE WHEN dateOfEffectivity = subquery.maxDate THEN id END)
          )
        GROUP BY
          employeeId,
          dateOfEffectivity,
          field
      )
  ) h ON si.empNo = h.employeeId WHERE si.department = ? AND si.deactivated = 0 AND id IN  (?)
  GROUP BY
    si.empNo
  ORDER BY
    si.empNo;
    `;
    console.log(selectedemployees);
  
    // const sqlSelect = ;
    db.query(
      query,[department,selectedemployees],
        (err, result)=>{
            if(err){
                res.send({err: err});
            }
                if(result.length > 0){
                    res.send(result)
                }else{
                    res.send({message: "No Data Found"});
                    
  
                }
            
    //    console.log(err);
    });
  }
  else if(selectedemployees.length === 0){
    console.log("walang laman")
    const query = `SELECT
    si.empNo AS employeeId,
    COALESCE(MAX(CASE WHEN h.field = 'department' THEN h.hr_from END), si.department) AS department,
    COALESCE(MAX(CASE WHEN h.field = 'section' THEN h.hr_from END), si.section) AS section,
    COALESCE(MAX(CASE WHEN h.field = 'employeeName' THEN h.hr_from END), si.employeeName) AS employeeName,
    COALESCE(MAX(CASE WHEN h.field = 'sex' THEN h.hr_from END), si.sex) AS sex,
    COALESCE(MAX(CASE WHEN h.field = 'birthday' THEN h.hr_from END), si.birthday) AS birthday,
    COALESCE(MAX(CASE WHEN h.field = 'age' THEN h.hr_from END), si.age) AS age,
    COALESCE(MAX(CASE WHEN h.field = 'dateHired' THEN h.hr_from END), si.dateHired) AS dateHired,
    COALESCE(MAX(CASE WHEN h.field = 'serviceTerm' THEN h.hr_from END), si.serviceTerm) AS serviceTerm,
    COALESCE(MAX(CASE WHEN h.field = 'position' THEN h.hr_from END), si.position) AS 'position',
    COALESCE(MAX(CASE WHEN h.field = 'designation' THEN h.hr_from END), si.designation) AS designation,
    COALESCE(MAX(CASE WHEN h.field = 'class' THEN h.hr_from END), si.class) AS class,
    COALESCE(MAX(CASE WHEN h.field = 'level' THEN h.hr_from END), si.level) AS level,
    COALESCE(MAX(CASE WHEN h.field = 'salaryType' THEN h.hr_from END), si.salaryType) AS salaryType,
    COALESCE(MAX(CASE WHEN h.field = 'basicSalary' THEN h.hr_from END), si.basicSalary) AS basicSalary,
    COALESCE(MAX(CASE WHEN h.field = 'daily' THEN h.hr_from END), si.daily) AS daily,
    COALESCE(MAX(CASE WHEN h.field = 'monthlySalary' THEN h.hr_from END), si.monthlySalary) AS monthlySalary,
    COALESCE(MAX(CASE WHEN h.field = 'pPEPoint' THEN h.hr_from END), si.pPEPoint) AS pPEPoint,
    COALESCE(MAX(CASE WHEN h.field = 'pAllowance' THEN h.hr_from END), si.pAllowance) AS pAllowance,
    COALESCE(MAX(CASE WHEN h.field = 'pRank' THEN h.hr_from END), si.pRank) AS pRank,
    COALESCE(MAX(CASE WHEN h.field = 'tsPEPoint' THEN h.hr_from END), si.tsPEPoint) AS tsPEPoint,
    COALESCE(MAX(CASE WHEN h.field = 'tsAllowance' THEN h.hr_from END), si.tsAllowance) AS tsAllowance,
    COALESCE(MAX(CASE WHEN h.field = 'tsRank' THEN h.hr_from END), si.tsRank) AS tsRank,
    COALESCE(MAX(CASE WHEN h.field = 'leLicenseFee' THEN h.hr_from END), si.leLicenseFee) AS leLicenseFee,
    COALESCE(MAX(CASE WHEN h.field = 'lePEPoint' THEN h.hr_from END), si.lePEPoint) AS lePEPoint,
    COALESCE(MAX(CASE WHEN h.field = 'leAllowance' THEN h.hr_from END), si.leAllowance) AS leAllowance,
    COALESCE(MAX(CASE WHEN h.field = 'leRank' THEN h.hr_from END), si.leRank) AS leRank,
    COALESCE(MAX(CASE WHEN h.field = 'ceCertificateOnFee' THEN h.hr_from END), si.ceCertificateOnFee) AS ceLicenseFee,
    COALESCE(MAX(CASE WHEN h.field = 'cePEPoint' THEN h.hr_from END), si.cePEPoint) AS cePEPoint,
    COALESCE(MAX(CASE WHEN h.field = 'ceAllowance' THEN h.hr_from END), si.ceAllowance) AS ceAllowance,
    COALESCE(MAX(CASE WHEN h.field = 'ceRank' THEN h.hr_from END), si.ceRank) AS ceRank,
    COALESCE(MAX(CASE WHEN h.field = 'Specialization' THEN h.hr_from END), si.Specialization) AS Specialization,
    
    si.total,
    si.employeeName as newEmployeeName,
    si.empNo as newEmpNo,
    si.dateHired as newDateHired,
    si.section as newSection,
    si.department as newDepartment,
    si.position as newPosition,
    si.designation as newDesignation,
    si.class as newClass,
    si.level as newLevel,
    si.salaryType as newSalaryType,
    si.basicSalary as newBasicSalary,
    si.pAllowance as newPAllowance,
    si.Specialization as newSpecialization,
    si.leAllowance as newLEAllowance,
    si.ceAllowance as newCEAllowance,
    si.leLicenseFee as newleLicenseFee,
    si.ceCertificateOnFee as newceCertificateOnFee
   
  FROM
    salaryincrease si
  LEFT JOIN (
    SELECT
      h1.employeeId,
      h1.field,
      h1.hr_from
    FROM
      history h1
      JOIN (
        SELECT
          employeeId,
          MAX(dateOfEffectivity) AS maxDate
        FROM
          history
        GROUP BY
          employeeId
      ) subquery ON h1.employeeId = subquery.employeeId AND h1.dateOfEffectivity = subquery.maxDate
    WHERE
      (h1.employeeId, h1.dateOfEffectivity, h1.field, h1.id) IN (
        SELECT
          employeeId,
          dateOfEffectivity,
          field,
          MAX(id)
        FROM
          history
        WHERE
          (employeeId, dateOfEffectivity, field) IN (
            SELECT
              employeeId,
              dateOfEffectivity,
              field
            FROM
              history
            GROUP BY
              employeeId,
              dateOfEffectivity,
              field
            HAVING
              MAX(id) = MAX(CASE WHEN dateOfEffectivity = subquery.maxDate THEN id END)
          )
        GROUP BY
          employeeId,
          dateOfEffectivity,
          field
      )
  ) h ON si.empNo = h.employeeId WHERE si.department = ? AND si.deactivated = 0
  GROUP BY
    si.empNo
  ORDER BY
    si.empNo;
    `;

  
    // const sqlSelect = ;
    db.query(
      query,[department],
        (err, result)=>{
            if(err){
                res.send({err: err});
            }
                if(result.length > 0){
                    res.send(result)
                }else{
                    res.send({message: "No Data Found"});
                    
  
                }
            
    //    console.log(err);
    });
  }

});
app.post("/addemployee", (req, res)=>{
  const department = req.body.department;
  const daily = req.body.daily;
  const section = req.body.section;
  const empName = req.body.empName;
  const empNumber = req.body.empNumber;
  const position = req.body.position;
  const designation = req.body.designation;
  const empClass = req.body.empClass;
  const level = req.body.level;
  const salary = req.body.salary;
  const basicSalary = req.body.basicSalary;
  const monthlySalary = req.body.monthlySalary;
  const posPe = req.body.posPe;
  const posAllowance = req.body.posAllowance;
  const posRank = req.body.posRank;
  const tsPEPoint = req.body.tsPEPoint;
  const tsAllowance = req.body.tsAllowance;
  const tsRank = req.body.tsRank;
  const leLicenseFee = req.body.leLicenseFee;
  const lePEPoint = req.body.lePEPoint;
  const leAllowance = req.body.leAllowance;
  const leRank = req.body.leRank;
  const ceCertificateOnFee = req.body.ceCertificateOnFee;
  const cePEPoint = req.body.cePEPoint;
  const ceAllowance = req.body.ceAllowance;
  const ceRank = req.body.ceRank;
  const Specialization = req.body.Specialization;
  const birthday = req.body.birthday;
  const age = req.body.age;
  const sex = req.body.sex;
  const dateHired = req.body.dateHired;
  console.log(empName)

      db.query("INSERT INTO salaryincrease( department, section, employeeName, sex, birthday, age, empNo, dateHired, position, designation, class, level, salaryType, basicSalary, daily, monthlySalary, pPEPoint, pAllowance, pRank, tsPEPoint, tsAllowance, tsRank, leLicenseFee, lePEPoint, leAllowance, leRank, ceCertificateOnFee, cePEPoint, ceAllowance, ceRank, Specialization) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
    [department, section, empName, sex, birthday,age, empNumber,dateHired, position, designation, empClass, level, salary, basicSalary, daily, monthlySalary, posPe, posAllowance, posRank, tsPEPoint, tsAllowance, tsRank, leLicenseFee, lePEPoint, leAllowance, leRank, ceCertificateOnFee, cePEPoint, ceAllowance, ceRank, Specialization], 
        (err, result)=>{
            if(err){
                res.send({err: err});
            }else {
                if (result.affectedRows > 0) {
                  res.send({ message: "Data updated successfully" });
                } else {
                  res.send({ message: "There is an error in adding employee" });
                }
              }
            
    //    console.log(err);
    });

 
});
app.post("/updatesirecord", (req, res)=>{
  console.log(req.body.from);
  const from = req.body.from;

  const dateOfEffectivity = req.body.dateOfEffectivity;
  const daily = req.body.daily;
  const level = req.body.level;
  const basicSalary = req.body.basicSalary;
  const monthlySalary = req.body.monthlySalary;
  const posPe = req.body.posPe;
  const posAllowance = req.body.posAllowance;
  const posRank = req.body.posRank;
  const empNumber = req.body.empNumber;
  const id = req.body.id;  

  // if(from!=="import"){
    const department = req.body.department;
    const section = req.body.section;
    const empName = req.body.empName;
    const position = req.body.position;
    const designation = req.body.designation;
    const empClass = req.body.empClass;
 
    const salary = req.body.salary;

    const tsPEPoint = req.body.tsPEPoint;
    const tsAllowance = req.body.tsAllowance;
    const tsRank = req.body.tsRank;
    const leLicenseFee = req.body.leLicenseFee;
    const lePEPoint = req.body.lePEPoint;
    const leAllowance = req.body.leAllowance;
    const leRank = req.body.leRank;
    const ceCertificateOnFee = req.body.ceCertificateOnFee;
    const cePEPoint = req.body.cePEPoint;
    const ceAllowance = req.body.ceAllowance;
    const ceRank = req.body.ceRank;
    const Specialization = req.body.Specialization;
    const birthday = req.body.birthday;
    const age = req.body.age;
    const sex = req.body.sex;
    const dateHired = req.body.dateHired;
    const serviceTerm = req.body.serviceTerm;
    const fullName = req.body.fullName;
console.log(id);

  // }
   


    // db.query("UPDATE `salaryincrease` SET `department`=?,`section`=?,`employeeName`=?,`sex`=?,`birthday`=?,`age`=?,`empNo`=?,`dateHired`=?,`serviceTerm`=?,`position`=?,`designation`=?,`class`=?,`level`=?,`salaryType`=?,`basicSalary`=?,`daily`=?,`monthlySalary`=?,`pPEPoint`=?,`pAllowance`=?,`pRank`=?,`tsPEPoint`=?,`tsAllowance`=?,`tsRank`=?,`leLicenseFee`=?,`lePEPoint`=?,`leAllowance`=?,`leRank`=?,`ceCertificateOnFee`=?,`cePEPoint`=?,`ceAllowance`=?,`ceRank`=?,`Specialization`=? WHERE `id` = ?",
    // [department, section, empName, sex, birthday,age, empNumber,dateHired,serviceTerm, position, designation, empClass, level, salary, basicSalary, daily, monthlySalary, posPe, posAllowance, posRank, tsPEPoint, tsAllowance, tsRank, leLicenseFee, lePEPoint, leAllowance, leRank, ceCertificateOnFee, cePEPoint, ceAllowance, ceRank, Specialization, id], 
    //     (err, result)=>{
    //         if(err){
    //             res.send({err: err});
    //         }else {
    //             if (result.affectedRows > 0) {
    //               res.send({ message: "Data updated successfully" });
    //             } else {
    //               res.send({ message: "No matching record found" });
    //             }
    //           }
            
    // //    console.log(err);
    // });
    db.query("SELECT * FROM `salaryincrease` WHERE `id` = ?", [id], (err, rows) => {
        if (err) {
          res.send({ err: err });
          return;
        } else {
          if (rows.length > 0) {
            const previousRecord = rows[0]; // Store the previous record for comparison
            console.log("previous record: ", previousRecord)
            // Check each field for updates
            const updatedFields = {};
            const dateModified = new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });

if(from === "manual"){
  if (department !== previousRecord.department) {
    updatedFields.department = {
      previousValue: previousRecord.department,
      updatedValue: department,
    };
    console.log("Previous department:", previousRecord.department);
    console.log("Updated department:", department);
    
    const category = "Basic Information";
    const field = "department";

    const modifier = fullName;
    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ? , `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, department, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.department, department, modifier, dateOfEffectivity],
     
          );
        }
      }
    })
   
  }
  
  if (section !== previousRecord.section) {
    updatedFields.section = {
      previousValue: previousRecord.section,
      updatedValue: section,
    };
    console.log("Previous section:", previousRecord.section);
    console.log("Updated section:", section);
    
    const category = "Basic Information";
    const field = "section";

    const modifier = fullName;
    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ? , `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, section, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.section, section, modifier, dateOfEffectivity],
     
          );
        }
      }
    })

  }
  
  if (empName !== previousRecord.employeeName) {
    updatedFields.employeeName = {
      previousValue: previousRecord.employeeName,
      updatedValue: empName,
    };
    console.log("Previous employeeName:", previousRecord.employeeName);
    console.log("Updated employeeName:", empName);
    const category = "Basic Information";
    const field = "employeeName";

    const modifier = fullName;
    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ? , `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, empName, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.employeeName, empName, modifier, dateOfEffectivity],
     
          );
        }
      }
    })
    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.employeeName, empName, modifier, dateOfEffectivity],
 
    //   );
  }
  
  if (sex !== previousRecord.sex) {
    updatedFields.sex = {
      previousValue: previousRecord.sex,
      updatedValue: sex,
    };
    console.log("Previous sex:", previousRecord.sex);
    console.log("Updated sex:", sex);
    const category = "Basic Information";
    const field = "sex";

    const modifier = fullName;
    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ? , `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, sex, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.sex, sex, modifier, dateOfEffectivity],
     
          );
        }
      }
    })
    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.sex, sex, modifier, dateOfEffectivity],
 
    //   );
  }
  
  if (birthday !== previousRecord.birthday) {
    updatedFields.birthday = {
      previousValue: previousRecord.birthday,
      updatedValue: birthday,
    };
    console.log("Previous birthday:", previousRecord.birthday);
    console.log("Updated birthday:", birthday);
    const category = "Basic Information";
    const field = "birthday";

    const modifier = fullName;
    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ? , `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, birthday, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.birthday, birthday, modifier, dateOfEffectivity],
     
          );
        }
      }
    })
    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.birthday, birthday, modifier, dateOfEffectivity],
 
    //   );
  }
  
  if (age !== previousRecord.age) {
    updatedFields.age = {
      previousValue: previousRecord.age,
      updatedValue: age,
    };
    console.log("Previous age:", previousRecord.age);
    console.log("Updated age:", age);
    const category = "Basic Information";
    const field = "age";

    const modifier = fullName;
    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ? , `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, age, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.age, age, modifier, dateOfEffectivity],
     
          );
        }
      }
    })
    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.age, age, modifier, dateOfEffectivity],
 
    //   );
  }
  
  if (empNumber !== previousRecord.empNo) {
    updatedFields.empNo = {
      previousValue: previousRecord.empNo,
      updatedValue: empNumber,
    };
    console.log("Previous empNo:", previousRecord.empNo);
    console.log("Updated empNo:", empNumber);
    const category = "Basic Information";
    const field = "empNo";

    const modifier = fullName;
    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ? , `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, empNumber, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.empNo, empNumber, modifier, dateOfEffectivity],
     
          );
        }
      }
    })
    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.empNo, empNumber, modifier, dateOfEffectivity],
 
    //   );
  }
  
  if (dateHired !== previousRecord.dateHired) {
    updatedFields.dateHired = {
      previousValue: previousRecord.dateHired,
      updatedValue: dateHired,
    };
    console.log("Previous dateHired:", previousRecord.dateHired);
    console.log("Updated dateHired:", dateHired);
    const category = "Basic Information";
    const field = "dateHired";

    const modifier = fullName;
    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ? , `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, dateHired, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.dateHired, dateHired, modifier, dateOfEffectivity],
     
          );
        }
      }
    })
    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.dateHired, dateHired, modifier, dateOfEffectivity],
 
    //   );
  }
  
  // if (serviceTerm !== previousRecord.serviceTerm) {
  //   updatedFields.serviceTerm = {
  //     previousValue: previousRecord.serviceTerm,
  //     updatedValue: serviceTerm,
  //   };
  //   console.log("Previous serviceTerm:", previousRecord.serviceTerm);
  //   console.log("Updated serviceTerm:", serviceTerm);
  //   const category = "Basic Information";
  //   const field = "Service Term";

  //   const modifier = fullName;

  //   db.query(
  //       "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
  //       [empNumber, dateModified, category, field, previousRecord.serviceTerm, serviceTerm, modifier, dateOfEffectivity],
 
  //     );
  // }
  
  if (position !== previousRecord.position) {
    updatedFields.position = {
      previousValue: previousRecord.position,
      updatedValue: position,
    };
    console.log("Previous position:", previousRecord.position);
    console.log("Updated position:", position);
    const category = "Position / Designation";
    const field = "position";

    const modifier = fullName;

    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ? , `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, position, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.position, position, modifier, dateOfEffectivity],
     
          );
        }
      }
    })

    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.position, position, modifier, dateOfEffectivity],
 
    //   );
  }
  
  if (designation !== previousRecord.designation) {
    updatedFields.designation = {
      previousValue: previousRecord.designation,
      updatedValue: designation,
    };
    console.log("Previous designation:", previousRecord.designation);
    console.log("Updated designation:", designation);
    const category = "Position / Designation";
    const field = "designation";

    const modifier = fullName;
    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ? , `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, designation, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.designation, designation, modifier, dateOfEffectivity],
     
          );
        }
      }
    })
    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.designation, designation, modifier, dateOfEffectivity],
 
    //   );
  }
  
  if (empClass !== previousRecord.class) {
    updatedFields.class = {
      previousValue: previousRecord.class,
      updatedValue: empClass,
    };
    console.log("Previous class:", previousRecord.class);
    console.log("Updated class:", empClass);
    const category = "Basic Salary";
    const field = "class";

    const modifier = fullName;
    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ? , `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, empClass, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.class, empClass, modifier, dateOfEffectivity],
     
          );
        }
      }
    })
    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.class, empClass, modifier, dateOfEffectivity],
 
    //   );
  }
  
  if (salary !== previousRecord.salaryType) {
    updatedFields.salaryType = {
      previousValue: previousRecord.salaryType,
      updatedValue: salary,
    };
    console.log("Previous salaryType:", previousRecord.salaryType);
    console.log("Updated salaryType:", salary);
    const category = "Basic Salary";
    const field = "salaryType";

    const modifier = fullName;
    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ? , `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, salary, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.salaryType, salary, modifier, dateOfEffectivity],
     
          );
        }
      }
    })
    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.salaryType, salary, modifier, dateOfEffectivity],
 
    //   );
  }
  if (tsPEPoint !== previousRecord.tsPEPoint) {
    updatedFields.tsPEPoint = {
      previousValue: previousRecord.tsPEPoint,
      updatedValue: tsPEPoint,
    };
    console.log("Previous tsPEPoint:", previousRecord.tsPEPoint);
    console.log("Updated tsPEPoint:", tsPEPoint);
    const category = "Technical Skills / Special Experience";
    const field = "tsPEPoint";

    const modifier = fullName;

    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ? , `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, tsPEPoint, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.tsPEPoint, tsPEPoint, modifier, dateOfEffectivity],
     
          );
        }
      }
    })


    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.tsPEPoint, tsPEPoint, modifier, dateOfEffectivity],
 
    //   );
  }
  
  if (tsAllowance !== previousRecord.tsAllowance) {
    updatedFields.tsAllowance = {
      previousValue: previousRecord.tsAllowance,
      updatedValue: tsAllowance,
    };
    console.log("Previous tsAllowance:", previousRecord.tsAllowance);
    console.log("Updated tsAllowance:", tsAllowance);
    const category = "Technical Skills / Special Experience";
    const field = "tsAllowance";

    const modifier = fullName;

    
    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ? , `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, tsAllowance, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.tsAllowance, tsAllowance, modifier, dateOfEffectivity],
     
          );
        }
      }
    })

    
  }
  
  if (tsRank !== previousRecord.tsRank) {
    updatedFields.tsRank = {
      previousValue: previousRecord.tsRank,
      updatedValue: tsRank,
    };
    console.log("Previous tsRank:", previousRecord.tsRank);
    console.log("Updated tsRank:", tsRank);
    const category = "Technical Skills / Special Experience";
    const field = "tsRank";

    const modifier = fullName;

    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ? , `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, tsRank, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.tsRank, tsRank, modifier, dateOfEffectivity],
     
          );
        }
      }
    })


    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.tsRank, tsRank, modifier, dateOfEffectivity],
 
    //   );
  }
  
  if (leLicenseFee !== previousRecord.leLicenseFee) {
    updatedFields.leLicenseFee = {
      previousValue: previousRecord.leLicenseFee,
      updatedValue: leLicenseFee,
    };
    console.log("Previous leLicenseFee:", previousRecord.leLicenseFee);
    console.log("Updated leLicenseFee:", leLicenseFee);
    const category = "License / Evaluation";
    const field = "leLicenseFee";

    const modifier = fullName;

    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ? , `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, leLicenseFee, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.leLicenseFee, leLicenseFee, modifier, dateOfEffectivity],
     
          );
        }
      }
    })


    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.leLicenseFee, leLicenseFee, modifier, dateOfEffectivity],
 
    //   );
  }
  
  if (lePEPoint !== previousRecord.lePEPoint) {
    updatedFields.lePEPoint = {
      previousValue: previousRecord.lePEPoint,
      updatedValue: lePEPoint,
    };
    console.log("Previous lePEPoint:", previousRecord.lePEPoint);
    console.log("Updated lePEPoint:", lePEPoint);

    const category = "License / Evaluation";
    const field = "lePEPoint";

    const modifier = fullName;

    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ? , `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, lePEPoint, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.lePEPoint, lePEPoint, modifier, dateOfEffectivity],
     
          );
        }
      }
    })
    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.lePEPoint, lePEPoint, modifier, dateOfEffectivity],
 
    //   );
  }
  
  if (leAllowance !== previousRecord.leAllowance) {
    updatedFields.leAllowance = {
      previousValue: previousRecord.leAllowance,
      updatedValue: leAllowance,
    };
    console.log("Previous leAllowance:", previousRecord.leAllowance);
    console.log("Updated leAllowance:", leAllowance);
    const category = "License / Evaluation";
    const field = "leAllowance";

    const modifier = fullName;

    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ? , `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, leAllowance, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.leAllowance, leAllowance, modifier, dateOfEffectivity],
     
          );
        }
      }
    })


    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.leAllowance, leAllowance, modifier, dateOfEffectivity],
 
    //   );
  }
  
  if (leRank !== previousRecord.leRank) {
    updatedFields.leRank = {
      previousValue: previousRecord.leRank,
      updatedValue: leRank,
    };
    console.log("Previous leRank:", previousRecord.leRank);
    console.log("Updated leRank:", leRank);
    const category = "License / Evaluation";
    const field = "leRank";

    const modifier = fullName;

    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ? , `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, leRank, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.leRank, leRank, modifier, dateOfEffectivity],
     
          );
        }
      }
    })

    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.leRank, leRank, modifier, dateOfEffectivity],
 
    //   );
  }
  
  if (ceCertificateOnFee !== previousRecord.ceCertificateOnFee) {
    updatedFields.ceCertificateOnFee = {
      previousValue: previousRecord.ceCertificateOnFee,
      updatedValue: ceCertificateOnFee,
    };
    console.log("Previous ceCertificateOnFee:", previousRecord.ceCertificateOnFee);
    console.log("Updated ceCertificateOnFee:", ceCertificateOnFee);
    const category = "Certification / Evaluation";
    const field = "ceCertificateOnFee";

    const modifier = fullName;

    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ? , `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, ceCertificateOnFee, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.ceCertificateOnFee, ceCertificateOnFee, modifier, dateOfEffectivity],
     
          );
        }
      }
    })


    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.ceCertificateOnFee, ceCertificateOnFee, modifier, dateOfEffectivity],
 
    //   );
  }
  
  if (cePEPoint !== previousRecord.cePEPoint) {
    updatedFields.cePEPoint = {
      previousValue: previousRecord.cePEPoint,
      updatedValue: cePEPoint,
    };
    console.log("Previous cePEPoint:", previousRecord.cePEPoint);
    console.log("Updated cePEPoint:", cePEPoint);
    const category = "Certification / Evaluation";
    const field = "cePEPoint";

    const modifier = fullName;

    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ? , `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, cePEPoint, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.cePEPoint, cePEPoint, modifier, dateOfEffectivity],
 
     
          );
        }
      }
    })

    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.cePEPoint, cePEPoint, modifier, dateOfEffectivity],
 
    //   );
  }
  
  if (ceAllowance !== previousRecord.ceAllowance) {
    updatedFields.ceAllowance = {
      previousValue: previousRecord.ceAllowance,
      updatedValue: ceAllowance,
    };
    console.log("Previous ceAllowance:", previousRecord.ceAllowance);
    console.log("Updated ceAllowance:", ceAllowance);
    const category = "Certification / Evaluation";
    const field = "ceAllowance";

    const modifier = fullName;

    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ? , `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, ceAllowance, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.ceAllowance, ceAllowance, modifier, dateOfEffectivity],
     
          );
        }
      }
    })
    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.ceAllowance, ceAllowance, modifier, dateOfEffectivity],
 
    //   );
  }
  
  if (ceRank !== previousRecord.ceRank) {
    updatedFields.ceRank = {
      previousValue: previousRecord.ceRank,
      updatedValue: ceRank,
    };
    console.log("Previous ceRank:", previousRecord.ceRank);
    console.log("Updated ceRank:", ceRank);
    const category = "Certification / Evaluation";
    const field = "ceRank";

    const modifier = fullName;

    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ? , `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, ceRank, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.ceRank, ceRank, modifier, dateOfEffectivity],
     
          );
        }
      }
    })


    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.ceRank, ceRank, modifier, dateOfEffectivity],
 
    //   );
  }
  
  if (Specialization !== previousRecord.Specialization) {
    updatedFields.Specialization = {
      previousValue: previousRecord.Specialization,
      updatedValue: Specialization,
    };
    console.log("Previous Specialization:", previousRecord.Specialization);
    console.log("Updated Specialization:", Specialization);
    const category = "Specialization";
    const field = "Specialization";

    const modifier = fullName;

    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ? , `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, Specialization, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.Specialization, Specialization, modifier, dateOfEffectivity],
     
          );
        }
      }
    })
    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.Specialization, Specialization, modifier, dateOfEffectivity],
 
    //   );
  }
}
           
  
  if (level !== previousRecord.level) {
    updatedFields.level = {
      previousValue: previousRecord.level,
      updatedValue: level,
    };
    console.log("Previous level:", previousRecord.level);
    console.log("Updated level:", level);
    const category = "Basic Salary";
    const field = "level";

    const modifier = fullName;
    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ?, `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, level, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.level, level, modifier, dateOfEffectivity],
     
          );
        }
      }
    })
    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.level, level, modifier, dateOfEffectivity],
 
    //   );
  }
  
  if (basicSalary !== previousRecord.basicSalary) {
    updatedFields.basicSalary = {
      previousValue: previousRecord.basicSalary,
      updatedValue: basicSalary,
    };
    console.log("Previous basicSalary:", previousRecord.basicSalary);
    console.log("Updated basicSalary:", basicSalary);

    const category = "Basic Salary";
    const field = "basicSalary";

    const modifier = fullName;
    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ?, `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, basicSalary, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.basicSalary, basicSalary, modifier, dateOfEffectivity],
     
          );
        }
      }
    })
    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.basicSalary, basicSalary, modifier, dateOfEffectivity],
 
    //   );
  }
  if (daily !== previousRecord.daily) {
    updatedFields.daily = {
      previousValue: previousRecord.daily,
      updatedValue: daily,
    };
    console.log("Previous daily:", previousRecord.daily);
    console.log("Updated daily:", daily);
    const category = "Salary Increase";
    const field = "daily";

    const modifier = "Cedrick James Orozo";

    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ?, `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, daily, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.daily, daily, modifier, dateOfEffectivity],
     
          );
        }
      }
    })
    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.daily, daily, modifier, dateOfEffectivity],
 
    //   );
  }
  
  
  if (monthlySalary !== previousRecord.monthlySalary) {
    updatedFields.monthlySalary = {
      previousValue: previousRecord.monthlySalary,
      updatedValue: monthlySalary,
    };
    console.log("Previous monthlySalary:", previousRecord.monthlySalary);
    console.log("Updated monthlySalary:", monthlySalary); 
    const category = "Basic Salary";
    const field = "monthlySalary";

    const modifier = fullName;
    
    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ?, `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, monthlySalary, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.monthlySalary, monthlySalary, modifier, dateOfEffectivity],
     
          );
        }
      }
    })
    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.monthlySalary, monthlySalary, modifier, dateOfEffectivity],
 
    //   );
  }
  
  if (posPe !== previousRecord.pPEPoint) {
    updatedFields.pPEPoint = {
      previousValue: previousRecord.pPEPoint,
      updatedValue: posPe,
    };
    console.log("Previous pPEPoint:", previousRecord.pPEPoint);
    console.log("Updated pPEPoint:", posPe);
    const category = "Position";
    const field = "pPEPoint";

    const modifier = fullName;
    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ?, `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, posPe, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.pPEPoint, posPe, modifier, dateOfEffectivity],
     
          );
        }
      }
    })
    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.pPEPoint, posPe, modifier, dateOfEffectivity],
 
    //   );
  }
  
  if (posAllowance !== previousRecord.pAllowance) {
    updatedFields.pAllowance = {
      previousValue: previousRecord.pAllowance,
      updatedValue: posAllowance,
    };
    console.log("Previous pAllowance:", previousRecord.pAllowance);
    console.log("Updated pAllowance:", posAllowance);
    const category = "Position";
    const field = "pAllowance";

    const modifier = fullName;

    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ?, `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, posAllowance, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.pAllowance, posAllowance, modifier, dateOfEffectivity],
     
          );
        }
      }
    })
    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.pAllowance, posAllowance, modifier, dateOfEffectivity],
 
    //   );
  }
  
  if (posRank !== previousRecord.pRank) {
    updatedFields.pRank = {
      previousValue: previousRecord.pRank,
      updatedValue: posRank,
    };
    console.log("Previous pRank:", previousRecord.pRank);
    console.log("Updated pRank:", posRank);
    const category = "Position";
    const field = "pRank";

    const modifier = fullName;

    db.query("SELECT * FROM `history` WHERE `employeeId` = ? and `dateOfEffectivity` = ?  and `category` = ? and `field` = ? ", [empNumber, dateOfEffectivity, category, field], (err, rows) => {
      if (err) {
        res.send({ err: err });
        return;
      } else {
        if (rows.length > 0) {
          db.query(
            "UPDATE `history` SET `dateModified` = ?, `hr_to`=?,`modifier`=? WHERE `id` = ?",
            [dateModified, posRank, modifier, rows[0].id],
     
          );
        }
        else{
          db.query(
            "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
            [empNumber, dateModified, category, field, previousRecord.pRank, posRank, modifier, dateOfEffectivity],
     
          );
        }
      }
    })

    // db.query(
    //     "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`, `dateOfEffectivity`) VALUES (?,?,?,?,?,?,?,?)",
    //     [empNumber, dateModified, category, field, previousRecord.pRank, posRank, modifier, dateOfEffectivity],
 
    //   );
  }
  
  
            // Add other fields here...
            
            // Perform the update query
            if(from === "import"){
              db.query(
                "UPDATE `salaryincrease` SET  `level`=?, `basicSalary`=?, `daily`=?, `monthlySalary`=?, `pPEPoint`=?, `pAllowance`=?, `pRank`=? WHERE `id` = ?",
                [ level, basicSalary, daily, monthlySalary, posPe, posAllowance, posRank, id],
                (err, result) => {
                  if (err) {
                    res.send({ err: err });
                    return; 
  
                  } else {
                    if (result.affectedRows > 0) {
                      res.send({ message: "Data updated successfully", updatedFields: updatedFields });
                    return;
                    } else {
                      res.send({ message: "No matching record found" });
                    return;
                    }
                  }
                }
              );
            }
            else{
            db.query(
              "UPDATE `salaryincrease` SET `department`=?, `section`=?, `employeeName`=?, `sex`=?, `birthday`=?, `age`=?, `empNo`=?, `dateHired`=?, `serviceTerm`=?, `position`=?, `designation`=?, `class`=?, `level`=?, `salaryType`=?, `basicSalary`=?, `daily`=?, `monthlySalary`=?, `pPEPoint`=?, `pAllowance`=?, `pRank`=?, `tsPEPoint`=?, `tsAllowance`=?, `tsRank`=?, `leLicenseFee`=?, `lePEPoint`=?, `leAllowance`=?, `leRank`=?, `ceCertificateOnFee`=?, `cePEPoint`=?, `ceAllowance`=?, `ceRank`=?, `Specialization`=? WHERE `id` = ?",
              [department, section, empName, sex, birthday, age, empNumber, dateHired, serviceTerm, position, designation, empClass, level, salary, basicSalary, daily, monthlySalary, posPe, posAllowance, posRank, tsPEPoint, tsAllowance, tsRank, leLicenseFee, lePEPoint, leAllowance, leRank, ceCertificateOnFee, cePEPoint, ceAllowance, ceRank, Specialization, id],
              (err, result) => {
                if (err) {
                  res.send({ err: err });
                  return;

                } else {
                  if (result.affectedRows > 0) {
                    res.send({ message: "Data updated successfully", updatedFields: updatedFields });
                  return;
                  } else {
                    res.send({ message: "No matching record found" });
                  return;
                  }
                }
              }
            );
          }
          } else {
            res.send({ message: "No matching record found" });
            return;
          }
        }
      });
});


app.get("/siadmin",(req, res)=>{
    db.query("SELECT * FROM `salaryincrease`", (err, rows, fields)=>{
        if(!err)
        {
        res.send(rows);
        return;
        } else {
            console.log(err);
        }
    })
});


app.use('/',express.static(path.join(__dirname, 'public')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(process.env.PORT, () =>{
    console.log('running on port 3001');
})