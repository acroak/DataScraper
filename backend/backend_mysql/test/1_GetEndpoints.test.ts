import supertest from 'supertest';
import { expect } from 'chai';
import app from '../server';
import { response } from 'express';
import KitInfoDAO from '../dao/KitInfoDAO';
import HeadsetInfoDAO from '../dao/HeadsetInfoDAO';
import ReportInfoDAO from '../dao/ReportInfoDAO';

const requestWithSupertest = supertest(app);



//------------------------------------------------------
// ------------------GET Request Tests------------------
//------------------------------------------------------
//console.log("-------Get Requests-------");
describe('Testing GET /KitInfo endpoint', function() {
    it('responds with a valid HTTP status code',
        async function() {
            const response = await requestWithSupertest.get('/api/v1/stingray/kitinfo/');
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
        });
});

describe('Testing GET /ReportInfo endpoint', function() {
    it('responds with a valid HTTP status code',
        async function() {
            const response = await requestWithSupertest.get('/api/v1/stingray/ReportInfo/');
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
        });
});

describe('Testing GET /HeadsetInfo endpoint', function() {
    it('responds with a valid HTTP status code',
        async function() {
            const response = await requestWithSupertest.get('/api/v1/stingray/headsetinfo/');
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
        });
});

describe('Testing GET /HubInfo endpoint', function() {
    it('responds with a valid HTTP status code',
        async function() {
            const response = await requestWithSupertest.get('/api/v1/stingray/HubInfo/');
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
        });
});

describe('Testing GET /KitInfo endpoint', function() {
    it('responds with a valid HTTP status code',
        async function() {
            const response = await requestWithSupertest.get('/api/v1/stingray/KitInfo/');
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
        });
});

describe('Testing GET /LeftSensor endpoint', function() {
    it('responds with a valid HTTP status code',
        async function() {
            const response = await requestWithSupertest.get('/api/v1/stingray/LeftSensor/');
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
        });
});

describe('Testing GET /PhoneInfo endpoint', function() {
    it('responds with a valid HTTP status code',
        async function() {
            const response = await requestWithSupertest.get('/api/v1/stingray/PhoneInfo/');
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
        });
});

describe('Testing GET /RightSensor endpoint', function() {
    it('responds with a valid HTTP status code',
        async function() {
            const response = await requestWithSupertest.get('/api/v1/stingray/RightSensor/');
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
        });
});
let genReportId = 0;

//------------------------------------------------------
// ---------------GET Requests for Reports--------------
//------------------------------------------------------
//console.log('-------Get Requests for Reports-------')
describe('Testing GET /HistoricalReport/:ReportID endpoint', function() {
    before(async () => {
        const putData = {
            KitId: "118",
            RightSensorId: "111",
            LeftSensorId: "111",
            PhoneId: "111",
        }
        await KitInfoDAO.putKitInfo(putData)
        const reportPutData = {
            LastKnownUser: "LastUserName13",
            Tester: "Tester1",
            ReportLocation: "Not Provided",
            TesterComments: "Not Provided",
            KitId: "118",
        }
        const response = await ReportInfoDAO.putReportInfo(reportPutData);
        genReportId = response.insertId;
    })
    after(async () => {
        KitInfoDAO.deleteById({ KitId: "118" })
            .then((response) => {
                //console.log(response);
                //console.log("Hub Info- Kit Delete done")
            })
            .catch((e) => {
                console.error(e);
            });
        ReportInfoDAO.deleteById({ ReportId: genReportId, })
            .then((response) => {
                //console.log(response);
                //console.log("Hub Info - Report Delete done")
            })
            .catch((e) => {
                console.error(e);
            });
    })

    it('responds with a valid HTTP status code',
        async function() {
            const response = await requestWithSupertest.get(`/api/v1/stingray/ReportByReportId/${genReportId}`);
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
        });
});

describe('Testing GET /HistoricalReport/:KitID endpoint', function() {
    it('responds with a valid HTTP status code',
        async function() {
            const response = await requestWithSupertest.get('/api/v1/stingray/ReportByKitId/118');
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
        });
});
