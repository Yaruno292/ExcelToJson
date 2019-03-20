var convertBtn = document.getElementById("convertBtn");
var jsonText = document.getElementById("jsonText");
var errorText = document.getElementById("errorText");
//var excelFile = document.getElementById("uploadFile").value;

//no reset variables
var errorFound = false;

/* set up XMLHttpRequest */
var url = "test.xlsx";
var oReq = new XMLHttpRequest();
oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";

oReq.onload = function(e) {
    var arraybuffer = oReq.response;

    /* convert data to binary string */
    var data = new Uint8Array(arraybuffer);
    var arr = new Array();
    for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join("");

    /* Call XLSX */
    var workbook = XLSX.read(bstr, {
        type: "binary"
    });

    /* DO SOMETHING WITH workbook HERE */
    var first_sheet_name = workbook.SheetNames[0];
    /* Get worksheet */
    var worksheet = workbook.Sheets[first_sheet_name];
    console.log(worksheet);
    console.log(XLSX.utils.sheet_to_json(worksheet, {
        raw: true,
        header: 1
    }));

    var jsonConvert = XLSX.utils.sheet_to_json(worksheet, {raw: true, header: 1});

    for (var i = 1; i < jsonConvert.length; i++) {
       //LISTS the texts in the cells

       //Resetting variables
       var comma = "";
       var time = 0;

       var errorAction = "";
       var errorBool = "";
       //Displays and generates json format in the textarea
       /*
       jsonConvert is a 2 dim array, which is the excel grid.
       The first array [] is the y (from left to right starting at 0)
       The second array [] is the x (top to bottom starting at 0)
       example: jsonConvert[0][2] = C1
       i counts up untill it reaches the bottom of the filled in sheet.
       (the lenght of the sheet)

       to add something to the string:
       \n = new line
       \" = "
       */

       jsonText.innerHTML = jsonText.innerHTML + /*id*/ "\n\"" + /*jsonConvert[0][0]*/ "id" + "\":\"" + /*the id num*/jsonConvert[i][0] + "\",\n\"" + "requests\":[\n" + "{\n" + "\"actionIds\":[\n";

       //Scans if there are multiple actionIds
       if(jsonConvert[i][3].indexOf(',') > -1){ //check if there is ,
         for (var j = 0; j < jsonConvert[i][3].split(',').length; j++) { //if there is comma, split it till there is no , left
           console.log(jsonConvert[i][3].split(',')[j]);

           if (j < jsonConvert[i][3].split(',').length -1){
             comma = ",";
           }else{
             comma = "";
           }

           switch (jsonConvert[i][3].split(',')[j]) {
             case "Beef Bowl":
                    time = 90;
               break;
             case "Fish Bowl":
                    time = 90;
               break;
             case "Treat":
                    time = 20;
               break;
             case "Water":
                    time = 20;
               break;
             default:
                    time = 0;
                    errorAction = " !Item not recognized at: " + jsonConvert[i][3];
           }

           console.log(j);
           //if more then 1, put them underneath eachother
           jsonText.innerHTML = jsonText.innerHTML + "{\n\"actionId\":\"" + jsonConvert[i][3].split(',')[j] + "\",\n\"expirationTime\":\"" + /*jsonConvert[i][10]*/ time + "\"" + errorAction + "\n}" + comma + "\n";
         }
       }
       else
       {
         switch (jsonConvert[i][3]) {
           case "Beef Bowl":
                  time = 90;
             break;
           case "Fish Bowl":
                  time = 90;
             break;
           case "Treat":
                 time = 20;
             break;
           case "Water":
                 time = 20;
             break;
           default:
                  time = 0;
                  errorAction = " !Item not recognized at: " + jsonConvert[i][3];
         }
         //If only 1, no comma needed, just add that 1
         jsonText.innerHTML = jsonText.innerHTML + "{\n\"actionId\":\"" + jsonConvert[i][3] + "\",\n\"expirationTime\":\"" + /*jsonConvert[i][10]*/ time + "\"" + errorAction + "\n},\n";
       }

       if (i < jsonConvert.length -1){
         comma = ",";
       }else{
         comma = "";
       }

       if (jsonConvert[i][14] != true && jsonConvert[i][14] != false){//Detect if its bool!!
         errorBool = " !No bool detected at id: " + jsonConvert[i][0] + " ChainRequest: " + jsonConvert[i][14];
       }
       //Chain with next request
       jsonText.innerHTML = jsonText.innerHTML + "]," + "\n\"chainWithNextRequest\":" + jsonConvert[i][14] + errorBool + "\n}" + comma;

       if (errorBool != "" || errorAction != ""){
         errorText.style.color = "red";
         errorText.innerHTML = "WARNING: " + errorAction + "\n" + errorBool;
         errorFound = true
       }
       else if (errorFound == false)
       {
         errorText.style.color = "green";
         errorText.innerHTML = "No error found";
       }
    }
    //Wraps the end
    jsonText.innerHTML = "{" + jsonText.innerHTML + "\n]\n}";
}

oReq.send();
