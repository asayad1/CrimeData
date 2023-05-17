import {jsPDF} from "jspdf";

var generateData = function(crime_data) {
    var result = [];
    var data; 

    for (var i = 0; i < crime_data.length; i += 1) {    
    data = {
        TIME: String(crime_data[i][1]),
        CRIME: String(crime_data[i][3]),
        WEAPON: String(crime_data[i][4]),
        LOCATION: String(crime_data[i][2]),
        DISTRICT: String(crime_data[i][9])
        };
      data.id = (i + 1).toString();
      result.push(Object.assign({}, data));
    }
    return result;
  };
  
  function createHeaders(keys) {
    var result = [];
    for (var i = 0; i < keys.length; i += 1) {
        
      result.push({
        id: keys[i],
        name: keys[i],
        prompt: keys[i],
        width: 65,
        align: "center",
        padding: 0
      });
    }
    return result;
  }
  
export default function GenPDF(crime_data){
  var headers = createHeaders([
    "id",
    "TIME",
    "CRIME",
    "WEAPON",
    "LOCATION",
    "DISTRICT"
  ]);

  var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });

  doc.text("Baltimore Crime Data Report:", 5, 10);

  doc.table(1, 25, generateData(crime_data), headers, { autoSize: true });
  doc.output('dataurlnewwindow');
}