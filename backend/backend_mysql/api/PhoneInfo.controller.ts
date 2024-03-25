/*
 * Phone Info Controller contains apiGetPhoneInfo, apiGetPhoneInfoById, and apiPutPhoneInfo commands 
*/
import PhoneInfoDAO from "../dao/PhoneInfoDAO";

export default class PhoneInfoController {

    // GET
    // Retrieves phone information with pagination support.
    // Pages are intended for future-proofing, but not yet implemented.
    static async apiGetPhoneInfo(req: any, res: any, next: any) {
        // Extracts query parameters for pagination
        const resultsPerPage = req.query.resultsPerPage ? parseInt(req.query.resultsPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        // Calls the DAO method to get phone information
        const result = await PhoneInfoDAO.getPhoneInfo({ page: page, itemsPerPage: resultsPerPage });

        // Constructs the response object
        let response = {
            PhoneInfo: result,
        }

        // Sends the response as JSON
        res.json(response);
    }

    // GET BY ID
    // Retrieves phone information for a specific PhoneId with pagination support.
    // Currently unused in the frontend.
    static async apiGetPhoneInfoById(req: any, res: any, next: any) {
        // Extracts query parameters for pagination and PhoneId
        const resultsPerPage = req.query.resultsPerPage ? parseInt(req.query.resultsPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;
        const PhoneId = req.params.PhoneId ? req.params.PhoneId : "0";

        // Calls the DAO method to get phone information by ID
        const result = await PhoneInfoDAO.getPhoneInfoById({ page: page, itemsPerPage: resultsPerPage, PhoneId: PhoneId });

        // Constructs the response object
        let response = {
            PhoneInfo: result,
        }

        // Sends the response as JSON
        res.json(response);
    }

    //PUT
    // Inserts phone diagnostic data into the PhoneInfo table for reuse and archival
    static async apiPutPhoneInfo(req: any, res: any, next: any) {
        // Extracts request body parameters
        let PhoneId = req.body.PhoneId;
        let PhysicalDamage = req.body.PhysicalDamage;
        let VolButtonFunc = req.body.VolButtonFunc;
        let PowerButtonFunc = req.body.PowerButtonFunc;
        let ChargingPort = req.body.ChargingPort;
        let SIMCardFunc = req.body.SIMCardFunc;
        let MemCardFunc = req.body.MemCardFunc;
        let PhoneCaseCondition = req.body.PhoneCaseCondition;
        let ConditionOfCable = req.body.ConditionOfCable;
        let TouchScreenFunc = req.body.TouchScreenFunc;
        let WiFiFunc = req.body.WiFiFunc;
        let BluetoothFunc = req.body.BluetoothFunc;
        let CellDataFunc = req.body.CellDataFunc;
        let SpeakerFunc = req.body.SpeakerFunc;
        let KitId = req.body.KitId;
        let ReportId = req.body.ReportId;

        // Calls the DAO method to insert phone information
        const result = await PhoneInfoDAO.putPhoneInfo({
            PhoneId: PhoneId,
            PhysicalDamage: PhysicalDamage,
            VolButtonFunc: VolButtonFunc,
            PowerButtonFunc: PowerButtonFunc,
            ChargingPort: ChargingPort,
            SIMCardFunc: SIMCardFunc,
            MemCardFunc: MemCardFunc,
            PhoneCaseCondition: PhoneCaseCondition,
            ConditionOfCable: ConditionOfCable,
            TouchScreenFunc: TouchScreenFunc,
            WiFiFunc: WiFiFunc,
            BluetoothFunc: BluetoothFunc,
            CellDataFunc: CellDataFunc,
            SpeakerFunc: SpeakerFunc,
            KitId: KitId,
            ReportId: ReportId,
        });

        // Constructs the response object
        let response = {
            PhoneInfo: result,
        }

        // Sends the response as JSON
        res.json(response);
    }
}
