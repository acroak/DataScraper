/*
 *  Left Sensor controller contains apiGetLeftSensor, apiGetLeftSensorById, and apiPutLeftSensor commands
*/
import LeftSensorDAO from "../dao/LeftSensorDAO";

export default class LeftSensorController {
    // GET
    // Retrieves left sensor information with pagination support.
    // Pages are intended for future-proofing, but not yet implemented.
    static async apiGetLeftSensor(req: any, res: any, next: any) {
        // Extracts query parameters for pagination
        const resultsPerPage = req.query.resultsPerPage ? parseInt(req.query.resultsPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        // Calls the DAO method to get left sensor information
        const result = await LeftSensorDAO.getLeftSensor({ page: page, itemsPerPage: resultsPerPage });

        // Constructs the response object
        let response = {
            LeftSensor: result,
        }

        // Sends the response as JSON
        res.json(response);
    }

    // GET BY ID
    // Retrieves left sensor information for a specific LeftSensorId with pagination support.
    // Currently unused in the frontend.
    static async apiGetLeftSensorById(req: any, res: any, next: any) {
        // Extracts query parameters for pagination and LeftSensorId
        const resultsPerPage = req.query.resultsPerPage ? parseInt(req.query.resultsPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;
        const LeftSensorId = req.params.LeftSensorId ? req.params.LeftSensorId : "0";

        // Calls the DAO method to get left sensor information by ID
        const result = await LeftSensorDAO.getLeftSensorById({ page: page, itemsPerPage: resultsPerPage, LeftSensorId: LeftSensorId });

        // Constructs the response object
        let response = {
            LeftSensor: result,
        }

        // Sends the response as JSON
        res.json(response);
    }

    // PUT
    // Inserts left sensor diagnostic data into the LeftSensor table for reuse and archival
    static async apiPutLeftSensor(req: any, res: any, next: any) {
        // Extracts request body parameters
        let LeftSensorID = req.body.LeftSensorId;
        let PhysicalDamage = req.body.PhysicalDamage;
        let ConnectorFunc = req.body.ConnectorFunc;
        let MountingBrackets = req.body.MountingBrackets;
        let ConditionOfCables = req.body.ConditionOfCables;
        let BluetoothFunc = req.body.BluetoothFunc;
        let DataTrans = req.body.DataTrans;
        let KitId = req.body.KitId;
        let ReportId = req.body.ReportId;

        // Calls the DAO method to insert left sensor information
        const result = await LeftSensorDAO.putLeftSensor({
            LeftSensorID: LeftSensorID,
            PhysicalDamage: PhysicalDamage,
            ConnectorFunc: ConnectorFunc,
            MountingBrackets: MountingBrackets,
            ConditionOfCables: ConditionOfCables,
            BluetoothFunc: BluetoothFunc,
            DataTrans: DataTrans,
            KitId: KitId,
            ReportId: ReportId
        });

        // Constructs the response object
        let response = {
            LeftSensor: result,
        }

        // Sends the response as JSON
        res.json(response);
    }
}
