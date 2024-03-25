/*
 *  Headset Data controller contains apiGetHeadsetInfo, apiGetHeadsetInfoById, and apiPutHeadsetInfo commands
*/
import HeadsetInfoDAO from "../dao/HeadsetInfoDAO";

export default class HeadsetInfoController {

    // GET
    // Retrieves headset information with pagination support.
    static async apiGetHeadsetInfo(req: any, res: any, next: any) {
        // Extracts query parameters for pagination
        const resultsPerPage = req.query.resultsPerPage ? parseInt(req.query.resultsPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        // Calls the DAO method to get headset information
        const result = await HeadsetInfoDAO.getHeadsetInfo({ page: page, itemsPerPage: resultsPerPage });

        // Constructs the response object
        let response = {
            HeadsetInfo: result,
        }

        // Sends the response as JSON
        res.json(response);
    }

    // GET BY ID 
    // Retrieves headset information for a specific HeadsetId with pagination support.
    static async apiGetHeadsetInfoById(req: any, res: any, next: any) {
        // Extracts query parameters for pagination and HeadsetId
        const resultsPerPage = req.query.resultsPerPage ? parseInt(req.query.resultsPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;
        const HeadsetId = req.params.HeadsetInfoId ? req.params.HeadsetInfoId : "0";

        // Calls the DAO method to get headset information by ID
        const result = await HeadsetInfoDAO.getHeadsetInfoById({ page: page, itemsPerPage: resultsPerPage, HeadsetId: HeadsetId });

        // Constructs the response object
        let response = {
            HeadsetInfo: result,
        }

        // Sends the response as JSON
        res.json(response);
    }

    // PUT
    // Inserts headset diagnostic data into the HeadsetInfo table for reuse and archival
    static async apiPutHeadsetInfo(req: any, res: any, next: any) {
        // Extracts request body parameters
        let PhysicalDamage = req.body.PhysicalDamage;
        let ConnectorDamage = req.body.ConnectorDamage;
        let ConditionOfCables = req.body.ConditionOfCables;
        let AudioFuncLeftChannel = req.body.AudioFuncLeftChannel;
        let AudioFuncRightChannel = req.body.AudioFuncRightChannel;
        let AudioQuality = req.body.AudioQuality;
        let VolButtonFunc = req.body.VolButtonFunc;
        let PowerButtonFunc = req.body.PowerButtonFunc;
        let KitId = req.body.KitId;
        let ReportId = req.body.ReportId;

        // Calls the DAO method to insert headset diagnostic data
        const result = await HeadsetInfoDAO.putHeadsetInfo({
            PhysicalDamage: PhysicalDamage,
            ConnectorDamage: ConnectorDamage,
            ConditionOfCables: ConditionOfCables,
            AudioFuncLeftChannel: AudioFuncLeftChannel,
            AudioFuncRightChannel: AudioFuncRightChannel,
            AudioQuality: AudioQuality,
            VolButtonFunc: VolButtonFunc,
            PowerButtonFunc: PowerButtonFunc,
            KitId: KitId,
            ReportId: ReportId
        });

        // Constructs the response object
        let response = {
            HeadsetInfo: result,
        }

        // Sends the response as JSON
        res.json(response);
    }
}
