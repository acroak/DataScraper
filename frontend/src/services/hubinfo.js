import axios from 'axios';
import {BACKEND_BASE_URL} from "@env"

const URL = BACKEND_BASE_URL;

/*
Class to request queries from the backend to the HubInfo table
*/
class HubInfoDataService {
    //Get all from the table
    getAll() {
        return axios.get(`${URL}/api/v1/stingray/HubInfo/`);
    }
    //Not implemented for Hub, DAO currently searches via "HubId", which is no longer a column of the table
    getById(Id = 0) {
        return axios.get(`${URL}/api/v1/stingray/HubInfo/${Id}`);
    }
    //Put data in the table
    put(data) {
        return axios.put(`${URL}/api/v1/stingray/HubInfo/`, data);
    }
}

export default new HubInfoDataService();
