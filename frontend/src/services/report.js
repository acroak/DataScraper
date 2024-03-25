import axios from 'axios';
import {BACKEND_BASE_URL} from "@env"

const URL = BACKEND_BASE_URL;

/*
Class to request queries from the backend to the ReportInfo table
*/
class ReportDataService{
    //Get All Report Instances
    getAll(){
        return axios.get(`${URL}/api/v1/stingray/ReportInfo/`);
    }
    //Get reports by ReportID
    getById(Id=0){
        return axios.get(`${URL}/api/v1/stingray/ReportInfo/${Id}`);
    }
    //Put new Report Report Data
    put(data){
        return axios.put(`${URL}/api/v1/stingray/ReportInfo/`, data);
    }
}

export default new ReportDataService();
