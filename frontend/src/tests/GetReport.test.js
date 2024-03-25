/*
Unit Test for the GetReport.js component

Tests succesfully getting a mock report.
*/

import React from 'react';
import { render, waitFor, queryAllByText } from '@testing-library/react-native';
import CatchReportRequest from '../components/GetReport';


describe('Test CatchReportRequest returning expected values', () => {

    it('returns mock report data correctly', async () => {

        //route input when rendering the component
        const route = {
            params: {
                key: '222',
                filter:
                {
                    //mocks the filter returning a report
                    apiGet: jest.fn().mockResolvedValue(
                        [
                            {
                                "KitId": "222",
                                "PhoneId": "222",
                                "LeftSensorId": "222",
                                "RightSensorId": "222",
                                "Tester": null,
                                "LastKnownUser": null,
                                "PhysicalDamage": null,
                                "PowerButtonFunc": null,
                                "VolButtonFunc": null,
                                "ChargingPort": null,
                                "SIMCardFunc": null,
                                "MemCardFunc": null,
                                "PhoneCaseCondition": null,
                                "TouchScreenFunc": null,
                                "WiFiFunc": null,
                                "BluetoothFunc": null,
                                "CellDataFunc": null,
                                "SpeakerFunc": null,
                                "ConditionOfCables": null,
                                "MountingBrackets": null,
                                "ConnectorFunc": null,
                                "ConnectorDamage": null,
                                "AudioFuncLeftChannel": null,
                                "AudioFuncRightChannel": null,
                                "AudioQuality": null,
                                "ChargerCondition": null,
                                "HubOverheat": null,
                                "DataTrans": null,
                                "ReportId": null,
                                "DateTested": null
                            },
                            {
                                "KitId": "222",
                                "PhoneId": null,
                                "LeftSensorId": null,
                                "RightSensorId": null,
                                "Tester": "PEANUT BUTTER",
                                "LastKnownUser": "JELLY",
                                "PhysicalDamage": null,
                                "PowerButtonFunc": null,
                                "VolButtonFunc": null,
                                "ChargingPort": null,
                                "SIMCardFunc": null,
                                "MemCardFunc": null,
                                "PhoneCaseCondition": null,
                                "TouchScreenFunc": null,
                                "WiFiFunc": null,
                                "BluetoothFunc": null,
                                "CellDataFunc": null,
                                "SpeakerFunc": null,
                                "ConditionOfCables": null,
                                "MountingBrackets": null,
                                "ConnectorFunc": null,
                                "ConnectorDamage": null,
                                "AudioFuncLeftChannel": null,
                                "AudioFuncRightChannel": null,
                                "AudioQuality": null,
                                "ChargerCondition": null,
                                "HubOverheat": null,
                                "DataTrans": null,
                                "ReportId": 2,
                                "DateTested": "2023-11-17T15:29:06.000Z"
                            },
                            {
                                "KitId": "222",
                                "PhoneId": "222",
                                "LeftSensorId": null,
                                "RightSensorId": null,
                                "Tester": null,
                                "LastKnownUser": null,
                                "PhysicalDamage": "Pass",
                                "PowerButtonFunc": "Pass",
                                "VolButtonFunc": "Pass",
                                "ChargingPort": "Pass",
                                "SIMCardFunc": "Pass",
                                "MemCardFunc": "Pass",
                                "PhoneCaseCondition": "Pass",
                                "TouchScreenFunc": "Pass",
                                "WiFiFunc": "Pass",
                                "BluetoothFunc": "Pass",
                                "CellDataFunc": "Pass",
                                "SpeakerFunc": "Pass",
                                "ConditionOfCables": "Pass",
                                "MountingBrackets": null,
                                "ConnectorFunc": null,
                                "ConnectorDamage": null,
                                "AudioFuncLeftChannel": null,
                                "AudioFuncRightChannel": null,
                                "AudioQuality": null,
                                "ChargerCondition": null,
                                "HubOverheat": null,
                                "DataTrans": null,
                                "ReportId": 2,
                                "DateTested": null
                            },
                            {
                                "KitId": "222",
                                "PhoneId": null,
                                "LeftSensorId": "222",
                                "RightSensorId": null,
                                "Tester": null,
                                "LastKnownUser": null,
                                "PhysicalDamage": "Pass",
                                "PowerButtonFunc": null,
                                "VolButtonFunc": null,
                                "ChargingPort": null,
                                "SIMCardFunc": null,
                                "MemCardFunc": null,
                                "PhoneCaseCondition": null,
                                "TouchScreenFunc": null,
                                "WiFiFunc": null,
                                "BluetoothFunc": "Pass",
                                "CellDataFunc": null,
                                "SpeakerFunc": null,
                                "ConditionOfCables": null,
                                "MountingBrackets": "Pass",
                                "ConnectorFunc": "Pass",
                                "ConnectorDamage": null,
                                "AudioFuncLeftChannel": null,
                                "AudioFuncRightChannel": null,
                                "AudioQuality": null,
                                "ChargerCondition": null,
                                "HubOverheat": null,
                                "DataTrans": "Pass",
                                "ReportId": 2,
                                "DateTested": null
                            },
                            {
                                "KitId": "222",
                                "PhoneId": null,
                                "LeftSensorId": null,
                                "RightSensorId": "222",
                                "Tester": null,
                                "LastKnownUser": null,
                                "PhysicalDamage": "Pass",
                                "PowerButtonFunc": null,
                                "VolButtonFunc": null,
                                "ChargingPort": null,
                                "SIMCardFunc": null,
                                "MemCardFunc": null,
                                "PhoneCaseCondition": null,
                                "TouchScreenFunc": null,
                                "WiFiFunc": null,
                                "BluetoothFunc": "Pass",
                                "CellDataFunc": null,
                                "SpeakerFunc": null,
                                "ConditionOfCables": null,
                                "MountingBrackets": "Pass",
                                "ConnectorFunc": "Pass",
                                "ConnectorDamage": null,
                                "AudioFuncLeftChannel": null,
                                "AudioFuncRightChannel": null,
                                "AudioQuality": null,
                                "ChargerCondition": null,
                                "HubOverheat": null,
                                "DataTrans": "Pass",
                                "ReportId": 2,
                                "DateTested": null
                            },
                            {
                                "KitId": "222",
                                "PhoneId": null,
                                "LeftSensorId": null,
                                "RightSensorId": null,
                                "Tester": null,
                                "LastKnownUser": null,
                                "PhysicalDamage": "Pass",
                                "PowerButtonFunc": "Pass",
                                "VolButtonFunc": "Pass",
                                "ChargingPort": null,
                                "SIMCardFunc": null,
                                "MemCardFunc": null,
                                "PhoneCaseCondition": null,
                                "TouchScreenFunc": null,
                                "WiFiFunc": null,
                                "BluetoothFunc": null,
                                "CellDataFunc": null,
                                "SpeakerFunc": null,
                                "ConditionOfCables": "Pass",
                                "MountingBrackets": null,
                                "ConnectorFunc": null,
                                "ConnectorDamage": "Pass",
                                "AudioFuncLeftChannel": "Pass",
                                "AudioFuncRightChannel": "Pass",
                                "AudioQuality": "Pass",
                                "ChargerCondition": null,
                                "HubOverheat": null,
                                "DataTrans": null,
                                "ReportId": 2,
                                "DateTested": null
                            },
                            {
                                "KitId": "222",
                                "PhoneId": null,
                                "LeftSensorId": null,
                                "RightSensorId": null,
                                "Tester": null,
                                "LastKnownUser": null,
                                "PhysicalDamage": "Pass",
                                "PowerButtonFunc": null,
                                "VolButtonFunc": null,
                                "ChargingPort": null,
                                "SIMCardFunc": null,
                                "MemCardFunc": null,
                                "PhoneCaseCondition": null,
                                "TouchScreenFunc": null,
                                "WiFiFunc": null,
                                "BluetoothFunc": null,
                                "CellDataFunc": null,
                                "SpeakerFunc": null,
                                "ConditionOfCables": "Pass",
                                "MountingBrackets": null,
                                "ConnectorFunc": null,
                                "ConnectorDamage": null,
                                "AudioFuncLeftChannel": null,
                                "AudioFuncRightChannel": null,
                                "AudioQuality": null,
                                "ChargerCondition": "Pass",
                                "HubOverheat": "Pass",
                                "DataTrans": null,
                                "ReportId": 2,
                                "DateTested": null
                            }
                        ]
                    ),
                },
            },
        };

        const { getByText } = render(<CatchReportRequest route={route} />);
        const { queryAllByText } = render(<CatchReportRequest route={route} />);

        await waitFor(() => {
            const resultHeader = getByText("Result 0");
            const resultKitHeader = getByText("Kit Info");
            const resultReportHeader = getByText("Report Info");
            const resultPhoneHeader = getByText("Phone Info");
            const resultLeftHeader = getByText("Left Sensor");
            const resultRightHeader = getByText("Right Sensor");
            const resultHeadsetHeader = getByText("Headset Info");
            const resultHubHeader = getByText("Hub Info");

            const kitIdElements = queryAllByText('Kit Id:');
            expect(kitIdElements.length).toBe(7);

            const reportIdElements = queryAllByText('Report Id:');
            expect(reportIdElements.length).toBe(6);
        });
    }, 10000);
});
