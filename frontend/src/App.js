/*
Application main. 

Creates the app, and defines navigation for each screen/component.
*/

import React from 'react';
import { StyleSheet, View, } from 'react-native';
import HomePage from './components/HomePage';
import AppHeader from './components/AppHeader';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RetrieveBy from './components/RetrieveBy.js';
import CatchReportRequest from './components/GetReport.js';
import SensorConnect from './components/SensorConnect.js';
import Report from './components/ChecklistFlow/1_Report';
import Phone from './components/ChecklistFlow/2_Phone';
import LeftSensor from './components/ChecklistFlow/3_LeftSensor';
import RightSensor from './components/ChecklistFlow/4_RightSensor';
import Headset from './components/ChecklistFlow/5_Headset';
import Hub from './components/ChecklistFlow/6_Hub';
import FlowComplete from './components/ChecklistFlow/7_Complete';

export default function App() {

    //Theming the Navigation Elements
    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            card: '#257C52',
            text: '#ffffff',
            background: '#ffffff',
            padding: '10px'
        },
    };

    //stack navigator used by all components
    const Stack = createNativeStackNavigator();

    return (

        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator
                screenOptions={{
                    headerRight: () => <View style={{ flexDirection: 'row' }}><AppHeader /><View style={{ width: '50px' }}></View> </View>,
                }}
                initialRouteName='Home'
                style={{padding: '10px 0px'}}
            >
                <Stack.Screen name="Sensor Diagnostic/Report Generation Tool" component={HomePage} />
                <Stack.Screen name="Generate Report" component={AppHeader} />
                <Stack.Screen name="Retrieve Old Report" component={RetrieveBy} />
                <Stack.Screen name="Catch Report Request" component={CatchReportRequest} />
                <Stack.Screen name="Sensor Connect" component={SensorConnect} />
                <Stack.Screen name="Input Report Data" component={Report} />
                <Stack.Screen name="Phone Inspection" component={Phone} />
                <Stack.Screen name="Left Sensor Inspection" component={LeftSensor} />
                <Stack.Screen name="Right Sensor Inspection" component={RightSensor} />
                <Stack.Screen name="Headset Inspection" component={Headset} />
                <Stack.Screen name="Charging Hub Inspection" component={Hub} />
                <Stack.Screen name="Inspection Flow Complete" component={FlowComplete} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});
