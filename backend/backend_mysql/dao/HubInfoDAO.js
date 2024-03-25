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
* Hub Info DAO contains getHubInfo, getHubInfoById, putHubInfo, deleteById
*/
const db_1 = require("../db");
class HubInfoDAO {
    // GET
    // Retrieves a list of hub information with pagination support.
    static getHubInfo({ page = 0, itemsPerPage = 20, } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            var idStart = (itemsPerPage * page) + 10001;
            var idEnd = idStart + itemsPerPage + 1;
            return new Promise((resolve, reject) => {
                // Selects all columns from the HubInfo table
                db_1.connection.query(`SELECT * FROM HubInfo`, function (error, results) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results);
                });
            });
        });
    }
    // GET BY ID
    // Retrieves hub information for a specific HubId.
    static getHubInfoById({ page = 0, itemsPerPage = 20, HubId = 0 } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            var idStart = (itemsPerPage * page) + 10001;
            var idEnd = idStart + itemsPerPage + 1;
            return new Promise((resolve, reject) => {
                // Selects all columns from the HubInfo table where HubId matches the provided id
                db_1.connection.query(`SELECT * FROM HubInfo WHERE HubId='${HubId}'`, function (error, results) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results);
                });
            });
        });
    }
    // PUT
    // Inserts a new hub information into the HubInfo table.
    static putHubInfo({ PhysicalDamage = "Not Provided", ConditionOfCables = "Not Provided", ChargerCondition = "Not Provided", HubPortFunc = "Not Provided", HubOverheat = "Not Provided", KitId = "Not Provided", ReportId = "Not Provided" } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                // Inserts a new record into the HubInfo table with provided values
                db_1.connection.query(`Insert Into HubInfo(
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
    // Deletes hub information from the HubInfo table based on KitId.
    static deleteById({ KitId = "Not Provided" } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let tableName = "HubInfo";
            let idVariable = "KitId";
            // Constructs a DELETE query to remove a record from the HubInfo table with the given KitId
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
exports.default = HubInfoDAO;
