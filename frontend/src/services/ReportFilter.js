//Report Filter
//
// This is the parent interface for different methods 
// of generating report information
//
// It is important to note, Javascript doesn't natively have interfaces.
// I am getting around this by having the 'interface' implementation of each 
// function throw an error. It will only not throw an error once the concretions 
// implement the functions

var required = function(){ throw new Error("Implement!");};
export class ReportFilter{
    apiGet(key){
        required();
    }
}
