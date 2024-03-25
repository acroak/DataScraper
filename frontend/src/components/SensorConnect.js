/*
This component is used to copy sensor data from the sensor USB directories
to an input directory.

Flow:
- User selects a destination directory to copy files to
- User can then select the directories of the L and R sensors.
- Session folders containing the session .bin files will be copied to the destination directory.
- When the "status" view of each sensor turns green, the data has been copied.
*/

import React from 'react';
import {StyleSheet, View, TouchableOpacity, Modal} from 'react-native';
import { useState, useEffect } from 'react';
import { Provider, DefaultTheme, Text, TextInput, Title} from 'react-native-paper';
import getDestinationDir from '../services/GetDestinationDir'
import copySensorData from '../services/CopySensorData';

const CustomButton = ({ title, onPress, inputTestId }) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress} testID={inputTestId}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
};

const Box = ({title, backgroundColor}) => {
    return (
        <View style = {{...styles.boxStyle, backgroundColor: backgroundColor}}>
            <Text style = {styles.text}>{title}</Text>
        </View>
    )
}

const StatusBox = ({title, backgroundColor, inputTestId}) => {
    return (
        <View style = {{...styles.boxStyle, backgroundColor: backgroundColor, margin:'20px', borderRadius: '40px', padding: '5px'}} testID={inputTestId}>
            <Text style = {styles.text}>{title}</Text>
        </View>
    )
}

/*
Component to control copying .bin files from sensors to 
an input destination.

navigation is a navigation object.
*/
const SensorConnect = ({navigation}) => {

    //destinationDir will hold the location the user wants files copied to
    const [destinationDir, setDestinationDir]= useState(null);

    //-1 = error copying, 0 = no path selected yet, 1 = data has been copied succesfully
    const [leftSensorCopied, setLeftSensorCopied] = useState(0);
    const [rightSensorCopied, setRightSensorCopied] = useState(0);

    //text status displayed for each row.
    const [destinationStatus, setDestStatus] = useState("No Directory Selected");
    const [leftSensorStatus, setLeftSensorStatus] = useState("No Path Selected");
    const [rightSensorStatus, setRightSensorStatus] = useState("No Path Selected");

    //color of text box of status
    const [destinationColor, setDestColor] = useState("grey");
    const [leftSensorColor, setLeftSensorColor] = useState("grey");
    const [rightSensorColor, setRightSensorColor] = useState("grey");

    //use state to determine if the user should be given a warning before continueing.
    //This will happen if sensor data has not been coppied yet. 
    const [showWarning, setWarning] = useState(false);

    /*
    Function for the user to provide a directory to copy files to. 
    The given directory is set to the destinationDir use state.
    */
    const destinationDirectoryEntry = async () => {

        const destDirHandle = await getDestinationDir();
        
        //check for error
        if (destDirHandle === -1) {
            setDestStatus("Connection Failed");
            setDestColor("red");
            setDestinationDir(null);
            return;
        }

        setDestinationDir(destDirHandle);
    }

    //monitor when the destination handle is changed
    useEffect(() => {
        if (destinationDir === null) {
            console.log("No destination to copy to.");
        
        } else {
            //update colors and status upon a change.
            setDestStatus("Connected");
            setDestColor("#1ab86c");
        }
    }, [destinationDir]);

    /*
    Function to copy the .bin files of the left sensor.
    The user must have already provided a destination to copy to first. 
    Then, the user provides the path to the sensor. 

    Changes the value of leftSensorCopied if an error occurred, or the files were successfully copied
    */
    const leftSensorDirectoryEntry = async () => {
        //require the destination to be given
        if (destinationDir === null) {
            return;
        }

        //indicate that it is in the process of copying
        setLeftSensorStatus("Working . . .")
        setLeftSensorColor("#FFEB3B")

        //copy the files
        const copy_result = await copySensorData(destinationDir);
        
        //check for error
        if (copy_result === -1) {
            console.log("There was an error copying Left Sensor data.");
            setLeftSensorCopied(-1);
            return;
        }

        //data copied successfully
        setLeftSensorCopied(1);
    }

    //monitor if left sensor data has been copied sucessfully
    useEffect(() => {
        if (leftSensorCopied === -1) {
            setLeftSensorColor('red');
            setLeftSensorStatus('Error Copying Data');
        } 
        else if (leftSensorCopied === 1){
            setLeftSensorColor("#1ab86c");
            setLeftSensorStatus("Data Copied Succesfully");
        }
    }, [leftSensorCopied]);

    /*
    Function to copy the .bin files of the right sensor.
    The user must have already provided a destination to copy to first. 
    Then, the user provides the path to the sensor. 

    Changes the value of rightSensorCopied if an error occurred, or the files were successfully copied
    */
    const rightSensorDirectoryEntry = async () => {
        //require the destination to be given
        if (destinationDir === null) {
            return;
        }

        //indicate that it is in the process of copying
        setRightSensorStatus("Working . . .")
        setRightSensorColor("#FFEB3B")

        //copy the files
        const copy_result = await copySensorData(destinationDir);

        //check for error
        if (copy_result === -1) {
            console.log("There was an error");
            setRightSensorCopied(-1);
            return;
        }

        //data copied successfully
        setRightSensorCopied(1);
    }

    //monitor if right sensor data has been copied sucessfully
    useEffect(() => {
        if (rightSensorCopied === -1) {
            setRightSensorColor('red');
            setRightSensorStatus('Error Copying Data');
        } 
        else if (rightSensorCopied === 1){
            setRightSensorColor("#1ab86c");
            setRightSensorStatus("Data Copied Succesfully");
        }
    }, [rightSensorCopied]);

    /*
    Function to determine if a warning should be displayed or not when the 
    user tries to continue to the next page.
    The warning will not be displayed if all sensor data has been successfully copied.
    */
    const warning = () => {
        //both sensors have been backed up
        if (leftSensorCopied == 1 && rightSensorCopied == 1) {
            navigation.navigate("Input Report Data")
            return;
        }
        //not all data copied.
        else {
            setWarning(true);
        }
    };
    
    return ( 
        <Provider theme={DefaultTheme}>
            <View style = {styles.formContainer}> 

                <View style = {styles.connectionContainer}>
                    <View style = {styles.innerContainer}>
                        <Box backgroundColor={"white"} title={"Please Select a Directory to Copy Files to :"}></Box>
                    </View>
                    <View style = {styles.innerContainer}>
                        <CustomButton title="Click me to Select the Path" onPress={() => destinationDirectoryEntry()} inputTestId={'destinationButton'}> </CustomButton>
                    </View>
                    <View style = {{...styles.innerContainer, flexDirection:"row"}}>
                        <Box backgroundColor={"white"} title={"Status :"}></Box>
                        <StatusBox backgroundColor={destinationColor} title={destinationStatus} inputTestId={'destinationStatusBox'}></StatusBox>
                    </View>
                </View>

                <View style = {styles.connectionContainer}>
                    <View style = {styles.innerContainer}>
                        <Box backgroundColor={"white"} title={"Select the Left Sensor's Directory:"}></Box>
                    </View>
                    <View style = {styles.innerContainer}>
                        <CustomButton title="Click me to Select the Path" onPress={() => leftSensorDirectoryEntry()} inputTestId={'leftSensorButton'} > </CustomButton>
                    </View>
                    <View style = {{...styles.innerContainer, flexDirection:"row"}}>
                        <Box backgroundColor={"white"} title={"Status :"}></Box>
                        <StatusBox backgroundColor={leftSensorColor} title={leftSensorStatus} inputTestId={'leftSensorStatusBox'}></StatusBox>
                    </View>
                </View>

                <View style = {styles.connectionContainer}>
                    <View style = {styles.innerContainer}>
                        <Box backgroundColor={"white"} title={"Select the Right Sensor's Directory:"}></Box>
                    </View>
                    <View style = {styles.innerContainer}>
                        <CustomButton title="Click me to Select the Path" onPress={() => rightSensorDirectoryEntry()} inputTestId={'rightSensorButton'} > </CustomButton>
                    </View>
                    <View style = {{...styles.innerContainer, flexDirection:"row"}}>
                        <Box backgroundColor={"white"} title={"Status :"}></Box>
                        <StatusBox backgroundColor={rightSensorColor} title={rightSensorStatus} inputTestId={'rightSensorStatusBox'}></StatusBox>
                    </View>
                </View>

                <View style = {{...styles.connectionContainer, flex:0.5, justifyContent: "flex-end", alignItems: "center"}}>
                    <View>
                        <CustomButton title="Continue" onPress={() => warning()}inputTestId={'attemptContinueButton'}> </CustomButton>
                    </View>
                </View>

                <Modal transparent={false} visible={showWarning} onRequestClose={() => setWarning(false)} testID='modalView'>
                        <View style={{...styles.formContainer, justifyContent:"center", alignItems:"center"}}> 
                            <Text style = {{fontSize:18, fontWeight:'bold', margin:10}}>Some sensors have not been connected. Continue anyways?</Text>
                            <View style = {{flexDirection:"row"}}> 
                                <CustomButton title="Go Back" onPress={() => setWarning(false)} inputTestId={'modalBackButton'}> </CustomButton>
                                <View style = {{width:10}}> </View>
                                <CustomButton title="Continue" onPress={() => 
                                    {setWarning(false);
                                    navigation.navigate("Input Report Data");}}
                                    inputTestId={'modalContinueButton'}> </CustomButton>
                            </View>
                        </View>
                </Modal>

            </View>
        </Provider>
  );

};

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        padding: 16,
        flexDirection: 'column',
        width: '100%',
        alignSelf: 'center',
        backgroundColor: '#fff',
    },
    connectionContainer: {
        flex: 1,
        padding: 16,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: '3px',
        borderColor: '#000',
        borderWidth: '1px',
    },  
    text: {
        //flex: 1,
        textAlign: 'center',
        fontSize: 18,
    },
    innerContainer: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        borderWidth: 1,
        borderColor:"black",
    },
    boxStyle: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center', 
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#097179',
        padding: '20px',
        borderRadius: 50,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    }

});


export default SensorConnect;
