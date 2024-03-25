/*
Unit Test for the FilterOnKitId.js class

Tests successful and failed responses from the apiGet method.
*/

import HistoricalReportDataService from '../services/historicalreport'
import {cleanup} from '@testing-library/react-native';
import { FilterOnKitId } from '../services/FilterOnKitId';

jest.mock('axios');
jest.mock('../services/historicalreport') 

describe('Test FilterOnKitId', () => {
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
        HistoricalReportDataService.getByKitId.mockResolvedValue(Promise.resolve(mockResponse));
        
        //create new filter object
        const filter = new FilterOnKitId();
        //use the method which calls HistoricalReportDataService
        const result = await filter.apiGet(mockKey);

        //should get back the response from HistoricalReportDataService
        expect(result).toEqual(mockResponse.data.Report);
        expect(HistoricalReportDataService.getByKitId).toHaveBeenCalledWith(mockKey);

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
        HistoricalReportDataService.getByKitId.mockResolvedValue(Promise.resolve(mockResponse));
        
        //create new filter object
        const filter = new FilterOnKitId();
        //use the method which calls HistoricalReportDataService
        const result = await filter.apiGet(mockKey);

        //should NOT get back the response from HistoricalReportDataService
        expect(result).not.toEqual(mockResponse.data.Report);
        expect(HistoricalReportDataService.getByKitId).toHaveBeenCalledWith(mockKey);

    });
});