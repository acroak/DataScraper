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
* Left Sensor DAO contains getLeftSensor, getLeftSensorById, putLeftSensor, deleteById
*/
const db_1 = require("../db");
class LeftSensorDAO {
    // GET
    // Retrieves a list of left sensors with pagination support.
    static getLeftSensor({ page = 0, itemsPerPage = 20, } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            var idStart = (itemsPerPage * page) + 10001;
            var idEnd = idStart + itemsPerPage + 1;
            return new Promise((resolve, reject) => {
                // Selects all columns from the LeftSensor table
                db_1.connection.query(`SELECT * FROM LeftSensor`, function (error, results) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results);
                });
            });
        });
    }
    // GET BY ID
    // Retrieves a specific left sensor by LeftSensorId.
    static getLeftSensorById({ page = 0, itemsPerPage = 20, LeftSensorId = 0 } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            var idStart = (itemsPerPage * page) + 10001;
            var idEnd = idStart + itemsPerPage + 1;
            return new Promise((resolve, reject) => {
                // Selects all columns from the LeftSensor table where LeftSensorId matches the provided id
                db_1.connection.query(`SELECT * FROM LeftSensor WHERE LeftSensorId='${LeftSensorId}'`, function (error, results) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results);
                });
            });
        });
    }
    // PUT
    // Inserts a new left sensor into the LeftSensor table.
    static putLeftSensor({ LeftSensorID = "Not Provided", PhysicalDamage = "Not Provided", ConnectorFunc = "Not Provided", MountingBrackets = "Not Provided", ConditionOfCables = "Not Provided", BluetoothFunc = "Not Provided", DataTrans = "Not Provided", KitId = "Not Provided", ReportId = "Not Provided" } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                // Inserts a new record into the LeftSensor table with provided values
                db_1.connection.query(`Insert Into LeftSensor(
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
    // Deletes a left sensor from the LeftSensor table based on LeftSensorId.
    static deleteById({ LeftSensorId = "Not Provided" } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let tableName = "LeftSensor";
            let idVariable = "LeftSensorId";
            // Constructs a DELETE query to remove a record from the LeftSensor table with the given LeftSensorId
            const megaquery = `
        DELETE from ${tableName} where ${idVariable} = "${LeftSensorId}"
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
exports.default = LeftSensorDAO;
