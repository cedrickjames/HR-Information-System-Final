import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Font} from '@react-pdf/renderer';
import '../../../node_modules/flowbite/dist/flowbite.css';
import CourierBold from '../../assets/fonts/Courier BOLD.ttf'
import ArialBold from '../../assets/fonts/ARLRDBD.TTF'


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

const PDFDocument = () => (
  <PDFViewer style={{ width: '100%', height: '100vh',backgroundColor:'white' }}>
    <Document >
    <Page size="A4" style={styles.page}> 

      <View style={styles.section}>
      <>
      {/* Other JSX code */}
      {items.map((item, index) => {
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
            <Text style={styles.tableCell}>DELA CRUZ, JUANA</Text> 
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
            <Text style={styles.tableCell}>GP-22-722</Text> 
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
            <Text style={styles.tableCell}>November 06, 2018</Text> 
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
            <Text style={styles.tableCell}>-</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>-</Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}>
            <Text style={styles.tableCellLeft}>B. DEPARTMENT                                                   :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>Parts Inspection</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>Parts Inspection</Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>C. POSITION LEVEL                                              :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>Staff</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>Specialist S1</Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>D. DESIGNATION                                                  :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>Parts Inspection Staff</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>Parts Inspection Specialist</Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>E. SALARY CLASS                                              :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>D1</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>DM2</Text> 
          </View> 
          
        </View>

      
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>F. SALARY LEVEL                                              :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>8</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>1</Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>G. SALARY TYPE                                              :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>Monthly</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>Monthly</Text> 
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
            <Text style={styles.tableCell}>422.00</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>500.00</Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}POSITION ALLOWANCE(per month):</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>-</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>1000</Text> 
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
            <Text style={styles.tableCell}>-</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>3,000.00</Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft1}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}LICENSURE                                                     : </Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>-</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>4,000.00</Text> 
          </View> 
          
        </View> 
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft1}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}CERTIFICATION                                    :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>-</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>1,000.00</Text> 
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
            <Text style={styles.tableCell}>DELA CRUZ, JUANA</Text> 
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
            <Text style={styles.tableCell}>GP-22-722</Text> 
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
            <Text style={styles.tableCell}>November 06, 2018</Text> 
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
            <Text style={styles.tableCell}>-</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>-</Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}>
            <Text style={styles.tableCellLeft}>B. DEPARTMENT                                                   :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>Parts Inspection</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>Parts Inspection</Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>C. POSITION LEVEL                                              :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>Staff</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>Specialist S1</Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>D. DESIGNATION                                                  :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>Parts Inspection Staff</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>Parts Inspection Specialist</Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>E. SALARY CLASS                                              :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>D1</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>DM2</Text> 
          </View> 
          
        </View>

      
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>F. SALARY LEVEL                                              :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>8</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>1</Text> 
          </View> 
          
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>G. SALARY TYPE                                              :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>Monthly</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>Monthly</Text> 
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
            <Text style={styles.tableCell}>422.00</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>500.00</Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}POSITION ALLOWANCE(per month):</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>-</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>1000</Text> 
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
            <Text style={styles.tableCell}>-</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>3,000.00</Text> 
          </View> 
          
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft1}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}LICENSURE                                                     : </Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>-</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>4,000.00</Text> 
          </View> 
          
        </View> 
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellLeft1}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}CERTIFICATION                                    :</Text>  
          </View> 
          
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>-</Text> 
          </View> 
          <View style={styles.tableColLine}> 
            <Text style={styles.tableCell}>1,000.00</Text> 
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
  
);

export default PDFDocument;
