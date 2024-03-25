/*
Web app's home page. Displays options to create a new report,
or search for a previously generated report.
*/

import React from 'react';
import { View,  ImageBackground } from 'react-native';
import { DefaultTheme as PaperTheme, Button, Text } from 'react-native-paper';

/*
Homepage component, for starting flows to generate new report
or retrieve a historical report. 

navigation is a navigation object.
*/
const HomePage = ({ navigation }) => {

    return (
        <ImageBackground
        source={require('../careers-wavy-lines.png')} // Replace with the actual path to your image
        style={ChecklistTheme.backgroundImage}
        >
            <View>
                <View style={[ChecklistTheme.container, ChecklistTheme.headerContainer]}>
                    <Text variant="displaySmall" style={ChecklistTheme.headline}>Do you want to:</Text>
                </View>

                <View style={ChecklistTheme.container}>
                    <View style={ChecklistTheme.buttonContainer}>
                        <Button onPress={() => { navigation.navigate('Sensor Connect') }} testID="newReportButton" style={ChecklistTheme.blueButton} mode="contained">
                            <Text style={ChecklistTheme.buttonCopy}>Create New Report</Text>
                        </Button>
                    </View>

                    <View style={ChecklistTheme.buttonContainer}>
                        <Button onPress={() => { navigation.navigate('Retrieve Old Report') }} testID="retrieveReportButton" style={ChecklistTheme.blueButton} mode="contained">
                            <Text style={ChecklistTheme.buttonCopy}>Search Directory</Text>
                        </Button>
                    </View>
                </View>

                
            </View>
        </ImageBackground>
    );
};


const ChecklistTheme = {
    ...PaperTheme,
    colors: {
        ...PaperTheme.colors,
        primary: '#257C52',
        accent: '#f1c40f',
        background: '#ffffff',
        text: '#000000',
    },
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowHeight: {
        height: 210,
        flexDirection: 'row',
    },
    imgContainer: {
        flexDirection: 'row',
        flex: 1,
        height: 210,
    },
    backgroundImage: {
        flex: 0.3,
    },
    headerContainer: {
        padding: 60,
    },
    headline: {
        fontWeight: 'bold',
    },
    buttonContainer: {
        paddingBottom: 32,
        width: '35%',
    },
    blueButton: {
        backgroundColor: '#097179',
        borderRadius: 50,
        width: '50%',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    buttonCopy: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 15,
        padding: 5,
    },
    buttonHover: {
        backgroundColor: '#FF69B4',
    }

  };

export default HomePage;
