/*
Unit Test for the CreatePdf.js component.

Tests rendering the component and pressing the pdf generation button
*/

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CreatePdf from '../components/CreatePdf';
import 'jspdf-autotable';

//mock the filter and its apiGet method
const mockedFilter = {apiGet: jest.fn().mockResolvedValue(
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
  )}

//mocked route input to CreatePdf component
const route = {
    params: {
      repIdVal: '222',
      filter: mockedFilter,
    },
  };

//mock pdf generation
jest.mock('jspdf', () => {
    const mockSave = jest.fn();
        return jest.fn(() => ({
            autoTable: jest.fn(),
            save: mockSave,
    }));
});

describe('CreatePdf Component', () => {
  test('renders correctly', () => {
    async () => {

        const { getByText } = render(<CreatePdf route={route} />);
        const generatePDFButton = getByTestId('generatePDFButton');
        expect(getByText('Generate PDF')).toBeTruthy();
    }});

  test('button press triggers PDF generation', () => {
    async () => {

        const { getByTestId } = render(<CreatePdf route={route}/>);
        const generatePDFButton = getByTestId('generatePDFButton');
        fireEvent.press(generatePDFButton);

        // Check if the save method was called
         expect(jsPDF().save).toHaveBeenCalledWith('table.pdf');
    }});

   
});