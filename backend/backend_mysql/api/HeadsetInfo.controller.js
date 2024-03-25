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
 *  Headset Data controller contains apiGetHeadsetInfo, apiGetHeadsetInfoById, and apiPutHeadsetInfo commands
*/
const HeadsetInfoDAO_1 = __importDefault(require("../dao/HeadsetInfoDAO"));
class HeadsetInfoController {
    // GET
    // Retrieves headset information with pagination support.
    static apiGetHeadsetInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extracts query parameters for pagination
            const resultsPerPage = req.query.resultsPerPage ? parseInt(req.query.resultsPerPage) : 20;
            const page = req.query.page ? parseInt(req.query.page) : 0;
            // Calls the DAO method to get headset information
            const result = yield HeadsetInfoDAO_1.default.getHeadsetInfo({ page: page, itemsPerPage: resultsPerPage });
            // Constructs the response object
            let response = {
                HeadsetInfo: result,
            };
            // Sends the response as JSON
            res.json(response);
        });
    }
    // GET BY ID 
    // Retrieves headset information for a specific HeadsetId with pagination support.
    static apiGetHeadsetInfoById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extracts query parameters for pagination and HeadsetId
            const resultsPerPage = req.query.resultsPerPage ? parseInt(req.query.resultsPerPage) : 20;
            const page = req.query.page ? parseInt(req.query.page) : 0;
            const HeadsetId = req.params.HeadsetInfoId ? req.params.HeadsetInfoId : "0";
            // Calls the DAO method to get headset information by ID
            const result = yield HeadsetInfoDAO_1.default.getHeadsetInfoById({ page: page, itemsPerPage: resultsPerPage, HeadsetId: HeadsetId });
            // Constructs the response object
            let response = {
                HeadsetInfo: result,
            };
            // Sends the response as JSON
            res.json(response);
        });
    }
    // PUT
    // Inserts headset diagnostic data into the HeadsetInfo table for reuse and archival
    static apiPutHeadsetInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extracts request body parameters
            let PhysicalDamage = req.body.PhysicalDamage;
            let ConnectorDamage = req.body.ConnectorDamage;
            let ConditionOfCables = req.body.ConditionOfCables;
            let AudioFuncLeftChannel = req.body.AudioFuncLeftChannel;
            let AudioFuncRightChannel = req.body.AudioFuncRightChannel;
            let AudioQuality = req.body.AudioQuality;
            let VolButtonFunc = req.body.VolButtonFunc;
            let PowerButtonFunc = req.body.PowerButtonFunc;
            let KitId = req.body.KitId;
            let ReportId = req.body.ReportId;
            // Calls the DAO method to insert headset diagnostic data
            const result = yield HeadsetInfoDAO_1.default.putHeadsetInfo({
                PhysicalDamage: PhysicalDamage,
                ConnectorDamage: ConnectorDamage,
                ConditionOfCables: ConditionOfCables,
                AudioFuncLeftChannel: AudioFuncLeftChannel,
                AudioFuncRightChannel: AudioFuncRightChannel,
                AudioQuality: AudioQuality,
                VolButtonFunc: VolButtonFunc,
                PowerButtonFunc: PowerButtonFunc,
                KitId: KitId,
                ReportId: ReportId
            });
            // Constructs the response object
            let response = {
                HeadsetInfo: result,
            };
            // Sends the response as JSON
            res.json(response);
        });
    }
}
exports.default = HeadsetInfoController;
