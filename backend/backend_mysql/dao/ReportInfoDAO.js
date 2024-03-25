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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
* Report Info DAO contains getReportInfo, getReportInfoById, putReportInfo
*/
const db_1 = require("../db");
const moment_1 = __importDefault(require("moment"));
class ReportInfoDAO {
    // GET
    // Retrieves a list of reports with pagination support.
    static getReportInfo({ page = 0, itemsPerPage = 20, } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            var idStart = (itemsPerPage * page) + 10001;
            var idEnd = idStart + itemsPerPage + 1;
            return new Promise((resolve, reject) => {
                // Selects all columns from the ReportInfo table
                db_1.connection.query(`SELECT * FROM ReportInfo`, function (error, results) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results);
                });
            });
        });
    }
    // GET BY ID
    // Retrieves a specific report by ReportId.
    static getReportInfoById({ page = 0, itemsPerPage = 20, ReportId = "No id given" } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            var idStart = (itemsPerPage * page) + 10001;
            var idEnd = idStart + itemsPerPage + 1;
            return new Promise((resolve, reject) => {
                // Selects all columns from the ReportInfo table where ReportId matches the provided id
                db_1.connection.query(`SELECT * FROM ReportInfo WHERE ReportId='${ReportId}'`, function (error, results) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results);
                });
            });
        });
    }
    // PUT
    // Inserts a new report into the ReportInfo table.
    static putReportInfo({ LastKnownUser = "Not Provided", Tester = "Not Provided", DateTested = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'), ReportLocation = "Not Provided", TesterComments = "Not Provided", KitId = "Not Provided" } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                // Inserts a new record into the ReportInfo table with provided values
                db_1.connection.query(`Insert Into ReportInfo(
                LastKnownUser, 
                Tester, 
                DateTested, 
                ReportLocation, 
                TesterComments, 
                KitId
            ) values (
                "${LastKnownUser}", 
                "${Tester}", 
                "${DateTested}", 
                "${ReportLocation}", 
                "${TesterComments}", 
                "${KitId}"
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
    // Deletes a report from the ReportInfo table based on ReportId.
    static deleteById({ ReportId = 0 } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let tableName = "ReportInfo";
            let idVariable = "ReportId";
            // Constructs a DELETE query to remove a record from the ReportInfo table with the given ReportId
            const megaquery = `
        DELETE from ${tableName} where ${idVariable} = ${ReportId}
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
exports.default = ReportInfoDAO;
