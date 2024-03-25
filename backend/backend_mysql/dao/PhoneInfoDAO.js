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
* Report Info DAO contains getPhoneInfo, getPhoneInfoById, putPhoneInfo, deleteById
*/
const db_1 = require("../db");
class PhoneInfoDAO {
    // GET
    // Retrieves a list of phone information with pagination support.
    static getPhoneInfo({ page = 0, itemsPerPage = 20, } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            var idStart = (itemsPerPage * page) + 10001;
            var idEnd = idStart + itemsPerPage + 1;
            return new Promise((resolve, reject) => {
                // Selects all columns from the PhoneInfo table
                db_1.connection.query(`SELECT * FROM PhoneInfo`, function (error, results) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results);
                });
            });
        });
    }
    // GET BY ID
    // Retrieves phone information for a specific PhoneId.
    static getPhoneInfoById({ page = 0, itemsPerPage = 20, PhoneId = 0 } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            var idStart = (itemsPerPage * page) + 10001;
            var idEnd = idStart + itemsPerPage + 1;
            return new Promise((resolve, reject) => {
                // Selects all columns from the PhoneInfo table where PhoneId matches the provided id
                db_1.connection.query(`SELECT * FROM PhoneInfo WHERE PhoneId='${PhoneId}'`, function (error, results) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results);
                });
            });
        });
    }
    // PUT
    // Inserts a new phone information into the PhoneInfo table.
    static putPhoneInfo({ PhoneId = "Not Provided", PhysicalDamage = "Not Provided", VolButtonFunc = "Not Provided", PowerButtonFunc = "Not Provided", ChargingPort = "Not Provided", SIMCardFunc = "Not Provided", MemCardFunc = "Not Provided", PhoneCaseCondition = "Not Provided", ConditionOfCable = "Not Provided", TouchScreenFunc = "Not Provided", WiFiFunc = "Not Provided", BluetoothFunc = "Not Provided", CellDataFunc = "Not Provided", SpeakerFunc = "Not Provided", KitId = "Not Provided", ReportId = "Not Provided" } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                // Inserts a new record into the PhoneInfo table with provided values
                db_1.connection.query(`Insert Into PhoneInfo(
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
    // Deletes phone information from the PhoneInfo table based on PhoneId.
    static deleteById({ PhoneId = "Not Provided" } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let tableName = "PhoneInfo";
            let idVariable = "PhoneId";
            // Constructs a DELETE query to remove a record from the PhoneInfo table with the given PhoneId
            const megaquery = `
        DELETE from ${tableName} where ${idVariable} = "${PhoneId}"
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
exports.default = PhoneInfoDAO;
