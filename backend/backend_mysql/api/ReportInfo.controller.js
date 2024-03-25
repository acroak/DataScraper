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
 * Report Info Controller contains apiGetReportInfo, apiGetReportInfoById, and apiPutReportInfo commands
*/
const ReportInfoDAO_1 = __importDefault(require("../dao/ReportInfoDAO"));
class ReportInfoController {
    // GET
    // Retrieves report information with pagination support.
    // Pages are intended for future-proofing, but not yet implemented.
    static apiGetReportInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extracts query parameters for pagination
            const resultsPerPage = req.query.resultsPerPage ? parseInt(req.query.resultsPerPage) : 20;
            const page = req.query.page ? parseInt(req.query.page) : 0;
            // Calls the DAO method to get report information
            const result = yield ReportInfoDAO_1.default.getReportInfo({ page: page, itemsPerPage: resultsPerPage });
            // Constructs the response object
            let response = {
                ReportInfo: result,
            };
            // Sends the response as JSON
            res.json(response);
        });
    }
    // GET BY ID
    // Retrieves report information for a specific ReportId with pagination support.
    static apiGetReportInfoById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extracts query parameters for pagination and ReportId
            const resultsPerPage = req.query.resultsPerPage ? parseInt(req.query.resultsPerPage) : 20;
            const page = req.query.page ? parseInt(req.query.page) : 0;
            const ReportId = req.params.ReportId ? req.params.ReportId : "No id given";
            // Calls the DAO method to get report information by ID
            const result = yield ReportInfoDAO_1.default.getReportInfoById({ page: page, itemsPerPage: resultsPerPage, ReportId: ReportId });
            // Constructs the response object
            let response = {
                ReportInfo: result,
            };
            // Sends the response as JSON
            res.json(response);
        });
    }
    //PUT
    // Inserts report data into the ReportInfo table for reuse and archival
    static apiPutReportInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extracts request body parameters
            let LastKnownUser = req.body.LastKnownUser;
            let Tester = req.body.Tester;
            let DateTested = req.body.DateTested;
            let ReportLocation = req.body.ReportLocation;
            let TesterComments = req.body.TesterComments;
            let KitId = req.body.KitId;
            // Calls the DAO method to insert report information
            const result = yield ReportInfoDAO_1.default.putReportInfo({
                LastKnownUser: LastKnownUser,
                Tester: Tester,
                DateTested: DateTested,
                ReportLocation: ReportLocation,
                TesterComments: TesterComments,
                KitId: KitId
            });
            // Constructs the response object
            let response = {
                ReportInfo: result,
            };
            // Sends the response as JSON
            res.json(response);
        });
    }
}
exports.default = ReportInfoController;
