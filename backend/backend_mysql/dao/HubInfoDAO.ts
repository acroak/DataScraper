/*
* Hub Info DAO contains getHubInfo, getHubInfoById, putHubInfo, deleteById
*/
import { connection } from '../db';

export default class HubInfoDAO {
    // GET
    // Retrieves a list of hub information with pagination support.
    static async getHubInfo({
        page = 0,
        itemsPerPage = 20,
    } = {}): Promise<any> {
        var idStart = (itemsPerPage * page) + 10001;
        var idEnd = idStart + itemsPerPage + 1;
        return new Promise((resolve, reject) => {
            // Selects all columns from the HubInfo table
            connection.query(`SELECT * FROM HubInfo`, function(error: any, results: any) {
                if (error){
                    return reject(error);
                } 

                return resolve(results);
            });
        });
    }

    // GET BY ID
    // Retrieves hub information for a specific HubId.
    static async getHubInfoById({
        page = 0,
        itemsPerPage = 20,
        HubId = 0
    } = {}): Promise<any> {
        var idStart = (itemsPerPage * page) + 10001;
        var idEnd = idStart + itemsPerPage + 1;
        return new Promise((resolve, reject) => {
            // Selects all columns from the HubInfo table where HubId matches the provided id
            connection.query(`SELECT * FROM HubInfo WHERE HubId='${HubId}'`, function(error: any, results: any) {
                if (error){
                    return reject(error);
                } 

                return resolve(results);
            });
        });
    }

    // PUT
    // Inserts a new hub information into the HubInfo table.
    static async putHubInfo({
        PhysicalDamage = "Not Provided",
        ConditionOfCables = "Not Provided",
        ChargerCondition = "Not Provided",
        HubPortFunc = "Not Provided",
        HubOverheat = "Not Provided",
        KitId = "Not Provided",
        ReportId = "Not Provided"
    } = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            // Inserts a new record into the HubInfo table with provided values
            connection.query(`Insert Into HubInfo(
                PhysicalDamage, 
                ConditionOfCables, 
                ChargerCondition, 
                HubPortFunc, 
                HubOverheat, 
                KitId,
                ReportId
            ) values (
                "${PhysicalDamage}", 
                "${ConditionOfCables}", 
                "${ChargerCondition}", 
                "${HubPortFunc}", 
                "${HubOverheat}",
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
    // Deletes hub information from the HubInfo table based on KitId.
    static async deleteById({
        KitId = "Not Provided"
    } = {}): Promise<any> {
        let tableName = "HubInfo";
        let idVariable = "KitId"

        // Constructs a DELETE query to remove a record from the HubInfo table with the given KitId
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
