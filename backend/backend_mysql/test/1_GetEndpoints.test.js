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
const ReportInfoDAO_1 = __importDefault(require("../dao/ReportInfoDAO"));
const requestWithSupertest = (0, supertest_1.default)(server_1.default);
//------------------------------------------------------
// ------------------GET Request Tests------------------
//------------------------------------------------------
//console.log("-------Get Requests-------");
describe('Testing GET /KitInfo endpoint', function () {
    it('responds with a valid HTTP status code', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield requestWithSupertest.get('/api/v1/stingray/kitinfo/');
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body).to.be.an('object');
        });
    });
});
describe('Testing GET /ReportInfo endpoint', function () {
    it('responds with a valid HTTP status code', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield requestWithSupertest.get('/api/v1/stingray/ReportInfo/');
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body).to.be.an('object');
        });
    });
});
describe('Testing GET /HeadsetInfo endpoint', function () {
    it('responds with a valid HTTP status code', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield requestWithSupertest.get('/api/v1/stingray/headsetinfo/');
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body).to.be.an('object');
        });
    });
});
describe('Testing GET /HubInfo endpoint', function () {
    it('responds with a valid HTTP status code', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield requestWithSupertest.get('/api/v1/stingray/HubInfo/');
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body).to.be.an('object');
        });
    });
});
describe('Testing GET /KitInfo endpoint', function () {
    it('responds with a valid HTTP status code', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield requestWithSupertest.get('/api/v1/stingray/KitInfo/');
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body).to.be.an('object');
        });
    });
});
describe('Testing GET /LeftSensor endpoint', function () {
    it('responds with a valid HTTP status code', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield requestWithSupertest.get('/api/v1/stingray/LeftSensor/');
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body).to.be.an('object');
        });
    });
});
describe('Testing GET /PhoneInfo endpoint', function () {
    it('responds with a valid HTTP status code', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield requestWithSupertest.get('/api/v1/stingray/PhoneInfo/');
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body).to.be.an('object');
        });
    });
});
describe('Testing GET /RightSensor endpoint', function () {
    it('responds with a valid HTTP status code', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield requestWithSupertest.get('/api/v1/stingray/RightSensor/');
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body).to.be.an('object');
        });
    });
});
let genReportId = 0;
//------------------------------------------------------
// ---------------GET Requests for Reports--------------
//------------------------------------------------------
//console.log('-------Get Requests for Reports-------')
describe('Testing GET /HistoricalReport/:ReportID endpoint', function () {
    before(() => __awaiter(this, void 0, void 0, function* () {
        const putData = {
            KitId: "118",
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
            KitId: "118",
        };
        const response = yield ReportInfoDAO_1.default.putReportInfo(reportPutData);
        genReportId = response.insertId;
    }));
    after(() => __awaiter(this, void 0, void 0, function* () {
        KitInfoDAO_1.default.deleteById({ KitId: "118" })
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
            const response = yield requestWithSupertest.get(`/api/v1/stingray/ReportByReportId/${genReportId}`);
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body).to.be.an('object');
        });
    });
});
describe('Testing GET /HistoricalReport/:KitID endpoint', function () {
    it('responds with a valid HTTP status code', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield requestWithSupertest.get('/api/v1/stingray/ReportByKitId/118');
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body).to.be.an('object');
        });
    });
});
