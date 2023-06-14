
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

app.post("/beforeData", (req, res)=>{
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
  si.ceAllowance as newCEAllowance
 
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
        MIN(dateModified) AS maxDate
      FROM
        history
      GROUP BY
        employeeId
    ) subquery ON h1.employeeId = subquery.employeeId AND h1.dateModified = subquery.maxDate
  WHERE
    (h1.employeeId, h1.dateModified, h1.field, h1.id) IN (
      SELECT
        employeeId,
        dateModified,
        field,
        MAX(id)
      FROM
        history
      WHERE
        (employeeId, dateModified, field) IN (
          SELECT
            employeeId,
            dateModified,
            field
          FROM
            history
          GROUP BY
            employeeId,
            dateModified,
            field
          HAVING
            MAX(id) = MAX(CASE WHEN dateModified = subquery.maxDate THEN id END)
        )
      GROUP BY
        employeeId,
        dateModified,
        field
    )
) h ON si.empNo = h.employeeId
GROUP BY
  si.empNo
ORDER BY
  si.empNo;




  `;
  // const sqlSelect = ;
  db.query(
    query,
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
    
    const category = "Basic Information";
    const field = "department";

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
    
    const category = "Basic Information";
    const field = "section";

    const modifier = fullName;

    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.section, section, modifier],
 
      );
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

    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.employeeName, empName, modifier],
 
      );
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

    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.sex, sex, modifier],
 
      );
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

    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.birthday, birthday, modifier],
 
      );
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

    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.age, age, modifier],
 
      );
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

    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.empNo, empNumber, modifier],
 
      );
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

    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.dateHired, dateHired, modifier],
 
      );
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
  //       "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
  //       [empNumber, dateModified, category, field, previousRecord.serviceTerm, serviceTerm, modifier],
 
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

    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.position, position, modifier],
 
      );
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

    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.designation, designation, modifier],
 
      );
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

    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.class, empClass, modifier],
 
      );
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

    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.level, level, modifier],
 
      );
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

    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.salaryType, salary, modifier],
 
      );
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

    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.basicSalary, basicSalary, modifier],
 
      );
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
    const category = "Basic Salary";
    const field = "monthlySalary";

    const modifier = fullName;
    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.monthlySalary, monthlySalary, modifier],
 
      );
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
    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.pPEPoint, posPe, modifier],
 
      );
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
    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.pAllowance, posAllowance, modifier],
 
      );
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
    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.pRank, posRank, modifier],
 
      );
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
    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.tsPEPoint, tsPEPoint, modifier],
 
      );
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
    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.tsAllowance, tsAllowance, modifier],
 
      );
    
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
    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.tsRank, tsRank, modifier],
 
      );
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
    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.leLicenseFee, leLicenseFee, modifier],
 
      );
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
    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.lePEPoint, lePEPoint, modifier],
 
      );
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
    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.leAllowance, leAllowance, modifier],
 
      );
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
    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.leRank, leRank, modifier],
 
      );
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
    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.ceCertificateOnFee, ceCertificateOnFee, modifier],
 
      );
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
    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.cePEPoint, cePEPoint, modifier],
 
      );
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
    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.ceAllowance, ceAllowance, modifier],
 
      );
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
    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.ceRank, ceRank, modifier],
 
      );
  }
  
  if (Specialization !== previousRecord.Specialization) {
    updatedFields.Specialization = {
      previousValue: previousRecord.Specialization,
      updatedValue: Specialization,
    };
    console.log("Previous Specialization:", previousRecord.Specialization);
    console.log("Updated Specialization:", Specialization);
    const category = "Specialization";
    const field = "";

    const modifier = fullName;
    db.query(
        "INSERT INTO `history`(`employeeId`, `dateModified`, `category`, `field`, `hr_from`, `hr_to`, `modifier`) VALUES (?,?,?,?,?,?,?)",
        [empNumber, dateModified, category, field, previousRecord.Specialization, Specialization, modifier],
 
      );
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
app.use('/',express.static(path.join(__dirname, 'public')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(process.env.PORT, () =>{
    console.log('running on port 3001');
})