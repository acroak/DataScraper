import axios from 'axios';
import {BACKEND_BASE_URL} from "@env"

const URL = BACKEND_BASE_URL;

/*
Class to request queries from the backend to the headset table
*/
class HeadsetDataService{
    //Get all from the table
    getAll(){
        return axios.get(`${URL}/api/v1/stingray/HeadsetInfo/`);
    }
    //Not implemented for headset, DAO currently searches via "HeadsetId", which is no longer a column of the table
    getById(Id=0){
        return axios.get(`${URL}/api/v1/stingray/HeadsetInfo/${Id}`);
    }
    //put data in the HeadsetInfo table
    put(data){
        return axios.put(`${URL}/api/v1/stingray/HeadsetInfo/`, data);
    }
}

export default new HeadsetDataService();
