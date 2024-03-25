/*
Unit Test for the historicalreport.js file

Tests requesting data from the backend via KitId and ReportId
*/

import HistoricalReportDataService from '../services/historicalreport'
import {cleanup} from '@testing-library/react-native';
import axios from 'axios';
import {BACKEND_BASE_URL} from "@env"

const URL = BACKEND_BASE_URL;

jest.mock('axios');

describe('Test Requesting From Axios', () => {
    afterEach(() => {
        cleanup();
    });

    it('Fetch via KitId', async () => {
        const mockData = { data: 'WOOT' };
        axios.get.mockResolvedValue(mockData);
        
        const result = await HistoricalReportDataService.getByKitId(251);
    
        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(`${URL}/api/v1/stingray/ReportByKitId/251`);
    });

    it('Fetch via ReportId', async () => {
        const mockData = { data: 'WOOT' };
        axios.get.mockResolvedValue(mockData);
        
        const result = await HistoricalReportDataService.getByReportId(251);
    
        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(`${URL}/api/v1/stingray/ReportByReportId/251`);
    });

});