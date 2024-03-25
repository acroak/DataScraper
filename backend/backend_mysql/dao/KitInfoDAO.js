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
* Kit Info DAO contains getKitInfo, getKitInfoById, putKitInfo, deleteById
*/
const db_1 = require("../db");
class KitInfoDAO {
    // GET
    // Retrieves a list of kit information with pagination support.
    static getKitInfo({ page = 0, itemsPerPage = 20, } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            var idStart = (itemsPerPage * page) + 10001;
            var idEnd = idStart + itemsPerPage + 1;
            return new Promise((resolve, reject) => {
                // Selects all columns from the KitInfo table
                db_1.connection.query(`SELECT * FROM KitInfo`, function (error, results) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results);
                });
            });
        });
    }
    // GET BY ID
    // Retrieves kit information for a specific KitId.
    static getKitInfoById({ page = 0, itemsPerPage = 20, KitId = 0 } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            var idStart = (itemsPerPage * page) + 10001;
            var idEnd = idStart + itemsPerPage + 1;
            return new Promise((resolve, reject) => {
                // Selects all columns from the KitInfo table where KitId matches the provided id
                db_1.connection.query(`SELECT * FROM KitInfo WHERE KitId='${KitId}'`, function (error, results) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results);
                });
            });
        });
    }
    // PUT
    // Inserts a new kit information into the KitInfo table.
    static putKitInfo({ KitId = "Not Provided", LeftSensorId = "Not Provided", RightSensorId = "Not Provided", PhoneId = "Not Provided", } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                // Inserts a new record into the KitInfo table with provided values
                db_1.connection.query(`Insert Into KitInfo(
                KitId, 
                LeftSensorId, 
                RightSensorId, 
                PhoneId
            ) values (
                "${KitId}", 
                "${LeftSensorId}", 
                "${RightSensorId}", 
                "${PhoneId}"
            );`, function (error, results) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results);
                });
            });
        });
    }
    // DELETE
    // Deletes kit information from the KitInfo table based on KitId.
    static deleteById({ KitId = "Not Provided" } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const megaquery = `
        DELETE from KitInfo where KitId = "${KitId}"
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
exports.default = KitInfoDAO;
