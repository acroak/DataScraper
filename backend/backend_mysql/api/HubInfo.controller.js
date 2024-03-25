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
 *  Hub Data controller contains apiGetHubInfo, apiGetHubInfoById, and apiPutHubInfo commands
*/
const HubInfoDAO_1 = __importDefault(require("../dao/HubInfoDAO"));
class HubInfoController {
    // GET
    // Retrieves hub information with pagination support.
    static apiGetHubInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extracts query parameters for pagination
            const resultsPerPage = req.query.resultsPerPage ? parseInt(req.query.resultsPerPage) : 20;
            const page = req.query.page ? parseInt(req.query.page) : 0;
            // Calls the DAO method to get hub information
            const result = yield HubInfoDAO_1.default.getHubInfo({ page: page, itemsPerPage: resultsPerPage });
            // Constructs the response object
            let response = {
                HubInfo: result,
            };
            // Sends the response as JSON
            res.json(response);
        });
    }
    // GET BY ID
    // Retrieves hub information for a specific HubId with pagination support.
    static apiGetHubInfoById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extracts query parameters for pagination and HubId
            const resultsPerPage = req.query.resultsPerPage ? parseInt(req.query.resultsPerPage) : 20;
            const page = req.query.page ? parseInt(req.query.page) : 0;
            const HubId = req.params.HubId ? req.params.HubId : "0";
            // Calls the DAO method to get hub information by ID
            const result = yield HubInfoDAO_1.default.getHubInfoById({ page: page, itemsPerPage: resultsPerPage, HubId: HubId });
            // Constructs the response object
            let response = {
                HubInfo: result,
            };
            // Sends the response as JSON
            res.json(response);
        });
    }
    // PUT
    // Inserts hub diagnostic data into the HubInfo table for reuse and archival
    static apiPutHubInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extracts request body parameters
            let PhysicalDamage = req.body.PhysicalDamage;
            let ConditionOfCables = req.body.ConditionOfCables;
            let ChargerCondition = req.body.ChargerCondition;
            let HubPortFunc = req.body.HubPortFunc;
            let HubOverheat = req.body.HubOverheat;
            let ReportId = req.body.ReportId;
            let KitId = req.body.KitId;
            // Calls the DAO method to insert hub diagnostic data
            const result = yield HubInfoDAO_1.default.putHubInfo({
                PhysicalDamage: PhysicalDamage,
                ConditionOfCables: ConditionOfCables,
                ChargerCondition: ChargerCondition,
                HubPortFunc: HubPortFunc,
                HubOverheat: HubOverheat,
                KitId: KitId,
                ReportId: ReportId
            });
            // Constructs the response object
            let response = {
                HubInfo: result,
            };
            // Sends the response as JSON
            res.json(response);
        });
    }
}
exports.default = HubInfoController;
