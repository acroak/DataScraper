/*
Unit Test for the 7_Complete.js component

Tests successful rendering.
*/

import FlowComplete from '../7_Complete';
import {render, fireEvent, act, waitFor, debug, cleanup} from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';

//mock the @react-navigation/native module. When this module is encountered in the test, this code is used instead
jest.mock('@react-navigation/native', () => ({
    //include the actual implementation of the @react-navigation/native module
    //since we don't want to completely replace the module, we just want to override specific parts of it.
    ...jest.requireActual('@react-navigation/native'),
    //replace the NavigationContainer component with a component that renders its children. 
    NavigationContainer: ({ children }) => <>{children}</>,
    //replace the useNavigation hook with a function that returns an object.
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  }));
  jest.mock('axios');
  
  // Mock the CreatePdf component
  jest.mock('../../CreatePdf', () => {
    const { Text } = require('@testing-library/react-native');
    return {
    __esModule: true,
    default : () => null,
    };
  });

  //report info
  const report1 = [
    { id: 1, question: 'Tester Name:', answer: 'TESTER' },
    { id: 2, question: 'Last Known User:', answer: 'LASTKNOWNUSER' },
    { id: 3, question: 'Kit Id:', answer: 'KITID' },
    { id: 4, question: 'Phone ID:', answer: 'PHONEID' },
    { id: 5, question: 'Left Sensor ID:', answer: 'LSID' },
    { id: 6, question: 'Right Sensor ID:', answer: 'RSID' }
  ];
  
  //phone info
  const report2 = [
    {id: 1, question: "Is the Phone Physically Damaged?", options: ["Pass", "Fail"], answer: "Pass"},
    {id: 2, question: "Does the Power Button work?", options: ["Pass", "Fail"], answer: "Pass"},
    {id: 3, question: "Do the Volume Buttons work?", options: ["Pass", "Fail"], answer: "Pass"},
    {id: 4, question: "Is the Charging Port Damaged, Corroded, or full of Debris ?", options: ["Pass", "Fail"], answer: "Pass"},
    {id: 5, question: "Does the SIM Card slot function?", options: ["Pass", "Fail"], answer: "Pass"},
    {id: 6, question: "Does the Memory Card slot function?", options: ["Pass", "Fail"], answer: "Pass"},
    {id: 7, question: "Is the Phones' Case in good condition?", options: ["Pass", "Fail"], answer: "Pass"},
    {id: 8, question: "Check the functionality of the Touch Screen.", options: ["Pass", "Fail"], answer: "Pass"},
    {id: 9, question: "Test WiFi Connectivity.", options: ["Pass", "Fail"], answer: "Pass"},
    {id: 10, question: "Test Bluetooth Connectivity.", options: ["Pass", "Fail"], answer: "Pass"},
    {id: 11, question: "Test Cellular Connectivity.", options: ["Pass", "Fail"], answer: "Pass"},
    {id: 12, question: "Test Phone Speakers.", options: ["Pass", "Fail"], answer: "Pass"},
    {id: 13, question: "Inspect the entire length of the phone cable for damage or fraying.", options: ["Pass", "Fail"], answer: "Pass"}
  ]
  
  //Left Sensor info
  const report3 = [
    {id: 1, question: 'Is the Sensor Physically Damaged?', options: ['Pass', 'Fail'], answer: 'Pass'},
    {id: 2, question: 'Is the Charging Port Damaged?', options: ['Pass', 'Fail'], answer: 'Pass'},
    {id: 3, question: 'Confirm the stability of mounting brackets or other physical fixtures.', options: ['Pass', 'Fail'], answer: 'Pass'},
    {id: 4, question: 'Ensure the sensor can communicate effectively with its receiver both through the hub and over bluetooth.', options: ['Pass', 'Fail'], answer: 'Pass'},
    {id: 5, question: 'Check Data Transfer Capabilities.', options: ['Pass', 'Fail'], answer: 'Pass'},
    {id: 6, question: 'Inspect the entire length of the sensor cable for damage or fraying.', options: ['Pass', 'Fail'], answer: 'Pass'}
  ]
  
  //Right Sensor info
  const report4 = [
    {id: 1, question: 'Is the Sensor Physically Damaged?', options: ['Pass', 'Fail'], answer: 'Pass'},
    {id: 2, question: 'Is the Charging Port Damaged?', options: ['Pass', 'Fail'], answer: 'Pass'},
    {id: 3, question: 'Confirm the stability of mounting brackets or other physical fixtures.', options: ['Pass', 'Fail'], answer: 'Pass'},
    {id: 4, question: 'Ensure the sensor can communicate effectively with its receiver both through the hub and over bluetooth.', options: ['Pass', 'Fail'], answer: 'Pass'},
    {id: 5, question: 'Check Data Transfer Capabilities.', options: ['Pass', 'Fail'], answer: 'Pass'},
    {id: 6, question: 'Inspect the entire length of the sensor cable for damage or fraying.', options: ['Pass', 'Fail'], answer: 'Pass'}
  ]
  
  //Headphone info
  const report5 = [
    {id: 1, question: 'Are the Headphones Physically Damaged?', options: ['Pass', 'Fail'], answer: 'Pass'},
    {id: 2, question: 'Check the connectors for any signs of damage', options: ['Pass', 'Fail'], answer: 'Pass'},
    {id: 3, question: 'Check the physical condition of the wires/cables', options: ['Pass', 'Fail'], answer: 'Pass'},
    {id: 4, question: 'Is the Left Speaker functional?', options: ['Pass', 'Fail'], answer: 'Pass'},
    {id: 5, question: 'Is the Right Speaker Functional?', options: ['Pass', 'Fail'], answer: 'Pass'},
    {id: 6, question: 'Check for static/noise during audio playback.', options: ['Pass', 'Fail'], answer: 'Pass'},
    {id: 7, question: 'Does the Power Button Work?', options: ['Pass', 'Fail'], answer: 'Pass'},
    {id: 8, question: 'Do the Volume Buttons Work?', options: ['Pass', 'Fail'], answer: 'Pass'}
  ]

  //hub info
  const report6 = [
    {id: 1, question: "Inspect the Charger for any physical damage or deformities", options: ["Pass", "Fail"], answer: "Pass"},
    {id: 2, question: "Check the connectors and cables physically, Look for fraying, corrosion, dirt/debris lodged in ports, and cable flexibility.", options: ["Pass", "Fail"], answer: "Pass"},
    {id: 3, question: "Can the Hub charge from all ports.", options: ["Pass", "Fail"], answer: "Pass"},
    {id: 4, question: "Hub does not overheat while charging.", options: ["Pass", "Fail"], answer: "Pass"},
    {id: 5, question: "Do all Ports on the Hub Transfer Data?", options: ["Pass", "Fail"], answer: "Pass"}
  ]
  
  const inputRoute = {
    params: {
      report1: report1,
      report2: report2,
      report3: report3,
      report4: report4,
      report5: report5,
      report6: report6
    }
  };

describe('Test Rendering The Screen', () => {
    afterEach(() => {
        cleanup();
    });

    it("Test Rendering of the 'complete button'", async () => {
        // Mock the navigation prop
        const mockNavigation = { navigate: jest.fn() };
        axios.put.mockResolvedValue({
            data: {
                ReportInfo: {
                  insertId: 251
                }
            }
        });

        const { getByTestId } = render(
            <NavigationContainer>
                <FlowComplete navigation={mockNavigation} route={inputRoute}/>
            </NavigationContainer>
        );

        const button = getByTestId("CompleteButton");

        expect(button).toBeTruthy();
    });

});
