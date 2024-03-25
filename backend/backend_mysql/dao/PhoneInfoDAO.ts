/*
* Report Info DAO contains getPhoneInfo, getPhoneInfoById, putPhoneInfo, deleteById
*/
import { connection } from '../db';

export default class PhoneInfoDAO {
    // GET
    // Retrieves a list of phone information with pagination support.
    static async getPhoneInfo({
        page = 0,
        itemsPerPage = 20,
    } = {}): Promise<any> {
        var idStart = (itemsPerPage * page) + 10001;
        var idEnd = idStart + itemsPerPage + 1;
        return new Promise((resolve, reject) => {
            // Selects all columns from the PhoneInfo table
            connection.query(`SELECT * FROM PhoneInfo`, function(error: any, results: any) {
                if (error){
                    return reject(error);
                } 

                return resolve(results);
            });
        });
    }

    // GET BY ID
    // Retrieves phone information for a specific PhoneId.
    static async getPhoneInfoById({
        page = 0,
        itemsPerPage = 20,
        PhoneId = 0
    } = {}): Promise<any> {
        var idStart = (itemsPerPage * page) + 10001;
        var idEnd = idStart + itemsPerPage + 1;
        return new Promise((resolve, reject) => {
            // Selects all columns from the PhoneInfo table where PhoneId matches the provided id
            connection.query(`SELECT * FROM PhoneInfo WHERE PhoneId='${PhoneId}'`, function(error: any, results: any) {
                if (error){
                    return reject(error);
                } 

                return resolve(results);
            });
        });
    }

    // PUT
    // Inserts a new phone information into the PhoneInfo table.
    static async putPhoneInfo({
        PhoneId = "Not Provided",
        PhysicalDamage = "Not Provided",
        VolButtonFunc = "Not Provided",
        PowerButtonFunc = "Not Provided",
        ChargingPort = "Not Provided",
        SIMCardFunc = "Not Provided",
        MemCardFunc = "Not Provided",
        PhoneCaseCondition = "Not Provided",
        ConditionOfCable = "Not Provided",
        TouchScreenFunc = "Not Provided",
        WiFiFunc = "Not Provided",
        BluetoothFunc = "Not Provided",
        CellDataFunc = "Not Provided",
        SpeakerFunc = "Not Provided",
        KitId = "Not Provided",
        ReportId = "Not Provided"
    } = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            // Inserts a new record into the PhoneInfo table with provided values
            connection.query(`Insert Into PhoneInfo(
                PhoneId,
                PhysicalDamage,
                VolButtonFunc,
                PowerButtonFunc,
                ChargingPort,
                SIMCardFunc,
                MemCardFunc,
                PhoneCaseCondition,
                ConditionOfCable,
                TouchScreenFunc,
                WiFiFunc,
                BluetoothFunc,
                CellDataFunc,
                SpeakerFunc,
                KitId,
                ReportId
) values (
            "${PhoneId}", 
            "${PhysicalDamage}", 
            "${VolButtonFunc}", 
            "${PowerButtonFunc}", 
            "${ChargingPort}", 
            "${SIMCardFunc}", 
            "${MemCardFunc}", 
            "${PhoneCaseCondition}", 
            "${ConditionOfCable}", 
            "${TouchScreenFunc}", 
            "${WiFiFunc}", 
            "${BluetoothFunc}", 
            "${CellDataFunc}", 
            "${SpeakerFunc}",
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
    // Deletes phone information from the PhoneInfo table based on PhoneId.
    static async deleteById({
        PhoneId = "Not Provided"
    } = {}): Promise<any> {
        let tableName = "PhoneInfo";
        let idVariable = "PhoneId"

        // Constructs a DELETE query to remove a record from the PhoneInfo table with the given PhoneId
        const megaquery = `
        DELETE from ${tableName} where ${idVariable} = "${PhoneId}"
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
