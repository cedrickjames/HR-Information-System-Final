import  React,  { useEffect, useState }  from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Font} from '@react-pdf/renderer';
import '../../../node_modules/flowbite/dist/flowbite.css';
import ArialBold from '../../assets/fonts/ARLRDBD.TTF'
import Axios from "axios";
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
function createData(empNo, department, section, name, sex, birthday, age, dateHired, serviceTerm, position, designation, empClass, level, salaryType, basicSalary, daily, monthlySalary, pPEPoint, pAllowance, pRank,tsPEPoint, tsAllowance, tsRank, leLicenseFee, lePEPoint, leAllowance, leRank, ceLicenseFee, cePEPoint, ceAllowance, ceRank, Specialization, total, newEmployeeName,newEmpNo,newDateHired,newSection,newDepartment,newPosition,newDesignation,newClass,newLevel,newSalaryType,newBasicSalary,newPAllowance,newSpecialization,newLEAllowance,newCEAllowance,newleLicenseFee,newceCertificateOnFee) {
  return {
    empNo,
    department,
    section,
    name,
    sex,
    birthday,
    age,
    dateHired,
    serviceTerm,
    position,
    designation,
    empClass,
    level,
    salaryType,
    basicSalary,
    daily,
    monthlySalary,
    pPEPoint,
    pAllowance,
    pRank,
    tsPEPoint,
    tsAllowance, 
    tsRank,
    leLicenseFee, 
    lePEPoint,
    leAllowance, 
    leRank,
    ceLicenseFee,
    cePEPoint, 
    ceAllowance, 
    ceRank, 
    Specialization,
    total,
    newEmployeeName,
    newEmpNo,
    newDateHired,
    newSection,
    newDepartment,
    newPosition,
    newDesignation,
    newClass,
    newLevel,
    newSalaryType,
    newBasicSalary,
    newPAllowance,
    newSpecialization,
    newLEAllowance,
    newCEAllowance,
    newleLicenseFee,
    newceCertificateOnFee

  };
}

Font.register({ family: 'Arial-Bold', src: ArialBold });
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#0000',
    fontSize: '11px'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  header:{
    textAlign: "center",
    margin: 0,
    fontFamily: 'Arial-Bold',
    fontSize: '10px'
  },
    header2:{
    textAlign: "center",
    margin: 0,
    fontWeight: "bold",
    fontSize: '10px'

  },
  underline:{
    textAlign: "center",
    margin: 0,
    fontWeight: "bold",
    fontSize: '10px',
    textDecoration: 'underline',

  },
  table: { 
    display: "table", 
    width: "auto", 
    borderStyle: "solid", 
    borderWidth: 0, 
    borderRightWidth: 0, 
    borderBottomWidth: 0 
  }, 
  tableRow: { 
    margin: "0", 
    flexDirection: "row",
    padding:0,
  }, 
  tableRowFT: { 
    margin: "0", 
    marginTop: "10px",
    flexDirection: "row" 
  }, 
  tableCol1: { 
    width: "25%", 
    borderStyle: "solid", 
    borderWidth: 0, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  }, 
  tableCol1Effect: { 
    width: "25%", 
    borderStyle: "solid", 
    borderWidth: 0, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
    padding: '8px'
  }, 
  tableColLine1: { 
    width: "25%", 
    borderStyle: "solid", 
    borderWidth: 0, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
    borderBottomWidth:1
  }, 
  tableColLine1Effect: { 
    width: "25%", 
    borderStyle: "solid", 
    borderWidth: 0, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
    borderBottomWidth:1,
    padding: '8px'
  },
  tableCol: { 
    width: "33.33%", 
    borderStyle: "solid", 
    borderWidth: 0, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  }, 
  tableCol2: { 
    width: "33.33%", 
    borderStyle: "solid", 
    borderWidth: 0, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  }, 
  tableCol3: { 
    width: "43.33%", 
    borderStyle: "solid", 
    borderWidth: 0, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  },
  tableColTest: { 
    width: "33.33%", 
    borderStyle: "solid", 
    borderWidth: 1, 
  },
  tableColLine: { 
    width: "33.33%", 
    borderStyle: "solid", 
    borderWidth: 0, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
    borderBottomWidth:1,
    marginRight:"5px"
  }, 
  tableCol2Wage: { 
    width: "66.7%", 
    borderStyle: "solid", 
    borderWidth: 0, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
    borderBottomWidth:1,
    marginRight:"5px"
  }, 
  tableCell: { 
    margin: "auto", 
    fontSize: 10,
    padding:0,

  },
  tableCellLeft: {  
    fontSize: 10,
    textAlign: 'left',
  },
  tableCellLeft1: {  
    fontSize: 9,
    textAlign: 'left',
  },
  pagebreak:{
    breakAfter: 'always',
  }



});


const PDFDocument = () =>  {

  const [rows, setRows] = useState([]);
  const [dateEffect, setDateEffect] = useState();
  const [natureOfAction, setNatureOfAction] = useState();

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const [fullName, setFullName] = useState();
  const [userType, setUserType] = useState();

  useEffect(() => {
    const fullName = localStorage.getItem('fullName');
    const usertype = localStorage.getItem('usertype');

    setFullName(fullName)
    setUserType(usertype)



   
  }, []);
  console.log({userType});
  const location = useLocation();
  // console.log(employeeid);
  useEffect(() => {
    const customValue = location?.state?.customValue;
    const customValueDate = location?.state?.customValueDate;
    const inputValue = location?.state?.customValueAction;
    const customSelectedEmployees = location?.state?.customSelectedEmployees || [];

console.log(customSelectedEmployees);
if(customSelectedEmployees.length === 0){
console.log("walang laman")
}
    const formattedDate = new Date(customValueDate).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    setDateEffect(formattedDate);
    setNatureOfAction(inputValue);
    console.log(customValue.department);
    console.log(customValueDate);

      Axios.post("http://192.168.60.53:3001/beforeData", {
        department: customValue.department,
        selectedemployees: customSelectedEmployees,

        }).then((response) => {
           console.log(response)
          // console.log(response);(no,section, name, empnumber, position, designation, empClass, level, salary, basicSalary, daily, monthlySalary, pPEPoint, pAllowance, pRank) 
          const newRows = response.data.map(row => createData(
            row.employeeId,
            row.department,
            row.section,
            row.employeeName,
            row.sex,
            row.birthday,
            row.age,
            row.dateHired,
            row.serviceTerm,
            row.position,
            row.designation,
            row.class,
            row.level,
            row.salaryType,
            row.basicSalary,
            row.daily,
            row.monthlySalary,
            row.pPEPoint,
            row.pAllowance,
            row.pRank,
            row.tsPEPoint,
            row.tsAllowance,
            row.tsRank,
            row.leLicenseFee,
            row.lePEPoint,
            row.leAllowance,
            row.leRank,
            row.ceLicenseFee,
            row.cePEPoint,
            row.ceAllowance,
            row.ceRank,
            row.Specialization,
            row.total, 
            row.newEmployeeName,
            row.newEmpNo,
            row.newDateHired,
            row.newSection,
            row.newDepartment,
            row.newPosition,
            row.newDesignation,
            row.newClass,
            row.newLevel,
            row.newSalaryType,
            row.newBasicSalary,
            row.newPAllowance,
            row.newSpecialization,
            row.newLEAllowance,
            row.newCEAllowance,
            row.newleLicenseFee,
            row.newceCertificateOnFee

            ));
          setRows(newRows);
        });
    },  [location]);

return(
  
  <PDFViewer  style={{ width: '100%', height: '100vh',backgroundColor:'white' }}>
     <Helmet>
        <title>Administration</title>
      </Helmet>
    <Document title="Salary Increase" >
    <Page size="A4" style={styles.page}> 

      <View style={styles.section}>
      
      {/* Other JSX code */}
      {rows.map((item, index) => {
        if(item.section===""){item.section="-"}
        if(item.newSection===""){item.newSection="-"}

        if(item.department===""){item.department="-"}
        if(item.position===""){item.position="-"}
        if(item.newPosition===""){item.newPosition="-"}
        if(item.position===""){item.position="-"}
        if(item.designation===""){item.designation="-"}
        if(item.level===""){item.level="-"}
        if(item.newLevel===""){item.newLevel="-"}
        if(item.salaryType===""){item.salaryType="-"}
        if(item.newSalaryType===""){item.newSalaryType="-"}
        if(item.empClass===""){item.empClass="-"}
        if(item.newClass===""){item.newClass="-"}
        if(item.basicSalary===""){item.basicSalary="-"}
        if(item.newBasicSalary===""){item.newBasicSalary="-"}
        if(item.pAllowance===""){item.pAllowance="-"}
        if(item.newPAllowance===""){item.newPAllowance="-"}
        if(item.tsAllowance===""){item.tsAllowance="-"}
        if(item.leAllowance===""){item.leAllowance="-"}
        if(item.newLEAllowance===""){item.newLEAllowance="-"}
        if(item.ceAllowance===""){item.ceAllowance="-"}
        if(item.newCEAllowance===""){item.newCEAllowance="-"}
        if(item.Specialization===""){item.Specialization="-"}
        if(item.newSpecialization===""){item.newSpecialization="-"}
        if(item.leLicenseFee===""){item.leLicenseFee="-"}
        if(item.newleLicenseFee===""){item.newleLicenseFee="-"}
        if(item.ceLicenseFee===""){item.ceLicenseFee="-"}
        if(item.newceCertificateOnFee===""){item.newceCertificateOnFee="-"}
        

        
        if (index % 2 === 1) { // Check if index is odd
          console.log('userType:', userType);
console.log('item.empClass:', item.empClass);

          return (
            
            <View >
              {userType === 'user'? (
  !['M3', 'M4', 'M5', 'F1', 'F2'].includes(item.newClass) ? (
        <View >
                 <Text style={styles.header} >GLORY (PHILIPPINES), INC.</Text>
        <Text style={styles.header2}>Administration Department / HR Section</Text>
        <Text style={styles.header}>PERSONNEL ACTION FORM</Text>
        {/* <Text style={styles.header2}>PAF01WI14-09-051523</Text> */}
        <Text style={styles.header2}>PAF01<Text  style={styles.underline}>WI14</Text>-09-051523</Text>
        <View style={styles.table}> 
        <View style={styles.tableRow}> 
          <View style={styles.tableCol1}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          <View style={styles.tableCol1}> 
            <Text style={styles.tableCell}></Text> 
          </View>
          
          <View style={styles.tableCol1Effect}> 
            <Text style={styles.tableCell}>EFFECTIVITY DATE: </Text> 
          </View> 
          <View style={styles.tableColLine1Effect}> 
            <Text style={styles.tableCell}>{dateEffect}</Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>NAME OF EMPLOYEE                              :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newEmployeeName}</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>EMPLOYEE NO.                                        :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newEmpNo}</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>HIRING DATE                                           :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newDateHired}</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          
        </View>

        <View style={styles.tableRowFT}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}></Text>  
          </View> 
          
          
          <View style={styles.tableCol2}> 
            <Text style={styles.header}>FROM</Text> 
          </View> 
          <View style={styles.tableCol2}> 
            <Text style={styles.header}>TO</Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>A. SECTION                                                               :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.section}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newSection}</Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}>
            <Text style={styles.tableCellLeft}>B. DEPARTMENT                                                   :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.department}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newDepartment}</Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>C. POSITION LEVEL                                              :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.position}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newPosition}</Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>D. DESIGNATION                                                  :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.designation}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newDesignation}</Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>E. SALARY CLASS                                              :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.empClass}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newClass}</Text> 
          </View> 
          
        </View>

      
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>F. SALARY LEVEL                                              :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.level}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newLevel}</Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>G. SALARY TYPE                                              :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.salaryType}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newSalaryType}</Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>H. COMPENSATION & BENEFITS</Text>  
          </View> 
          
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}BASIC SALARY                                   :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
          {/* <Text style={styles.tableCell}>{item.basicSalary.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text> */}
          {/* <Text style={styles.tableCell}>{formatter.format(item.basicSalary)}</Text> */}
          <Text style={styles.tableCell}>{isNaN(item.basicSalary) ? item.basicSalary : formatter.format(item.basicSalary)}</Text>


          </View> 
          <View style={styles.tableColLine}> 
            {/* <Text style={styles.tableCell}>{item.newBasicSalary}</Text>  */}
            {/* <Text style={styles.tableCell}>{item.newBasicSalary.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text> */}
          {/* <Text style={styles.tableCell}>{formatter.format(item.newBasicSalary)}</Text> */}
          <Text style={styles.tableCell}>{isNaN(item.newBasicSalary) ? item.newBasicSalary : formatter.format(item.newBasicSalary)}</Text>

            
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}POSITION ALLOWANCE(per month):</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            {/* <Text style={styles.tableCell}>{item.pAllowance}</Text>  */}
          {/* <Text style={styles.tableCell}>{formatter.format(item.pAllowance)}</Text> */}
          <Text style={styles.tableCell}>{isNaN(item.pAllowance) ? item.pAllowance : formatter.format(item.pAllowance)}</Text>

          </View> 
          <View style={styles.tableColLine}> 
            {/* <Text style={styles.tableCell}>{item.newPAllowance}</Text>  */}
          {/* <Text style={styles.tableCell}>{formatter.format(item.newPAllowance)}</Text> */}
          <Text style={styles.tableCell}>{isNaN(item.newPAllowance) ? item.newPAllowance : formatter.format(item.newPAllowance)}</Text>

          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol3}> 
            <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}PROFESSIONAL ALLOWANCE (per month)</Text>  
          </View> 
          
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          
        </View>
        
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft1}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}SPECIALIZATION                                    :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            {/* <Text style={styles.tableCell}>{item.Specialization}</Text>  */}
          {/* <Text style={styles.tableCell}>{isNaN(item.Specialization) ? item.Specialization : formatter.format(item.Specialization)}</Text> */}
          <Text style={styles.tableCell}>{isNaN(item.Specialization) ? item.Specialization : formatter.format(item.Specialization)}</Text>
            
          </View> 
          <View style={styles.tableColLine}> 
          {/* <Text style={styles.tableCell}>{isNaN(item.Specialization) ? item.Specialization : formatter.format(item.newSpecialization)}</Text> */}
          <Text style={styles.tableCell}>{isNaN(item.newSpecialization) ? item.newSpecialization : formatter.format(item.newSpecialization)}</Text>

          
            {/* <Text style={styles.tableCell}>{item.newSpecialization}</Text>  */}
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft1}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}LICENSURE                                                     : </Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            {/* <Text style={styles.tableCell}>{item.leLicenseFee}</Text>  */}
          {/* <Text style={styles.tableCell}>{formatter.format(item.leLicenseFee)}</Text> */}
          {/* <Text style={styles.tableCell}>{isNaN(item.Specialization) ? item.leLicenseFee : formatter.format(item.leLicenseFee)}</Text> */}
          <Text style={styles.tableCell}>{isNaN(item.leLicenseFee) ? item.leLicenseFee : formatter.format(item.leLicenseFee)}</Text>

          </View> 
          <View style={styles.tableColLine}> 
          {/* <Text style={styles.tableCell}>{formatter.format(item.newleLicenseFee)}</Text> */}
          <Text style={styles.tableCell}>{isNaN(item.newleLicenseFee) ? item.newleLicenseFee : formatter.format(item.newleLicenseFee)}</Text>

            {/* <Text style={styles.tableCell}>{item.newleLicenseFee}</Text>  */}
          </View> 
          
        </View> 
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft1}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}CERTIFICATION                                    :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            {/* <Text style={styles.tableCell}>{item.ceLicenseFee}</Text>  */}
          {/* <Text style={styles.tableCell}>{formatter.format(item.ceLicenseFee)}</Text> */}
          <Text style={styles.tableCell}>{isNaN(item.ceLicenseFee) ? item.ceLicenseFee : formatter.format(item.ceLicenseFee)}</Text>


          </View> 
          <View style={styles.tableColLine}> 
          {/* <Text style={styles.tableCell}>{formatter.format(item.newceCertificateOnFee)}</Text> */}
          <Text style={styles.tableCell}>{isNaN(item.newceCertificateOnFee) ? item.newceCertificateOnFee : formatter.format(item.newceCertificateOnFee)}</Text>


            {/* <Text style={styles.tableCell}>{item.newceCertificateOnFee}</Text>  */}
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>A. NATURE OF ACTION                                 :</Text>  
          </View> 
          
          <View style={styles.tableCol2Wage}> 
            <Text style={styles.header}>{natureOfAction}</Text> 
          </View> 
          
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft1}>{'\n'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}Recommending Approval                                      :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{'\n'}{'\n'}{'\n'}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
        <View style={styles.tableCol}> 
            <Text style={styles.tableCell}></Text>  
          </View> 
          
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}>Administration Head</Text> 
          </View> 
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}>President</Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}Received by:</Text>  
          </View> 
          
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          
        </View>

        
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}Employee                                                :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}Date                                                    :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          
        </View>
        <Text style={styles.header} > {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}</Text>
        <Text style={styles.header} > {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}</Text>
        <Text style={styles.header} > {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}</Text>
        
        </View>
        </View>
         ) : (
          <View>
        </View>
         )
        ) : (
          <View >
          <Text style={styles.header} >GLORY (PHILIPPINES), INC.</Text>
 <Text style={styles.header2}>Administration Department / HR Section</Text>
 <Text style={styles.header}>PERSONNEL ACTION FORM</Text>
 {/* <Text style={styles.header2}>PAF01WI14-09-051523</Text> */}
 <Text style={styles.header2}>PAF01<Text  style={styles.underline}>WI14</Text>-09-051523</Text>
 <View style={styles.table}> 
 <View style={styles.tableRow}> 
   <View style={styles.tableCol1}> 
     <Text style={styles.tableCell}></Text> 
   </View> 
   <View style={styles.tableCol1}> 
     <Text style={styles.tableCell}></Text> 
   </View>
   
   <View style={styles.tableCol1Effect}> 
     <Text style={styles.tableCell}>EFFECTIVITY DATE: </Text> 
   </View> 
   <View style={styles.tableColLine1Effect}> 
     <Text style={styles.tableCell}>{dateEffect}</Text> 
   </View> 
   
 </View>
 <View style={styles.tableRow}> 
   <View style={styles.tableCol}> 
     <Text style={styles.tableCellLeft}>NAME OF EMPLOYEE                              :</Text>  
   </View> 
   
   <View style={styles.tableColLine}> 
     <Text style={styles.tableCell}>{item.newEmployeeName}</Text> 
   </View> 
   <View style={styles.tableCol}> 
     <Text style={styles.tableCell}></Text> 
   </View> 
   
 </View>

 <View style={styles.tableRow}> 
   <View style={styles.tableCol}> 
     <Text style={styles.tableCellLeft}>EMPLOYEE NO.                                        :</Text>  
   </View> 
   
   <View style={styles.tableColLine}> 
     <Text style={styles.tableCell}>{item.newEmpNo}</Text> 
   </View> 
   <View style={styles.tableCol}> 
     <Text style={styles.tableCell}></Text> 
   </View> 
   
 </View>

 <View style={styles.tableRow}> 
   <View style={styles.tableCol}> 
     <Text style={styles.tableCellLeft}>HIRING DATE                                           :</Text>  
   </View> 
   
   <View style={styles.tableColLine}> 
     <Text style={styles.tableCell}>{item.newDateHired}</Text> 
   </View> 
   <View style={styles.tableCol}> 
     <Text style={styles.tableCell}></Text> 
   </View> 
   
 </View>

 <View style={styles.tableRowFT}> 
   <View style={styles.tableCol}> 
     <Text style={styles.tableCellLeft}></Text>  
   </View> 
   
   
   <View style={styles.tableCol2}> 
     <Text style={styles.header}>FROM</Text> 
   </View> 
   <View style={styles.tableCol2}> 
     <Text style={styles.header}>TO</Text> 
   </View> 
   
 </View>

 <View style={styles.tableRow}> 
   <View style={styles.tableCol}> 
     <Text style={styles.tableCellLeft}>A. SECTION                                                               :</Text>  
   </View> 
   
   <View style={styles.tableColLine}> 
     <Text style={styles.tableCell}>{item.section}</Text> 
   </View> 
   <View style={styles.tableColLine}> 
     <Text style={styles.tableCell}>{item.newSection}</Text> 
   </View> 
   
 </View>
 <View style={styles.tableRow}> 
   <View style={styles.tableCol}>
     <Text style={styles.tableCellLeft}>B. DEPARTMENT                                                   :</Text>  
   </View> 
   
   <View style={styles.tableColLine}> 
     <Text style={styles.tableCell}>{item.department}</Text> 
   </View> 
   <View style={styles.tableColLine}> 
     <Text style={styles.tableCell}>{item.newDepartment}</Text> 
   </View> 
   
 </View>
 <View style={styles.tableRow}> 
   <View style={styles.tableCol}> 
     <Text style={styles.tableCellLeft}>C. POSITION LEVEL                                              :</Text>  
   </View> 
   
   <View style={styles.tableColLine}> 
     <Text style={styles.tableCell}>{item.position}</Text> 
   </View> 
   <View style={styles.tableColLine}> 
     <Text style={styles.tableCell}>{item.newPosition}</Text> 
   </View> 
   
 </View>

 <View style={styles.tableRow}> 
   <View style={styles.tableCol}> 
     <Text style={styles.tableCellLeft}>D. DESIGNATION                                                  :</Text>  
   </View> 
   
   <View style={styles.tableColLine}> 
     <Text style={styles.tableCell}>{item.designation}</Text> 
   </View> 
   <View style={styles.tableColLine}> 
     <Text style={styles.tableCell}>{item.newDesignation}</Text> 
   </View> 
   
 </View>
 <View style={styles.tableRow}> 
   <View style={styles.tableCol}> 
     <Text style={styles.tableCellLeft}>E. SALARY CLASS                                              :</Text>  
   </View> 
   
   <View style={styles.tableColLine}> 
     <Text style={styles.tableCell}>{item.empClass}</Text> 
   </View> 
   <View style={styles.tableColLine}> 
     <Text style={styles.tableCell}>{item.newClass}</Text> 
   </View> 
   
 </View>


 <View style={styles.tableRow}> 
   <View style={styles.tableCol}> 
     <Text style={styles.tableCellLeft}>F. SALARY LEVEL                                              :</Text>  
   </View> 
   
   <View style={styles.tableColLine}> 
     <Text style={styles.tableCell}>{item.level}</Text> 
   </View> 
   <View style={styles.tableColLine}> 
     <Text style={styles.tableCell}>{item.newLevel}</Text> 
   </View> 
   
 </View>

 <View style={styles.tableRow}> 
   <View style={styles.tableCol}> 
     <Text style={styles.tableCellLeft}>G. SALARY TYPE                                              :</Text>  
   </View> 
   
   <View style={styles.tableColLine}> 
     <Text style={styles.tableCell}>{item.salaryType}</Text> 
   </View> 
   <View style={styles.tableColLine}> 
     <Text style={styles.tableCell}>{item.newSalaryType}</Text> 
   </View> 
   
 </View>

 <View style={styles.tableRow}> 
   <View style={styles.tableCol}> 
     <Text style={styles.tableCellLeft}>H. COMPENSATION & BENEFITS</Text>  
   </View> 
   
   <View style={styles.tableCol2}> 
     <Text style={styles.tableCell}></Text> 
   </View> 
   <View style={styles.tableCol2}> 
     <Text style={styles.tableCell}></Text> 
   </View> 
   
 </View>
 <View style={styles.tableRow}> 
   <View style={styles.tableCol}> 
     <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}BASIC SALARY                                   :</Text>  
   </View> 
   
   <View style={styles.tableColLine}> 
   {/* <Text style={styles.tableCell}>{item.basicSalary.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text> */}
   {/* <Text style={styles.tableCell}>{formatter.format(item.basicSalary)}</Text> */}
   <Text style={styles.tableCell}>{isNaN(item.basicSalary) ? item.basicSalary : formatter.format(item.basicSalary)}</Text>


   </View> 
   <View style={styles.tableColLine}> 
     {/* <Text style={styles.tableCell}>{item.newBasicSalary}</Text>  */}
     {/* <Text style={styles.tableCell}>{item.newBasicSalary.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text> */}
   {/* <Text style={styles.tableCell}>{formatter.format(item.newBasicSalary)}</Text> */}
   <Text style={styles.tableCell}>{isNaN(item.newBasicSalary) ? item.newBasicSalary : formatter.format(item.newBasicSalary)}</Text>

     
   </View> 
   
 </View>
 <View style={styles.tableRow}> 
   <View style={styles.tableCol}> 
     <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}POSITION ALLOWANCE(per month):</Text>  
   </View> 
   
   <View style={styles.tableColLine}> 
     {/* <Text style={styles.tableCell}>{item.pAllowance}</Text>  */}
   {/* <Text style={styles.tableCell}>{formatter.format(item.pAllowance)}</Text> */}
   <Text style={styles.tableCell}>{isNaN(item.pAllowance) ? item.pAllowance : formatter.format(item.pAllowance)}</Text>

   </View> 
   <View style={styles.tableColLine}> 
     {/* <Text style={styles.tableCell}>{item.newPAllowance}</Text>  */}
   {/* <Text style={styles.tableCell}>{formatter.format(item.newPAllowance)}</Text> */}
   <Text style={styles.tableCell}>{isNaN(item.newPAllowance) ? item.newPAllowance : formatter.format(item.newPAllowance)}</Text>

   </View> 
   
 </View>

 <View style={styles.tableRow}> 
   <View style={styles.tableCol3}> 
     <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}PROFESSIONAL ALLOWANCE (per month)</Text>  
   </View> 
   
   <View style={styles.tableCol2}> 
     <Text style={styles.tableCell}></Text> 
   </View> 
   <View style={styles.tableCol2}> 
     <Text style={styles.tableCell}></Text> 
   </View> 
   
 </View>
 
 <View style={styles.tableRow}> 
   <View style={styles.tableCol}> 
     <Text style={styles.tableCellLeft1}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}SPECIALIZATION                                    :</Text>  
   </View> 
   
   <View style={styles.tableColLine}> 
     {/* <Text style={styles.tableCell}>{item.Specialization}</Text>  */}
   {/* <Text style={styles.tableCell}>{isNaN(item.Specialization) ? item.Specialization : formatter.format(item.Specialization)}</Text> */}
   <Text style={styles.tableCell}>{isNaN(item.Specialization) ? item.Specialization : formatter.format(item.Specialization)}</Text>
     
   </View> 
   <View style={styles.tableColLine}> 
   {/* <Text style={styles.tableCell}>{isNaN(item.Specialization) ? item.Specialization : formatter.format(item.newSpecialization)}</Text> */}
   <Text style={styles.tableCell}>{isNaN(item.newSpecialization) ? item.newSpecialization : formatter.format(item.newSpecialization)}</Text>

   
     {/* <Text style={styles.tableCell}>{item.newSpecialization}</Text>  */}
   </View> 
   
 </View>
 <View style={styles.tableRow}> 
   <View style={styles.tableCol}> 
     <Text style={styles.tableCellLeft1}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}LICENSURE                                                     : </Text>  
   </View> 
   
   <View style={styles.tableColLine}> 
     {/* <Text style={styles.tableCell}>{item.leLicenseFee}</Text>  */}
   {/* <Text style={styles.tableCell}>{formatter.format(item.leLicenseFee)}</Text> */}
   {/* <Text style={styles.tableCell}>{isNaN(item.Specialization) ? item.leLicenseFee : formatter.format(item.leLicenseFee)}</Text> */}
   <Text style={styles.tableCell}>{isNaN(item.leLicenseFee) ? item.leLicenseFee : formatter.format(item.leLicenseFee)}</Text>

   </View> 
   <View style={styles.tableColLine}> 
   {/* <Text style={styles.tableCell}>{formatter.format(item.newleLicenseFee)}</Text> */}
   <Text style={styles.tableCell}>{isNaN(item.newleLicenseFee) ? item.newleLicenseFee : formatter.format(item.newleLicenseFee)}</Text>

     {/* <Text style={styles.tableCell}>{item.newleLicenseFee}</Text>  */}
   </View> 
   
 </View> 
 <View style={styles.tableRow}> 
   <View style={styles.tableCol}> 
     <Text style={styles.tableCellLeft1}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}CERTIFICATION                                    :</Text>  
   </View> 
   
   <View style={styles.tableColLine}> 
     {/* <Text style={styles.tableCell}>{item.ceLicenseFee}</Text>  */}
   {/* <Text style={styles.tableCell}>{formatter.format(item.ceLicenseFee)}</Text> */}
   <Text style={styles.tableCell}>{isNaN(item.ceLicenseFee) ? item.ceLicenseFee : formatter.format(item.ceLicenseFee)}</Text>


   </View> 
   <View style={styles.tableColLine}> 
   {/* <Text style={styles.tableCell}>{formatter.format(item.newceCertificateOnFee)}</Text> */}
   <Text style={styles.tableCell}>{isNaN(item.newceCertificateOnFee) ? item.newceCertificateOnFee : formatter.format(item.newceCertificateOnFee)}</Text>


     {/* <Text style={styles.tableCell}>{item.newceCertificateOnFee}</Text>  */}
   </View> 
   
 </View>

 <View style={styles.tableRow}> 
   <View style={styles.tableCol}> 
     <Text style={styles.tableCellLeft}>A. NATURE OF ACTION                                 :</Text>  
   </View> 
   
   <View style={styles.tableCol2Wage}> 
     <Text style={styles.header}>{natureOfAction}</Text> 
   </View> 
   
   
 </View>

 <View style={styles.tableRow}> 
   <View style={styles.tableCol}> 
     <Text style={styles.tableCellLeft1}>{'\n'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}Recommending Approval                                      :</Text>  
   </View> 
   
   <View style={styles.tableColLine}> 
     <Text style={styles.tableCell}>{'\n'}{'\n'}{'\n'}</Text> 
   </View> 
   <View style={styles.tableColLine}> 
     <Text style={styles.tableCell}></Text> 
   </View> 
   
 </View>

 <View style={styles.tableRow}> 
 <View style={styles.tableCol}> 
     <Text style={styles.tableCell}></Text>  
   </View> 
   
   <View style={styles.tableCol2}> 
     <Text style={styles.tableCell}>Administration Head</Text> 
   </View> 
   <View style={styles.tableCol2}> 
     <Text style={styles.tableCell}>President</Text> 
   </View> 
   
 </View>

 <View style={styles.tableRow}> 
   <View style={styles.tableCol}> 
     <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}Received by:</Text>  
   </View> 
   
   <View style={styles.tableCol2}> 
     <Text style={styles.tableCell}></Text> 
   </View> 
   <View style={styles.tableCol2}> 
     <Text style={styles.tableCell}></Text> 
   </View> 
   
 </View>

 
 <View style={styles.tableRow}> 
   <View style={styles.tableCol}> 
     <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}Employee                                                :</Text>  
   </View> 
   
   <View style={styles.tableColLine}> 
     <Text style={styles.tableCell}></Text> 
   </View> 
   <View style={styles.tableCol2}> 
     <Text style={styles.tableCell}></Text> 
   </View> 
   
 </View>
 <View style={styles.tableRow}> 
   <View style={styles.tableCol}> 
     <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}Date                                                    :</Text>  
   </View> 
   
   <View style={styles.tableColLine}> 
     <Text style={styles.tableCell}></Text> 
   </View> 
   <View style={styles.tableCol2}> 
     <Text style={styles.tableCell}></Text> 
   </View> 
   
 </View>
 <Text style={styles.header} > {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}</Text>
 <Text style={styles.header} > {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}</Text>
 <Text style={styles.header} > {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}</Text>
 
 </View>
 </View> 
        
       
  )}
  {console.log(item.newClass)}
            </View>
        
        
          );
        } 
        else if(index === 0 || index % 2 === 0){
          
          return (
            
            <View>
           {userType === 'user' ? (
  !['M3', 'M4', 'M5', 'F1', 'F2'].includes(item.newClass) ? (
        <View>
             

                 <Text style={styles.header} >GLORY (PHILIPPINES), INC.</Text>
        <Text style={styles.header2}>Administration Department / HR Section</Text>
        <Text style={styles.header}>PERSONNEL ACTION FORM</Text>
        {/* <Text style={styles.header2}>PAF01PM02-08-121120</Text>
         */}
        <Text style={styles.header2}>PAF01<Text  style={styles.underline}>WI14</Text>-09-051523</Text>

        <View style={styles.table}> 
        <View style={styles.tableRow}> 
          <View style={styles.tableCol1}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          <View style={styles.tableCol1}> 
            <Text style={styles.tableCell}></Text> 
          </View>
          
          <View style={styles.tableCol1Effect}> 
            <Text style={styles.tableCell}>EFFECTIVITY DATE: </Text> 
          </View> 
          <View style={styles.tableColLine1Effect}> 
            <Text style={styles.tableCell}>{dateEffect}</Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>NAME OF EMPLOYEE                              :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newEmployeeName}</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>EMPLOYEE NO.                                        :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newEmpNo}</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>HIRING DATE                                           :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newDateHired}</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          
        </View>

        <View style={styles.tableRowFT}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}></Text>  
          </View> 
          
          
          <View style={styles.tableCol2}> 
            <Text style={styles.header}>FROM</Text> 
          </View> 
          <View style={styles.tableCol2}> 
            <Text style={styles.header}>TO</Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>A. SECTION                                                               :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.section}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newSection}</Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}>
            <Text style={styles.tableCellLeft}>B. DEPARTMENT                                                   :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.department}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newDepartment}</Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>C. POSITION LEVEL                                              :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.position}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newPosition}</Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>D. DESIGNATION                                                  :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.designation}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newDesignation}</Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>E. SALARY CLASS                                              :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.empClass}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newClass}</Text> 
          </View> 
          
        </View>

      
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>F. SALARY LEVEL                                              :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.level}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newLevel}</Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>G. SALARY TYPE                                              :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.salaryType}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newSalaryType}</Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>H. COMPENSATION & BENEFITS</Text>  
          </View> 
          
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}BASIC SALARY                                   :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            {/* <Text style={styles.tableCell}>{item.basicSalary}</Text>  */}
            {/* <Text style={styles.tableCell}>{formatter.format(item.basicSalary)}</Text> */}
          <Text style={styles.tableCell}>{isNaN(item.basicSalary) ? item.basicSalary : formatter.format(item.basicSalary)}</Text>

          </View> 
          <View style={styles.tableColLine}> 
            {/* <Text style={styles.tableCell}>{item.newBasicSalary}</Text>  */}
            {/* <Text style={styles.tableCell}>asd{item.newBasicSalary.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text> */}
            {/* <Text style={styles.tableCell}>{formatter.format(item.newBasicSalary)}</Text> */}
            <Text style={styles.tableCell}>{isNaN(item.newBasicSalary) ? item.newBasicSalary : formatter.format(item.newBasicSalary)}</Text>

          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}POSITION ALLOWANCE(per month):</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            {/* <Text style={styles.tableCell}>{item.pAllowance}</Text>  */}
            {/* <Text style={styles.tableCell}>{formatter.format(item.pAllowance)}</Text> */}
            <Text style={styles.tableCell}>{isNaN(item.pAllowance) ? item.pAllowance : formatter.format(item.pAllowance)}</Text>

          </View> 
          <View style={styles.tableColLine}> 
            {/* <Text style={styles.tableCell}>{item.newPAllowance}</Text>  */}
            {/* <Text style={styles.tableCell}>{formatter.format(item.newPAllowance)}</Text> */}
            <Text style={styles.tableCell}>{isNaN(item.newPAllowance) ? item.newPAllowance : formatter.format(item.newPAllowance)}</Text>
            
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol3}> 
            <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}PROFESSIONAL ALLOWANCE (per month)</Text>  
          </View> 
          
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          
        </View>
        
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft1}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}SPECIALIZATION                                    :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            {/* <Text style={styles.tableCell}>{item.Specialization}</Text>  */}
            {/* <Text style={styles.tableCell}>{formatter.format(item.Specialization)}</Text> */}
            <Text style={styles.tableCell}>{isNaN(item.Specialization) ? item.Specialization : formatter.format(item.Specialization)}</Text>

            
          </View> 
          <View style={styles.tableColLine}> 
            {/* <Text style={styles.tableCell}>{item.newSpecialization}</Text>  */}
            {/* <Text style={styles.tableCell}>{formatter.format(item.newSpecialization)}</Text> */}
            <Text style={styles.tableCell}>{isNaN(item.newSpecialization) ? item.newSpecialization : formatter.format(item.newSpecialization)}</Text>

          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft1}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}LICENSURE                                                     : </Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            {/* <Text style={styles.tableCell}>{item.leLicenseFee}</Text>  */}
            {/* <Text style={styles.tableCell}>{formatter.format(item.leLicenseFee)}</Text> */}
            <Text style={styles.tableCell}>{isNaN(item.leLicenseFee) ? item.leLicenseFee : formatter.format(item.leLicenseFee)}</Text>
            
          </View> 
          <View style={styles.tableColLine}> 
          {/* <Text style={styles.tableCell}>{formatter.format(item.newleLicenseFee)}</Text> */}
          <Text style={styles.tableCell}>{isNaN(item.newleLicenseFee) ? item.newleLicenseFee : formatter.format(item.newleLicenseFee)}</Text>

            {/* <Text style={styles.tableCell}>{item.newleLicenseFee}</Text>  */}
          </View> 
          
        </View> 
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft1}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}CERTIFICATION                                    :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            {/* <Text style={styles.tableCell}>{item.ceLicenseFee}</Text>  */}
          {/* <Text style={styles.tableCell}>{formatter.format(item.ceLicenseFee)}</Text> */}
          <Text style={styles.tableCell}>{isNaN(item.ceLicenseFee) ? item.ceLicenseFee : formatter.format(item.ceLicenseFee)}</Text>


          </View> 
          <View style={styles.tableColLine}> 
          {/* <Text style={styles.tableCell}>{formatter.format(item.newceCertificateOnFee)}</Text> */}
          <Text style={styles.tableCell}>{isNaN(item.newceCertificateOnFee) ? item.newceCertificateOnFee : formatter.format(item.newceCertificateOnFee)}</Text>

          
            {/* <Text style={styles.tableCell}>{item.newceCertificateOnFee}</Text>  */}
          </View>  
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>A. NATURE OF ACTION                                 :</Text>  
          </View> 
          
          <View style={styles.tableCol2Wage}> 
            <Text style={styles.header}>{natureOfAction}</Text> 
          </View> 
          
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft1}>{'\n'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}Recommending Approval                                      :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{'\n'}{'\n'}{'\n'}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
        <View style={styles.tableCol}> 
            <Text style={styles.tableCell}></Text>  
          </View> 
          
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}>Administration Head</Text> 
          </View> 
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}>President</Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}Received by:</Text>  
          </View> 
          
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          
        </View>

        
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}Employee                                                :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}Date                                                    :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          
          
        </View>
        <Text style={styles.header} > {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}</Text>
        <Text style={styles.header} > {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}</Text>
        </View>

        </View>
         ) : (
          <View>
      {/* Render content for other employees */}
    </View>
  )
          
  ) : (
    <View>
             

                 <Text style={styles.header} >GLORY (PHILIPPINES), INC.</Text>
        <Text style={styles.header2}>Administration Department / HR Section</Text>
        <Text style={styles.header}>PERSONNEL ACTION FORM</Text>
        {/* <Text style={styles.header2}>PAF01PM02-08-121120</Text>
         */}
        <Text style={styles.header2}>PAF01<Text  style={styles.underline}>WI14</Text>-09-051523</Text>

        <View style={styles.table}> 
        <View style={styles.tableRow}> 
          <View style={styles.tableCol1}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          <View style={styles.tableCol1}> 
            <Text style={styles.tableCell}></Text> 
          </View>
          
          <View style={styles.tableCol1Effect}> 
            <Text style={styles.tableCell}>EFFECTIVITY DATE: </Text> 
          </View> 
          <View style={styles.tableColLine1Effect}> 
            <Text style={styles.tableCell}>{dateEffect}</Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>NAME OF EMPLOYEE                              :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newEmployeeName}</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>EMPLOYEE NO.                                        :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newEmpNo}</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>HIRING DATE                                           :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newDateHired}</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          
        </View>

        <View style={styles.tableRowFT}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}></Text>  
          </View> 
          
          
          <View style={styles.tableCol2}> 
            <Text style={styles.header}>FROM</Text> 
          </View> 
          <View style={styles.tableCol2}> 
            <Text style={styles.header}>TO</Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>A. SECTION                                                               :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.section}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newSection}</Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}>
            <Text style={styles.tableCellLeft}>B. DEPARTMENT                                                   :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.department}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newDepartment}</Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>C. POSITION LEVEL                                              :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.position}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newPosition}</Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>D. DESIGNATION                                                  :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.designation}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newDesignation}</Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>E. SALARY CLASS                                              :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.empClass}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newClass}</Text> 
          </View> 
          
        </View>

      
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>F. SALARY LEVEL                                              :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.level}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newLevel}</Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>G. SALARY TYPE                                              :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.salaryType}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newSalaryType}</Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>H. COMPENSATION & BENEFITS</Text>  
          </View> 
          
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}BASIC SALARY                                   :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            {/* <Text style={styles.tableCell}>{item.basicSalary}</Text>  */}
            {/* <Text style={styles.tableCell}>{formatter.format(item.basicSalary)}</Text> */}
          <Text style={styles.tableCell}>{isNaN(item.basicSalary) ? item.basicSalary : formatter.format(item.basicSalary)}</Text>

          </View> 
          <View style={styles.tableColLine}> 
            {/* <Text style={styles.tableCell}>{item.newBasicSalary}</Text>  */}
            {/* <Text style={styles.tableCell}>asd{item.newBasicSalary.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text> */}
            {/* <Text style={styles.tableCell}>{formatter.format(item.newBasicSalary)}</Text> */}
            <Text style={styles.tableCell}>{isNaN(item.newBasicSalary) ? item.newBasicSalary : formatter.format(item.newBasicSalary)}</Text>

          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}POSITION ALLOWANCE(per month):</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            {/* <Text style={styles.tableCell}>{item.pAllowance}</Text>  */}
            {/* <Text style={styles.tableCell}>{formatter.format(item.pAllowance)}</Text> */}
            <Text style={styles.tableCell}>{isNaN(item.pAllowance) ? item.pAllowance : formatter.format(item.pAllowance)}</Text>

          </View> 
          <View style={styles.tableColLine}> 
            {/* <Text style={styles.tableCell}>{item.newPAllowance}</Text>  */}
            {/* <Text style={styles.tableCell}>{formatter.format(item.newPAllowance)}</Text> */}
            <Text style={styles.tableCell}>{isNaN(item.newPAllowance) ? item.newPAllowance : formatter.format(item.newPAllowance)}</Text>
            
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol3}> 
            <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}PROFESSIONAL ALLOWANCE (per month)</Text>  
          </View> 
          
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          
        </View>
        
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft1}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}SPECIALIZATION                                    :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            {/* <Text style={styles.tableCell}>{item.Specialization}</Text>  */}
            {/* <Text style={styles.tableCell}>{formatter.format(item.Specialization)}</Text> */}
            <Text style={styles.tableCell}>{isNaN(item.Specialization) ? item.Specialization : formatter.format(item.Specialization)}</Text>

            
          </View> 
          <View style={styles.tableColLine}> 
            {/* <Text style={styles.tableCell}>{item.newSpecialization}</Text>  */}
            {/* <Text style={styles.tableCell}>{formatter.format(item.newSpecialization)}</Text> */}
            <Text style={styles.tableCell}>{isNaN(item.newSpecialization) ? item.newSpecialization : formatter.format(item.newSpecialization)}</Text>

          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft1}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}LICENSURE                                                     : </Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            {/* <Text style={styles.tableCell}>{item.leLicenseFee}</Text>  */}
            {/* <Text style={styles.tableCell}>{formatter.format(item.leLicenseFee)}</Text> */}
            <Text style={styles.tableCell}>{isNaN(item.leLicenseFee) ? item.leLicenseFee : formatter.format(item.leLicenseFee)}</Text>
            
          </View> 
          <View style={styles.tableColLine}> 
          {/* <Text style={styles.tableCell}>{formatter.format(item.newleLicenseFee)}</Text> */}
          <Text style={styles.tableCell}>{isNaN(item.newleLicenseFee) ? item.newleLicenseFee : formatter.format(item.newleLicenseFee)}</Text>

            {/* <Text style={styles.tableCell}>{item.newleLicenseFee}</Text>  */}
          </View> 
          
        </View> 
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft1}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}CERTIFICATION                                    :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            {/* <Text style={styles.tableCell}>{item.ceLicenseFee}</Text>  */}
          {/* <Text style={styles.tableCell}>{formatter.format(item.ceLicenseFee)}</Text> */}
          <Text style={styles.tableCell}>{isNaN(item.ceLicenseFee) ? item.ceLicenseFee : formatter.format(item.ceLicenseFee)}</Text>


          </View> 
          <View style={styles.tableColLine}> 
          {/* <Text style={styles.tableCell}>{formatter.format(item.newceCertificateOnFee)}</Text> */}
          <Text style={styles.tableCell}>{isNaN(item.newceCertificateOnFee) ? item.newceCertificateOnFee : formatter.format(item.newceCertificateOnFee)}</Text>

          
            {/* <Text style={styles.tableCell}>{item.newceCertificateOnFee}</Text>  */}
          </View>  
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>A. NATURE OF ACTION                                 :</Text>  
          </View> 
          
          <View style={styles.tableCol2Wage}> 
            <Text style={styles.header}>{natureOfAction}</Text> 
          </View> 
          
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft1}>{'\n'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}Recommending Approval                                      :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{'\n'}{'\n'}{'\n'}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
        <View style={styles.tableCol}> 
            <Text style={styles.tableCell}></Text>  
          </View> 
          
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}>Administration Head</Text> 
          </View> 
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}>President</Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}Received by:</Text>  
          </View> 
          
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          
        </View>

        
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}Employee                                                :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}Date                                                    :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          <View style={styles.tableCol2}> 
            <Text style={styles.tableCell}></Text> 
          </View> 
          
          
        </View>
        <Text style={styles.header} > {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}</Text>
        <Text style={styles.header} > {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}</Text>
        </View>

        </View>
        
        )}

  {console.log(item.newClass)}

      </View>
    );
        }
  
        
      })}
      {/* Other JSX code */}
   
     
           
      </View>






      
    </Page>
    
  </Document>
  </PDFViewer>
)
    };

export default PDFDocument;
