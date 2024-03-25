/*
 *  Hub Data controller contains apiGetHubInfo, apiGetHubInfoById, and apiPutHubInfo commands
*/
import HubInfoDAO from "../dao/HubInfoDAO";

export default class HubInfoController {

    // GET
    // Retrieves hub information with pagination support.
    static async apiGetHubInfo(req: any, res: any, next: any) {
        // Extracts query parameters for pagination
        const resultsPerPage = req.query.resultsPerPage ? parseInt(req.query.resultsPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        // Calls the DAO method to get hub information
        const result = await HubInfoDAO.getHubInfo({ page: page, itemsPerPage: resultsPerPage });

        // Constructs the response object
        let response = {
            HubInfo: result,
        }

        // Sends the response as JSON
        res.json(response);
    }

    // GET BY ID
    // Retrieves hub information for a specific HubId with pagination support.
    static async apiGetHubInfoById(req: any, res: any, next: any) {
        // Extracts query parameters for pagination and HubId
        const resultsPerPage = req.query.resultsPerPage ? parseInt(req.query.resultsPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;
        const HubId = req.params.HubId ? req.params.HubId : "0";

        // Calls the DAO method to get hub information by ID
        const result = await HubInfoDAO.getHubInfoById({ page: page, itemsPerPage: resultsPerPage, HubId: HubId });

        // Constructs the response object
        let response = {
            HubInfo: result,
        }

        // Sends the response as JSON
        res.json(response);
    }

    // PUT
    // Inserts hub diagnostic data into the HubInfo table for reuse and archival
    static async apiPutHubInfo(req: any, res: any, next: any) {
        // Extracts request body parameters
        let PhysicalDamage = req.body.PhysicalDamage;
        let ConditionOfCables = req.body.ConditionOfCables;
        let ChargerCondition = req.body.ChargerCondition;
        let HubPortFunc = req.body.HubPortFunc;
        let HubOverheat = req.body.HubOverheat;
        let ReportId = req.body.ReportId;
        let KitId = req.body.KitId;

        // Calls the DAO method to insert hub diagnostic data
        const result = await HubInfoDAO.putHubInfo({
            PhysicalDamage: PhysicalDamage,
            ConditionOfCables: ConditionOfCables,
            ChargerCondition: ChargerCondition,
            HubPortFunc: HubPortFunc,
            HubOverheat: HubOverheat,
            KitId: KitId,
            ReportId: ReportId
        });

        // Constructs the response object
        let response = {
            HubInfo: result,
        }

        // Sends the response as JSON
        res.json(response);
    }
}
