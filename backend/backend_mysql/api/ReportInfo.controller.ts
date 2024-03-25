/*
 * Report Info Controller contains apiGetReportInfo, apiGetReportInfoById, and apiPutReportInfo commands 
*/
import ReportInfoDAO from "../dao/ReportInfoDAO";

export default class ReportInfoController {
    // GET
    // Retrieves report information with pagination support.
    // Pages are intended for future-proofing, but not yet implemented.
    static async apiGetReportInfo(req: any, res: any, next: any) {
        // Extracts query parameters for pagination
        const resultsPerPage = req.query.resultsPerPage ? parseInt(req.query.resultsPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        // Calls the DAO method to get report information
        const result = await ReportInfoDAO.getReportInfo({ page: page, itemsPerPage: resultsPerPage });

        // Constructs the response object
        let response = {
            ReportInfo: result,
        }

        // Sends the response as JSON
        res.json(response);
    }

    // GET BY ID
    // Retrieves report information for a specific ReportId with pagination support.
    static async apiGetReportInfoById(req: any, res: any, next: any) {
        // Extracts query parameters for pagination and ReportId
        const resultsPerPage = req.query.resultsPerPage ? parseInt(req.query.resultsPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;
        const ReportId = req.params.ReportId ? req.params.ReportId : "No id given";

        // Calls the DAO method to get report information by ID
        const result = await ReportInfoDAO.getReportInfoById({ page: page, itemsPerPage: resultsPerPage, ReportId: ReportId });

        // Constructs the response object
        let response = {
            ReportInfo: result,
        }

        // Sends the response as JSON
        res.json(response);
    }

    //PUT
    // Inserts report data into the ReportInfo table for reuse and archival
    static async apiPutReportInfo(req: any, res: any, next: any) {
        // Extracts request body parameters
        let LastKnownUser = req.body.LastKnownUser;
        let Tester = req.body.Tester;
        let DateTested = req.body.DateTested;
        let ReportLocation = req.body.ReportLocation;
        let TesterComments = req.body.TesterComments;
        let KitId = req.body.KitId;

        // Calls the DAO method to insert report information
        const result = await ReportInfoDAO.putReportInfo({
            LastKnownUser: LastKnownUser,
            Tester: Tester,
            DateTested: DateTested,
            ReportLocation: ReportLocation,
            TesterComments: TesterComments,
            KitId: KitId
        });

        // Constructs the response object
        let response = {
            ReportInfo: result,
        }

        // Sends the response as JSON
        res.json(response);
    }
}
