"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
* Right Sensor DAO contains getRightSensor, getRightSensorById, putRightSensor, deleteById
*/
const db_1 = require("../db");
class RightSensorDAO {
    // GET
    // Retrieves a list of right sensors with pagination support.
    static getRightSensor({ page = 0, itemsPerPage = 20, } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            var idStart = (itemsPerPage * page) + 10001;
            var idEnd = idStart + itemsPerPage + 1;
            return new Promise((resolve, reject) => {
                // Selects all columns from the RightSensor table
                db_1.connection.query(`SELECT * FROM RightSensor`, function (error, results) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results);
                });
            });
        });
    }
    // GET BY ID
    // Retrieves a specific right sensor by RightSensorId.
    static getRightSensorById({ page = 0, itemsPerPage = 20, RightSensorId = 0 } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            var idStart = (itemsPerPage * page) + 10001;
            var idEnd = idStart + itemsPerPage + 1;
            return new Promise((resolve, reject) => {
                // Selects all columns from the RightSensor table where RightSensorId matches the provided id
                db_1.connection.query(`SELECT * FROM RightSensor WHERE RightSensorId='${RightSensorId}'`, function (error, results) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results);
                });
            });
        });
    }
    // PUT
    // Inserts a new right sensor into the RightSensor table.
    static putRightSensor({ RightSensorID = "Not Provided", PhysicalDamage = "Not Provided", ConnectorFunc = "Not Provided", MountingBrackets = "Not Provided", ConditionOfCables = "Not Provided", BluetoothFunc = "Not Provided", DataTrans = "Not Provided", KitId = "Not Provided", ReportId = "Not Provided" } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                // Inserts a new record into the RightSensor table with provided values
                db_1.connection.query(`Insert Into RightSensor(
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
            );`, function (error, results) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results);
                });
            });
        });
    }
    // DELETE BY ID
    // Deletes a right sensor from the RightSensor table based on RightSensorId.
    static deleteById({ RightSensorId = "Not Provided" } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let tableName = "RightSensor";
            let idVariable = "RightSensorId";
            // Constructs a DELETE query to remove a record from the RightSensor table with the given RightSensorId
            const megaquery = `
        DELETE from ${tableName} where ${idVariable} = "${RightSensorId}"
        `;
            return new Promise((resolve, reject) => {
                // Executes the constructed DELETE query
                db_1.connection.query(megaquery, function (error, results) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results);
                });
            });
        });
    }
}
exports.default = RightSensorDAO;
