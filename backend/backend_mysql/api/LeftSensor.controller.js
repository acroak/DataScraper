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
 *  Left Sensor controller contains apiGetLeftSensor, apiGetLeftSensorById, and apiPutLeftSensor commands
*/
const LeftSensorDAO_1 = __importDefault(require("../dao/LeftSensorDAO"));
class LeftSensorController {
    // GET
    // Retrieves left sensor information with pagination support.
    // Pages are intended for future-proofing, but not yet implemented.
    static apiGetLeftSensor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extracts query parameters for pagination
            const resultsPerPage = req.query.resultsPerPage ? parseInt(req.query.resultsPerPage) : 20;
            const page = req.query.page ? parseInt(req.query.page) : 0;
            // Calls the DAO method to get left sensor information
            const result = yield LeftSensorDAO_1.default.getLeftSensor({ page: page, itemsPerPage: resultsPerPage });
            // Constructs the response object
            let response = {
                LeftSensor: result,
            };
            // Sends the response as JSON
            res.json(response);
        });
    }
    // GET BY ID
    // Retrieves left sensor information for a specific LeftSensorId with pagination support.
    // Currently unused in the frontend.
    static apiGetLeftSensorById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extracts query parameters for pagination and LeftSensorId
            const resultsPerPage = req.query.resultsPerPage ? parseInt(req.query.resultsPerPage) : 20;
            const page = req.query.page ? parseInt(req.query.page) : 0;
            const LeftSensorId = req.params.LeftSensorId ? req.params.LeftSensorId : "0";
            // Calls the DAO method to get left sensor information by ID
            const result = yield LeftSensorDAO_1.default.getLeftSensorById({ page: page, itemsPerPage: resultsPerPage, LeftSensorId: LeftSensorId });
            // Constructs the response object
            let response = {
                LeftSensor: result,
            };
            // Sends the response as JSON
            res.json(response);
        });
    }
    // PUT
    // Inserts left sensor diagnostic data into the LeftSensor table for reuse and archival
    static apiPutLeftSensor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extracts request body parameters
            let LeftSensorID = req.body.LeftSensorId;
            let PhysicalDamage = req.body.PhysicalDamage;
            let ConnectorFunc = req.body.ConnectorFunc;
            let MountingBrackets = req.body.MountingBrackets;
            let ConditionOfCables = req.body.ConditionOfCables;
            let BluetoothFunc = req.body.BluetoothFunc;
            let DataTrans = req.body.DataTrans;
            let KitId = req.body.KitId;
            let ReportId = req.body.ReportId;
            // Calls the DAO method to insert left sensor information
            const result = yield LeftSensorDAO_1.default.putLeftSensor({
                LeftSensorID: LeftSensorID,
                PhysicalDamage: PhysicalDamage,
                ConnectorFunc: ConnectorFunc,
                MountingBrackets: MountingBrackets,
                ConditionOfCables: ConditionOfCables,
                BluetoothFunc: BluetoothFunc,
                DataTrans: DataTrans,
                KitId: KitId,
                ReportId: ReportId
            });
            // Constructs the response object
            let response = {
                LeftSensor: result,
            };
            // Sends the response as JSON
            res.json(response);
        });
    }
}
exports.default = LeftSensorController;
