/*
Unit Test for the RetrieveBy.js component

Tests succesful navigation to the button to create a new report
and the button to retrieve a historical report.
*/

import RetrieveBy from '../components/RetrieveBy'
import {render, fireEvent, cleanup} from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';


describe('Test Button Functionality', () => {
    afterEach(() => {
      cleanup();
    });
  
    it('Test KitId Button', () => {
        const { getByTestId, rerender } = render(<RetrieveBy />);
        
        //get button
        const kitIDButton = getByTestId("KitIdButton");
        
        //press it
        fireEvent.press(kitIDButton);
        rerender(<RetrieveBy/>);

        //text should have changed
        const text = getByTestId("InstructionText");

        expect(text.props.children).toBe("Enter Kit Id:");
    });

    it('Test ReportId Button', () => {
        const { getByTestId, rerender } = render(<RetrieveBy />);
        
        //get button
        const reportIDButton = getByTestId("ReportIdButton");
        
        //press it
        fireEvent.press(reportIDButton);
        rerender(<RetrieveBy/>);

        //text should have changed
        const text = getByTestId("InstructionText");

        expect(text.props.children).toBe("Enter Report Id:");
    });

});

