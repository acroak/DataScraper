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
 * Right Sensor controller contains apiGetRightSensor, apiGetRightSensorById, and apiPutRightSensor commands
*/
const RightSensorDAO_1 = __importDefault(require("../dao/RightSensorDAO"));
class RightSensorController {
    // GET
    // Retrieves right sensor information with pagination support.
    // Pages are intended for future-proofing, but not yet implemented.
    static apiGetRightSensor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extracts query parameters for pagination
            const resultsPerPage = req.query.resultsPerPage ? parseInt(req.query.resultsPerPage) : 20;
            const page = req.query.page ? parseInt(req.query.page) : 0;
            // Calls the DAO method to get right sensor information
            const result = yield RightSensorDAO_1.default.getRightSensor({ page: page, itemsPerPage: resultsPerPage });
            // Constructs the response object
            let response = {
                RightSensor: result,
            };
            // Sends the response as JSON
            res.json(response);
        });
    }
    // GET BY ID
    // Retrieves right sensor information for a specific RightSensorId with pagination support.
    // Currently unused in the frontend.
    static apiGetRightSensorById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extracts query parameters for pagination and RightSensorId
            const resultsPerPage = req.query.resultsPerPage ? parseInt(req.query.resultsPerPage) : 20;
            const page = req.query.page ? parseInt(req.query.page) : 0;
            const RightSensorId = req.params.RightSensorId ? req.params.RightSensorId : "0";
            // Calls the DAO method to get right sensor information by ID
            const result = yield RightSensorDAO_1.default.getRightSensorById({ page: page, itemsPerPage: resultsPerPage, RightSensorId: RightSensorId });
            // Constructs the response object
            let response = {
                RightSensor: result,
            };
            // Sends the response as JSON
            res.json(response);
        });
    }
    //PUT
    // Inserts right sensor data into the RightSensor table for reuse and archival
    static apiPutRightSensor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extracts request body parameters
            let RightSensorID = req.body.RightSensorId;
            let PhysicalDamage = req.body.PhysicalDamage;
            let ConnectorFunc = req.body.ConnectorFunc;
            let MountingBrackets = req.body.MountingBrackets;
            let ConditionOfCables = req.body.ConditionOfCables;
            let BluetoothFunc = req.body.BluetoothFunc;
            let DataTrans = req.body.DataTrans;
            let KitId = req.body.KitId;
            let ReportId = req.body.ReportId;
            // Calls the DAO method to insert right sensor information
            const result = yield RightSensorDAO_1.default.putRightSensor({
                RightSensorID: RightSensorID,
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
                RightSensor: result,
            };
            // Sends the response as JSON
            res.json(response);
        });
    }
}
exports.default = RightSensorController;
