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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
/*
    * Contains Aggregate Queries to pull all report information based off of either Report or Kit ID
    *
    */
class HistoricalReportDAO {
    //Creates and calls aggregate query based on Kit ID
    static getHistoricalReportByKitId({ KitId = "Not Provided" } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const megaquery = `

SELECT KitId as KitId,PhoneId as PhoneId,LeftSensorId as LeftSensorId,RightSensorId as RightSensorId,NULL as Tester,NULL as LastKnownUser,NULL as PhysicalDamage,NULL as PowerButtonFunc,NULL as VolButtonFunc,NULL as ChargingPort,NULL as SIMCardFunc,NULL as MemCardFunc,NULL as PhoneCaseCondition,NULL as TouchScreenFunc,NULL as WiFiFunc,NULL as BluetoothFunc,NULL as CellDataFunc,NULL as SpeakerFunc,NULL as ConditionOfCables,NULL as MountingBrackets,NULL as ConnectorFunc,NULL as ConnectorDamage,NULL as AudioFuncLeftChannel,NULL as AudioFuncRightChannel,NULL as AudioQuality,NULL as ChargerCondition,NULL as HubOverheat, NULL as DataTrans, NULL as ReportId, NULL as DateTested
FROM KitInfo ki where KitId = ${KitId}
union all
select KitId as KitId,NULL as PhoneId,NULL as LeftSensorId,NULL as RightSensorId,Tester as Tester,LastKnownUser as LastKnownUser,NULL as PhysicalDamage,NULL as PowerButtonFunc,NULL as VolButtonFunc,NULL as ChargingPort,NULL as SIMCardFunc,NULL as MemCardFunc,NULL as PhoneCaseCondition,NULL as TouchScreenFunc,NULL as WiFiFunc,NULL as BluetoothFunc,NULL as CellDataFunc,NULL as SpeakerFunc,NULL as ConditionOfCables,NULL as MountingBrackets,NULL as ConnectorFunc,NULL as ConnectorDamage,NULL as AudioFuncLeftChannel,NULL as AudioFuncRightChannel,NULL as AudioQuality,NULL as ChargerCondition,NULL as HubOverheat, NULL as DataTrans, ReportId as ReportId, DateTested as DateTested
from ReportInfo ri where KitId = ${KitId}
union ALL 
select KitId as KitId,PhoneId as PhoneId,NULL as LeftSensorId,NULL as RightSensorId,NULL as Tester,NULL as LastKnownUser,PhysicalDamage as PhysicalDamage,PowerButtonFunc as PowerButtonFunc,VolButtonFunc as VolButtonFunc,ChargingPort as ChargingPort,SIMCardFunc as SIMCardFunc,MemCardFunc as MemCardFunc,PhoneCaseCondition as PhoneCaseCondition,TouchScreenFunc as TouchScreenFunc,WiFiFunc as WiFiFunc,BluetoothFunc as BluetoothFunc,CellDataFunc as CellDataFunc,SpeakerFunc as SpeakerFunc,ConditionOfCable as ConditionOfCables,NULL as MountingBrackets,NULL as ConnectorFunc,NULL as ConnectorDamage,NULL as AudioFuncLeftChannel,NULL as AudioFuncRightChannel,NULL as AudioQuality,NULL as ChargerCondition,NULL as HubOverheat, NULL as DataTrans, ReportId as ReportId, NULL as DateTested
from PhoneInfo pi2 where KitId = ${KitId}
union ALL 
SELECT KitId as KitId,NULL as PhoneId,LeftSensorId as LeftSensorId,NULL as RightSensorId,NULL as Tester,NULL as LastKnownUser,PhysicalDamage as PhysicalDamage,NULL as PowerButtonFunc,NULL as VolButtonFunc,NULL as ChargingPort,NULL as SIMCardFunc,NULL as MemCardFunc,NULL as PhoneCaseCondition,NULL as TouchScreenFunc,NULL as WiFiFunc,BluetoothFunc as BluetoothFunc,NULL as CellDataFunc,NULL as SpeakerFunc,NULL as ConditionOfCables,MountingBrackets as MountingBrackets,ConnectorFunc as ConnectorFunc,NULL as ConnectorDamage,NULL as AudioFuncLeftChannel,NULL as AudioFuncRightChannel,NULL as AudioQuality,NULL as ChargerCondition,NULL as HubOverheat, DataTrans as DataTrans, ReportId as ReportId, NULL as DateTested
from LeftSensor ls where KitId = ${KitId}
union all
select KitId as KitId,NULL as PhoneId,NULL as LeftSensorId,RightSensorId as RightSensorId,NULL as Tester,NULL as LastKnownUser,PhysicalDamage as PhysicalDamage,NULL as PowerButtonFunc,NULL as VolButtonFunc,NULL as ChargingPort,NULL as SIMCardFunc,NULL as MemCardFunc,NULL as PhoneCaseCondition,NULL as TouchScreenFunc,NULL as WiFiFunc,BluetoothFunc as BluetoothFunc,NULL as CellDataFunc,NULL as SpeakerFunc,NULL as ConditionOfCables,MountingBrackets as MountingBrackets,ConnectorFunc as ConnectorFunc,NULL as ConnectorDamage,NULL as AudioFuncLeftChannel,NULL as AudioFuncRightChannel,NULL as AudioQuality,NULL as ChargerCondition,NULL as HubOverheat, DataTrans as DataTrans, ReportId as ReportId, NULL as DateTested
from RightSensor rs where KitId = ${KitId}
union all
select KitId as KitId,NULL as PhoneId,NULL as LeftSensorId,NULL as RightSensorId,NULL as Tester,NULL as LastKnownUser,PhysicalDamage as PhysicalDamage,PowerButtonFunc as PowerButtonFunc,VolButtonFunc as VolButtonFunc,NULL as ChargingPort,NULL as SIMCardFunc,NULL as MemCardFunc,NULL as PhoneCaseCondition,NULL as TouchScreenFunc,NULL as WiFiFunc,NULL as BluetoothFunc,NULL as CellDataFunc,NULL as SpeakerFunc,ConditionOfCables as ConditionOfCables,NULL as MountingBrackets,NULL as ConnectorFunc,ConnectorDamage as ConnectorDamage,AudioFuncLeftChannel as AudioFuncLeftChannel,AudioFuncRightChannel as AudioFuncRightChannel,AudioQuality as AudioQuality,NULL as ChargerCondition,NULL as HubOverheat, NULL as DataTrans, ReportId as ReportId, NULL as DateTested
from HeadsetInfo hi where KitId = ${KitId}
union all 
select KitId as KitId,NULL as PhoneId,NULL as LeftSensorId,NULL as RightSensorId,NULL as Tester,NULL as LastKnownUser,PhysicalDamage as PhysicalDamage,NULL as PowerButtonFunc,NULL as VolButtonFunc,NULL as ChargingPort,NULL as SIMCardFunc,NULL as MemCardFunc,NULL as PhoneCaseCondition,NULL as TouchScreenFunc,NULL as WiFiFunc,NULL as BluetoothFunc,NULL as CellDataFunc,NULL as SpeakerFunc,ConditionOfCables as ConditionOfCables,NULL as MountingBrackets,NULL as ConnectorFunc,NULL as ConnectorDamage,NULL as AudioFuncLeftChannel,NULL as AudioFuncRightChannel,NULL as AudioQuality,ChargerCondition as ChargerCondition,HubOverheat as HubOverheat, NULL as DataTrans, ReportId as ReportId, NULL as DateTested
from HubInfo hi2 where KitId = ${KitId}

`;
            return new Promise((resolve, reject) => {
                db_1.connection.query(megaquery, function (error, results) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results);
                });
            });
        });
    }
    //Creates and calls aggregate query based on Report ID
    static getHistoricalReportByReportId({ ReportId = "Not Provided" } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const megaquery = `

SELECT DISTINCT KitInfo.KitId AS KitId, 
       KitInfo.PhoneId AS PhoneId, 
       KitInfo.LeftSensorId AS LeftSensorId, 
       KitInfo.RightSensorId AS RightSensorId, 
       NULL AS Tester, 
       NULL AS LastKnownUser, 
       NULL AS PhysicalDamage, 
       NULL AS PowerButtonFunc, 
       NULL AS VolButtonFunc, 
       NULL AS ChargingPort, 
       NULL AS SIMCardFunc, 
       NULL AS MemCardFunc, 
       NULL AS PhoneCaseCondition, 
       NULL AS TouchScreenFunc, 
       NULL AS WiFiFunc, 
       NULL AS BluetoothFunc, 
       NULL AS CellDataFunc, 
       NULL AS SpeakerFunc, 
       NULL AS ConditionOfCables, 
       NULL AS MountingBrackets, 
       NULL AS ConnectorFunc, 
       NULL AS ConnectorDamage, 
       NULL AS AudioFuncLeftChannel, 
       NULL AS AudioFuncRightChannel, 
       NULL AS AudioQuality, 
       NULL AS ChargerCondition, 
       NULL AS HubOverheat, 
       NULL AS DataTrans, 
       NULL AS ReportId, 
       NULL AS DateTested
FROM KitInfo
INNER JOIN ReportInfo ON KitInfo.KitId = ReportInfo.KitId
WHERE ReportInfo.ReportId=${ReportId}
union all
select DISTINCT KitId as KitId,NULL as PhoneId,NULL as LeftSensorId,NULL as RightSensorId,Tester as Tester,LastKnownUser as LastKnownUser,NULL as PhysicalDamage,NULL as PowerButtonFunc,NULL as VolButtonFunc,NULL as ChargingPort,NULL as SIMCardFunc,NULL as MemCardFunc,NULL as PhoneCaseCondition,NULL as TouchScreenFunc,NULL as WiFiFunc,NULL as BluetoothFunc,NULL as CellDataFunc,NULL as SpeakerFunc,NULL as ConditionOfCables,NULL as MountingBrackets,NULL as ConnectorFunc,NULL as ConnectorDamage,NULL as AudioFuncLeftChannel,NULL as AudioFuncRightChannel,NULL as AudioQuality,NULL as ChargerCondition,NULL as HubOverheat, NULL as DataTrans, ReportId as ReportId, DateTested as DateTested
from ReportInfo ri where ReportId = ${ReportId}
union ALL 
select DISTINCT KitId as KitId,PhoneId as PhoneId,NULL as LeftSensorId,NULL as RightSensorId,NULL as Tester,NULL as LastKnownUser,PhysicalDamage as PhysicalDamage,PowerButtonFunc as PowerButtonFunc,VolButtonFunc as VolButtonFunc,ChargingPort as ChargingPort,SIMCardFunc as SIMCardFunc,MemCardFunc as MemCardFunc,PhoneCaseCondition as PhoneCaseCondition,TouchScreenFunc as TouchScreenFunc,WiFiFunc as WiFiFunc,BluetoothFunc as BluetoothFunc,CellDataFunc as CellDataFunc,SpeakerFunc as SpeakerFunc,ConditionOfCable as ConditionOfCables,NULL as MountingBrackets,NULL as ConnectorFunc,NULL as ConnectorDamage,NULL as AudioFuncLeftChannel,NULL as AudioFuncRightChannel,NULL as AudioQuality,NULL as ChargerCondition,NULL as HubOverheat, NULL as DataTrans, ReportId as ReportId, NULL as DateTested
from PhoneInfo pi2 where ReportId = ${ReportId}
union ALL 
SELECT DISTINCT KitId as KitId,NULL as PhoneId,LeftSensorId as LeftSensorId,NULL as RightSensorId,NULL as Tester,NULL as LastKnownUser,PhysicalDamage as PhysicalDamage,NULL as PowerButtonFunc,NULL as VolButtonFunc,NULL as ChargingPort,NULL as SIMCardFunc,NULL as MemCardFunc,NULL as PhoneCaseCondition,NULL as TouchScreenFunc,NULL as WiFiFunc,BluetoothFunc as BluetoothFunc,NULL as CellDataFunc,NULL as SpeakerFunc,NULL as ConditionOfCables,MountingBrackets as MountingBrackets,ConnectorFunc as ConnectorFunc,NULL as ConnectorDamage,NULL as AudioFuncLeftChannel,NULL as AudioFuncRightChannel,NULL as AudioQuality,NULL as ChargerCondition,NULL as HubOverheat, DataTrans as DataTrans, ReportId as ReportId, NULL as DateTested
from LeftSensor ls where ReportId = ${ReportId}
union all
select DISTINCT KitId as KitId,NULL as PhoneId,NULL as LeftSensorId,RightSensorId as RightSensorId,NULL as Tester,NULL as LastKnownUser,PhysicalDamage as PhysicalDamage,NULL as PowerButtonFunc,NULL as VolButtonFunc,NULL as ChargingPort,NULL as SIMCardFunc,NULL as MemCardFunc,NULL as PhoneCaseCondition,NULL as TouchScreenFunc,NULL as WiFiFunc,BluetoothFunc as BluetoothFunc,NULL as CellDataFunc,NULL as SpeakerFunc,NULL as ConditionOfCables,MountingBrackets as MountingBrackets,ConnectorFunc as ConnectorFunc,NULL as ConnectorDamage,NULL as AudioFuncLeftChannel,NULL as AudioFuncRightChannel,NULL as AudioQuality,NULL as ChargerCondition,NULL as HubOverheat, DataTrans as DataTrans, ReportId as ReportId, NULL as DateTested
from RightSensor rs where ReportId = ${ReportId}
union all
select DISTINCT KitId as KitId,NULL as PhoneId,NULL as LeftSensorId,NULL as RightSensorId,NULL as Tester,NULL as LastKnownUser,PhysicalDamage as PhysicalDamage,PowerButtonFunc as PowerButtonFunc,VolButtonFunc as VolButtonFunc,NULL as ChargingPort,NULL as SIMCardFunc,NULL as MemCardFunc,NULL as PhoneCaseCondition,NULL as TouchScreenFunc,NULL as WiFiFunc,NULL as BluetoothFunc,NULL as CellDataFunc,NULL as SpeakerFunc,ConditionOfCables as ConditionOfCables,NULL as MountingBrackets,NULL as ConnectorFunc,ConnectorDamage as ConnectorDamage,AudioFuncLeftChannel as AudioFuncLeftChannel,AudioFuncRightChannel as AudioFuncRightChannel,AudioQuality as AudioQuality,NULL as ChargerCondition,NULL as HubOverheat, NULL as DataTrans, ReportId as ReportId, NULL as DateTested
from HeadsetInfo hi where ReportId = ${ReportId}
union all 
select DISTINCT KitId as KitId,NULL as PhoneId,NULL as LeftSensorId,NULL as RightSensorId,NULL as Tester,NULL as LastKnownUser,PhysicalDamage as PhysicalDamage,NULL as PowerButtonFunc,NULL as VolButtonFunc,NULL as ChargingPort,NULL as SIMCardFunc,NULL as MemCardFunc,NULL as PhoneCaseCondition,NULL as TouchScreenFunc,NULL as WiFiFunc,NULL as BluetoothFunc,NULL as CellDataFunc,NULL as SpeakerFunc,ConditionOfCables as ConditionOfCables,NULL as MountingBrackets,NULL as ConnectorFunc,NULL as ConnectorDamage,NULL as AudioFuncLeftChannel,NULL as AudioFuncRightChannel,NULL as AudioQuality,ChargerCondition as ChargerCondition,HubOverheat as HubOverheat, NULL as DataTrans, ReportId as ReportId, NULL as DateTested
from HubInfo hi2 where ReportId = ${ReportId}

`;
            return new Promise((resolve, reject) => {
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
exports.default = HistoricalReportDAO;
