/*
* Right Sensor DAO contains getRightSensor, getRightSensorById, putRightSensor, deleteById
*/
import { connection } from '../db';

export default class RightSensorDAO {
    // GET
    // Retrieves a list of right sensors with pagination support.
    static async getRightSensor({
        page = 0,
        itemsPerPage = 20,
    } = {}): Promise<any> {
        var idStart = (itemsPerPage * page) + 10001;
        var idEnd = idStart + itemsPerPage + 1;
        return new Promise((resolve, reject) => {
            // Selects all columns from the RightSensor table
            connection.query(`SELECT * FROM RightSensor`, function(error: any, results: any) {
                if (error){
                    return reject(error);
                } 

                return resolve(results);
            });

        });
    }

    // GET BY ID
    // Retrieves a specific right sensor by RightSensorId.
    static async getRightSensorById({
        page = 0,
        itemsPerPage = 20,
        RightSensorId = 0
    } = {}): Promise<any> {
        var idStart = (itemsPerPage * page) + 10001;
        var idEnd = idStart + itemsPerPage + 1;
        return new Promise((resolve, reject) => {
            // Selects all columns from the RightSensor table where RightSensorId matches the provided id
            connection.query(`SELECT * FROM RightSensor WHERE RightSensorId='${RightSensorId}'`, function(error: any, results: any) {
                if (error){
                    return reject(error);
                } 

                return resolve(results);
            });

        });
    }

    // PUT
    // Inserts a new right sensor into the RightSensor table.
    static async putRightSensor({
        RightSensorID = "Not Provided",
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
            // Inserts a new record into the RightSensor table with provided values
            connection.query(`Insert Into RightSensor(
                RightSensorId, 
                PhysicalDamage, 
                ConnectorFunc, 
                MountingBrackets, 
                ConditionOfCables, 
                BluetoothFunc, 
                DataTrans, 
                KitId,
                ReportId
            ) values (
                "${RightSensorID}", 
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
    // Deletes a right sensor from the RightSensor table based on RightSensorId.
    static async deleteById({
        RightSensorId = "Not Provided"
    } = {}): Promise<any> {
        let tableName = "RightSensor";
        let idVariable = "RightSensorId"

        // Constructs a DELETE query to remove a record from the RightSensor table with the given RightSensorId
        const megaquery = `
        DELETE from ${tableName} where ${idVariable} = "${RightSensorId}"
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
