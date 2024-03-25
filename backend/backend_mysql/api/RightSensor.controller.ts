/*
 * Right Sensor controller contains apiGetRightSensor, apiGetRightSensorById, and apiPutRightSensor commands
*/
import RightSensorDAO from "../dao/RightSensorDAO";

export default class RightSensorController {

    // GET
    // Retrieves right sensor information with pagination support.
    // Pages are intended for future-proofing, but not yet implemented.
    static async apiGetRightSensor(req: any, res: any, next: any) {
        // Extracts query parameters for pagination
        const resultsPerPage = req.query.resultsPerPage ? parseInt(req.query.resultsPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        // Calls the DAO method to get right sensor information
        const result = await RightSensorDAO.getRightSensor({ page: page, itemsPerPage: resultsPerPage });

        // Constructs the response object
        let response = {
            RightSensor: result,
        }

        // Sends the response as JSON
        res.json(response);
    }

    // GET BY ID
    // Retrieves right sensor information for a specific RightSensorId with pagination support.
    // Currently unused in the frontend.
    static async apiGetRightSensorById(req: any, res: any, next: any) {
        // Extracts query parameters for pagination and RightSensorId
        const resultsPerPage = req.query.resultsPerPage ? parseInt(req.query.resultsPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;
        const RightSensorId = req.params.RightSensorId ? req.params.RightSensorId : "0";

        // Calls the DAO method to get right sensor information by ID
        const result = await RightSensorDAO.getRightSensorById({ page: page, itemsPerPage: resultsPerPage, RightSensorId: RightSensorId });

        // Constructs the response object
        let response = {
            RightSensor: result,
        }

        // Sends the response as JSON
        res.json(response);
    }

    //PUT
    // Inserts right sensor data into the RightSensor table for reuse and archival
    static async apiPutRightSensor(req: any, res: any, next: any) {
        // Extracts request body parameters
        let RightSensorID = req.body.RightSensorId;
        let PhysicalDamage = req.body.PhysicalDamage;
        let ConnectorFunc = req.body.ConnectorFunc;
        let MountingBrackets = req.body.MountingBrackets;
        let ConditionOfCables = req.body.ConditionOfCables;
        let BluetoothFunc = req.body.BluetoothFunc;
        let DataTrans = req.body.DataTrans;
        let KitId = req.body.KitId;
        let ReportId = req.body.ReportId;

        // Calls the DAO method to insert right sensor information
        const result = await RightSensorDAO.putRightSensor({
            RightSensorID: RightSensorID,
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
            RightSensor: result,
        }

        // Sends the response as JSON
        res.json(response);
    }
}
