import express from 'express';
import LeftSensorController from './LeftSensor.controller';
import RightSensorController from './RightSensor.controller';
import HubInfoController from './HubInfo.controller';
import HeadsetInfoController from './HeadsetInfo.controller';
import KitInfoController from './KitInfo.controller';
import PhoneInfoController from './PhoneInfo.controller';
import ReportInfoController from './ReportInfo.controller';
import HistoricalReport from './HistoricalReport';

const router = express.Router();

// Left Sensor Endpoints
router.route('/LeftSensor').get(LeftSensorController.apiGetLeftSensor);
router.route('/LeftSensor/:LeftSensorId').get(LeftSensorController.apiGetLeftSensorById);
router.route('/LeftSensor').put(LeftSensorController.apiPutLeftSensor);

// Right Sensor Endpoints
router.route('/RightSensor').get(RightSensorController.apiGetRightSensor);
router.route('/RightSensor/:RightSensorId').get(RightSensorController.apiGetRightSensorById);
router.route('/RightSensor').put(RightSensorController.apiPutRightSensor);

// Hub Info Endpoints
router.route('/HubInfo').get(HubInfoController.apiGetHubInfo);
router.route('/HubInfo/:HubId').get(HubInfoController.apiGetHubInfoById);
router.route('/HubInfo').put(HubInfoController.apiPutHubInfo);

// Headset Info Endpoints
router.route('/HeadsetInfo').get(HeadsetInfoController.apiGetHeadsetInfo);
router.route('/HeadsetInfo/:HeadsetInfoId').get(HeadsetInfoController.apiGetHeadsetInfoById);
router.route('/HeadsetInfo').put(HeadsetInfoController.apiPutHeadsetInfo);

// Kit Info Endpoints
router.route('/KitInfo').get(KitInfoController.apiGetKitInfo);
router.route('/KitInfo/:KitId').get(KitInfoController.apiGetKitInfoById);
router.route('/KitInfo').put(KitInfoController.apiPutKitInfo);

// Phone Info Endpoints
router.route('/PhoneInfo').get(PhoneInfoController.apiGetPhoneInfo);
router.route('/PhoneInfo/:PhoneId').get(PhoneInfoController.apiGetPhoneInfoById);
router.route('/PhoneInfo').put(PhoneInfoController.apiPutPhoneInfo);

// Report Info Endpoints
router.route('/ReportInfo').get(ReportInfoController.apiGetReportInfo);
router.route('/ReportInfo/:ReportId').get(ReportInfoController.apiGetReportInfoById);
router.route('/ReportInfo').put(ReportInfoController.apiPutReportInfo);

// Historical Report Endpoints
router.route('/ReportByKitId/:KitId').get(HistoricalReport.apiGetReportByKitId);
router.route('/ReportByReportId/:ReportId').get(HistoricalReport.apiGetReportByReportId);

export default router;
