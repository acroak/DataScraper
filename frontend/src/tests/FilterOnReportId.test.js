/*
Unit Test for the FilterOnReportId.js class

Tests successful and failed responses from the apiGet method.
*/

import HistoricalReportDataService from '../services/historicalreport'
import {cleanup} from '@testing-library/react-native';
import { FilterOnReportId } from '../services/FilterOnReportId';

jest.mock('axios');
jest.mock('../services/historicalreport') 

describe('Test FilterOnReportId', () => {
    afterEach(() => {
        cleanup();
    });

    it('test a successful response', async () => {
        const mockKey = 251
        const mockResponse = {
            status: 200,
            data: {
              Report: 'mocked report',
            },
        };
        
        //mock resolving a promise
        HistoricalReportDataService.getByReportId.mockResolvedValue(Promise.resolve(mockResponse));
        
        //create new filter object
        const filter = new FilterOnReportId();
        //use the method which calls HistoricalReportDataService
        const result = await filter.apiGet(mockKey);

        //should get back the response from HistoricalReportDataService
        expect(result).toEqual(mockResponse.data.Report);
        expect(HistoricalReportDataService.getByReportId).toHaveBeenCalledWith(mockKey);

    });

    it('test when status is not 200', async () => {
        const mockKey = 251
        const mockResponse = {
            status: 100,
            data: {
              Report: 'mocked report',
            },
          };
        
        //mock resolving a promise
        HistoricalReportDataService.getByReportId.mockResolvedValue(Promise.resolve(mockResponse));
        
        //create new filter object
        const filter = new FilterOnReportId();
        //use the method which calls HistoricalReportDataService
        const result = await filter.apiGet(mockKey);

        //should NOT get back the response from HistoricalReportDataService
        expect(result).not.toEqual(mockResponse.data.Report);
        expect(HistoricalReportDataService.getByReportId).toHaveBeenCalledWith(mockKey);

    });
});