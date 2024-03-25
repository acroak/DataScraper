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
 *  Kit Info controller contains apiGetKitInfo, apiGetKitInfoById, and apiPutKitInfo commands
*/
const KitInfoDAO_1 = __importDefault(require("../dao/KitInfoDAO"));
class KitInfoController {
    // GET
    // Retrieves kit information with pagination support.
    static apiGetKitInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extracts query parameters for pagination
            const resultsPerPage = req.query.resultsPerPage ? parseInt(req.query.resultsPerPage) : 20;
            const page = req.query.page ? parseInt(req.query.page) : 0;
            // Calls the DAO method to get kit information
            const result = yield KitInfoDAO_1.default.getKitInfo({ page: page, itemsPerPage: resultsPerPage });
            // Constructs the response object
            let response = {
                KitInfo: result,
            };
            // Sends the response as JSON
            res.json(response);
        });
    }
    // GET BY ID
    // Retrieves kit information for a specific KitId with pagination support.
    static apiGetKitInfoById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extracts query parameters for pagination and KitId
            const resultsPerPage = req.query.resultsPerPage ? parseInt(req.query.resultsPerPage) : 20;
            const page = req.query.page ? parseInt(req.query.page) : 0;
            const KitId = req.params.KitId ? req.params.KitId : "0";
            // Calls the DAO method to get kit information by ID
            const result = yield KitInfoDAO_1.default.getKitInfoById({ page: page, itemsPerPage: resultsPerPage, KitId: KitId });
            // Constructs the response object
            let response = {
                KitInfo: result,
            };
            // Sends the response as JSON
            res.json(response);
        });
    }
    // PUT
    // Inserts kit information into the KitInfo table for reuse and archival
    static apiPutKitInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extracts request body parameters
            let KitId = req.body.KitId;
            let LeftSensorId = req.body.LeftSensorId;
            let RightSensorId = req.body.RightSensorId;
            let PhoneId = req.body.PhoneId;
            // Calls the DAO method to insert kit information
            const result = yield KitInfoDAO_1.default.putKitInfo({
                KitId: KitId,
                LeftSensorId: LeftSensorId,
                RightSensorId: RightSensorId,
                PhoneId: PhoneId,
            });
            // Constructs the response object
            let response = {
                KitInfo: result,
            };
            // Sends the response as JSON
            res.json(response);
        });
    }
}
exports.default = KitInfoController;
