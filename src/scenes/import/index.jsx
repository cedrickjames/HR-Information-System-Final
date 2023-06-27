import React,  { useEffect, useState,  } from 'react';
import Papa from 'papaparse';
import Axios from "axios";
function CSVReader({ handleFile }) {
  const handleInputChange = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleInputChange} />
    </div>
  );
}


const ImportFile = (props ) => {
  const [fullName, setFullName] = useState();
  useEffect(() => {

    const fullName = localStorage.getItem('fullName');
    setFullName(fullName)

    const storedValue = localStorage.getItem('inputValue');
    if (storedValue) {
      setInputValue(storedValue);
    }
    const storedValueDate = localStorage.getItem('inputValueDate');
    if (storedValueDate) {
      setInputValueDate(storedValueDate);
    }
  }, []);
  const [inputValue, setInputValue] = useState('');
  const [inputValueDate, setInputValueDate] = useState('');

  const [finalResult, setFinalResult] = React.useState('');
const [levelUpPoints, setLevelUpPoints] = React.useState('');
const [levelbg, setLevel] = React.useState('');
const [empClass, setEmpClass] = React.useState('');
const [daily, setDaily] = React.useState('');
const [monthlySalary, setMonthlySalary] = React.useState('');
const [posRankbg, setPosRankbg] = React.useState('');
const [posAllowance, setPosAllowance] = React.useState('');

//VARIABLES WITH VALUES. 
const [d1, setD1] = React.useState(5.0);
const [d2, setD2] = React.useState(6.0);
const [d3, setD3] = React.useState(7.0);

const [d1L1, setD1L1] = React.useState(500);
const [d2L1, setD2L1] = React.useState(560);
const [d3L1, setD3L1] = React.useState(600);

const [workingDays, setWorkingDays] = React.useState(26.17);
const [posRank, setPosRank] = React.useState('');


const [SeniorManager, setSeniorManager] = React.useState(['Senior Manager', 21000, 22000, 23000, 24000, 25000])
const [Manager, setManager] = React.useState(['Manager', 16000, 17000, 18000, 19000, 20000])
const [SeniorSupervisor, setSeniorSupervisor] = React.useState(['Senior Supervisor', 11000, 12000, 13000, 14000, 15000])
const [Supervisor, setSupervisor] =  React.useState(['Supervisor ', 6000, 7000, 8000, 9000, 10000])
const [AssistantSupervisor, setAssistantSupervisor] = React.useState(['Assistant Supervisor', 5000, 5400, 5800, 6200, 5800])
const [Leader, setLeader] = React.useState(['Leader', 4000, 4200, 4400, 4600, 4800])
const [SubLeader, setSubLeader] = React.useState(['Sub Leader', 3000, 3200, 3400, 3600, 3800])

const [ProfessionalP5, setProfessionalP5]=React.useState(['Professional, P5', 21000, 22000, 23000, 24000, 25000])
const [ProfessionalP4, setProfessionalP4]=React.useState(['Professional, P4', 16000, 17000, 18000, 19000, 20000])
const [ProfessionalP3, setProfessionalP3]=React.useState(['Professional, P3', 11000, 12000, 13000, 14000, 15000])
const [ProfessionalP2, setProfessionalP2]=React.useState(['Professional, P2', 6000, 7000, 8000, 9000, 10000])
const [ProfessionalP1, setProfessionalP1]=React.useState(['Professional, P1', 5000, 5400, 5800, 6200, 5800])
const [SpecialistS2, setSpecialistS2]=React.useState(['Specialist, S2', 4000, 4200, 4400, 4600, 4800])
const [SpecialistS1, setSpecialistS1]=React.useState(['Specialist, S1', 3000, 3200, 3400, 3600, 3800])

const [Lawyer, setLawyer]=React.useState(['Lawyer', 4000, 8000, 12000, 15000, 20000])
const [CPA, setCPA]=React.useState(['CPA', 4000, 8000, 12000, 15000, 20000])
const [RegisteredEngineer, setRegisteredEngineer]=React.useState(['Registered Engineer (Engr.)', 4000, 5000, 6000, 7000, 8000])
const [RegisteredNurse, setRegisteredNurse]=React.useState(['Registered Nurse (RN)', 3000, 4000, 5000, 6000, 10000])
const [LicensedCustomBroker, setLicensedCustomBroker]=React.useState(['Licensed Custom Broker', 2000, 3000, 4000, 5000, 10000])
const [RegisteredMasterElectrician, setRegisteredMasterElectrician]=React.useState(['Registered Master Electrician', 1000, 1500, 2000, 2500, 5000])


const [JapaneseInterpreterJLPLevelN1, setJapaneseInterpreterJLPLevelN1]=React.useState(['Japanese Interpreter (JLP Level N1)', 1000, 2000, 3000, 4000, 5000])
const [JapaneseInterpreterJLPLevelN2, setJapaneseInterpreterJLPLevelN2]=React.useState(['Japanese Interpreter (JLP Level N2)', 1000, 2000, 3000, 4000, 5000])
const [JapaneseInterpreterJLPLevelN3, setJapaneseInterpreterJLPLevelN3]=React.useState(['Japanese Interpreter (JLP Level N3)', 1000, 2000, 3000, 4000, 5000])
const [SafetyOfficer3OHSPractitioner, setSafetyOfficer3OHSPractitioner]=React.useState(['Safety Officer 3 / OHS Practitioner (Certified)', 1000, 2000, 3000, 4000, 5000])
const [SafetyOfficer2, setSafetyOfficer2]=React.useState(['Safety Officer 2 (Certified)', 1000, 2000, 3000, 4000, 5000])
const [SafetyOfficer1, setSafetyOfficer1]=React.useState(['Safety Officer 1 (Certified)', 1000, 2000, 3000, 4000, 5000])
const [EnergyConservationOfficer, setEnergyConservationOfficer]=React.useState(['Energy Conservation Officer (Certified)', 1000, 2000, 3000, 4000, 5000])
const [PollutionControlOfficer, setPollutionControlOfficer]=React.useState(['Pollution Control Officer (Accredited)', 1000, 2000, 3000, 4000, 5000])
const [RadiationSafetyOfficer, setRadiationSafetyOfficer]=React.useState(['Radiation Safety Officer (Certified)', 1000, 2000, 3000, 4000, 5000])

const [TechnicalStaff, setTechnicalStaff]=React.useState(['Technical Staff (Certified by TESDA or GLORY LTD.)', 1000, 2000, 3000, 4000, 5000])
const [CompanyDriverForkliftOperator, setCompanyDriverForkliftOperator]=React.useState(['Company Driver/Forklift Operator', 1000, 2000, 3000, 4000, 5000])	

const [Employeewithspecialexperience,setEmployeewithspecialexperience ]	=React.useState(['Employee with special experience', 1000, 2000, 3000, 4000, 5000])


  const[arrayOfProfAllowances, setarrayOfProfAllowances] = React.useState([SeniorManager,Manager,SeniorSupervisor,Supervisor,AssistantSupervisor,Leader,SubLeader,ProfessionalP5,ProfessionalP4,ProfessionalP3,ProfessionalP2,ProfessionalP1,SpecialistS2,SpecialistS1,Lawyer,CPA,RegisteredEngineer,RegisteredNurse,LicensedCustomBroker,RegisteredMasterElectrician,JapaneseInterpreterJLPLevelN1,JapaneseInterpreterJLPLevelN2,JapaneseInterpreterJLPLevelN3,SafetyOfficer3OHSPractitioner,SafetyOfficer2,SafetyOfficer1,EnergyConservationOfficer,PollutionControlOfficer,RadiationSafetyOfficer,TechnicalStaff,CompanyDriverForkliftOperator,Employeewithspecialexperience]);


function finalresult(empNumber,employeeName,totalPoint, level, empclass, daily, monthlySalary, position, rank, salaryType, id, fullName){
  let levelset;
  let finalResult;
  let LevelUpPoints;
  let Daily;
  let MonthlySalary;
  let PosRank;
  let Allowance;
  let BasicSalary;
  console.log("before data: ", employeeName, "Level: ", level, "Class: ", empclass, "Daily: ", daily, "Monthly: ", monthlySalary )
  switch (true) {
    case (totalPoint > 0 && totalPoint <= 1.99):
      setFinalResult('P');
      finalResult = 'P';
      setLevelUpPoints('1');
      LevelUpPoints ='1';
  setLevel(parseInt(level)+1);

  levelset = parseInt(level)+1
     
      break;
    case (totalPoint > 1.99 && totalPoint <= 2.99):
      setFinalResult('F');
      finalResult = 'F';
      setLevelUpPoints('2');
      LevelUpPoints ='2';
      setLevel(parseInt(level)+2);


      levelset = parseInt(level)+2;

      break;
    case  (totalPoint > 2.99 && totalPoint <= 3.33):
      setFinalResult('S-');
      finalResult = 'S-';
      setLevelUpPoints('3');
      LevelUpPoints ='3';
      setLevel(parseInt(level)+3);

  levelset = parseInt(level)+3;

      break;
    case  (totalPoint > 3.33 && totalPoint <= 3.66):
      setFinalResult('S');
      finalResult = 'S';
      setLevelUpPoints('3');
      LevelUpPoints ='3';
      setLevel(parseInt(level)+3);

  levelset = parseInt(level)+3;

      break;
    case  (totalPoint > 3.66 && totalPoint <= 3.99):
      setFinalResult('S+');
      finalResult = 'S+';
      setLevelUpPoints('3');
      LevelUpPoints ='3';
      setLevel(parseInt(level)+3);

  levelset = parseInt(level)+3;

      break;
      case  (totalPoint > 3.99 && totalPoint <= 4.79):
        setFinalResult('G');
      finalResult = 'G';
      setLevelUpPoints('4');
      LevelUpPoints ='4';
        setLevel(parseInt(level)+4);

  levelset = parseInt(level)+4;

        break;
        case  (totalPoint > 4.79 && totalPoint <= 5.00):
          setFinalResult('E');
      finalResult = 'E';
      setLevelUpPoints('5');
      LevelUpPoints ='5';
          setLevel(parseInt(level)+5);

  levelset = parseInt(level)+5;

          break;
    default:
      finalResult = '';
      setFinalResult('');
      setLevelUpPoints('');
      setLevel(parseInt(level));
      levelset = parseInt(level);


  }
  console.log("After Input: ", employeeName, "Total Point: ", totalPoint, "Grade: ",  finalResult, "Level Up Points: ", LevelUpPoints, "New Level: ",  levelset);

//console.log((parseInt(levelset)-1)*d1+d1L1);

  switch (empclass) {
    case "D1":
setDaily((parseInt(levelset)-1)*d1+d1L1);
setMonthlySalary( Math.round(((parseInt(levelset) - 1) * d1 + d1L1) * workingDays));
Daily  = (parseInt(levelset)-1)*d1+d1L1;
MonthlySalary = Math.round(((parseInt(levelset) - 1) * d1 + d1L1) * workingDays);

      break;
    case "DM1":
setDaily((parseInt(levelset)-1)*d1+d1L1);
setMonthlySalary( Math.round(((parseInt(levelset) - 1) * d1 + d1L1) * workingDays));
Daily  = (parseInt(levelset)-1)*d1+d1L1;
MonthlySalary = Math.round(((parseInt(levelset) - 1) * d1 + d1L1) * workingDays);

      break;
    case "D2":
      setDaily((parseInt(levelset)-1)*d2+d2L1);
      setMonthlySalary( Math.round(((parseInt(levelset) - 1) * d2 + d2L1) * workingDays));
      Daily  = (parseInt(levelset)-1)*d2+d2L1;
      MonthlySalary = Math.round(((parseInt(levelset) - 1) * d2 + d2L1) * workingDays);
      break;
    case "DM2":
      setDaily((parseInt(levelset)-1)*d2+d2L1);
      setMonthlySalary( Math.round(((parseInt(levelset) - 1) * d2 + d2L1) * workingDays));
      Daily  = (parseInt(levelset)-1)*d2+d2L1;
      MonthlySalary = Math.round(((parseInt(levelset) - 1) * d2 + d2L1) * workingDays);
      break;
    case "D3":
      setDaily((parseInt(levelset)-1)*d3+d3L1);
      setMonthlySalary( Math.round(((parseInt(levelset) - 1) * d3 + d3L1) * workingDays));
      Daily  = (parseInt(levelset)-1)*d3+d3L1;
      MonthlySalary = Math.round(((parseInt(levelset) - 1) * d3 + d3L1) * workingDays);
      break;
      case "DM3":
        setDaily((parseInt(levelset)-1)*d3+d3L1);
        setMonthlySalary( Math.round(((parseInt(levelset) - 1) * d3 + d3L1) * workingDays));
        Daily  = (parseInt(levelset)-1)*d3+d3L1;
        MonthlySalary = Math.round(((parseInt(levelset) - 1) * d3 + d3L1) * workingDays);
      break;
    default:

  }
  
  console.log (employeeName, Daily, MonthlySalary)
if(salaryType==="Daily"){
  BasicSalary = Daily;
}
else{
  BasicSalary = MonthlySalary;

}
  if(totalPoint>=4 && (position !=="Staff" && position !=="Senior Staff" && position !=="Operator" && position !=="Senior Operator")){
console.log(position)

    setPosRank((isNaN(parseInt(rank)) ? 0 : parseInt(rank)) +1);
    PosRank = (isNaN(parseInt(rank)) ? 0 : parseInt(rank)) +1;
    let samplePosition = position;
   let sampleRank = (isNaN(parseInt(rank)) ? 0 : parseInt(rank)) +1;

  const allowancesArray = arrayOfProfAllowances.find(
    allowances => allowances[0] === samplePosition
  );
console.log(allowancesArray)
  
if (allowancesArray) {
  // If samplePosition is found in arrayOfProfAllowances
  const allowance = allowancesArray[parseInt(sampleRank, 10)];

  console.log('Allowance:', allowance);
  setPosAllowance(allowance)
  Allowance = allowance;
} else {
  console.log('samplePosition not found in arrayOfProfAllowances');
}
}

console.log(PosRank, Allowance )
 

Axios.post("http://192.168.60.53:3001/updatesirecord", {
  from: "import",
  id: id,
  daily: Daily,
  level :levelset, 
  basicSalary :BasicSalary, 
  monthlySalary :MonthlySalary, 
  posPe :totalPoint, 
  posAllowance :Allowance, 
  posRank :PosRank, 
  dateOfEffectivity: inputValueDate,
  empNumber : empNumber,
  fullName: fullName,
}).then((response) => {
  //console.log(response)
  
});



}
  const handleFile = (file) => {
    Papa.parse(file, {
      complete: (results) => {
        // console.log(results.data); // Display data in the console
                // Accessing and iterating over the data array using map
                results.data.map((row, index) => {
                  if(row.IDNumber !==undefined){

                  
                  console.log(row.IDNumber);
                  
    const totalPoint = Math.round(((  (isNaN(parseFloat(row.firsthalf)) ? 0 : parseFloat(row.firsthalf)) +   (isNaN(parseFloat(row.secondhalf)) ? 0 : parseFloat(row.secondhalf))) / 2) * 100) / 100;
    console.log(totalPoint);
    // Display each row in the console
                  Axios.post("http://192.168.60.53:3001/selectLatest", {
                    userid: row.IDNumber,
                    
                  }).then((response) => {
                    console.log(response.data.message)
                    if(response.data.message === 'Data found'){
                      console.log(response.data.result[0].Specialization)
                      setLevel(response.data.result[0].level)
                      setEmpClass(response.data.result[0].class);
                      setDaily(response.data.result[0].daily);
                      setMonthlySalary(response.data.result[0].monthlySalary);
                      let level = response.data.result[0].level;
                      let empclass = response.data.result[0].class;
                      let daily = response.data.result[0].daily;
                      let monthlySalary = response.data.result[0].monthlySalary;
                      let position = response.data.result[0].position;
                      let rank = response.data.result[0].pRank;
                      let employeeName = response.data.result[0].employeeName;
                      let salaryType = response.data.result[0].salaryType;
                      let id = response.data.result[0].id;
                      let empNumber = response.data.result[0].empNo;






                      finalresult(empNumber, employeeName, totalPoint, level, empclass, daily, monthlySalary, position, rank, salaryType, id, fullName);
                      
                    }
              
                  });
                }
                  // Perform any desired operations on each row here
                  return null; // Remember to include a return statement when using map
                });
      },
      header: true, // Set this to true if your CSV file has headers
    });
  };

  return (
    <div>
      <h1>CSV Reader</h1>
      <CSVReader handleFile={handleFile} />
      <h1> {levelbg}</h1>
    </div>
  );
}

export default ImportFile;
