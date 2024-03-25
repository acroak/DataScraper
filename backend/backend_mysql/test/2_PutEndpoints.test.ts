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
//------------------------------------------------------
//console.log("-------Put Requests-------")
let genReportId = 0; //for storing the reportID we must fetch between tests
//KitInfo
describe('Testing PUT /KitInfo endpoint', function() {
    after(async () => {
        KitInfoDAO.deleteById({ KitId: "111" })
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
                KitId: "111",
                RightSensorId: "111",
                LeftSensorId: "111",
                PhoneId: "111",
            }
            const response = await requestWithSupertest
                .put('/api/v1/stingray/KitInfo/')
                .send(putData)
                .then(async (response) => {
                    expect(response.status).to.equal(200);
                    expect(response.body.KitInfo.affectedRows).to.equal(1);

                });
        });
});
//ReportInfo
describe('Testing PUT /ReportInfo endpoint', function() {
    before(async () => {
        const putData = {
            KitId: "112",
            RightSensorId: "111",
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
        KitInfoDAO.deleteById({ KitId: "112" })
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
                LastKnownUser: "LastUserName13",
                Tester: "Tester1",
                ReportLocation: "Not Provided",
                TesterComments: "Not Provided",
                KitId: "112",
            }

            const response = await requestWithSupertest
                .put('/api/v1/stingray/reportinfo/')
                .send(putData)
                .then(async (response) => {
                    expect(response.status).to.equal(200);
                    expect(response.body.ReportInfo.affectedRows).to.equal(1);
                    genReportId = response.body.ReportInfo.insertId;
                });
        });
});

//HeadsetInfo
describe('Testing PUT /HeadsetInfo endpoint', function() {
    before(async () => {
        const putData = {
            KitId: "113",
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
            KitId: "113",
        }
        const response = await ReportInfoDAO.putReportInfo(reportPutData);
        genReportId = response.insertId;
    })
    after(async () => {
        HeadsetInfoDAO.deleteById({ KitId: "113" })
            .then((response) => {
                //console.log(response);
                //console.log("Headset Info - Headset Delete done")
            })
            .catch((e) => {
                console.error(e);
            });
        KitInfoDAO.deleteById({ KitId: "113" })
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
            }
            try {

                const response = await requestWithSupertest
                    .put('/api/v1/stingray/HeadsetInfo/')
                    .send(putData)
                    .set('Accept', 'application/json')
                    .then((response) => {
                        //console.log(response);
                        expect(response.status).to.equal(200);
                        expect(response.body.HeadsetInfo.affectedRows).to.equal(1);
                    });
            } catch (error: any) {
                console.error('Error:', error.message);
                console.error('Response:', error.response && error.response.body);

                // Rethrow the error to ensure the test fails
                throw error;
            }
        });

});

//HubInfo
describe('Testing PUT /HubInfo endpoint', function() {
    before(async () => {
        const putData = {
            KitId: "114",
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
            KitId: "114",
        }
        const response = await ReportInfoDAO.putReportInfo(reportPutData);
        genReportId = response.insertId;
    })
    after(async () => {
        HubInfoDAO.deleteById({ KitId: "114" })
            .then((response) => {
                //console.log(response);
                //console.log("Hub Info - Hub Delete Done")
            })
            .catch((e) => {
                console.error(e);
            })
        KitInfoDAO.deleteById({ KitId: "114" })
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
                KitId: "114"
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
describe('Testing PUT /LeftSensor endpoint', function() {
    before(async () => {
        const putData = {
            KitId: "115",
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
            KitId: "115",
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
        KitInfoDAO.deleteById({ KitId: "115" })
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
                KitId: "115"
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
describe('Testing PUT /RightSensor endpoint', function() {
    before(async () => {
        const putData = {
            KitId: "116",
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
            KitId: "117",
        }
        const response = await ReportInfoDAO.putReportInfo(reportPutData);
        genReportId = response.insertId;
    })
    after(async () => {
        RightSensorDAO.deleteById({ RightSensorId: "111" })
            .then((response) => {
                //console.log(response);
                //console.log("Hub Info - Hub Delete Done")
            })
            .catch((e) => {
                console.error(e);
            })
        KitInfoDAO.deleteById({ KitId: "116" })
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
                RightSensorId: "111",
                PhysicalDamage: "Pass",
                ConnectorFunc: "Pass",
                MountingBrackets: "Pass",
                ConditionOfCables: "Pass",
                BluetoothFunc: "Pass",
                DataTrans: "Pass",
                ReportId: genReportId,
                KitId: "116"
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
describe('Testing PUT /PhoneInfo endpoint', function() {
    before(async () => {
        const putData = {
            KitId: "117",
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
            KitId: "117",
        }
        const response = await ReportInfoDAO.putReportInfo(reportPutData);
        genReportId = response.insertId;
    })
    after(async () => {
        PhoneInfoDAO.deleteById({ PhoneId: "111" })
            .then((response) => {
                //console.log(response);
                //console.log("Hub Info - Hub Delete Done")
            })
            .catch((e) => {
                console.error(e);
            })
        KitInfoDAO.deleteById({ KitId: "117" })
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


