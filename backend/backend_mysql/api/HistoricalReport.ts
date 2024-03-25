import HistoricalReportDAO from "../dao/HistoricalReportDAO";

export default class HistoricalReport {

    //Retrieves aggregate report based on KitID
    static async apiGetReportByKitId(req: any, res: any, next: any) {
        const KitId = req.params.KitId ? req.params.KitId: "0";

        const result = await HistoricalReportDAO.getHistoricalReportByKitId({KitId: KitId});

        let response = {
            Report: result,
        }

        res.json(response);

    }
    //Retrieves aggregate report based on ReportID
    static async apiGetReportByReportId(req: any, res: any, next: any) {
        const ReportId = req.params.ReportId ? req.params.ReportId: "0";

        const result = await HistoricalReportDAO.getHistoricalReportByReportId({ReportId: ReportId});

        let response = {
            Report: result,
        }

        res.json(response);

    }
}

