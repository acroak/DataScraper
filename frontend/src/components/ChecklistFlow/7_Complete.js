/*
Final Component in the checklist flow.

Puts info generated from the checklist into tables in the database.
Gives the user the option to generate a PDF displaying their input information.
*/

import * as React from 'react';
import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Provider, DefaultTheme as PaperTheme, Button, Text } from 'react-native-paper';
import ReportDataService from '../../services/report';
import KitInfoDataService from '../../services/kit';
import HeadsetDataService from '../../services/headset';
import HubInfoDataService from '../../services/hubinfo';
import LSDataService from '../../services/leftsensor';
import RSDataService from '../../services/rightsensor';
import PhoneDataService from '../../services/phone';
import CreatePdf from '../CreatePdf';
import { FilterOnReportId } from '../../services/FilterOnReportId';

const FlowComplete = ({ navigation, route }) => {
    var upload = false;

    const completeButton = () => {
        // Reset the browser to empty the cache and navigate back to the home/landing page
        window.location.reload();
    };

    //Report1
    //Kit Info
    const report1_kitinfo = {
        'KitId': route.params.report1[2].answer,
        'PhoneId': route.params.report1[3].answer,
        'LeftSensorId': route.params.report1[4].answer,
        'RightSensorId': route.params.report1[5].answer
    }



    //Report Info
    const [repIdVal, setRepIdVal] = useState("");

    const report1_reportinfo = {
        'Tester': route.params.report1[0].answer,
        'LastKnownUser': route.params.report1[1].answer,
        'KitId': route.params.report1[2].answer
    }

    upload = true;

    //Report2
    const report2 = {
        'PhoneId': route.params.report1[3].answer,
        'PhysicalDamage': route.params.report2[0].answer,
        'PowerButtonFunc': route.params.report2[1].answer,
        'VolButtonFunc': route.params.report2[2].answer,
        'ChargingPort': route.params.report2[3].answer,
        'SIMCardFunc': route.params.report2[4].answer,
        'MemCardFunc': route.params.report2[5].answer,
        'PhoneCaseCondition': route.params.report2[6].answer,
        'TouchScreenFunc': route.params.report2[7].answer,
        'WiFiFunc': route.params.report2[8].answer,
        'BluetoothFunc': route.params.report2[9].answer,
        'CellDataFunc': route.params.report2[10].answer,
        'SpeakerFunc': route.params.report2[11].answer,
        'ConditionOfCable': route.params.report2[12].answer,
        'KitId': route.params.report1[2].answer,
    }


    //Report3
    // console.log(route.params.report3);
    const report3 = {
        'KitId': route.params.report1[2].answer,
        'LeftSensorId': route.params.report1[4].answer,
        'PhysicalDamage': route.params.report3[0].answer,
        'ConnectorFunc': route.params.report3[1].answer,
        'MountingBrackets': route.params.report3[2].answer,
        'BluetoothFunc': route.params.report3[3].answer,
        'DataTrans': route.params.report3[4].answer,
        'ConditionOfCables': route.params.report3[5].answer,

    }

    //Report4
    // console.log(route.params.report4);
    const report4 = {
        'KitId': route.params.report1[2].answer,
        'RightSensorId': route.params.report1[5].answer,
        'PhysicalDamage': route.params.report3[0].answer,
        'ConnectorFunc': route.params.report3[1].answer,
        'MountingBrackets': route.params.report3[2].answer,
        'BluetoothFunc': route.params.report3[3].answer,
        'DataTrans': route.params.report3[4].answer,
        'ConditionOfCables': route.params.report3[5].answer,

    }

    //Report5
    // console.log(route.params.report5);  
    const report5 = {
        'KitId': route.params.report1[2].answer,
        'PhysicalDamage': route.params.report5[0].answer,
        'ConnectorDamage': route.params.report5[1].answer,
        'ConditionOfCables': route.params.report5[2].answer,
        'AudioFuncLeftChannel': route.params.report5[3].answer,
        'AudioFuncRightChannel': route.params.report5[4].answer,
        'AudioQuality': route.params.report5[5].answer,
        'PowerButtonFunc': route.params.report5[6].answer,
        'VolButtonFunc': route.params.report5[7].answer,
    }

    //Report6    
    // console.log(route.params.report6);
    const report6 = {
        'KitId': route.params.report1[2].answer,
        'PhysicalDamage': route.params.report6[0].answer,
        'ConditionOfCables': route.params.report6[1].answer,
        'ChargerCondition': route.params.report6[2].answer,
        'HubOverheat': route.params.report6[3].answer,
        'HubPortFunc': route.params.report6[4].answer,
    }
    // If the reportId value is an empty string then we must submit the KitInfo and ReportInfo data to have 
    // the SQL DB autoincrement the ReportInfo table, giving us a value.
    // We then setRepIdVal only if it is an empty string and submit the two reports.
    useEffect(() => {
        if (upload) {

            if (repIdVal === "") {
                KitInfoDataService.put(report1_kitinfo)
                    .then(response => {
                        console.log("sent 1 kitinfo :)");
                    })
                    .catch(e => {
                        console.error(e);
                    })

                ReportDataService.put(report1_reportinfo)
                    .then(response => {
                        console.log("sent 1 reportinfo :)");
                        if (repIdVal === "") {
                            console.log("fetching report id...");
                            setRepIdVal(response.data.ReportInfo.insertId.toString());
                        }
                    })
                    .catch(e => {
                        console.error(e);
                    })
            }
            upload = false;
        }
    },[upload])

    // Should the report Id Value have a value, then submit all device reports
    // To add the reportId value we must use the spread operator on each report to add a new key/value pair
    // That then gets PUT to the database
    useEffect(() => {
        if (repIdVal !== "") {
            const report2_phoneinfo = {
                ...report2,
                'ReportId': repIdVal
            }

            PhoneDataService.put(report2_phoneinfo)
                .then(response => {
                    console.log("report 2 sent :)");
                })
                .catch(e => {
                    console.error(e);
                })

            const report3_leftsensor = {
                ...report3,
                'ReportId': repIdVal
            }

            LSDataService.put(report3_leftsensor)
                .then(response => {
                    console.log("report 3 sent :)");
                })
                .catch(e => {
                    console.error(e);
                })

            const report4_rightsensor = {
                ...report4,
                'ReportId': repIdVal
            }

            RSDataService.put(report4_rightsensor)
                .then(response => {
                    console.log("report 4 sent :)");
                })
                .catch(e => {
                    console.error(e);
                })

            const report5_headset = {
                ...report5,
                'ReportId': repIdVal
            }

            HeadsetDataService.put(report5_headset)
                .then(response => {
                    console.log("report 5 sent :)");
                })
                .catch(e => {
                    console.error(e);
                })

            const report6_hubinfo = {
                ...report6,
                'ReportId': repIdVal
            }

            HubInfoDataService.put(report6_hubinfo)
                .then(response => {
                    console.log("report 6 sent :)");
                })
                .catch(e => {
                    console.error(e);
                })
        }
    }, [repIdVal])
    
    //create filter to retrieve the generated report, to allow pdf generation
    const reportFilter = new FilterOnReportId();

    return (
        <Provider theme={ChecklistTheme}>
            <View style={ChecklistTheme.formContainer}>
                <Text variant="headlineMedium">Inspection Complete!</Text>

                <View style={{paddingTop:30}}>
                    {/* Allow for report PDF creation */}
                    <CreatePdf repIdVal={repIdVal} filter={reportFilter}/>
                </View>

                <View style={ChecklistTheme.buttonContainer}>
                    <Button mode="contained" onPress={completeButton} style={ChecklistTheme.blueButton} testID='CompleteButton'>
                        <Text style={ChecklistTheme.buttonCopy}>Home</Text>
                    </Button>
                </View>
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
    formContainer: {
        flex: 1,
        padding: 16,
        flexDirection: 'column',
        width: '33.33%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: '3px',
    },
    headline: {
        fontWeight: 'bold',
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

export default FlowComplete;
