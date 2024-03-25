/*
This file retrieves a request to get a report. The request from the user 
is generated in the RetreiveBy.js file
*/

import { React, useState, useEffect, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import HistoricalReportDataService from '../services/historicalreport';
import CreatePdf from './CreatePdf';
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

//Switch statement to title each section of the return
function tableId(id) {
    let result = "";

    switch (id) {
        case 0:
            result = "Kit Info";
            break;
        case 1:
            result = "Report Info";
            break;
        case 2:
            result = "Phone Info";
            break;
        case 3:
            result = "Left Sensor";
            break;
        case 4:
            result = "Right Sensor";
            break;
        case 5:
            result = "Headset Info";
            break;
        case 6:
            result = "Hub Info";
            break;
    }

    return result;
}

/*
Component to display report/reports returned from the query.

The "route" has a child of ReportFilter (FilterOnKidId or FilterOnReportId),
and the integer key that the filter will search with
*/
const CatchReportRequest = ({ route }) => {
    //Stores the organized output from the backend
    const [parsedResult, setParsedResult] = useState(null);
    //Stores the unorganzied output from the backend
    const [resultObject, setResultObject] = useState(null);
    //The value which the user provides to filter on
    const key = route.params.key;
    //The filter which we are using
    const reportFilter = route.params.filter;

    //Effect hook to retrieve report data from the backend based on the filter we are using
    //The filter is either a FilterOnKitId filter, or a FilteronReportId filter.
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check if apiGet is defined on reportFilter before calling it
                if (reportFilter.apiGet) {
                    const values = await reportFilter.apiGet(key);
                    setResultObject(values);
                } else {
                    console.error("apiGet is not defined on reportFilter");
                }
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, [key, reportFilter.apiGet]);

    //Effect hook to digest the output from the backend into a 2D array
    useEffect(() => {
        //Separating results into each individual result
        if (resultObject) setParsedResult(sortIntoReports(resultObject));
    }, [resultObject])


    return (
        <View>

            <View>

                {parsedResult ? (
                    <View>{parsedResult.map((report, i) => (

                        <View style={styles.resultsContainer} key={i}>
                            <Text variant="headlineSmall" style={styles.resultHeader}>Result {i}</Text>
                            <View>{report.map((table, j) => (

                                <View key={j}>
                                    <View style={styles.row}>
                                        <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>{tableId(j)}</Text>
                                    </View>
                                    <View style={[styles.container, styles.row]}>
                                        {table.KitId ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Kit Id:</Text>
                                                </View>
                                                <Text>{table.KitId}</Text>
                                            </View>) : (null)}

                                        {table.ReportId ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Report Id:</Text>
                                                </View>
                                                <Text>{table.ReportId}</Text>
                                            </View>) : (null)}

                                        {table.PhoneId ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Phone Id:</Text>
                                                </View>
                                                <Text>{table.PhoneId}</Text>
                                            </View>) : (null)}

                                        {table.LeftSensorId ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Left Sensor Id:</Text>
                                                </View>
                                                <Text>{table.LeftSensorId}</Text>
                                            </View>) : (null)}

                                        {table.RightSensorId ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Right Sensor Id:</Text>
                                                </View>
                                                <Text>{table.RightSensorId}</Text>
                                            </View>) : (null)}

                                        {table.LastKnownUser ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Last Known User:</Text>
                                                </View>
                                                <Text>{table.LastKnownUser}</Text>
                                            </View>) : (null)}

                                        {table.Tester ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Tester:</Text>
                                                </View>
                                                <Text>{table.Tester}</Text>
                                            </View>) : (null)}

                                        {table.PhysicalDamage ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Physical Damage:</Text>
                                                </View>
                                                <Text>{table.PhysicalDamage}</Text>
                                            </View>) : (null)}

                                        {table.PowerButtonFunc ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Power Button Functionality:</Text>
                                                </View>
                                                <Text>{table.PowerButtonFunc}</Text>
                                            </View>) : (null)}

                                        {table.VolButtonFunc ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Volume Button Functionality:</Text>
                                                </View>
                                                <Text>{table.VolButtonFunc}</Text>
                                            </View>) : (null)}

                                        {table.ChargingPort ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Charging Port:</Text>
                                                </View>
                                                <Text>{table.ChargingPort}</Text>
                                            </View>) : (null)}

                                        {table.SIMCardFunc ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>SIM Card Functionality:</Text>
                                                </View>
                                                <Text>{table.SIMCardFunc}</Text>
                                            </View>) : (null)}

                                        {table.MemCardFunc ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Memory Card Functionality:</Text>
                                                </View>
                                                <Text>{table.MemCardFunc}</Text>
                                            </View>) : (null)}

                                        {table.PhoneCaseCondition ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Phone Case Condition:</Text>
                                                </View>
                                                <Text>{table.PhoneCaseCondition}</Text>
                                            </View>) : (null)}

                                        {table.TouchScreenFunction ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Touch Screen Functionality:</Text>
                                                </View>
                                                <Text>{table.TouchScreenFunction}</Text>
                                            </View>) : (null)}

                                        {table.WiFiFunc ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Wi-Fi Functionality:</Text>
                                                </View>
                                                <Text>{table.WiFiFunc}</Text>
                                            </View>) : (null)}

                                        {table.BluetoothFunc ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Bluetooth Functionality:</Text>
                                                </View>
                                                <Text>{table.BluetoothFunc}</Text>
                                            </View>) : (null)}

                                        {table.CellDataFunc ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Cell Data Functionality:</Text>
                                                </View>
                                                <Text>{table.CellDataFunc}</Text>
                                            </View>) : (null)}

                                        {table.SpeakerFunc ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Speaker Functionality:</Text>
                                                </View>
                                                <Text>{table.SpeakerFunc}</Text>
                                            </View>) : (null)}

                                        {table.ConditionOfCables ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Condition of Cables:</Text>
                                                </View>
                                                <Text>{table.ConditionOfCables}</Text>
                                            </View>) : (null)}

                                        {table.MountingBrackets ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Mounting Brackets:</Text>
                                                </View>
                                                <Text>{table.MountingBrackets}</Text>
                                            </View>) : (null)}

                                        {table.ConnectorFunc ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Connector Functionality:</Text>
                                                </View>
                                                <Text>{table.ConnectorFunc}</Text>
                                            </View>) : (null)}

                                        {table.AudioFuncLeftChannel ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Audio Function - Left Channel:</Text>
                                                </View>
                                                <Text>{table.AudioFuncLeftChannel}</Text>
                                            </View>) : (null)}

                                        {table.AudioFuncRightChannel ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Audio Function - Right Channel:</Text>
                                                </View>
                                                <Text>{table.AudioFuncRightChannel}</Text>
                                            </View>) : (null)}

                                        {table.AudioQuality ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Audio Quality:</Text>
                                                </View>
                                                <Text>{table.AudioQuality}</Text>
                                            </View>) : (null)}

                                        {table.ChargerCondition ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Charger Condition:</Text>
                                                </View>
                                                <Text>{table.ChargerCondition}</Text>
                                            </View>) : (null)}

                                        {table.HubOverheat ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Hub Overheat:</Text>
                                                </View>
                                                <Text>{table.HubOverheat}</Text>
                                            </View>) : (null)}

                                        {table.DataTrans ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Data Transfer:</Text>
                                                </View>
                                                <Text>{table.DataTrans}</Text>
                                            </View>) : (null)}

                                        {table.DateTested ? (
                                            <View style={styles.box}>
                                                <View style={styles.colHeader}>
                                                    <Text>Date Tested:</Text>
                                                </View>
                                                <Text>{
                                                    new Date(table.DateTested).toDateString()
                                                }</Text>
                                            </View>) : (null)}

                                    </View>

                                </View>
                            ))}
                            </View>
                        </View>
                    ))}</View>
                ) : (
                    <Text> No result</Text>
                )

                }
                <View style={styles.reportButton}>
                    <CreatePdf repIdVal={key} filter={reportFilter} />
                </View>

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 8,
    },
    box: {
        width: 150,
        height: 75,
        border: '1px solid black',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'baseline',
        paddingLeft: '2%',
        paddingRight: '2%',
        width: '100%'
    },
    resultHeader: {
        fontWeight: 'bold',
        backgroundColor: '#D9DDDC',
        textAlign: 'center',
    },
    resultsContainer: {
        paddingTop: 15,
        paddingBottom: 15,
    },
    colHeader: {
        height: 35,
        width: '100%',
        backgroundColor: '#1AB86C',
        alignItems: 'center',
    },
    reportButton: {
        width: '40%',
        alignSelf: 'center'
    }
});

export default CatchReportRequest;
