/*
Component for the user search for a historical report.

Flow:
- User selects to search by KitId or the ReportId
- User enters the id in the text box
- User presses continue
*/

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CatchReportRequest from './GetReport.js'
import {ReportFilter} from '../services/ReportFilter';
import { FilterOnReportId } from '../services/FilterOnReportId';
import { FilterOnKitId } from '../services/FilterOnKitId';

const CustomButton = ({ title, onPress, inputTestId}) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} testID={inputTestId}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

/*
Component to retrieve a previously generated report.

navigation is a navigation object.
*/
const RetrieveBy = ({ navigation }) => {

    //booleans for which search term the user has selected
    const [kitState, setKitState] = useState(false);
    const [reportState, setReportState] = useState(false);

    //the string displayed in text entry
    const [text, setText] = useState('');
    //state for if the text enry is editable
    const [editable, setEditable] = useState(false);

    //user selected to search by KitId
    const changeKit = () => {
        setKitState(true);
        setReportState(false);
        setEditable(true);
    };

    //user selected to search by ReportID
    const changeReport = () => {
        setReportState(true);
        setKitState(false);
        setEditable(true);
    };

    //instructions for text input
    const selected = () => {
        if (kitState == true) {
            return "Enter Kit Id:";
        }
        else if (reportState == true) {
            return "Enter Report Id:";
        }
        else {
            return 'First, Select One of the Terms Above to Search With.'
        }
    }

    /*
    Create and return a filter object. Either a FilterOnKitId or
    a FilterOnReportId object is created, depending on
    the user's selected search term.
    */
    const GenerateFilter = () => {
        var filter = new ReportFilter();
        if (reportState) filter = new FilterOnReportId();
        if(kitState) filter = new FilterOnKitId();
        return filter;
    }

    /*
    Function to handle when the user tries to submit information to retrieve a historical report.
    If the user has not selected a term to search by or entered a search id, 
    the continue button will do nothing
    */
    const handleEnter = () => {
        if (editable == false || text == "") {
            console.log("Cannot enter");
            return;
        }

        //create a filter to search with
        const reportFilter = GenerateFilter();
        navigation.navigate("Catch Report Request", { key: text, filter: reportFilter })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Search By :</Text>
            <View style={{ height: 50 }}></View>
            <View style={styles.buttonContainer}>
                <CustomButton title="KitId" onPress={() => changeKit()} inputTestId = {"KitIdButton"} />
                <CustomButton title="ReportId" onPress={() => changeReport()} inputTestId = {"ReportIdButton"} />
            </View>
            <View>
                <Text testID = "InstructionText">{selected()}</Text>
                <TextInput
                    style={styles.input}
                    value={text}
                    editable={editable}
                    onChangeText={(newText) => setText(newText)}
                    testId = "textInput"
                />
                <CustomButton title={"Enter"} onPress={() => handleEnter()} />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#097179',
        padding: 20,
        margin: 30,
        borderRadius: 50,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    buttonGap: {
        width: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },

});

export default RetrieveBy;
