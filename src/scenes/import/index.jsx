import React,  { useEffect, useState,  } from 'react';
import Papa from 'papaparse';
import Axios from "axios";



function CSVReader({ handleFile }) {
  const [file, setFile] = useState();

  const handleInputChange = (event) => {
    const files = event.target.files[0];
    setFile(files)

    // handleFile(file);
  };

  return (
    <div>
    <div class="p-6 flex-1 overflow-auto">
       <div class="space-y-6">
       {/* <CSVReader handleFile={handleFile} /> */}
      <input type="file" accept=".csv" onChange={handleInputChange} />

       </div>
     </div>
     <div class="flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600 border-t"><button
         type="button" onClick={()=> handleFile(file)}
         class=" bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-white border border-transparent hover:from-teal-500 hover:via-teal-400 hover:to-teal-400 hover:text-white focus:ring-4 focus:ring-cyan-300 disabled:hover:bg-cyan-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 dark:disabled:hover:bg-cyan-600 focus:!ring-2 group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg"><span
           class="flex items-center rounded-md text-sm px-4 py-2">Continue</span></button><button type="button"  
         class="text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-cyan-700 disabled:hover:bg-white focus:ring-cyan-700 focus:text-cyan-700 dark:bg-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-2 dark:disabled:hover:bg-gray-800 focus:!ring-2 group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg"><span
           class="flex items-center rounded-md text-sm px-4 py-2">Cancel</span></button></div>
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
const [d1, setD1] = React.useState();
const [d2, setD2] = React.useState();
const [d3, setD3] = React.useState();
const [m1, setM1] = React.useState();
const [m2, setM2] = React.useState();
const [m3, setM3] = React.useState();
const [m4, setM4] = React.useState();
const [m5, setM5] = React.useState();
const [f1, setF1] = React.useState();
const [f2, setF2] = React.useState();


const [d1L1, setD1L1] = React.useState();
const [d2L1, setD2L1] = React.useState();
const [d3L1, setD3L1] = React.useState();

const [m1L1, setM1L1] = React.useState();
const [m2L1, setM2L1] = React.useState();
const [m3L1, setM3L1] = React.useState();
const [m4L1, setM4L1] = React.useState();
const [m5L1, setM5L1] = React.useState();
const [f1L1, setF1L1] = React.useState();
const [f2L1, setF2L1] = React.useState();

const [workingDays, setWorkingDays] = React.useState();
const [posRank, setPosRank] = React.useState('');

const [SeniorManager, setSeniorManager] = React.useState([])
const [Manager, setManager] = React.useState([])
const [SeniorSupervisor, setSeniorSupervisor] = React.useState([])
const [Supervisor, setSupervisor] =  React.useState([])
const [AssistantSupervisor, setAssistantSupervisor] = React.useState([])
const [Leader, setLeader] = React.useState([])
const [SubLeader, setSubLeader] = React.useState([])

const [ProfessionalP5, setProfessionalP5] = React.useState([])
const [ProfessionalP4, setProfessionalP4] = React.useState([])
const [ProfessionalP3, setProfessionalP3] = React.useState([])
const [ProfessionalP2, setProfessionalP2] = React.useState([])
const [ProfessionalP1, setProfessionalP1] = React.useState([])
const [SpecialistS2, setSpecialistS2] = React.useState([])
const [SpecialistS1, setSpecialistS1] = React.useState([])

const [Lawyer, setLawyer] = React.useState([])
const [CPA, setCPA] = React.useState([])
const [RegisteredEngineer, setRegisteredEngineer] = React.useState([])
const [RegisteredNurse, setRegisteredNurse] = React.useState([])
const [LicensedCustomBroker, setLicensedCustomBroker] = React.useState([])
const [RegisteredMasterElectrician, setRegisteredMasterElectrician] = React.useState([])


const [JapaneseInterpreterJLPLevelN1, setJapaneseInterpreterJLPLevelN1] = React.useState([])
const [JapaneseInterpreterJLPLevelN2, setJapaneseInterpreterJLPLevelN2] = React.useState([])
const [JapaneseInterpreterJLPLevelN3, setJapaneseInterpreterJLPLevelN3] = React.useState([])
const [SafetyOfficer3OHSPractitioner, setSafetyOfficer3OHSPractitioner] = React.useState([])
const [SafetyOfficer2, setSafetyOfficer2] = React.useState([])
const [SafetyOfficer1, setSafetyOfficer1] = React.useState([])
const [EnergyConservationOfficer, setEnergyConservationOfficer] = React.useState([])
const [PollutionControlOfficer, setPollutionControlOfficer] = React.useState([])
const [RadiationSafetyOfficer, setRadiationSafetyOfficer] = React.useState([])

const [TechnicalStaff, setTechnicalStaff] = React.useState([])
const [CompanyDriverForkliftOperator, setCompanyDriverForkliftOperator] = React.useState([])	

const [Employeewithspecialexperience,setEmployeewithspecialexperience ]	= React.useState([])


  const[arrayOfProfAllowances, setarrayOfProfAllowances] = React.useState([]);
 
  useEffect(() => {
    //  console.log(arrayOfProfAllowances)
    Axios.post("http://192.168.60.53:3001/basicallowancesettings", {
    }).then((response) => {
      console.log(response);
      setD1(response.data.result[0].d1)
      setD2(response.data.result[0].d2)
      setD3(response.data.result[0].d3)
      setM1(response.data.result[0].m1)
        setM2(response.data.result[0].m2)
        setM3(response.data.result[0].m3)
        setM4(response.data.result[0].m4)
        setM5(response.data.result[0].m5)
        setF1(response.data.result[0].f1)
        setF2(response.data.result[0].f2)
        
      setD1L1(response.data.result[0].d1l1)
      setD2L1(response.data.result[0].d2l1)
      setD3L1(response.data.result[0].d3l1)
  
      setM1L1(response.data.result[0].m1l1)
      setM2L1(response.data.result[0].m2l1)
      setM3L1(response.data.result[0].m3l1)
      setM4L1(response.data.result[0].m4l1)
      setM5L1(response.data.result[0].m5l1)
      setF1L1(response.data.result[0].f1l1)
      setF2L1(response.data.result[0].f2l1)
    setWorkingDays(response.data.result[0].workingdays);
    
    
    });
       Axios.post("http://192.168.60.53:3001/allowancetable", {
    }).then((response) => {
      console.log([response.data.result[11].positionLevel,response.data.result[11].r1,response.data.result[11].r2,response.data.result[11].r3,response.data.result[11].r4,response.data.result[11].r5]);
    // console.log(EnergyConservationOfficer);
    setSeniorManager([response.data.result[0].positionLevel,response.data.result[0].r1,response.data.result[0].r2,response.data.result[0].r3,response.data.result[0].r4,response.data.result[0].r5]);
    setManager([response.data.result[1].positionLevel,response.data.result[1].r1,response.data.result[1].r2,response.data.result[1].r3,response.data.result[1].r4,response.data.result[1].r5]);
    setSeniorSupervisor([response.data.result[2].positionLevel,response.data.result[2].r1,response.data.result[2].r2,response.data.result[2].r3,response.data.result[2].r4,response.data.result[2].r5]);
    setSupervisor([response.data.result[3].positionLevel,response.data.result[3].r1,response.data.result[3].r2,response.data.result[3].r3,response.data.result[3].r4,response.data.result[3].r5]);
    setAssistantSupervisor([response.data.result[4].positionLevel,response.data.result[4].r1,response.data.result[4].r2,response.data.result[4].r3,response.data.result[4].r4,response.data.result[4].r5]);
    setLeader([response.data.result[5].positionLevel,response.data.result[5].r1,response.data.result[5].r2,response.data.result[5].r3,response.data.result[5].r4,response.data.result[5].r5]);
    setSubLeader([response.data.result[6].positionLevel,response.data.result[6].r1,response.data.result[6].r2,response.data.result[6].r3,response.data.result[6].r4,response.data.result[6].r5]);
    setProfessionalP5([response.data.result[7].positionLevel,response.data.result[7].r1,response.data.result[7].r2,response.data.result[7].r3,response.data.result[7].r4,response.data.result[7].r5]);
    setProfessionalP4([response.data.result[8].positionLevel,response.data.result[8].r1,response.data.result[8].r2,response.data.result[8].r3,response.data.result[8].r4,response.data.result[8].r5]);
    setProfessionalP3([response.data.result[9].positionLevel,response.data.result[9].r1,response.data.result[9].r2,response.data.result[9].r3,response.data.result[9].r4,response.data.result[9].r5]);
    setProfessionalP2([response.data.result[10].positionLevel,response.data.result[10].r1,response.data.result[10].r2,response.data.result[10].r3,response.data.result[10].r4,response.data.result[10].r5]);
    setProfessionalP1([response.data.result[11].positionLevel,response.data.result[11].r1,response.data.result[11].r2,response.data.result[11].r3,response.data.result[11].r4,response.data.result[11].r5]);
    setSpecialistS2([response.data.result[12].positionLevel,response.data.result[12].r1,response.data.result[12].r2,response.data.result[12].r3,response.data.result[12].r4,response.data.result[12].r5]);
    setSpecialistS1([response.data.result[13].positionLevel,response.data.result[13].r1,response.data.result[13].r2,response.data.result[13].r3,response.data.result[13].r4,response.data.result[13].r5]);
    setLawyer([response.data.result[14].positionLevel,response.data.result[14].r1,response.data.result[14].r2,response.data.result[14].r3,response.data.result[14].r4,response.data.result[14].r5]);
    setCPA([response.data.result[15].positionLevel,response.data.result[15].r1,response.data.result[15].r2,response.data.result[15].r3,response.data.result[15].r4,response.data.result[15].r5]);
    setRegisteredEngineer([response.data.result[16].positionLevel,response.data.result[16].r1,response.data.result[16].r2,response.data.result[16].r3,response.data.result[16].r4,response.data.result[16].r5]);
    setRegisteredNurse([response.data.result[17].positionLevel,response.data.result[17].r1,response.data.result[17].r2,response.data.result[17].r3,response.data.result[17].r4,response.data.result[17].r5]);
    setLicensedCustomBroker([response.data.result[18].positionLevel,response.data.result[18].r1,response.data.result[18].r2,response.data.result[18].r3,response.data.result[18].r4,response.data.result[18].r5]);
    setRegisteredMasterElectrician([response.data.result[19].positionLevel,response.data.result[19].r1,response.data.result[19].r2,response.data.result[19].r3,response.data.result[19].r4,response.data.result[19].r5]);
    setJapaneseInterpreterJLPLevelN1([response.data.result[20].positionLevel,response.data.result[20].r1,response.data.result[20].r2,response.data.result[20].r3,response.data.result[20].r4,response.data.result[20].r5]);
    setJapaneseInterpreterJLPLevelN2([response.data.result[21].positionLevel,response.data.result[21].r1,response.data.result[21].r2,response.data.result[21].r3,response.data.result[21].r4,response.data.result[21].r5]);
    setJapaneseInterpreterJLPLevelN3([response.data.result[22].positionLevel,response.data.result[22].r1,response.data.result[22].r2,response.data.result[22].r3,response.data.result[22].r4,response.data.result[22].r5]);
    setSafetyOfficer3OHSPractitioner([response.data.result[23].positionLevel,response.data.result[23].r1,response.data.result[23].r2,response.data.result[23].r3,response.data.result[23].r4,response.data.result[23].r5]);
    setSafetyOfficer2([response.data.result[24].positionLevel,response.data.result[24].r1,response.data.result[24].r2,response.data.result[24].r3,response.data.result[24].r4,response.data.result[24].r5]);
    setSafetyOfficer1([response.data.result[25].positionLevel,response.data.result[25].r1,response.data.result[25].r2,response.data.result[25].r3,response.data.result[25].r4,response.data.result[25].r5]);
    setEnergyConservationOfficer([response.data.result[26].positionLevel,response.data.result[26].r1,response.data.result[26].r2,response.data.result[26].r3,response.data.result[26].r4,response.data.result[26].r5]);
    setPollutionControlOfficer([response.data.result[27].positionLevel,response.data.result[27].r1,response.data.result[27].r2,response.data.result[27].r3,response.data.result[27].r4,response.data.result[27].r5]);
    setRadiationSafetyOfficer([response.data.result[28].positionLevel,response.data.result[28].r1,response.data.result[28].r2,response.data.result[28].r3,response.data.result[28].r4,response.data.result[28].r5]);
    setTechnicalStaff([response.data.result[29].positionLevel,response.data.result[29].r1,response.data.result[29].r2,response.data.result[29].r3,response.data.result[29].r4,response.data.result[29].r5]);
    setCompanyDriverForkliftOperator([response.data.result[30].positionLevel,response.data.result[30].r1,response.data.result[30].r2,response.data.result[30].r3,response.data.result[30].r4,response.data.result[30].r5]);
    setEmployeewithspecialexperience([response.data.result[31].positionLevel,response.data.result[31].r1,response.data.result[31].r2,response.data.result[31].r3,response.data.result[31].r4,response.data.result[31].r5]); 
    // setarrayOfProfAllowances([])
    setarrayOfProfAllowances([SeniorManager,Manager,SeniorSupervisor,Supervisor,AssistantSupervisor,Leader,SubLeader,ProfessionalP5,ProfessionalP4,ProfessionalP3,ProfessionalP2,ProfessionalP1,SpecialistS2,SpecialistS1,Lawyer,CPA,RegisteredEngineer,RegisteredNurse,LicensedCustomBroker,RegisteredMasterElectrician,JapaneseInterpreterJLPLevelN1,JapaneseInterpreterJLPLevelN2,JapaneseInterpreterJLPLevelN3,SafetyOfficer3OHSPractitioner,SafetyOfficer2,SafetyOfficer1,EnergyConservationOfficer,PollutionControlOfficer,RadiationSafetyOfficer,TechnicalStaff,CompanyDriverForkliftOperator,Employeewithspecialexperience])
    
    });
  
      return () => {
        // This code will run when the component is unmounted (clean up)
        // console.log(workingDays);
  
    // setarrayOfProfAllowances([SeniorManager,Manager,SeniorSupervisor,Supervisor,AssistantSupervisor,Leader,SubLeader,ProfessionalP5,ProfessionalP4,ProfessionalP3,ProfessionalP2,ProfessionalP1,SpecialistS2,SpecialistS1,Lawyer,CPA,RegisteredEngineer,RegisteredNurse,LicensedCustomBroker,RegisteredMasterElectrician,JapaneseInterpreterJLPLevelN1,JapaneseInterpreterJLPLevelN2,JapaneseInterpreterJLPLevelN3,SafetyOfficer3OHSPractitioner,SafetyOfficer2,SafetyOfficer1,EnergyConservationOfficer,PollutionControlOfficer,RadiationSafetyOfficer,TechnicalStaff,CompanyDriverForkliftOperator,Employeewithspecialexperience])
  
      };
    }, [d1,d2,d3]); // Passing an empty dependency array
  

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
      case "M1":
        setDaily((parseInt(level)-1)*m1+m1L1);
        setMonthlySalary( Math.round(((parseInt(level) - 1) * m1 + m1L1) * workingDays));
      break;
      case "M2":
      setDaily((parseInt(level)-1)*m2+m2L1);
      setMonthlySalary( Math.round(((parseInt(level) - 1) * m2 + m2L1) * workingDays));
      break;
      case "M3":
      setDaily((parseInt(level)-1)*m3+m3L1);
      setMonthlySalary( Math.round(((parseInt(level) - 1) * m3 + m3L1) * workingDays));
      break;
      case "M4":
      setDaily((parseInt(level)-1)*m4+m4L1);
      setMonthlySalary( Math.round(((parseInt(level) - 1) * m4 + m4L1) * workingDays));
      break;
      case "M5":
      setDaily((parseInt(level)-1)*m5+m5L1);
      setMonthlySalary( Math.round(((parseInt(level) - 1) * m5 + m5L1) * workingDays));
      break;
      case "F1":
        setDaily((parseInt(level)-1)*f1+f1L1);
        setMonthlySalary( Math.round(((parseInt(level) - 1) * f1 + f1L1) * workingDays));
        break;
        case "F2":
        setDaily((parseInt(level)-1)*f2+f2L1);
        setMonthlySalary( Math.round(((parseInt(level) - 1) * f2 + f2L1) * workingDays));
  
  
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
      <CSVReader handleFile={handleFile} />
    </div>
  );
}

export default ImportFile;
