import axios from 'axios';
import {BACKEND_BASE_URL} from "@env"

const URL = BACKEND_BASE_URL;

/*
Class to request queries from the backend to the KitInfo table
*/
class KitInfoDataService{
    //Get all from the table
    getAll(){
        return axios.get(`${URL}/api/v1/stingray/KitInfo/`)
    }
    //Get all rows of the table with a matching KitId to the input ID
    getById(Id=0){
        return axios.get(`${URL}/api/v1/stingray/KitInfo/${Id}`)
    }
    //Put data in the table
    put(data){
        return axios.put(`${URL}/api/v1/stingray/KitInfo/`, data);
    }
 
}

export default new KitInfoDataService();
