import supertest from 'supertest';
import { expect } from 'chai';
import app from '../server';
import { response } from 'express';
import KitInfoDAO from '../dao/KitInfoDAO';
import HeadsetInfoDAO from '../dao/HeadsetInfoDAO';
import ReportInfoDAO from '../dao/ReportInfoDAO';
import HubInfoDAO from '../dao/HubInfoDAO';
import LeftSensorDAO from '../dao/LeftSensorDAO';
import RightSensorDAO from '../dao/RightSensorDAO';
import PhoneInfoDAO from '../dao/PhoneInfoDAO';

const requestWithSupertest = supertest(app);

//------------------------------------------------------
// ------------------PUT Request Tests------------------
// -----------------Missing Right Sensor----------------
//------------------------------------------------------
//console.log("-------Put Requests with missing Right Sensor-------")
let genReportId = 0; //for storing the reportID we must fetch between tests
//KitInfo
describe('Testing PUT /KitInfo endpoint with missing Right Sensor', function() {
    after(async () => {
        KitInfoDAO.deleteById({ KitId: "222" })
            .then((response) => {
                //console.log(response);
                //console.log("Kit Info Delete done")
            })
            .catch((e) => {
                console.error(e);
            });

    })
    it('responds with a valid HTTP status code, affects 1 row, put all fields',
        async function() {
            const putData = {
                KitId: "222",
                RightSensorId: "Not Provided",
                LeftSensorId: "222",
                PhoneId: "222",
            }
            const response = (await requestWithSupertest
                .put('/api/v1/stingray/KitInfo/')
                .send(putData)
                .then(async (response) => {
                    expect(response.status).to.equal(200);
                    expect(response.body.KitInfo.affectedRows).to.equal(1);

                }));
        });
});
//ReportInfo
describe('Testing PUT /ReportInfo endpoint with missing Right Sensor', function() {
    before(async () => {
        const putData = {
            KitId: "223",
            RightSensorId: "Not Provided",
            LeftSensorId: "111",
            PhoneId: "111",
        }
        KitInfoDAO.putKitInfo(putData).then((response) => {
        })
            .catch((e) => {
                console.error(e);
            });



    })
    after(async () => {
        KitInfoDAO.deleteById({ KitId: "223" })
            .then((response) => {
                //console.log(response);
                //console.log("Report Info Delete done")
            })
            .catch((e) => {
                console.error(e);
            });
        ReportInfoDAO.deleteById({ ReportId: genReportId, })
            .then((response) => {
                //console.log(response);
                //console.log("Report Info Delete done")
            })
            .catch((e) => {
                console.error(e);
            });

    })
    it('responds with a valid HTTP status code',
        async function() {
            const putData = {
                LastKnownUser: "LastUserName2",
                Tester: "Tester2",
                ReportLocation: "Not Provided",
                TesterComments: "Not Provided",
                KitId: "223",
            }

            const response = (await requestWithSupertest
                .put('/api/v1/stingray/reportinfo/')
                .send(putData)
                .then(async (response) => {
                    expect(response.status).to.equal(200);
                    expect(response.body.ReportInfo.affectedRows).to.equal(1);
                    genReportId = response.body.ReportInfo.insertId;

                }));
        });
});

//HeadsetInfo
describe('Testing PUT /HeadsetInfo endpoint with missing Right Sensor', function() {
    before(async () => {
        const putData = {
            KitId: "224",
            LeftSensorId: "111",
            PhoneId: "111",
        }
        await KitInfoDAO.putKitInfo(putData)
        const reportPutData = {
            LastKnownUser: "LastUserName13",
            Tester: "Tester1",
            ReportLocation: "Not Provided",
            TesterComments: "Not Provided",
            KitId: "224",
        }
        const response = await ReportInfoDAO.putReportInfo(reportPutData);
        genReportId = response.insertId;
    })
    after(async () => {
        HeadsetInfoDAO.deleteById({ KitId: "224" })
            .then((response) => {
                //console.log(response);
                //console.log("Headset Info - Headset Delete done")
            })
            .catch((e) => {
                console.error(e);
            });
        KitInfoDAO.deleteById({ KitId: "224" })
            .then((response) => {
                //console.log(response);
                //console.log("Headset Info- Kit Delete done")
            })
            .catch((e) => {
                console.error(e);
            });
        ReportInfoDAO.deleteById({ ReportId: genReportId, })
            .then((response) => {
                //console.log(response);
                //console.log("Headset Info - Report Delete done")
            })
            .catch((e) => {
                console.error(e);
            });
    })
    it('responds with a valid HTTP status code',
        async function() {
            const putData = {
                PhysicalDamage: "Pass",
                ConnectorDamage: "Fail",
                ConditionOfCables: "Pass",
                AudioFuncLeftChannel: "Fail",
                AudioFuncRightChannel: "Pass",
                AudioQuality: "Fail",
                VolButtonFunc: "Pass",
                PowerButtonFunc: "Fail",
                ReportId: genReportId,
                KitId: "224"
            }

            const response = (await requestWithSupertest
                .put('/api/v1/stingray/HeadsetInfo/')
                .send(putData)
                .then(async (response) => {
                    expect(response.status).to.equal(200);
                    expect(response.body.HeadsetInfo.affectedRows).to.equal(1);

                }));
        });
});

//HubInfo
describe('Testing PUT /HubInfo endpoint with missing Right Sensor', function() {
    before(async () => {
        const putData = {
            KitId: "225",
            RightSensorId: "Not Provided",
            LeftSensorId: "111",
            PhoneId: "111",
        }
        await KitInfoDAO.putKitInfo(putData)
        const reportPutData = {
            LastKnownUser: "LastUserName13",
            Tester: "Tester1",
            ReportLocation: "Not Provided",
            TesterComments: "Not Provided",
            KitId: "225",
        }
        const response = await ReportInfoDAO.putReportInfo(reportPutData);
        genReportId = response.insertId;
    })
    after(async () => {
        HubInfoDAO.deleteById({ KitId: "225" })
            .then((response) => {
                //console.log(response);
                //console.log("Hub Info - Hub Delete Done")
            })
            .catch((e) => {
                console.error(e);
            })
        KitInfoDAO.deleteById({ KitId: "225" })
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
            const putData = {
                PhysicalDamage: "Fail",
                ConditionOfCables: "Pass",
                ChargerCondition: "Pass",
                HubPortFunc: "Fail",
                HubOverheat: "Pass",
                ReportId: genReportId,
                KitId: "225"
            }

            const response = (await requestWithSupertest
                .put('/api/v1/stingray/HubInfo/')
                .send(putData)
                .then(async (response) => {
                    expect(response.status).to.equal(200);
                    expect(response.body.HubInfo.affectedRows).to.equal(1);

                }));
        });
});

//LeftSensor
describe('Testing PUT /LeftSensor endpoint with missing Right Sensor', function() {
    before(async () => {
        const putData = {
            KitId: "226",
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
            KitId: "226",
        }
        const response = await ReportInfoDAO.putReportInfo(reportPutData);
        genReportId = response.insertId;
    })
    after(async () => {
        LeftSensorDAO.deleteById({ LeftSensorId: "111" })
            .then((response) => {
                //console.log(response);
                //console.log("Hub Info - Hub Delete Done")
            })
            .catch((e) => {
                console.error(e);
            })
        KitInfoDAO.deleteById({ KitId: "226" })
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
            const putData = {
                LeftSensorId: "111",
                PhysicalDamage: "Pass",
                ConnectorFunc: "Pass",
                MountingBrackets: "Pass",
                ConditionOfCables: "Pass",
                BluetoothFunc: "Pass",
                DataTrans: "Pass",
                ReportId: genReportId,
                KitId: "226"
            }

            const response = (await requestWithSupertest
                .put('/api/v1/stingray/LeftSensor/')
                .send(putData)
                .then(async (response) => {
                    expect(response.status).to.equal(200);
                    expect(response.body.LeftSensor.affectedRows).to.equal(1);

                }));
        });
});

//RightSensor
describe('Testing PUT /RightSensor endpoint with missing Right Sensor', function() {
    before(async () => {
        const putData = {
            KitId: "227",
            RightSensorId: "Not Provided",
            LeftSensorId: "111",
            PhoneId: "111",
        }
        await KitInfoDAO.putKitInfo(putData)
        const reportPutData = {
            LastKnownUser: "LastUserName13",
            Tester: "Tester1",
            ReportLocation: "Not Provided",
            TesterComments: "Not Provided",
            KitId: "227",
        }
        const response = await ReportInfoDAO.putReportInfo(reportPutData);
        genReportId = response.insertId;
    })
    after(async () => {
        RightSensorDAO.deleteById({ RightSensorId: "Not Provided" })
            .then((response) => {
                //console.log(response);
                //console.log("Hub Info - Hub Delete Done")
            })
            .catch((e) => {
                console.error(e);
            })
        KitInfoDAO.deleteById({ KitId: "227" })
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
            const putData = {
                RightSensorId: "Not Provided",
                PhysicalDamage: "Fail",
                ConnectorFunc: "Fail",
                MountingBrackets: "Fail",
                ConditionOfCables: "Fail",
                BluetoothFunc: "Fail",
                DataTrans: "Fail",
                ReportId: genReportId,
                KitId: "227"
            }

            const response = (await requestWithSupertest
                .put('/api/v1/stingray/RightSensor/')
                .send(putData)
                .then(async (response) => {
                    expect(response.status).to.equal(200);
                    expect(response.body.RightSensor.affectedRows).to.equal(1);

                }));
        });
});

//PhoneInfo
describe('Testing PUT /PhoneInfo endpoint with missing Right Sensor', function() {
    before(async () => {
        const putData = {
            KitId: "228",
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
            KitId: "228",
        }
        const response = await ReportInfoDAO.putReportInfo(reportPutData);
        genReportId = response.insertId;
    })
    after(async () => {
        PhoneInfoDAO.deleteById({ PhoneId: "222" })
            .then((response) => {
                //console.log(response);
                //console.log("Hub Info - Hub Delete Done")
            })
            .catch((e) => {
                console.error(e);
            })
        KitInfoDAO.deleteById({ KitId: "228" })
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
            const putData = {
                PhoneId: "222",
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
                KitId: "228"
            }

            const response = (await requestWithSupertest
                .put('/api/v1/stingray/PhoneInfo/')
                .send(putData)
                .then(async (response) => {
                    expect(response.status).to.equal(200);
                    expect(response.body.PhoneInfo.affectedRows).to.equal(1);
                }));
        });
});

//console.log('-------Get Request with Missing Right Sensor-------')
describe('Testing GET /HistoricalReport/:ReportID endpoint with missing right sensor', function() {
    before(async () => {
        const putData = {
            KitId: "118",
            RightSensorId: "Not Provided",
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
            expect(response.body.Report[0].KitId).to.equal('118');
            expect(response.body.Report[0].RightSensorId).to.equal('Not Provided');

        });
});

