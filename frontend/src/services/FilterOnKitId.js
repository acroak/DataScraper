import { ReportFilter } from './ReportFilter';
import HistoricalReportDataService from './historicalreport';


/*
* This is a filter which can be swapped in for its parent ReportFilter class.
* This implementation focuses on filtering historical reports with the Kit ID
* 
*/
export class FilterOnKitId extends ReportFilter {
    //Constructor
    constructor() {
        super();
        this.title = "Kit"
    }
    /*
    Method that uses the HistoricalReportDataService class from 
    historicalreport.js. Queries the backend to retrieve historical reports
    that have the input kit id

    key - int, kit Id to search for old report(s) with.
    Returns the reports as JSON objects
    */
    async apiGet(key) {
        return HistoricalReportDataService.getByKitId(key).then(
            response => {
                if (response.status === 200){
                    console.log(response.data.Report);
                    return response.data.Report
                }
            }
        )
            .catch(e => {
                console.error(e);
            })

    }
}

