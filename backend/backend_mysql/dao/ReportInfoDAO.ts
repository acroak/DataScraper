/*
* Report Info DAO contains getReportInfo, getReportInfoById, putReportInfo
*/
import { connection } from '../db';
import moment from 'moment';

export default class ReportInfoDAO {
    // GET
    // Retrieves a list of reports with pagination support.
    static async getReportInfo({
        page = 0,
        itemsPerPage = 20,
    } = {}): Promise<any> {
        var idStart = (itemsPerPage * page) + 10001;
        var idEnd = idStart + itemsPerPage + 1;
        return new Promise((resolve, reject) => {
            // Selects all columns from the ReportInfo table
            connection.query(`SELECT * FROM ReportInfo`, function(error: any, results: any) {
                if (error) {
                    return reject(error);
                }

                return resolve(results);
            });
        });
    }

    // GET BY ID
    // Retrieves a specific report by ReportId.
    static async getReportInfoById({
        page = 0,
        itemsPerPage = 20,
        ReportId = "No id given"
    } = {}): Promise<any> {
        var idStart = (itemsPerPage * page) + 10001;
        var idEnd = idStart + itemsPerPage + 1;
        return new Promise((resolve, reject) => {
            // Selects all columns from the ReportInfo table where ReportId matches the provided id
            connection.query(`SELECT * FROM ReportInfo WHERE ReportId='${ReportId}'`, function(error: any, results: any) {
                if (error) {
                    return reject(error);
                }

                return resolve(results);
            });
        });
    }

    // PUT
    // Inserts a new report into the ReportInfo table.
    static async putReportInfo({
        LastKnownUser = "Not Provided",
        Tester = "Not Provided",
        DateTested = moment().format('YYYY-MM-DD HH:mm:ss'),
        ReportLocation = "Not Provided",
        TesterComments = "Not Provided",
        KitId = "Not Provided"
    } = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            // Inserts a new record into the ReportInfo table with provided values
            connection.query(`Insert Into ReportInfo(
                LastKnownUser, 
                Tester, 
                DateTested, 
                ReportLocation, 
                TesterComments, 
                KitId
            ) values (
                "${LastKnownUser}", 
                "${Tester}", 
                "${DateTested}", 
                "${ReportLocation}", 
                "${TesterComments}", 
                "${KitId}"
            );`, function(error: any, results: any) {
                if (error) {
                    return reject(error);
                }

                return resolve(results);
            });
        });
    }

    // DELETE BY ID
    // Deletes a report from the ReportInfo table based on ReportId.
    static async deleteById({
        ReportId = 0
    } = {}): Promise<any> {
        let tableName = "ReportInfo";
        let idVariable = "ReportId"

        // Constructs a DELETE query to remove a record from the ReportInfo table with the given ReportId
        const megaquery = `
        DELETE from ${tableName} where ${idVariable} = ${ReportId}
        `
        return new Promise((resolve, reject) => {
            // Executes the constructed DELETE query
            connection.query(megaquery, function(error: any, results: any) {
                if (error) {
                    return reject(error);
                }

                return resolve(results);
            });
        });
    }
}
