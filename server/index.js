
require('dotenv').config()
const express = require('express')
const cors = require("cors");
const app = express()
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
                return;
            }
                if(result.length > 0){
                    res.send(result)
                    return;
                }else{
                    res.send({message: "Wrong username/password combination!"});
                    return;
                     

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
                    res.send(result)
                }else{
                    res.send({message: "No Data Found"});
                    

                }
            
    //    console.log(err);
    });
});

app.post("/updatesirecord", (req, res)=>{
    const department = req.body.department;
    const daily = req.body.daily;
    const section = req.body.section;
    const id = req.body.id;  
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
    const serviceTerm = req.body.serviceTerm;
    const fullName = req.body.fullName;
console.log(id);


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
            
            // Check each field for updates
            const updatedFields = {};
            const dateModified = new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
if (department !== previousRecord.department) {
    updatedFields.department = {
      previousValue: previousRecord.department,
      updatedValue: department,
    };
    console.log("Previous department:", previousRecord.department);
    console.log("Updated department:", department);
    
    const category = "Salary Increase";
    const field = "Department";

    const modifier = fullName;

    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.department, department, modifier],
 
      );
  }
  
  if (section !== previousRecord.section) {
    updatedFields.section = {
      previousValue: previousRecord.section,
      updatedValue: section,
    };
    console.log("Previous section:", previousRecord.section);
    console.log("Updated section:", section);
  }
  
  if (empName !== previousRecord.employeeName) {
    updatedFields.employeeName = {
      previousValue: previousRecord.employeeName,
      updatedValue: empName,
    };
    console.log("Previous employeeName:", previousRecord.employeeName);
    console.log("Updated employeeName:", empName);
  }
  
  if (sex !== previousRecord.sex) {
    updatedFields.sex = {
      previousValue: previousRecord.sex,
      updatedValue: sex,
    };
    console.log("Previous sex:", previousRecord.sex);
    console.log("Updated sex:", sex);
  }
  
  if (birthday !== previousRecord.birthday) {
    updatedFields.birthday = {
      previousValue: previousRecord.birthday,
      updatedValue: birthday,
    };
    console.log("Previous birthday:", previousRecord.birthday);
    console.log("Updated birthday:", birthday);
  }
  
  if (age !== previousRecord.age) {
    updatedFields.age = {
      previousValue: previousRecord.age,
      updatedValue: age,
    };
    console.log("Previous age:", previousRecord.age);
    console.log("Updated age:", age);
  }
  
  if (empNumber !== previousRecord.empNo) {
    updatedFields.empNo = {
      previousValue: previousRecord.empNo,
      updatedValue: empNumber,
    };
    console.log("Previous empNo:", previousRecord.empNo);
    console.log("Updated empNo:", empNumber);
  }
  
  if (dateHired !== previousRecord.dateHired) {
    updatedFields.dateHired = {
      previousValue: previousRecord.dateHired,
      updatedValue: dateHired,
    };
    console.log("Previous dateHired:", previousRecord.dateHired);
    console.log("Updated dateHired:", dateHired);
  }
  
  if (serviceTerm !== previousRecord.serviceTerm) {
    updatedFields.serviceTerm = {
      previousValue: previousRecord.serviceTerm,
      updatedValue: serviceTerm,
    };
    console.log("Previous serviceTerm:", previousRecord.serviceTerm);
    console.log("Updated serviceTerm:", serviceTerm);
  }
  
  if (position !== previousRecord.position) {
    updatedFields.position = {
      previousValue: previousRecord.position,
      updatedValue: position,
    };
    console.log("Previous position:", previousRecord.position);
    console.log("Updated position:", position);
  }
  
  if (designation !== previousRecord.designation) {
    updatedFields.designation = {
      previousValue: previousRecord.designation,
      updatedValue: designation,
    };
    console.log("Previous designation:", previousRecord.designation);
    console.log("Updated designation:", designation);
  }
  
  if (empClass !== previousRecord.class) {
    updatedFields.class = {
      previousValue: previousRecord.class,
      updatedValue: empClass,
    };
    console.log("Previous class:", previousRecord.class);
    console.log("Updated class:", empClass);
  }
  
  if (level !== previousRecord.level) {
    updatedFields.level = {
      previousValue: previousRecord.level,
      updatedValue: level,
    };
    console.log("Previous level:", previousRecord.level);
    console.log("Updated level:", level);
  }
  
  if (salary !== previousRecord.salaryType) {
    updatedFields.salaryType = {
      previousValue: previousRecord.salaryType,
      updatedValue: salary,
    };
    console.log("Previous salaryType:", previousRecord.salaryType);
    console.log("Updated salaryType:", salary);
  }
  
  if (basicSalary !== previousRecord.basicSalary) {
    updatedFields.basicSalary = {
      previousValue: previousRecord.basicSalary,
      updatedValue: basicSalary,
    };
    console.log("Previous basicSalary:", previousRecord.basicSalary);
    console.log("Updated basicSalary:", basicSalary);
  }
  
  if (daily !== previousRecord.daily) {
    updatedFields.daily = {
      previousValue: previousRecord.daily,
      updatedValue: daily,
    };
    console.log("Previous daily:", previousRecord.daily);
    console.log("Updated daily:", daily);
    const category = "Salary Increase";
    const field = "Daily Salary";

    const modifier = "Cedrick James Orozo";
    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.daily, daily, modifier],
 
      );
  }
  
  if (monthlySalary !== previousRecord.monthlySalary) {
    updatedFields.monthlySalary = {
      previousValue: previousRecord.monthlySalary,
      updatedValue: monthlySalary,
    };
    console.log("Previous monthlySalary:", previousRecord.monthlySalary);
    console.log("Updated monthlySalary:", monthlySalary);
  }
  
  if (posPe !== previousRecord.pPEPoint) {
    updatedFields.pPEPoint = {
      previousValue: previousRecord.pPEPoint,
      updatedValue: posPe,
    };
    console.log("Previous pPEPoint:", previousRecord.pPEPoint);
    console.log("Updated pPEPoint:", posPe);
  }
  
  if (posAllowance !== previousRecord.pAllowance) {
    updatedFields.pAllowance = {
      previousValue: previousRecord.pAllowance,
      updatedValue: posAllowance,
    };
    console.log("Previous pAllowance:", previousRecord.pAllowance);
    console.log("Updated pAllowance:", posAllowance);
  }
  
  if (posRank !== previousRecord.pRank) {
    updatedFields.pRank = {
      previousValue: previousRecord.pRank,
      updatedValue: posRank,
    };
    console.log("Previous pRank:", previousRecord.pRank);
    console.log("Updated pRank:", posRank);
  }
  
  if (tsPEPoint !== previousRecord.tsPEPoint) {
    updatedFields.tsPEPoint = {
      previousValue: previousRecord.tsPEPoint,
      updatedValue: tsPEPoint,
    };
    console.log("Previous tsPEPoint:", previousRecord.tsPEPoint);
    console.log("Updated tsPEPoint:", tsPEPoint);
  }
  
  if (tsAllowance !== previousRecord.tsAllowance) {
    updatedFields.tsAllowance = {
      previousValue: previousRecord.tsAllowance,
      updatedValue: tsAllowance,
    };
    console.log("Previous tsAllowance:", previousRecord.tsAllowance);
    console.log("Updated tsAllowance:", tsAllowance);
  }
  
  if (tsRank !== previousRecord.tsRank) {
    updatedFields.tsRank = {
      previousValue: previousRecord.tsRank,
      updatedValue: tsRank,
    };
    console.log("Previous tsRank:", previousRecord.tsRank);
    console.log("Updated tsRank:", tsRank);
  }
  
  if (leLicenseFee !== previousRecord.leLicenseFee) {
    updatedFields.leLicenseFee = {
      previousValue: previousRecord.leLicenseFee,
      updatedValue: leLicenseFee,
    };
    console.log("Previous leLicenseFee:", previousRecord.leLicenseFee);
    console.log("Updated leLicenseFee:", leLicenseFee);
  }
  
  if (lePEPoint !== previousRecord.lePEPoint) {
    updatedFields.lePEPoint = {
      previousValue: previousRecord.lePEPoint,
      updatedValue: lePEPoint,
    };
    console.log("Previous lePEPoint:", previousRecord.lePEPoint);
    console.log("Updated lePEPoint:", lePEPoint);
  }
  
  if (leAllowance !== previousRecord.leAllowance) {
    updatedFields.leAllowance = {
      previousValue: previousRecord.leAllowance,
      updatedValue: leAllowance,
    };
    console.log("Previous leAllowance:", previousRecord.leAllowance);
    console.log("Updated leAllowance:", leAllowance);
  }
  
  if (leRank !== previousRecord.leRank) {
    updatedFields.leRank = {
      previousValue: previousRecord.leRank,
      updatedValue: leRank,
    };
    console.log("Previous leRank:", previousRecord.leRank);
    console.log("Updated leRank:", leRank);
  }
  
  if (ceCertificateOnFee !== previousRecord.ceCertificateOnFee) {
    updatedFields.ceCertificateOnFee = {
      previousValue: previousRecord.ceCertificateOnFee,
      updatedValue: ceCertificateOnFee,
    };
    console.log("Previous ceCertificateOnFee:", previousRecord.ceCertificateOnFee);
    console.log("Updated ceCertificateOnFee:", ceCertificateOnFee);
  }
  
  if (cePEPoint !== previousRecord.cePEPoint) {
    updatedFields.cePEPoint = {
      previousValue: previousRecord.cePEPoint,
      updatedValue: cePEPoint,
    };
    console.log("Previous cePEPoint:", previousRecord.cePEPoint);
    console.log("Updated cePEPoint:", cePEPoint);
  }
  
  if (ceAllowance !== previousRecord.ceAllowance) {
    updatedFields.ceAllowance = {
      previousValue: previousRecord.ceAllowance,
      updatedValue: ceAllowance,
    };
    console.log("Previous ceAllowance:", previousRecord.ceAllowance);
    console.log("Updated ceAllowance:", ceAllowance);
  }
  
  if (ceRank !== previousRecord.ceRank) {
    updatedFields.ceRank = {
      previousValue: previousRecord.ceRank,
      updatedValue: ceRank,
    };
    console.log("Previous ceRank:", previousRecord.ceRank);
    console.log("Updated ceRank:", ceRank);
  }
  
  if (Specialization !== previousRecord.Specialization) {
    updatedFields.Specialization = {
      previousValue: previousRecord.Specialization,
      updatedValue: Specialization,
    };
    console.log("Previous Specialization:", previousRecord.Specialization);
    console.log("Updated Specialization:", Specialization);
  }
            // Add other fields here...
            
            // Perform the update query
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

app.listen(process.env.PORT, () =>{
    console.log('running on port 3001');
})