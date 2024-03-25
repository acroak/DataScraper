/*
Unit Test for the 3_LeftSensor.js component

Tests navigation, radio button behavior, recieving expected previous reports from the route,
and passing the LeftSensor report to the next component via the route.
*/


import LeftSensor from '../3_LeftSensor';
import {render, fireEvent, act, waitFor, cleanup} from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

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

const inputRoute = {
  params: {
    report1: report1,
    report2: report2,
  }
};

describe('Test Radio Buttons', () => {
    afterEach(() => {
      cleanup();
    });
  
    it('Test All Buttons Are Not Checked on initialization', () => {
      const { getByTestId } = render(<LeftSensor />);

      for (let i = 1; i <= 6; i++) {
        const radioButtonPass = getByTestId(`radioButton${i}-Pass`);
        const radioButtonFail = getByTestId(`radioButton${i}-Fail`);
        
        expect(radioButtonPass.props.accessibilityState.checked).toBe(false);
        expect(radioButtonFail.props.accessibilityState.checked).toBe(false);
      }      
    });

    it('Test button values if Pass is selected for each Question', () => {
      const {getByTestId, rerender} = render(<LeftSensor />);

      for (let i = 1; i <= 6; i++) {
        const radioButtonPass = getByTestId(`radioButton${i}-Pass`);
        fireEvent.press(radioButtonPass);
        const radioButtonFail = getByTestId(`radioButton${i}-Fail`);
        
        rerender(<LeftSensor />);

        expect(radioButtonPass.props.accessibilityState.checked).toBe(true);
        expect(radioButtonFail.props.accessibilityState.checked).toBe(false);
      }      
    });

    it('Test button values if Fail is selected for each Question', () => {
      const {getByTestId, rerender} = render(<LeftSensor />);

      for (let i = 1; i <= 6; i++) {
        const radioButtonPass = getByTestId(`radioButton${i}-Pass`);
        const radioButtonFail = getByTestId(`radioButton${i}-Fail`);
        fireEvent.press(radioButtonFail);

        rerender(<LeftSensor />);

        expect(radioButtonPass.props.accessibilityState.checked).toBe(false);
        expect(radioButtonFail.props.accessibilityState.checked).toBe(true);
      }      
    });

});

describe('Test Navigation and Route', () => {
  afterEach(() => {
    cleanup();
  });

  it("Test extracting previous reports input from route", () => {
    // Mock the navigation prop
    const mockNavigation = { navigate: jest.fn() };

    const {getByTestId} = render(
      <NavigationContainer>
          <LeftSensor navigation={mockNavigation} route={inputRoute}/>
      </NavigationContainer>
    );

    // Fire an event on the "Continue" button
    fireEvent.press(getByTestId('ContinueButton'));
    
    //console.log("CALLS ON MOCK NAVIGATION :", mockNavigation.navigate.mock.calls);

    expect(mockNavigation.navigate).toHaveBeenCalledWith(
      'Right Sensor Inspection', {
        report1: inputRoute.params.report1,
        report2: inputRoute.params.report2,
        report3: []
      }
    );
  });

  
  it("Test passing along report3 via the route", () => {
    const expectedReport3 = [
      {id: 1, question: 'Is the Sensor Physically Damaged?', options: ['Pass', 'Fail'], answer: 'Pass'},
      {id: 2, question: 'Is the Charging Port Damaged?', options: ['Pass', 'Fail'], answer: 'Pass'},
      {id: 3, question: 'Confirm the stability of mounting brackets or other physical fixtures.', options: ['Pass', 'Fail'], answer: 'Pass'},
      {id: 4, question: 'Ensure the sensor can communicate effectively with its receiver both through the hub and over bluetooth.', options: ['Pass', 'Fail'], answer: 'Pass'},
      {id: 5, question: 'Check Data Transfer Capabilities.', options: ['Pass', 'Fail'], answer: 'Pass'},
      {id: 6, question: 'Inspect the entire length of the sensor cable for damage or fraying.', options: ['Pass', 'Fail'], answer: 'Pass'}
    ]

    // Mock the navigation prop
    const mockNavigation = { navigate: jest.fn() };

    const {getByTestId, rerender} = render(
      <NavigationContainer>
          <LeftSensor navigation={mockNavigation} route={inputRoute}/>
      </NavigationContainer>
    );

    //select pass for all of the buttons
    for (let i = 1; i <= 6; i++) {
      const radioButtonPass = getByTestId(`radioButton${i}-Pass`);
      
      fireEvent.press(radioButtonPass);
    }

    rerender(
    <NavigationContainer>
      <LeftSensor navigation={mockNavigation} route={inputRoute}/>
    </NavigationContainer>);

    // navigate to next page
    fireEvent.press(getByTestId('ContinueButton'));
    
    //console.log("CALLS ON MOCK NAVIGATION :", mockNavigation.navigate.mock.calls);

    expect(mockNavigation.navigate).toHaveBeenCalledWith(
      'Right Sensor Inspection', {
        report1: inputRoute.params.report1,
        report2: inputRoute.params.report2,
        report3: expectedReport3
      }
    );
  })
  
});


