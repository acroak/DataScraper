/*
* Kit Info DAO contains getKitInfo, getKitInfoById, putKitInfo, deleteById
*/
import { connection } from '../db';

export default class KitInfoDAO {
    // GET
    // Retrieves a list of kit information with pagination support.
    static async getKitInfo({
        page = 0,
        itemsPerPage = 20,
    } = {}): Promise<any> {
        var idStart = (itemsPerPage * page) + 10001;
        var idEnd = idStart + itemsPerPage + 1;
        return new Promise((resolve, reject) => {
            // Selects all columns from the KitInfo table
            connection.query(`SELECT * FROM KitInfo`, function(error: any, results: any) {
                if (error){
                    return reject(error);
                } 

                return resolve(results);
            });
        });
    }

    // GET BY ID
    // Retrieves kit information for a specific KitId.
    static async getKitInfoById({
        page = 0,
        itemsPerPage = 20,
        KitId = 0
    } = {}): Promise<any> {
        var idStart = (itemsPerPage * page) + 10001;
        var idEnd = idStart + itemsPerPage + 1;
        return new Promise((resolve, reject) => {
            // Selects all columns from the KitInfo table where KitId matches the provided id
            connection.query(`SELECT * FROM KitInfo WHERE KitId='${KitId}'`, function(error: any, results: any) {
                if (error){
                    return reject(error);
                } 

                return resolve(results);
            });
        });
    }

    // PUT
    // Inserts a new kit information into the KitInfo table.
    static async putKitInfo({
        KitId = "Not Provided",
        LeftSensorId = "Not Provided",
        RightSensorId = "Not Provided",
        PhoneId = "Not Provided",
    } = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            // Inserts a new record into the KitInfo table with provided values
            connection.query(`Insert Into KitInfo(
                KitId, 
                LeftSensorId, 
                RightSensorId, 
                PhoneId
            ) values (
                "${KitId}", 
                "${LeftSensorId}", 
                "${RightSensorId}", 
                "${PhoneId}"
            );`, function(error: any, results: any) {
                if (error){
                    return reject(error);
                } 

                return resolve(results);
            });
        });
    }

    // DELETE
    // Deletes kit information from the KitInfo table based on KitId.
    static async deleteById({
        KitId = "Not Provided"
    } = {}): Promise<any> {
        const megaquery = `
        DELETE from KitInfo where KitId = "${KitId}"
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
