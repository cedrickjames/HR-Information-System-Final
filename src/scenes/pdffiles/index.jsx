import  React,  { useEffect, useState }  from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Font} from '@react-pdf/renderer';
import '../../../node_modules/flowbite/dist/flowbite.css';
import ArialBold from '../../assets/fonts/ARLRDBD.TTF'
import Axios from "axios";

function createData(empNo, department, section, name, sex, birthday, age, dateHired, serviceTerm, position, designation, empClass, level, salaryType, basicSalary, daily, monthlySalary, pPEPoint, pAllowance, pRank,tsPEPoint, tsAllowance, tsRank, leLicenseFee, lePEPoint, leAllowance, leRank, ceCertificateOnFee, cePEPoint, ceAllowance, ceRank, Specialization, total, newEmployeeName,newEmpNo,newDateHired,newSection,newDepartment,newPosition,newDesignation,newClass,newLevel,newSalaryType,newBasicSalary,newPAllowance,newSpecialization,newLEAllowance,newCEAllowance) {
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
    ceCertificateOnFee,
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
    newCEAllowance

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
const items = ['item1', 'item2', 'item3'];

const PDFDocument = () =>  {
  const [documentName, setDocumentName] = useState('Salary Increase.pdf');
  const [rows, setRows] = useState([]);
  // console.log(employeeid);
  useEffect(() => {


      Axios.post("http://192.168.60.53:3001/beforeData", {
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
            row.ceCertificateOnFee,
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
            row.newCEAllowance
        

            ));
          setRows(newRows);
        });
    }, []);

return(
  <PDFViewer  style={{ width: '100%', height: '100vh',backgroundColor:'white' }}>
    <Document title="Salary Increase" >
    <Page size="A4" style={styles.page}> 

      <View style={styles.section}>
      <>
      {/* Other JSX code */}
      {rows.map((item, index) => {
        if(item.section===""){item.section="-"}
        if(item.newSection===""){item.newSection="-"}

        if(item.department===""){item.department="-"}
        if(item.position===""){item.position="-"}
        if(item.newPosition===""){item.newPosition="-"}
        if(item.position===""){item.position="-"}
        if(item.designation===""){item.designation="-"}
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

        

        if (index % 2 === 1) { // Check if index is odd
          return (
            <View>
             

                 <Text style={styles.header} >GLORY (PHILIPPINES), INC.</Text>
        <Text style={styles.header2}>Administration Department / HR Section</Text>
        <Text style={styles.header}>PERSONNEL ACTION FORM</Text>
        <Text style={styles.header2}>PAF01PM02-08-121120</Text>
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
            <Text style={styles.tableCell}>December 30, 2022</Text> 
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
            <Text style={styles.tableCell}>{item.basicSalary}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newBasicSalary}</Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}POSITION ALLOWANCE(per month):</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.pAllowance}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newPAllowance}</Text> 
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
            <Text style={styles.tableCell}>{item.Specialization}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newSpecialization}</Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft1}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}LICENSURE                                                     : </Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.leAllowance}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newLEAllowance}</Text> 
          </View> 
          
        </View> 
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft1}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}CERTIFICATION                                    :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.ceAllowance}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newCEAllowance}</Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>A. NATURE OF ACTION                                 :</Text>  
          </View> 
          
          <View style={styles.tableCol2Wage}> 
            <Text style={styles.header}>Wage Increase</Text> 
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
        
        
          );
        } 
        else if(index === 0 || index % 2 === 0){
          
          return (
            <View>
             

                 <Text style={styles.header} >GLORY (PHILIPPINES), INC.</Text>
        <Text style={styles.header2}>Administration Department / HR Section</Text>
        <Text style={styles.header}>PERSONNEL ACTION FORM</Text>
        <Text style={styles.header2}>PAF01PM02-08-121120</Text>
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
            <Text style={styles.tableCell}>December 30, 2022</Text> 
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
            <Text style={styles.tableCell}>{item.basicSalary}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newBasicSalary}</Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}POSITION ALLOWANCE(per month):</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.pAllowance}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newPAllowance}</Text> 
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
            <Text style={styles.tableCell}>{item.Specialization}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newSpecialization}</Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft1}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}LICENSURE                                                     : </Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.leAllowance}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newLEAllowance}</Text> 
          </View> 
          
        </View> 
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft1}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}CERTIFICATION                                    :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.ceAllowance}</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>{item.newCEAllowance}</Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>A. NATURE OF ACTION                                 :</Text>  
          </View> 
          
          <View style={styles.tableCol2Wage}> 
            <Text style={styles.header}>Wage Increase</Text> 
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
        
        
          );
        }
  
        
      })}
      {/* Other JSX code */}
    </>
     
           
      </View>






      
    </Page>
    
  </Document>
  </PDFViewer>
)
    };

export default PDFDocument;
