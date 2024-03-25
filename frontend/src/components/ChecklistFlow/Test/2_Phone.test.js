/*
Unit Test for the 2_Phone.js component

Tests navigation, radio button behavior, recieving expected previous reports from the route,
and passing the phone report to the next component via the route.
*/

import PhoneInfo from '../2_Phone';
import {render, fireEvent, act, waitFor, debug, cleanup} from '@testing-library/react-native';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import renderer from 'react-test-renderer';

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

//report from 1_Report
const report1 = [
  { id: 1, question: 'Tester Name:', answer: 'TESTER' },
  { id: 2, question: 'Last Known User:', answer: 'LASTKNOWNUSER' },
  { id: 3, question: 'Kit Id:', answer: 'KITID' },
  { id: 4, question: 'Phone ID:', answer: 'PHONEID' },
  { id: 5, question: 'Left Sensor ID:', answer: 'LSID' },
  { id: 6, question: 'Right Sensor ID:', answer: 'RSID' }
];

//route input from 1_Report component
const inputRoute = {
  params: {
    report1: report1
  }
};

describe('Test Radio Buttons', () => {
    afterEach(() => {
      cleanup();
    });
  
    it('Test All Buttons Are Not Checked on initialization', () => {
      const { getByTestId } = render(<PhoneInfo />);
      
      for (let i = 1; i <= 13; i++) {
        const radioButtonPass = getByTestId(`radioButton${i}-Pass`);
        const radioButtonFail = getByTestId(`radioButton${i}-Fail`);
        
        expect(radioButtonPass.props.accessibilityState.checked).toBe(false);
        expect(radioButtonFail.props.accessibilityState.checked).toBe(false);
      }      
    });

    it('Test button values if Pass is selected for each Question', () => {
      const {getByTestId, rerender} = render(<PhoneInfo />);

      for (let i = 1; i <= 13; i++) {
        const radioButtonPass = getByTestId(`radioButton${i}-Pass`);
        fireEvent.press(radioButtonPass);
        const radioButtonFail = getByTestId(`radioButton${i}-Fail`);
        
        rerender(<PhoneInfo />);

        expect(radioButtonPass.props.accessibilityState.checked).toBe(true);
        expect(radioButtonFail.props.accessibilityState.checked).toBe(false);
      }      
    });

    it('Test button values if Fail is selected for each Question', () => {
      const {getByTestId, rerender} = render(<PhoneInfo />);

      for (let i = 1; i <= 13; i++) {
        const radioButtonPass = getByTestId(`radioButton${i}-Pass`);
        const radioButtonFail = getByTestId(`radioButton${i}-Fail`);
        fireEvent.press(radioButtonFail);

        rerender(<PhoneInfo />);

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
          <PhoneInfo navigation={mockNavigation} route={inputRoute}/>
      </NavigationContainer>
    );

    // Fire an event on the "Continue" button
    fireEvent.press(getByTestId('ContinueButton'));
    
    //console.log("CALLS ON MOCK NAVIGATION :", mockNavigation.navigate.mock.calls);

    expect(mockNavigation.navigate).toHaveBeenCalledWith(
      'Left Sensor Inspection', {
        report1: inputRoute.params.report1,
        report2: [],
      }
    );
  });

  it("Test passing along report2 via the route", () => {
    const expectedReport2 = [
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

    // Mock the navigation prop
    const mockNavigation = { navigate: jest.fn() };

    const {getByTestId, rerender} = render(
      <NavigationContainer>
          <PhoneInfo navigation={mockNavigation} route={inputRoute}/>
      </NavigationContainer>
    );

    //select pass for all of the buttons
    for (let i = 1; i <= 13; i++) {
      const radioButtonPass = getByTestId(`radioButton${i}-Pass`);
      
      fireEvent.press(radioButtonPass);
    }

    rerender(
    <NavigationContainer>
      <PhoneInfo navigation={mockNavigation} route={inputRoute}/>
    </NavigationContainer>);

    // navigate to next page
    fireEvent.press(getByTestId('ContinueButton'));
    
    //console.log("CALLS ON MOCK NAVIGATION :", mockNavigation.navigate.mock.calls);

    expect(mockNavigation.navigate).toHaveBeenCalledWith(
      'Left Sensor Inspection', {
        report1: inputRoute.params.report1,
        report2: expectedReport2,
      }
    );
  })
});
