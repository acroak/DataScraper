/*
Unit Test for the SensorConnect.js component

Tests succesful rendering, navigation, and when the warning screen is displayed.
*/

import SensorConnect from '../components/SensorConnect';
import {render, fireEvent, cleanup} from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import '@testing-library/jest-native/extend-expect';

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


describe('Test SensorConnect Page Initialization of Use State Values', () => {
    afterEach(() => {
        cleanup();
    });

    it("Test Initialization Destination Status", () => {
        //Expect a grey box, with the text "No Directory Selected".
        //The value of the destinationDir, destinationStatus, and destinationColor useStates control this

        //render component
        const { getByTestId } = render(<SensorConnect />);
  
        //retrieve statusBox
        const statusBox = getByTestId('destinationStatusBox');
        
        //text text displayed by child
        expect(statusBox).toHaveTextContent('No Directory Selected');
        //color of box
        expect(statusBox).toHaveStyle({ backgroundColor: 'grey' });

    });


    it("Test Initialization LeftSensor Status", () => {
        //Expect a grey box, with the text "No Directory Selected".
        //The value of the destinationDir, destinationStatus, and destinationColor useStates control this

        //render component
        const { getByTestId } = render(<SensorConnect />);
  
        //retrieve statusBox
        const statusBox = getByTestId('leftSensorStatusBox');
        
        //text text displayed by child
        expect(statusBox).toHaveTextContent('No Path Selected');
        //color of box
        expect(statusBox).toHaveStyle({ backgroundColor: 'grey' });

    });

    it("Test Initialization RightSensor Status", () => {
        //Expect a grey box, with the text "No Directory Selected".
        //The value of the destinationDir, destinationStatus, and destinationColor useStates control this

        //render component
        const { getByTestId } = render(<SensorConnect />);
  
        //retrieve statusBox
        const statusBox = getByTestId('rightSensorStatusBox');
        
        //text text displayed by child
        expect(statusBox).toHaveTextContent('No Path Selected');
        //color of box
        expect(statusBox).toHaveStyle({ backgroundColor: 'grey' });

    });
});

describe("Test Button Initialization", () => {
    afterEach(() => {
        cleanup();
    });

    it("Test Button for Destination Path", () => { 
        
        const { getByTestId } = render(<SensorConnect />);

        const button = getByTestId('destinationButton');

        expect(button).toHaveTextContent("Click me to Select the Path")
    });
    it("Test Button for LeftSensor Path", () => { 
        
        const { getByTestId } = render(<SensorConnect />);

        const button = getByTestId('leftSensorButton');

        expect(button).toHaveTextContent("Click me to Select the Path")
    });
    it("Test Button for RightSensor Path", () => { 
        
        const { getByTestId } = render(<SensorConnect />);

        const button = getByTestId('rightSensorButton');

        expect(button).toHaveTextContent("Click me to Select the Path")
    });
    it("Test Continue Button", () => { 
        
        const { getByTestId } = render(<SensorConnect />);

        const button = getByTestId('attemptContinueButton');

        expect(button).toHaveTextContent("Continue");
    });
});


describe("Test Modal View", () => {
    afterEach(() => {
        cleanup();
    });

    it("Test Modal View does not display upon initialization", () => {
        const {getByTestId} = render(<SensorConnect />);

        const modalView = getByTestId('modalView');

        const isVisible = modalView.props.visible;
        
        expect(isVisible).toBe(false);
        
    });
    it("Test Modal View Displays when Continue Clicked", () => {
        const {getByTestId} = render(<SensorConnect />);

        const continueButton = getByTestId('attemptContinueButton');

        //try to continue
        fireEvent.press(continueButton);
        
        //modal View should pop up
        const modalView = getByTestId('modalView');
        const isVisible = modalView.props.visible;

        expect(isVisible).toBe(true);
    });
});

describe("Test Modal View Buttons", () => {
    afterEach(() => {
        cleanup();
    });

    it("Test Go Back Button", () => {
        const {getByTestId, rerender} = render(<SensorConnect />);

        const continueButton = getByTestId('attemptContinueButton');

        //try to continue, modal View displays
        fireEvent.press(continueButton);

        //rerender, so can access modal buttons
        rerender(<SensorConnect />);

        //get the goBack button
        const goBackButton = getByTestId('modalBackButton');
        expect(goBackButton).toHaveTextContent("Go Back");

        //press it
        fireEvent.press(goBackButton);

        //rerender to apply changes
        rerender(<SensorConnect />);

        //modal View should go away
        const modalView = getByTestId('modalView');
        const isVisible = modalView.props.visible;

        expect(isVisible).toBe(false);
    });

    it("Test Go Modal Continue Button/Navigation", () => {    
        // Mock the navigation prop
        const mockNavigation = { navigate: jest.fn() };

        //render the application
        const {getByTestId, rerender} = render(
        <NavigationContainer>
            <SensorConnect navigation={mockNavigation}/>
        </NavigationContainer>
        );

        const continueButton = getByTestId('attemptContinueButton');
        expect(continueButton).toHaveTextContent("Continue");

        //try to continue, modal View displays
        fireEvent.press(continueButton);

        //rerender, so can access modal buttons
        rerender(
        <NavigationContainer>
            <SensorConnect navigation={mockNavigation}/>
        </NavigationContainer>);

        //get the goBack button
        const modalContinueButton = getByTestId('modalContinueButton');

        //press it
        fireEvent.press(modalContinueButton);

        //should navigate to next page
        expect(mockNavigation.navigate).toHaveBeenCalledWith('Input Report Data');
    });

});
