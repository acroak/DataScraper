import axios from 'axios';

import {BACKEND_BASE_URL} from "@env"

const URL = BACKEND_BASE_URL;

/*
Class to request queries from the backend to the LeftSensor table
*/
class LSDataService{
    //Get all from the table
    getAll(){
        return axios.get(`${URL}/api/v1/stingray/LeftSensor/`);
    }
    //Get all rows from the table where the LeftSensorId matches the input Id
    getById(Id=0){
        return axios.get(`${URL}/api/v1/stingray/LeftSensor/${Id}`);
    }
    //put data into the table
    put(data){
        return axios.put(`${URL}/api/v1/stingray/LeftSensor/`, data);
    }
}

export default new LSDataService();
