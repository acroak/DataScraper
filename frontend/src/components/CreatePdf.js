/*
Component that allows the user to request a PDF to be generated 
after a historical report has been queried. 
The PDF displays all the information returned from the historical report.
*/

import * as React from 'react';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Provider, DefaultTheme as PaperTheme, Button, Text } from 'react-native-paper';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import removeFalseKitInfos from '../services/MultipleKitIdFix'
import ResultAdapter from '../services/MultipleKitIdFix';

/*
When grabbing a historical report by some values (KitId for example)
there can be more than one report grabbed at once. 

This function will sort the results into each report so we can sort them accordingly
*/
function sortIntoReports(result) {

    let correct_result
    //if searched by Report Id, and the kitId of returned report is shared between different reports,
    //all KitInfo JSONS with that kitId are in the result. Need to remove incorrect KitInfo Jsons
    if (result.length % 7 != 0) {
        correct_result = ResultAdapter(result);
    }
    else {
        correct_result = result
    }

    //Determine the number of reports
    let size = correct_result.length / 7

    //Create 2 Dimesional Array
    let returnArray = Array.from({ length: size }, () =>
        new Array(7).fill(0));

    let indexMod = 0;//Stores which report we are working on
    let reportNum = 0;//Stores which table we are on
    for (let i = 0; i < correct_result.length; i++) {
        indexMod = i % size;//Calculates which report we are on
        reportNum = Math.floor(i / size);//Calcualtes which table we're using
        returnArray[indexMod][reportNum] = correct_result[i];//Inputs into the 2D array
    }

    if (returnArray.length === 0) returnArray = null;

    return returnArray;
}


/*
 This component contains a button which triggers the grabReport() method. 
 grabReport() uses the get method based on reportID taken from the 
 checklist flow --> stringifyreport(reportArrays) takes that get data and turns it 
 into a large string -->generatePDF() takes that string and compiles the PDF

 repIdVal - integer ID for the filter to query the backend with
 filter - The filter is either a FilterOnKitId filter, or a FilteronReportId filter.
 Any class inheriting from ReportFilter.js can be used.

 returns the jsPDF
*/
const CreatePdf = ({ repIdVal, filter }) => {

    const [buttonPressed, setButtonPressed] = useState(false);

    const createReport = (arr) => {

        let reports = arr;

        // create a jsPDF object
        const generatePDF = () => {
            const pdf = new jsPDF({
                orientation: 'landscape', 
        });
            return pdf;
        };
    
        //   add data to a new table 
        const addTableToPDF = (pdf, data, columns, startY) => {
            
            pdf.autoTable({
              startY: startY || 20,
              head: [columns], // Header row
              body: data,
              headStyles: {
                fillColor: [37, 124, 82], // RGB color 
                textColor: 255,
                fontStyle: 'bold',
              },
              columnWidth: '15'
            });
        };
    
        // Sore the created jsPDF object
        const pdf = generatePDF();
        
        // Grab all relevant testing data from different reports
        //kit
        const tableHeaders0 = ['Kit Id', 'Phone Id', 'Left Sensor Id', "Right Sensor Id"]
        const tableData0 = [
        [reports[0].KitId, reports[0].PhoneId, reports[0].LeftSensorId, reports[0].RightSensorId]
        ];
        //report
        const tableHeaders1 = ['Date Tested', 'Tester', 'Last Known User']
        const tableData1 = [[reports[1].DateTested, reports[1].Tester, reports[1].LastKnownUser]]
        //"Phone Info"
        const tableHeaders2 = ["Phone Id", "Physical Damage", "Vol Button Func", "Power Button Func", "Charging Port", "SIM Card Func", "Mem Card Func", "Phone\nCase\nCondition", "Condition Of Cables", "Touch\nScreen\nFunction", "WiFi Func", "Bluetooth Func", "Cell Data Func", "Speaker Func"]
        const tableData2 = [[reports[2].PhoneId, reports[2].PhysicalDamage, reports[2].VolButtonFunc, reports[2].PowerButtonFunc, reports[2].ChargingPort, reports[2].SIMCardFunc, reports[2].MemCardFunc, reports[2].PhoneCaseCondition, reports[2].ConditionOfCables, reports[2].TouchScreenFunc, reports[2].WiFiFunc, reports[2].BluetoothFunc, reports[2].CellDataFunc, reports[2].SpeakerFunc]]
        //"Left Sensor";
        const tableHeaders3 = ["Left Sensor Id", "Physical Damage", "Connector Func", "Mounting Bracket", "Bluetooth Func", "Data Trans"]
        const tableData3 = [[reports[3].LeftSensorId, reports[3].PhysicalDamage, reports[3].ConnectorFunc, reports[3].MountingBrackets, reports[3].BluetoothFunc, reports[3].DataTrans]]
        //"Right Sensor";
        const tableHeaders4 = ["Right Sensor Id", "Physical Damage", "Connector Func", "Mounting Bracket", "Bluetooth Func", "Data Trans"]
        const tableData4 = [[reports[4].RightSensorId, reports[4].PhysicalDamage, reports[4].ConnectorFunc, reports[4].MountingBrackets, reports[4].BluetoothFunc, reports[4].DataTrans]]
        //"Headset Info";
        const tableHeaders5 = ["Physical Damage", "Connector Damage", "Audio Func\nLeft Channel", "Audio Func\nRight Channel", "Audio Quality", "Vol Button Func", "Power Button Func"]
        const tableData5 = [[reports[5].PhysicalDamage, reports[5].ConnectorDamage, reports[5].AudioFuncLeftChannel, reports[5].AudioFuncRightChannel, reports[5].AudioQuality, reports[5].VolButtonFunc, reports[5].PowerButtonFunc]]
        //"Hub Info";
        const tableHeaders6 = ["Physical Damage", "Condition Of Cables", "Charger Condition", "Hub Overheat"]
        const tableData6 = [[reports[6].PhysicalDamage, reports[6].ConditionOfCables, reports[6].ChargerCondition, reports[6].HubOverheat]]
        

        // Create Title of PDF
        pdf.text(`${filter.title}#: ${repIdVal}`, 10, 10);
        // Kit Info - Add subtitle for each table
        pdf.text('Kit Info', 8, 18);
        // add data and headers to new table
        addTableToPDF(pdf, tableData0, tableHeaders0, 20);
        // Report Info - Add subtitle for each table, finding y location by adding 8px to the bottom of the previous table
        pdf.text('Report Info', 8, pdf.autoTable.previous.finalY + 8);
        // add data and headers to new table, finding y location by adding 10px to bottom of previous table
        addTableToPDF(pdf, tableData1, tableHeaders1, pdf.autoTable.previous.finalY + 10);
        // Phone Info 
        pdf.text('Phone', 8, pdf.autoTable.previous.finalY + 8);
        addTableToPDF(pdf, tableData2, tableHeaders2, pdf.autoTable.previous.finalY + 10);
        // Left Sensor 
        pdf.text('Left Sensor', 8, pdf.autoTable.previous.finalY + 8);
        addTableToPDF(pdf, tableData3, tableHeaders3, pdf.autoTable.previous.finalY + 10);
        // Right Sensor 
        pdf.text('Right Sensor', 8, pdf.autoTable.previous.finalY + 8);
        addTableToPDF(pdf, tableData4, tableHeaders4, pdf.autoTable.previous.finalY + 10);
        // Headset 
        pdf.text('Headset', 8, pdf.autoTable.previous.finalY + 8);
        addTableToPDF(pdf, tableData5, tableHeaders5, pdf.autoTable.previous.finalY + 10);
        // Hub 
        pdf.text('Charging Hub', 8, pdf.autoTable.previous.finalY + 8);
        addTableToPDF(pdf, tableData6, tableHeaders6, pdf.autoTable.previous.finalY + 10);
    
        return pdf;
    }


    /*
    Triggers when the button is pressed, to create the PDF.
    The buttonPressed use state ensures that only one PDF is generated.
    */
    useEffect(() => {

        filter.apiGet(repIdVal)
            .then((values) => {
                let result = sortIntoReports(values);
                result.map((report) =>{
                   let genPDF = createReport(report);
                   if (genPDF && buttonPressed) {
                    genPDF.save('table.pdf');
                   }
                })
            })
            .catch((e) => {
                console.error(e);
            });

            setButtonPressed(false);

    }, [repIdVal, buttonPressed])


    return (
        <Provider theme={ChecklistTheme}>
            <View style={ChecklistTheme.buttonContainer}>
                <Button mode="contained" onPress={()=>{setButtonPressed(true)}} style={ChecklistTheme.blueButton} testID='generatePDFButton'>
                    <Text style={ChecklistTheme.buttonCopy}>Generate PDF</Text>
                </Button>
            </View>
        </Provider>
    );

};

const ChecklistTheme = {
    ...PaperTheme,
    colors: {
        ...PaperTheme.colors,
        primary: '#257C52',
        accent: '#f1c40f',
        background: '#ffffff',
        surface: '#ffffff',
        text: '#333333',
        onBackground: '#000000',
        onSurface: '#000000',
        backgroundColor: '#000',
    },
    buttonContainer: {
        paddingTop: 32,
        paddingBottom: 32,
    },
    blueButton: {
        backgroundColor: '#097179',
        borderRadius: 50,
        width: '50%',
        alignSelf: 'center',
    },
    buttonCopy: {
        fontWeight: 'bold',
        color: '#fff',
    },
};

export default CreatePdf;
