import axios from 'axios';

import {BACKEND_BASE_URL} from "@env"

const URL = BACKEND_BASE_URL;

/*
Class to request queries from the backend to the PhoneInfo table
*/
class PhoneDataService{
    //Get All Report Instances
    getAll(){
        return axios.get(`${URL}/api/v1/stingray/PhoneInfo/`);
    }
    //Get reports by PhoneID
    getById(Id=0){
        return axios.get(`${URL}/api/v1/stingray/PhoneInfo/${Id}`);
    }
    //Put new Phone Report Data
    put(data){
        return axios.put(`${URL}/api/v1/stingray/PhoneInfo/`, data);
    }
}

export default new PhoneDataService();



