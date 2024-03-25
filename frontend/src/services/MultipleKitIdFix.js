/*
There is an error with the Megaquery located in the HistoricalReportDAO, 
where if searching by a reportId n and other reports share the same KitId as report n,
they are also returned by the query. This causes a fatal error when later parsing the information.

This function is an adapter, which takes the JSON response of the megaquery,
,locates the correct KitInfo JSON, and returns a corrected array of JSONs.

Params: result, array of JSONs over 7 entries long
Returns: corrected array of JSONs that is 7 entries long, with incorrect KitInfo JSONS removed.
*/
const ResultAdapter = (result) => {

    //index of the report Info json in results
    let reportInfoIndex = null;
    //report's Phone id
    let phoneId = null;
    //report's Left Sensor id
    let leftSensorId = null;
    //report's right sensor id
    let rightSensorId = null;
    
    //iterate through the first few jsons, until the reportInfo json is found
    for (let i = 0; i < result.length; i++) {

        if (result[i].DateTested != null) {
            //save the information of the report
            reportInfoIndex = i
            phoneId = result[i + 1].PhoneId
            leftSensorId = result[i + 2].LeftSensorId
            rightSensorId = result[i + 3].RightSensorId
            
            //exit the for loop
            i = result.length
        }
    }

    //console.log("Report Index :", reportInfoIndex)
    //console.log("Phone Id :", phoneId)
    //console.log("LS Id :", leftSensorId)
    //console.log("RS Id :", rightSensorId)

    //id of the correct KitInfo json
    let validKitIndex = null

    //find the KitInfo json that actually matches the information of the ReportInfo json
    for (let i = 0; i < reportInfoIndex; i++) {
        let thisKitInfo = result[i]
        if (thisKitInfo.LeftSensorId == leftSensorId && thisKitInfo.RightSensorId == rightSensorId && thisKitInfo.PhoneId == phoneId){
            validKitIndex = i;
            i = reportInfoIndex
        }
    }

    //console.log("Correct KitInfo Index :", validKitIndex)
    //create array, including the correct KitInfo selection and the rest of the data
    let new_results = [result[validKitIndex], ...result.slice(reportInfoIndex)];


    //console.log("Corrected Array :", new_results)
    return new_results;
}

export default ResultAdapter