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
* Headset Info DAO contains getHeadsetInfo, getHeadsetInfoById, putHeadsetInfo, deleteById
*/
const db_1 = require("../db");
class HeadsetInfoDAO {
    // GET
    // Retrieves a list of headset information with pagination support.
    static getHeadsetInfo({ page = 0, itemsPerPage = 20, } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            var idStart = (itemsPerPage * page) + 10001;
            var idEnd = idStart + itemsPerPage + 1;
            return new Promise((resolve, reject) => {
                // Selects all columns from the HeadsetInfo table
                db_1.connection.query(`SELECT * FROM HeadsetInfo`, function (error, results) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results);
                });
            });
        });
    }
    // GET BY ID
    // Retrieves headset information for a specific HeadsetId.
    static getHeadsetInfoById({ page = 0, itemsPerPage = 20, HeadsetId = 0 } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            var idStart = (itemsPerPage * page) + 10001;
            var idEnd = idStart + itemsPerPage + 1;
            return new Promise((resolve, reject) => {
                // Selects all columns from the HeadsetInfo table where HeadsetId matches the provided id
                db_1.connection.query(`SELECT * FROM HeadsetInfo WHERE HeadsetId='${HeadsetId}'`, function (error, results) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results);
                });
            });
        });
    }
    // PUT
    // Inserts a new headset information into the HeadsetInfo table.
    static putHeadsetInfo({ PhysicalDamage = "Not Provided", ConnectorDamage = "Not Provided", ConditionOfCables = "Not Provided", AudioFuncLeftChannel = "Not Provided", AudioFuncRightChannel = "Not Provided", AudioQuality = "Not Provided", VolButtonFunc = "Not Provide", PowerButtonFunc = "Not Provided", KitId = "Not Provided", ReportId = "Not Provided" } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                // Inserts a new record into the HeadsetInfo table with provided values
                db_1.connection.query(`Insert Into HeadsetInfo(
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
    // Deletes headset information from the HeadsetInfo table based on KitId.
    static deleteById({ KitId = "Not Provided" } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let tableName = "HeadsetInfo";
            let idVariable = "KitId";
            // Constructs a DELETE query to remove a record from the HeadsetInfo table with the given KitId
            const megaquery = `
        DELETE from ${tableName} where ${idVariable} = "${KitId}"
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
exports.default = HeadsetInfoDAO;
