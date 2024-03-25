/*
Unit Test for the HomePage.js component

Tests succesful navigation to the button to create a new report
and the button to retrieve a historical report.
*/

import HomePage from '../components/HomePage';
import {render, fireEvent, cleanup} from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';


//mock the @react-navigation/native module. When this module is encountered in the test, this code is used instead
jest.mock('@react-navigation/native', () => ({
    //include the actual implementation of the @react-navigation/native module
    //since we don't want to completely replace the module, we just want to override specific parts of it.
    ...jest.requireActual('@react-navigation/native'),
    //replace the NavigationContainer component with a simple functional component that renders its children. 
    NavigationContainer: ({ children }) => <>{children}</>,
    //replace the useNavigation hook with a function that returns an object.
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
}));
  
describe('HomePage', () => {
    afterEach(() => {
        cleanup();
    });

    it("Test New Report Button", () => {
        // Mock the navigation prop
        const mockNavigation = { navigate: jest.fn() };

        //render the application
        const { getByTestId } = render(
        <NavigationContainer>
            <HomePage navigation={mockNavigation}/>
        </NavigationContainer>
        );

        //get the button
        const newReportButton = getByTestId("newReportButton");
        //press it
        fireEvent.press(newReportButton);
    
        expect(mockNavigation.navigate).toHaveBeenCalledWith('Sensor Connect');
    });

    it("Test Retrieve Old Report Button", () => {
        // Mock the navigation prop
        const mockNavigation = { navigate: jest.fn() };

        //render the application
        const { getByTestId } = render(
        <NavigationContainer>
            <HomePage navigation={mockNavigation}/>
        </NavigationContainer>
        );

        //get the button
        const newReportButton = getByTestId("retrieveReportButton");
        //press it
        fireEvent.press(newReportButton);
    
        expect(mockNavigation.navigate).toHaveBeenCalledWith('Retrieve Old Report');
    });
}
);
