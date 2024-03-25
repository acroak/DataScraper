/*
 *  Kit Info controller contains apiGetKitInfo, apiGetKitInfoById, and apiPutKitInfo commands
*/
import KitInfoDAO from "../dao/KitInfoDAO";

export default class KitInfoController {
    // GET
    // Retrieves kit information with pagination support.
    static async apiGetKitInfo(req: any, res: any, next: any) {
        // Extracts query parameters for pagination
        const resultsPerPage = req.query.resultsPerPage ? parseInt(req.query.resultsPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        // Calls the DAO method to get kit information
        const result = await KitInfoDAO.getKitInfo({ page: page, itemsPerPage: resultsPerPage });

        // Constructs the response object
        let response = {
            KitInfo: result,
        }

        // Sends the response as JSON
        res.json(response);
    }

    // GET BY ID
    // Retrieves kit information for a specific KitId with pagination support.
    static async apiGetKitInfoById(req: any, res: any, next: any) {
        // Extracts query parameters for pagination and KitId
        const resultsPerPage = req.query.resultsPerPage ? parseInt(req.query.resultsPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;
        const KitId = req.params.KitId ? req.params.KitId : "0";

        // Calls the DAO method to get kit information by ID
        const result = await KitInfoDAO.getKitInfoById({ page: page, itemsPerPage: resultsPerPage, KitId: KitId });

        // Constructs the response object
        let response = {
            KitInfo: result,
        }

        // Sends the response as JSON
        res.json(response);
    }

    // PUT
    // Inserts kit information into the KitInfo table for reuse and archival
    static async apiPutKitInfo(req: any, res: any, next: any) {
        // Extracts request body parameters
        let KitId = req.body.KitId;
        let LeftSensorId = req.body.LeftSensorId;
        let RightSensorId = req.body.RightSensorId;
        let PhoneId = req.body.PhoneId;

        // Calls the DAO method to insert kit information
        const result = await KitInfoDAO.putKitInfo({
            KitId: KitId,
            LeftSensorId: LeftSensorId,
            RightSensorId: RightSensorId,
            PhoneId: PhoneId,
        });

        // Constructs the response object
        let response = {
            KitInfo: result,
        }

        // Sends the response as JSON
        res.json(response);
    }
}
