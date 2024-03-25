import { ReportFilter } from './ReportFilter';
import HistoricalReportDataService from './historicalreport';

/*
* This is a filter which can be swapped in for its parent ReportFilter class.
* This implementation focuses on filtering historical reports with the Report ID
* 
*/
export class FilterOnReportId extends ReportFilter {
    //Constructor
    constructor() {
        super();
        this.title = "Report"

    }
    /*
    Method that uses the HistoricalReportDataService class from 
    historicalreport.js. Queries the backend to retrieve historical reports
    that have the input report id

    key - int, report Id to search for old report(s) with.
    Returns the reports as JSON objects
    */
    async apiGet(key) {
        return HistoricalReportDataService.getByReportId(key).then(
            response => {
                //console.log(response.data.Report);
                if (response.status === 200) return response.data.Report;

            }
        )
            .catch(e => {
                console.error(e);
            })

    }
}
