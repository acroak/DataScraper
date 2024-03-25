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
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const server_1 = __importDefault(require("../server"));
const KitInfoDAO_1 = __importDefault(require("../dao/KitInfoDAO"));
const HeadsetInfoDAO_1 = __importDefault(require("../dao/HeadsetInfoDAO"));
const ReportInfoDAO_1 = __importDefault(require("../dao/ReportInfoDAO"));
const HubInfoDAO_1 = __importDefault(require("../dao/HubInfoDAO"));
const LeftSensorDAO_1 = __importDefault(require("../dao/LeftSensorDAO"));
const RightSensorDAO_1 = __importDefault(require("../dao/RightSensorDAO"));
const PhoneInfoDAO_1 = __importDefault(require("../dao/PhoneInfoDAO"));
const requestWithSupertest = (0, supertest_1.default)(server_1.default);
//------------------------------------------------------
// ------------------PUT Request Tests------------------
//------------------------------------------------------
//console.log("-------Put Requests-------")
let genReportId = 0; //for storing the reportID we must fetch between tests
//KitInfo
describe('Testing PUT /KitInfo endpoint', function () {
    after(() => __awaiter(this, void 0, void 0, function* () {
        KitInfoDAO_1.default.deleteById({ KitId: "111" })
            .then((response) => {
            //console.log(response);
            //console.log("Kit Info Delete done")
        })
            .catch((e) => {
            console.error(e);
        });
    }));
    it('responds with a valid HTTP status code, affects 1 row, put all fields', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const putData = {
                KitId: "111",
                RightSensorId: "111",
                LeftSensorId: "111",
                PhoneId: "111",
            };
            const response = yield requestWithSupertest
                .put('/api/v1/stingray/KitInfo/')
                .send(putData)
                .then((response) => __awaiter(this, void 0, void 0, function* () {
                (0, chai_1.expect)(response.status).to.equal(200);
                (0, chai_1.expect)(response.body.KitInfo.affectedRows).to.equal(1);
            }));
        });
    });
});
//ReportInfo
describe('Testing PUT /ReportInfo endpoint', function () {
    before(() => __awaiter(this, void 0, void 0, function* () {
        const putData = {
            KitId: "112",
            RightSensorId: "111",
            LeftSensorId: "111",
            PhoneId: "111",
        };
        KitInfoDAO_1.default.putKitInfo(putData).then((response) => {
        })
            .catch((e) => {
            console.error(e);
        });
    }));
    after(() => __awaiter(this, void 0, void 0, function* () {
        KitInfoDAO_1.default.deleteById({ KitId: "112" })
            .then((response) => {
            //console.log(response);
            //console.log("Report Info Delete done")
        })
            .catch((e) => {
            console.error(e);
        });
        ReportInfoDAO_1.default.deleteById({ ReportId: genReportId, })
            .then((response) => {
            //console.log(response);
            //console.log("Report Info Delete done")
        })
            .catch((e) => {
            console.error(e);
        });
    }));
    it('responds with a valid HTTP status code', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const putData = {
                LastKnownUser: "LastUserName13",
                Tester: "Tester1",
                ReportLocation: "Not Provided",
                TesterComments: "Not Provided",
                KitId: "112",
            };
            const response = yield requestWithSupertest
                .put('/api/v1/stingray/reportinfo/')
                .send(putData)
                .then((response) => __awaiter(this, void 0, void 0, function* () {
                (0, chai_1.expect)(response.status).to.equal(200);
                (0, chai_1.expect)(response.body.ReportInfo.affectedRows).to.equal(1);
                genReportId = response.body.ReportInfo.insertId;
            }));
        });
    });
});
//HeadsetInfo
describe('Testing PUT /HeadsetInfo endpoint', function () {
    before(() => __awaiter(this, void 0, void 0, function* () {
        const putData = {
            KitId: "113",
            RightSensorId: "111",
            LeftSensorId: "111",
            PhoneId: "111",
        };
        yield KitInfoDAO_1.default.putKitInfo(putData);
        const reportPutData = {
            LastKnownUser: "LastUserName13",
            Tester: "Tester1",
            ReportLocation: "Not Provided",
            TesterComments: "Not Provided",
            KitId: "113",
        };
        const response = yield ReportInfoDAO_1.default.putReportInfo(reportPutData);
        genReportId = response.insertId;
    }));
    after(() => __awaiter(this, void 0, void 0, function* () {
        HeadsetInfoDAO_1.default.deleteById({ KitId: "113" })
            .then((response) => {
            //console.log(response);
            //console.log("Headset Info - Headset Delete done")
        })
            .catch((e) => {
            console.error(e);
        });
        KitInfoDAO_1.default.deleteById({ KitId: "113" })
            .then((response) => {
            //console.log(response);
            //console.log("Headset Info- Kit Delete done")
        })
            .catch((e) => {
            console.error(e);
        });
        ReportInfoDAO_1.default.deleteById({ ReportId: genReportId, })
            .then((response) => {
            //console.log(response);
            //console.log("Headset Info - Report Delete done")
        })
            .catch((e) => {
            console.error(e);
        });
    }));
    it('responds with a valid HTTP status code', function () {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log("Gen ID During", genReportId)
            const putData = {
                PhysicalDamage: "Pass",
                ConnectorDamage: "Pass",
                ConditionOfCables: "Pass",
                AudioFuncLeftChannel: "Pass",
                AudioFuncRightChannel: "Pass",
                AudioQuality: "Pass",
                VolButtonFunc: "Pass",
                PowerButtonFunc: "Pass",
                ReportId: genReportId,
                KitId: "113"
            };
            try {
                const response = yield requestWithSupertest
                    .put('/api/v1/stingray/HeadsetInfo/')
                    .send(putData)
                    .set('Accept', 'application/json')
                    .then((response) => {
                    //console.log(response);
                    (0, chai_1.expect)(response.status).to.equal(200);
                    (0, chai_1.expect)(response.body.HeadsetInfo.affectedRows).to.equal(1);
                });
            }
            catch (error) {
                console.error('Error:', error.message);
                console.error('Response:', error.response && error.response.body);
                // Rethrow the error to ensure the test fails
                throw error;
            }
        });
    });
});
//HubInfo
describe('Testing PUT /HubInfo endpoint', function () {
    before(() => __awaiter(this, void 0, void 0, function* () {
        const putData = {
            KitId: "114",
            RightSensorId: "111",
            LeftSensorId: "111",
            PhoneId: "111",
        };
        yield KitInfoDAO_1.default.putKitInfo(putData);
        const reportPutData = {
            LastKnownUser: "LastUserName13",
            Tester: "Tester1",
            ReportLocation: "Not Provided",
            TesterComments: "Not Provided",
            KitId: "114",
        };
        const response = yield ReportInfoDAO_1.default.putReportInfo(reportPutData);
        genReportId = response.insertId;
    }));
    after(() => __awaiter(this, void 0, void 0, function* () {
        HubInfoDAO_1.default.deleteById({ KitId: "114" })
            .then((response) => {
            //console.log(response);
            //console.log("Hub Info - Hub Delete Done")
        })
            .catch((e) => {
            console.error(e);
        });
        KitInfoDAO_1.default.deleteById({ KitId: "114" })
            .then((response) => {
            //console.log(response);
            //console.log("Hub Info- Kit Delete done")
        })
            .catch((e) => {
            console.error(e);
        });
        ReportInfoDAO_1.default.deleteById({ ReportId: genReportId, })
            .then((response) => {
            //console.log(response);
            //console.log("Hub Info - Report Delete done")
        })
            .catch((e) => {
            console.error(e);
        });
    }));
    it('responds with a valid HTTP status code', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const putData = {
                PhysicalDamage: "Fail",
                ConditionOfCables: "Pass",
                ChargerCondition: "Pass",
                HubPortFunc: "Fail",
                HubOverheat: "Pass",
                ReportId: genReportId,
                KitId: "114"
            };
            const response = (yield requestWithSupertest
                .put('/api/v1/stingray/HubInfo/')
                .send(putData)
                .then((response) => __awaiter(this, void 0, void 0, function* () {
                (0, chai_1.expect)(response.status).to.equal(200);
                (0, chai_1.expect)(response.body.HubInfo.affectedRows).to.equal(1);
            })));
        });
    });
});
//LeftSensor
describe('Testing PUT /LeftSensor endpoint', function () {
    before(() => __awaiter(this, void 0, void 0, function* () {
        const putData = {
            KitId: "115",
            RightSensorId: "111",
            LeftSensorId: "111",
            PhoneId: "111",
        };
        yield KitInfoDAO_1.default.putKitInfo(putData);
        const reportPutData = {
            LastKnownUser: "LastUserName13",
            Tester: "Tester1",
            ReportLocation: "Not Provided",
            TesterComments: "Not Provided",
            KitId: "115",
        };
        const response = yield ReportInfoDAO_1.default.putReportInfo(reportPutData);
        genReportId = response.insertId;
    }));
    after(() => __awaiter(this, void 0, void 0, function* () {
        LeftSensorDAO_1.default.deleteById({ LeftSensorId: "111" })
            .then((response) => {
            //console.log(response);
            //console.log("Hub Info - Hub Delete Done")
        })
            .catch((e) => {
            console.error(e);
        });
        KitInfoDAO_1.default.deleteById({ KitId: "115" })
            .then((response) => {
            //console.log(response);
            //console.log("Hub Info- Kit Delete done")
        })
            .catch((e) => {
            console.error(e);
        });
        ReportInfoDAO_1.default.deleteById({ ReportId: genReportId, })
            .then((response) => {
            //console.log(response);
            //console.log("Hub Info - Report Delete done")
        })
            .catch((e) => {
            console.error(e);
        });
    }));
    it('responds with a valid HTTP status code', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const putData = {
                LeftSensorId: "111",
                PhysicalDamage: "Pass",
                ConnectorFunc: "Pass",
                MountingBrackets: "Pass",
                ConditionOfCables: "Pass",
                BluetoothFunc: "Pass",
                DataTrans: "Pass",
                ReportId: genReportId,
                KitId: "115"
            };
            const response = (yield requestWithSupertest
                .put('/api/v1/stingray/LeftSensor/')
                .send(putData)
                .then((response) => __awaiter(this, void 0, void 0, function* () {
                (0, chai_1.expect)(response.status).to.equal(200);
                (0, chai_1.expect)(response.body.LeftSensor.affectedRows).to.equal(1);
            })));
        });
    });
});
//RightSensor
describe('Testing PUT /RightSensor endpoint', function () {
    before(() => __awaiter(this, void 0, void 0, function* () {
        const putData = {
            KitId: "116",
            RightSensorId: "111",
            LeftSensorId: "111",
            PhoneId: "111",
        };
        yield KitInfoDAO_1.default.putKitInfo(putData);
        const reportPutData = {
            LastKnownUser: "LastUserName13",
            Tester: "Tester1",
            ReportLocation: "Not Provided",
            TesterComments: "Not Provided",
            KitId: "117",
        };
        const response = yield ReportInfoDAO_1.default.putReportInfo(reportPutData);
        genReportId = response.insertId;
    }));
    after(() => __awaiter(this, void 0, void 0, function* () {
        RightSensorDAO_1.default.deleteById({ RightSensorId: "111" })
            .then((response) => {
            //console.log(response);
            //console.log("Hub Info - Hub Delete Done")
        })
            .catch((e) => {
            console.error(e);
        });
        KitInfoDAO_1.default.deleteById({ KitId: "116" })
            .then((response) => {
            //console.log(response);
            //console.log("Hub Info- Kit Delete done")
        })
            .catch((e) => {
            console.error(e);
        });
        ReportInfoDAO_1.default.deleteById({ ReportId: genReportId, })
            .then((response) => {
            //console.log(response);
            //console.log("Hub Info - Report Delete done")
        })
            .catch((e) => {
            console.error(e);
        });
    }));
    it('responds with a valid HTTP status code', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const putData = {
                RightSensorId: "111",
                PhysicalDamage: "Pass",
                ConnectorFunc: "Pass",
                MountingBrackets: "Pass",
                ConditionOfCables: "Pass",
                BluetoothFunc: "Pass",
                DataTrans: "Pass",
                ReportId: genReportId,
                KitId: "116"
            };
            const response = (yield requestWithSupertest
                .put('/api/v1/stingray/RightSensor/')
                .send(putData)
                .then((response) => __awaiter(this, void 0, void 0, function* () {
                (0, chai_1.expect)(response.status).to.equal(200);
                (0, chai_1.expect)(response.body.RightSensor.affectedRows).to.equal(1);
            })));
        });
    });
});
//PhoneInfo
describe('Testing PUT /PhoneInfo endpoint', function () {
    before(() => __awaiter(this, void 0, void 0, function* () {
        const putData = {
            KitId: "117",
            RightSensorId: "111",
            LeftSensorId: "111",
            PhoneId: "111",
        };
        yield KitInfoDAO_1.default.putKitInfo(putData);
        const reportPutData = {
            LastKnownUser: "LastUserName13",
            Tester: "Tester1",
            ReportLocation: "Not Provided",
            TesterComments: "Not Provided",
            KitId: "117",
        };
        const response = yield ReportInfoDAO_1.default.putReportInfo(reportPutData);
        genReportId = response.insertId;
    }));
    after(() => __awaiter(this, void 0, void 0, function* () {
        PhoneInfoDAO_1.default.deleteById({ PhoneId: "111" })
            .then((response) => {
            //console.log(response);
            //console.log("Hub Info - Hub Delete Done")
        })
            .catch((e) => {
            console.error(e);
        });
        KitInfoDAO_1.default.deleteById({ KitId: "117" })
            .then((response) => {
            //console.log(response);
            //console.log("Hub Info- Kit Delete done")
        })
            .catch((e) => {
            console.error(e);
        });
        ReportInfoDAO_1.default.deleteById({ ReportId: genReportId, })
            .then((response) => {
            //console.log(response);
            //console.log("Hub Info - Report Delete done")
        })
            .catch((e) => {
            console.error(e);
        });
    }));
    it('responds with a valid HTTP status code', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const putData = {
                PhoneId: "111",
                PhysicalDamage: "Pass",
                VolButtonFunc: "Pass",
                PowerButtonFunc: "Pass",
                ChargingPort: "Pass",
                SIMCardFunc: "Pass",
                MemCardFunc: "Pass",
                PhoneCaseCondition: "Pass",
                ConditionOfCable: "Pass",
                TouchScreenFunc: "Pass",
                WiFiFunc: "Pass",
                BluetoothFunc: "Pass",
                CellDataFunc: "Pass",
                SpeakerFunc: "Pass",
                ReportId: genReportId,
                KitId: "117"
            };
            const response = (yield requestWithSupertest
                .put('/api/v1/stingray/PhoneInfo/')
                .send(putData)
                .then((response) => __awaiter(this, void 0, void 0, function* () {
                (0, chai_1.expect)(response.status).to.equal(200);
                (0, chai_1.expect)(response.body.PhoneInfo.affectedRows).to.equal(1);
            })));
        });
    });
});
