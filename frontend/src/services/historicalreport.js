import axios from 'axios';
import {BACKEND_BASE_URL} from "@env"

const URL = BACKEND_BASE_URL;

/*
Class to request historical reports from the backend via the KitId or ReportId
*/
class HistoricalReportDataService{
    getByKitId(Id=0){
        return axios.get(`${URL}/api/v1/stingray/ReportByKitId/${Id}`);
    }
    getByReportId(Id=0){
        return axios.get(`${URL}/api/v1/stingray/ReportByReportId/${Id}`);
    }
}

export default new HistoricalReportDataService();

