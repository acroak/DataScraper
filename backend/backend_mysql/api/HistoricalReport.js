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
const HistoricalReportDAO_1 = __importDefault(require("../dao/HistoricalReportDAO"));
class HistoricalReport {
    //Retrieves aggregate report based on KitID
    static apiGetReportByKitId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const KitId = req.params.KitId ? req.params.KitId : "0";
            const result = yield HistoricalReportDAO_1.default.getHistoricalReportByKitId({ KitId: KitId });
            let response = {
                Report: result,
            };
            res.json(response);
        });
    }
    //Retrieves aggregate report based on ReportID
    static apiGetReportByReportId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const ReportId = req.params.ReportId ? req.params.ReportId : "0";
            const result = yield HistoricalReportDAO_1.default.getHistoricalReportByReportId({ ReportId: ReportId });
            let response = {
                Report: result,
            };
            res.json(response);
        });
    }
}
exports.default = HistoricalReport;
