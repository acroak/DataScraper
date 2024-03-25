/*
* Headset Info DAO contains getHeadsetInfo, getHeadsetInfoById, putHeadsetInfo, deleteById
*/
import { connection } from '../db';

export default class HeadsetInfoDAO {
    // GET
    // Retrieves a list of headset information with pagination support.
    static async getHeadsetInfo({
        page = 0,
        itemsPerPage = 20,
    } = {}): Promise<any> {
        var idStart = (itemsPerPage * page) + 10001;
        var idEnd = idStart + itemsPerPage + 1;
        return new Promise((resolve, reject) => {
            // Selects all columns from the HeadsetInfo table
            connection.query(`SELECT * FROM HeadsetInfo`, function(error: any, results: any) {
                if (error){
                    return reject(error);
                } 

                return resolve(results);
            });
        });
    }

    // GET BY ID
    // Retrieves headset information for a specific HeadsetId.
    static async getHeadsetInfoById({
        page = 0,
        itemsPerPage = 20,
        HeadsetId = 0
    } = {}): Promise<any> {
        var idStart = (itemsPerPage * page) + 10001;
        var idEnd = idStart + itemsPerPage + 1;
        return new Promise((resolve, reject) => {
            // Selects all columns from the HeadsetInfo table where HeadsetId matches the provided id
            connection.query(`SELECT * FROM HeadsetInfo WHERE HeadsetId='${HeadsetId}'`, function(error: any, results: any) {
                if (error){
                    return reject(error);
                } 

                return resolve(results);
            });
        });
    }

    // PUT
    // Inserts a new headset information into the HeadsetInfo table.
    static async putHeadsetInfo({
        PhysicalDamage = "Not Provided",
        ConnectorDamage = "Not Provided",
        ConditionOfCables = "Not Provided",
        AudioFuncLeftChannel = "Not Provided",
        AudioFuncRightChannel = "Not Provided",
        AudioQuality = "Not Provided",
        VolButtonFunc = "Not Provide",
        PowerButtonFunc = "Not Provided",
        KitId = "Not Provided",
        ReportId = "Not Provided"
    } = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            // Inserts a new record into the HeadsetInfo table with provided values
            connection.query(`Insert Into HeadsetInfo(
                PhysicalDamage, 
                ConnectorDamage, 
                ConditionOfCables, 
                AudioFuncLeftChannel, 
                AudioFuncRightChannel, 
                AudioQuality, 
                VolButtonFunc, 
                PowerButtonFunc, 
                KitId,
                ReportId
            ) values (
                "${PhysicalDamage}", 
                "${ConnectorDamage}", 
                "${ConditionOfCables}", 
                "${AudioFuncLeftChannel}", 
                "${AudioFuncRightChannel}", 
                "${AudioQuality}", 
                "${VolButtonFunc}", 
                "${PowerButtonFunc}", 
                "${KitId}",
                "${ReportId}"
            );`, function(error: any, results: any) {
                if (error){
                    return reject(error);
                } 

                return resolve(results);
            });
        });
    }

    // DELETE BY ID
    // Deletes headset information from the HeadsetInfo table based on KitId.
    static async deleteById({
        KitId = "Not Provided"
    } = {}): Promise<any> {
        let tableName = "HeadsetInfo";
        let idVariable = "KitId"

        // Constructs a DELETE query to remove a record from the HeadsetInfo table with the given KitId
        const megaquery = `
        DELETE from ${tableName} where ${idVariable} = "${KitId}"
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
