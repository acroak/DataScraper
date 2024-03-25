import axios from 'axios';
import {BACKEND_BASE_URL} from "@env"

const URL = BACKEND_BASE_URL;

/*
Class to request queries from the backend to the RightSensor table
*/
class RSDataService{
    //Get all
    getAll(){
        return axios.get(`${URL}/api/v1/stingray/RightSensor/`);
    }
    //Get all rows from the table where the RightSensorId matches the input Id
    getById(Id=0){
        return axios.get(`${URL}/api/v1/stingray/RightSensor/${Id}`);
    }
    //put data into the table
    put(data){
        return axios.put(`${URL}/api/v1/stingray/RightSensor/`, data);
    }
}

export default new RSDataService();
