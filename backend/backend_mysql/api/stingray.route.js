"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LeftSensor_controller_1 = __importDefault(require("./LeftSensor.controller"));
const RightSensor_controller_1 = __importDefault(require("./RightSensor.controller"));
const HubInfo_controller_1 = __importDefault(require("./HubInfo.controller"));
const HeadsetInfo_controller_1 = __importDefault(require("./HeadsetInfo.controller"));
const KitInfo_controller_1 = __importDefault(require("./KitInfo.controller"));
const PhoneInfo_controller_1 = __importDefault(require("./PhoneInfo.controller"));
const ReportInfo_controller_1 = __importDefault(require("./ReportInfo.controller"));
const HistoricalReport_1 = __importDefault(require("./HistoricalReport"));
const router = express_1.default.Router();
// Left Sensor Endpoints
router.route('/LeftSensor').get(LeftSensor_controller_1.default.apiGetLeftSensor);
router.route('/LeftSensor/:LeftSensorId').get(LeftSensor_controller_1.default.apiGetLeftSensorById);
router.route('/LeftSensor').put(LeftSensor_controller_1.default.apiPutLeftSensor);
// Right Sensor Endpoints
router.route('/RightSensor').get(RightSensor_controller_1.default.apiGetRightSensor);
router.route('/RightSensor/:RightSensorId').get(RightSensor_controller_1.default.apiGetRightSensorById);
router.route('/RightSensor').put(RightSensor_controller_1.default.apiPutRightSensor);
// Hub Info Endpoints
router.route('/HubInfo').get(HubInfo_controller_1.default.apiGetHubInfo);
router.route('/HubInfo/:HubId').get(HubInfo_controller_1.default.apiGetHubInfoById);
router.route('/HubInfo').put(HubInfo_controller_1.default.apiPutHubInfo);
// Headset Info Endpoints
router.route('/HeadsetInfo').get(HeadsetInfo_controller_1.default.apiGetHeadsetInfo);
router.route('/HeadsetInfo/:HeadsetInfoId').get(HeadsetInfo_controller_1.default.apiGetHeadsetInfoById);
router.route('/HeadsetInfo').put(HeadsetInfo_controller_1.default.apiPutHeadsetInfo);
// Kit Info Endpoints
router.route('/KitInfo').get(KitInfo_controller_1.default.apiGetKitInfo);
router.route('/KitInfo/:KitId').get(KitInfo_controller_1.default.apiGetKitInfoById);
router.route('/KitInfo').put(KitInfo_controller_1.default.apiPutKitInfo);
// Phone Info Endpoints
router.route('/PhoneInfo').get(PhoneInfo_controller_1.default.apiGetPhoneInfo);
router.route('/PhoneInfo/:PhoneId').get(PhoneInfo_controller_1.default.apiGetPhoneInfoById);
router.route('/PhoneInfo').put(PhoneInfo_controller_1.default.apiPutPhoneInfo);
// Report Info Endpoints
router.route('/ReportInfo').get(ReportInfo_controller_1.default.apiGetReportInfo);
router.route('/ReportInfo/:ReportId').get(ReportInfo_controller_1.default.apiGetReportInfoById);
router.route('/ReportInfo').put(ReportInfo_controller_1.default.apiPutReportInfo);
// Historical Report Endpoints
router.route('/ReportByKitId/:KitId').get(HistoricalReport_1.default.apiGetReportByKitId);
router.route('/ReportByReportId/:ReportId').get(HistoricalReport_1.default.apiGetReportByReportId);
exports.default = router;
