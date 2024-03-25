/*
* Left Sensor DAO contains getLeftSensor, getLeftSensorById, putLeftSensor, deleteById
*/
import { connection } from '../db';

export default class LeftSensorDAO {
    // GET
    // Retrieves a list of left sensors with pagination support.
    static async getLeftSensor({
        page = 0,
        itemsPerPage = 20,
    } = {}): Promise<any> {
        var idStart = (itemsPerPage * page) + 10001;
        var idEnd = idStart + itemsPerPage + 1;
        return new Promise((resolve, reject) => {
            // Selects all columns from the LeftSensor table
            connection.query(`SELECT * FROM LeftSensor`, function(error: any, results: any) {
                if (error){
                    return reject(error);
                } 

                return resolve(results);
            });
        });
    }

    // GET BY ID
    // Retrieves a specific left sensor by LeftSensorId.
    static async getLeftSensorById({
        page = 0,
        itemsPerPage = 20,
        LeftSensorId = 0
    } = {}): Promise<any> {
        var idStart = (itemsPerPage * page) + 10001;
        var idEnd = idStart + itemsPerPage + 1;
        return new Promise((resolve, reject) => {
            // Selects all columns from the LeftSensor table where LeftSensorId matches the provided id
            connection.query(`SELECT * FROM LeftSensor WHERE LeftSensorId='${LeftSensorId}'`, function(error: any, results: any) {
                if (error){
                    return reject(error);
                } 

                return resolve(results);
            });
        });
    }

    // PUT
    // Inserts a new left sensor into the LeftSensor table.
    static async putLeftSensor({
        LeftSensorID = "Not Provided",
        PhysicalDamage = "Not Provided",
        ConnectorFunc = "Not Provided",
        MountingBrackets = "Not Provided",
        ConditionOfCables = "Not Provided",
        BluetoothFunc = "Not Provided",
        DataTrans = "Not Provided",
        KitId = "Not Provided",
        ReportId = "Not Provided"
    } = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            // Inserts a new record into the LeftSensor table with provided values
            connection.query(`Insert Into LeftSensor(
                LeftSensorId, 
                PhysicalDamage, 
                ConnectorFunc, 
                MountingBrackets, 
                ConditionOfCables, 
                BluetoothFunc, 
                DataTrans, 
                KitId,
                ReportId
            ) values (
                "${LeftSensorID}", 
                "${PhysicalDamage}", 
                "${ConnectorFunc}", 
                "${MountingBrackets}", 
                "${ConditionOfCables}", 
                "${BluetoothFunc}", 
                "${DataTrans}", 
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
    // Deletes a left sensor from the LeftSensor table based on LeftSensorId.
    static async deleteById({
        LeftSensorId = "Not Provided"
    } = {}): Promise<any> {
        let tableName = "LeftSensor";
        let idVariable = "LeftSensorId"

        // Constructs a DELETE query to remove a record from the LeftSensor table with the given LeftSensorId
        const megaquery = `
        DELETE from ${tableName} where ${idVariable} = "${LeftSensorId}"
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
