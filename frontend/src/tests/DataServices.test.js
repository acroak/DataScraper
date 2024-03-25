/*
Unit Test for the DataService methods in the following files:
- headset.js
- hubinfo.js
- kit.js
- leftsensor.js
- rightsensor.js
- phone.js
- report.js

Each file has three methods:
- GetAll
- GetById
- Put

*/

import {cleanup} from '@testing-library/react-native';
import axios from 'axios';
import {BACKEND_BASE_URL} from "@env"
import HeadsetDataService from '../services/headset'
import HubInfoDataService from '../services/hubinfo'
import KitInfoDataService from '../services/kit'
import LSDataService from '../services/leftsensor'
import RSDataService from '../services/rightsensor'
import PhoneDataService from '../services/phone'
import ReportDataService from '../services/report'

const URL = BACKEND_BASE_URL;

//mock requesting from the backend
jest.mock('axios');

describe('Test headset.js data services', () => {
    afterEach(() => {
        cleanup();
    });

    it('Test GetAll for headset.js', async () => {
        const mockData = { data: 'all headsets' };
        axios.get.mockResolvedValue(mockData);
        
        const service = HeadsetDataService
        const result = await service.getAll();
        
        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(`${URL}/api/v1/stingray/HeadsetInfo/`);
    });

    it('Test GetById for headset.js', async () => {
        const Id = 251;
        const mockData = { data: `headset_${Id}` };
        axios.get.mockResolvedValue(mockData);
        
        const service = HeadsetDataService
        const result = await service.getById(Id);
        
        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(`${URL}/api/v1/stingray/HeadsetInfo/${Id}`);
    });

    it('Test Put request for headset.js', async () => {
        const data = 251;
        axios.put.mockResolvedValue(`Recieved Put Request for data: ${data}`);
        
        const service = HeadsetDataService
        const result = await service.put(data);
        
        expect(result).toEqual('Recieved Put Request for data: 251');
        expect(axios.put).toHaveBeenCalledWith(`${URL}/api/v1/stingray/HeadsetInfo/`, data);
    });
});

describe('Test hubinfo.js data services', () => {
    afterEach(() => {
        cleanup();
    });

    it('Test GetAll for hubinfo.js', async () => {
        const mockData = { data: 'all hub infos' };
        axios.get.mockResolvedValue(mockData);
        
        const service = HubInfoDataService
        const result = await service.getAll();
        
        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(`${URL}/api/v1/stingray/HubInfo/`);
    });

    it('Test GetById for hubinfo.js', async () => {
        const Id = 251;
        const mockData = { data: `hub_${Id}` };
        axios.get.mockResolvedValue(mockData);
        
        const service = HubInfoDataService
        const result = await service.getById(Id);
        
        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(`${URL}/api/v1/stingray/HubInfo/${Id}`);
    });

    it('Test Put request for hubinfo.js', async () => {
        const data = 251;
        axios.put.mockResolvedValue(`Recieved Put Request for data: ${data}`);
        
        const service = HubInfoDataService
        const result = await service.put(data);
        
        expect(result).toEqual('Recieved Put Request for data: 251');
        expect(axios.put).toHaveBeenCalledWith(`${URL}/api/v1/stingray/HubInfo/`, data);
    });
});

describe('Test kit.js data services', () => {
    afterEach(() => {
        cleanup();
    });

    it('Test GetAll for kit.js', async () => {
        const mockData = { data: 'all kits' };
        axios.get.mockResolvedValue(mockData);
        
        const service = KitInfoDataService
        const result = await service.getAll();
        
        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(`${URL}/api/v1/stingray/KitInfo/`);
    });

    it('Test GetById for kit.js', async () => {
        const Id = 251;
        const mockData = { data: `kit_${Id}` };
        axios.get.mockResolvedValue(mockData);
        
        const service = KitInfoDataService
        const result = await service.getById(Id);
        
        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(`${URL}/api/v1/stingray/KitInfo/${Id}`);
    });

    it('Test Put request for kit.js', async () => {
        const data = 251;
        axios.put.mockResolvedValue(`Recieved Put Request for data: ${data}`);
        
        const service = KitInfoDataService
        const result = await service.put(data);
        
        expect(result).toEqual('Recieved Put Request for data: 251');
        expect(axios.put).toHaveBeenCalledWith(`${URL}/api/v1/stingray/KitInfo/`, data);
    });
});

describe('Test leftsensor.js data services', () => {
    afterEach(() => {
        cleanup();
    });

    it('Test GetAll for leftsensor.js', async () => {
        const mockData = { data: 'all L sensors' };
        axios.get.mockResolvedValue(mockData);
        
        const service = LSDataService
        const result = await service.getAll();
        
        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(`${URL}/api/v1/stingray/LeftSensor/`);
    });

    it('Test GetById for leftsensor.js', async () => {
        const Id = 251;
        const mockData = { data: `LeftSensor_${Id}` };
        axios.get.mockResolvedValue(mockData);
        
        const service = LSDataService
        const result = await service.getById(Id);
        
        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(`${URL}/api/v1/stingray/LeftSensor/${Id}`);
    });

    it('Test Put request for leftsensor.js', async () => {
        const data = 251;
        axios.put.mockResolvedValue(`Recieved Put Request for data: ${data}`);
        
        const service = LSDataService
        const result = await service.put(data);
        
        expect(result).toEqual('Recieved Put Request for data: 251');
        expect(axios.put).toHaveBeenCalledWith(`${URL}/api/v1/stingray/LeftSensor/`, data);
    });
});

describe('Test rightsensor.js data services', () => {
    afterEach(() => {
        cleanup();
    });

    it('Test GetAll for rightsensor.js', async () => {
        const mockData = { data: 'all R sensors' };
        axios.get.mockResolvedValue(mockData);
        
        const service = RSDataService
        const result = await service.getAll();
        
        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(`${URL}/api/v1/stingray/RightSensor/`);
    });

    it('Test GetById for rightsensor.js', async () => {
        const Id = 251;
        const mockData = { data: `RightSensor_${Id}` };
        axios.get.mockResolvedValue(mockData);
        
        const service = RSDataService
        const result = await service.getById(Id);
        
        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(`${URL}/api/v1/stingray/RightSensor/${Id}`);
    });

    it('Test Put request for rightsensor.js', async () => {
        const data = 251;
        axios.put.mockResolvedValue(`Recieved Put Request for data: ${data}`);
        
        const service = RSDataService
        const result = await service.put(data);
        
        expect(result).toEqual('Recieved Put Request for data: 251');
        expect(axios.put).toHaveBeenCalledWith(`${URL}/api/v1/stingray/RightSensor/`, data);
    });
});

describe('Test phone.js data services', () => {
    afterEach(() => {
        cleanup();
    });

    it('Test GetAll for phone.js', async () => {
        const mockData = { data: 'all phones' };
        axios.get.mockResolvedValue(mockData);
        
        const service = PhoneDataService
        const result = await service.getAll();
        
        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(`${URL}/api/v1/stingray/PhoneInfo/`);
    });

    it('Test GetById for phone.js', async () => {
        const Id = 251;
        const mockData = { data: `Phone_${Id}` };
        axios.get.mockResolvedValue(mockData);
        
        const service = PhoneDataService
        const result = await service.getById(Id);
        
        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(`${URL}/api/v1/stingray/PhoneInfo/${Id}`);
    });

    it('Test Put request for phone.js', async () => {
        const data = 251;
        axios.put.mockResolvedValue(`Recieved Put Request for data: ${data}`);
        
        const service = PhoneDataService
        const result = await service.put(data);
        
        expect(result).toEqual('Recieved Put Request for data: 251');
        expect(axios.put).toHaveBeenCalledWith(`${URL}/api/v1/stingray/PhoneInfo/`, data);
    });
});

describe('Test report.js data services', () => {
    afterEach(() => {
        cleanup();
    });

    it('Test GetAll for report.js', async () => {
        const mockData = { data: 'all reports' };
        axios.get.mockResolvedValue(mockData);
        
        const service = ReportDataService
        const result = await service.getAll();
        
        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(`${URL}/api/v1/stingray/ReportInfo/`);
    });

    it('Test GetById for report.js', async () => {
        const Id = 251;
        const mockData = { data: `Report_${Id}` };
        axios.get.mockResolvedValue(mockData);
        
        const service = ReportDataService
        const result = await service.getById(Id);
        
        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(`${URL}/api/v1/stingray/ReportInfo/${Id}`);
    });

    it('Test Put request for report.js', async () => {
        const data = 251;
        axios.put.mockResolvedValue(`Recieved Put Request for data: ${data}`);
        
        const service = ReportDataService
        const result = await service.put(data);
        
        expect(result).toEqual('Recieved Put Request for data: 251');
        expect(axios.put).toHaveBeenCalledWith(`${URL}/api/v1/stingray/ReportInfo/`, data);
    });

});