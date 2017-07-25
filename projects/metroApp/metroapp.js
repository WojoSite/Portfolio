$(document).ready(function() {
    getData();
});


function getData(){
    var params = {
            "api_key": "1abe5bd5dbd5423aa352db7a5909d481",
            //"StationCodes": "All",
        };
      
        $.ajax({
            url: "  https://api.wmata.com/Rail.svc/json/jStations?" + $.param(params),
            dataType: 'jsonp',
            type: "GET",
        })
        .done(function(data) {
            displayStationData(data);
        })
        .fail(function() {
            console.log("error");
        });
    }; 

//function to display the station names in a select list
function displayStationData(result){
    
    //assign result to the stationList variable
    var stationList = result["Stations"]; 
    
    //create array for station names
    var manyStations = [];
    
    //create array for the station names without duplicates
    var stationNames = [];
    
    //loop over stations object array
    for (i = 0; i < stationList.length; i++) {
        
        //add the Name value from each object in stationList 
        manyStations.push(stationList[i]["Name"]); 
    }
    
    //if there are duplicates, remove them and add the result to stationNames
    $.each(manyStations, function(i, el){
        if($.inArray(el, stationNames) === -1)
            stationNames.push(el);
    });
    
    //sort the stationNames;
    stationNames.sort();

    //grab the "select" tag id
    var myList = document.getElementById("theList");

    //for each station name in stationNames
    for (j = 0; j < stationNames.length; j++){
        
        //create an option tag variable
        var listItem = document.createElement("option");
    
        //add the property string
        listItem.innerHTML = stationNames[j];
        
        //add the newly created list item to the selection list
        myList.appendChild(listItem);
    };

};

//function: trigger action when a station is selected from the list
$("#select-button").click(function(){
    
    //grab the value from the selection
    var selectedValue = document.getElementById("theList").value;

    //api call to wmata station prediction
    var params = {
            "api_key": "1abe5bd5dbd5423aa352db7a5909d481",
    };
      
    $.ajax({
        url: "https://api.wmata.com/StationPrediction.svc/json/GetPrediction/All?" + $.param(params),
        dataType: 'jsonp',
        type: "GET",
    })
    .done(function(data) {
        loadSelectionData(data);
    })
    .fail(function() {
        alert("error");
    });

    //function to display the selection data
    function loadSelectionData(result){
        
        //assign result to the stationList variable
        var trains = result["Trains"]; 
        
        //create empty array for selected obejcts
        var relevantTrains = [];
    
        //loop over stations object array
        for (i = 0; i < trains.length; i++) {
            
            //if the selected value matches the LocationName in the new prediction array
            if (selectedValue === trains[i]["LocationName"]){
                
                //grab the relevant train  
                var relevantTrain = trains[i];
            
                //add the train to the relevant trains list 
                relevantTrains.push(relevantTrain);
            }
        }
        
        //show the next trains for that location in a table
        //create a container-fluid div
        var containerDiv = document.createElement("div");
        document.getElementById("body").appendChild(containerDiv); ;
        containerDiv.setAttribute("class", "container-fluid");
            
        //create a row
        var containerRow = document.createElement("div");
        containerDiv.appendChild(containerRow);
        containerRow.setAttribute("class", "row");
            
        //create columns "col-md-4 col-md-offset-4"
        var containerCol = document.createElement("div");
        containerRow.appendChild(containerCol);
        containerCol.setAttribute("class", "col-md-4 col-md-offset-4");
            
        //create an h3 tag, add "stationid" as an id
        var containerH3 = document.createElement("h3");
        containerCol.appendChild(containerH3);
        containerH3.innerHTML = selectedValue;
        
        //create a table
        var containerTable = document.createElement("table");
        containerCol.appendChild(containerTable);
        containerTable.setAttribute("class", "table");
        containerTable.setAttribute("id", "nexttrains");
        
        var tableBody = document.createElement("tbody");
        containerTable.appendChild(tableBody);
            
        //create table row and three headers: line, destination, next train(s)
        var containerTablerow = document.createElement("tr");
        
        tableBody.appendChild(containerTablerow);
            
        //append:
        //three headers to table row
        var containerTh1 = document.createElement("th");
        var containerTh2 = document.createElement("th"); 
        var containerTh3 = document.createElement("th");
            
        containerTh1.innerHTML = "Line";
        containerTh2.innerHTML = "Destination";
        containerTh3.innerHTML = "Text Train(s)";
            
        containerTablerow.appendChild(containerTh1);
        containerTablerow.appendChild(containerTh2);
        containerTablerow.appendChild(containerTh3);
    
        for(i = 0; i < relevantTrains.length; i++){            
            
            //grab the 'nexttrain' id for the table element
            var theTable = document.getElementById("nexttrains");
            
            //create a new table data row
            var newRow = document.createElement("tr"); 
            
            //create variables for display info
            var line = relevantTrains[i]["Line"];
            var dest = relevantTrains[i]["DestinationName"];
            var nextTrain = relevantTrains[i]["Min"];
            
            //create a new table data cell variable
            var newCell1 = document.createElement("td");
            var newCell2 = document.createElement("td");
            var newCell3 = document.createElement("td");
            
            //add data to data cells
            
            //data for the line cell
            newCell1.innerHTML = line;
            
            //color backgrounds for each line 
            switch (line) {
                case 'RD':
                    newCell1.setAttribute("class", "redline");
                    break;
               case 'BL':
                    newCell1.setAttribute("class", "blueline");
                    break;
                case 'GR':
                    newCell1.setAttribute("class", "greenline");
                    break;
                case 'YL':
                    newCell1.setAttribute("class", "yellowline");
                    break;
                case 'OR':
                    newCell1.setAttribute("class", "orangeline");
                    break;
                case 'SV':
                    newCell1.setAttribute("class", "silverline");
                    break;
        }
            
            //data for destination cell
            newCell2.innerHTML = dest;
            
            //alternate display for ARR/BRD 
            switch (nextTrain){
                case 'ARR':
                    nextTrain = "Arriving!";
                    break;
                case 'BRD':
                    nextTrain = "Boarding!";
                    break;
                default:
                    nextTrain += ' min';
            }
            
            //data for arrival
            newCell3.innerHTML = nextTrain;
            
            
            //add data cells to the new table row
            newRow.appendChild(newCell1);
            newRow.appendChild(newCell2);
            newRow.appendChild(newCell3);        
            
            //append the new tow to the table element
            tableBody.appendChild(newRow);
            theTable.appendChild(tableBody);
        
        }
        
    }
});




/*function getData(){
    var params = {
            "api_key": "1abe5bd5dbd5423aa352db7a5909d481",
            //"StationCodes": "All",
        };
      
        $.ajax({
            url: "https://api.wmata.com/StationPrediction.svc/json/GetPrediction/All?" + $.param(params),
            dataType: 'jsonp',
            type: "GET",
        })
        .done(function(data) {
            //alert("success");
            getStationData(data);
        })
        .fail(function() {
            alert("error");
        });
    }; */

/*

function getStationData(result){
    //assign result to the stationList variable
    var stationList = result["Trains"]; 
    
    //create array for station names
    var manyStations = [];
    
    var stationNames = [];
    
    //loop over stations object array
    for (i = 0; i < stationList.length; i++) {
        
        //add the Name value from each object in stationList 
        manyStations.push(stationList[i]["LocationName"]); 
        
        $.each(manyStations, function(i, el){
        if($.inArray(el, stationNames) === -1) stationNames.push(el);
        });
    }
    
    //sort the stationNames;
    stationNames.sort();

    //grab the "select" tag id
    var myList = document.getElementById("theList");

    //for each station name in stationNames
    for (j = 0; j < stationNames.length; j++){
        
        //create an option tag variable
        var listItem = document.createElement("option");
    
        //add the property string
        listItem.innerHTML = stationNames[j];
        
        //add the newly created list item to the selection list
        myList.appendChild(listItem);
    }
    
    $("#select-button").click(function(){
        
        //grab the value of the selection
        var selectedValue = document.getElementById("theList").value;
        
        //create empty array for selected obejcts
        var relevantTrains = [];
    
        //for each item in the stationNames array
        for (i = 0; i < stationList.length; i++){
        
            //check if the selection
            if (stationList[i]["LocationName"] === selectedValue){
                
                var relevantTrain = stationList[i];
            
                relevantTrains.push(relevantTrain);            
            }
        }
    
        //create a container-fluid div
            var containerDiv = document.createElement("div");
            containerDiv.setAttribute("class", "container-fluid");
            
            //create a row
            var containerRow = document.createElement("div");
            containerRow.setAttribute("class", "row");
            
            //create columns "col-md-4 col-md-offset-4"
            var containerCol = document.createElement("div");
            containerCol.setAttribute("class", "col-md-4 col-md-offset-4");
            
            //create an h3 tag, add "stationid" as an id
            var containerH3 = document.createElement("h3");
            containerH3.setAttribute("id", "stationid");
            
            //create a table
            var containerTable = document.createElement("table");
            containerTable.setAttribute("class", "table");
            containerTable.setAttribute("id", "nexttrains");
            
            //create table row and three headers: line, destination, next train(s)
            var containerTablerow = document.createElement("tr");
            
            //append:
            //three headers to table row
            var containerTh1 = document.createElement("th");
            var containerTh2 = document.createElement("th"); 
            var containerTh3 = document.createElement("th");
            
            containerTh1.innerHTML = "Line";
            containerTh2.innerHTML = "Destination";
            containerTh3.innerHTML = "Text Train(s)";
            
            containerTablerow.appendChild(containerTh1);
            containerTablerow.appendChild(containerTh2);
            containerTablerow.appendChild(containerTh3);
            
            //table row to table
            containerTable.appendChild(containerTablerow);
            
            //stationid h3 element to the div (childnode [0])
            containerCol.appendChild(containerH3);
            
            //table to the div (childnode[1])
            containerCol.appendChild(containerTable);
            
            //col to row
            containerRow.appendChild(containerCol);
            
            //row to div
            containerDiv.appendChild(containerRow);
            
            //div to body
            document.getElementById("body").appendChild(containerDiv);
        
        for(i = 0; i < relevantTrains.length; i++){            
            
            //grab the 'nexttrain' id for the table element
            var theTable = document.getElementById("nexttrains");
            
            //create a new table data row
            var newRow = document.createElement("tr"); 
            
            //create new table body
            var tableBody = document.createElement("tbody");
            
            //create variables for display info
            var line = relevantTrains[i]["Line"];
            var dest = relevantTrains[i]["DestinationName"];
            var nextTrain = relevantTrains[i]["Min"];
            
            //create a new table data cell variable
            var newCell1 = document.createElement("td");
            var newCell2 = document.createElement("td");
            var newCell3 = document.createElement("td");
            
            //add data to data cells
            
            //data for the line cell
            newCell1.innerHTML = line;
            
            //color backgrounds for each line 
            switch (line) {
                case 'RD':
                    newCell1.setAttribute("class", "redline");
                    break;
               case 'BL':
                    newCell1.setAttribute("class", "blueline");
                    break;
                case 'GR':
                    newCell1.setAttribute("class", "greenline");
                    break;
                case 'YL':
                    newCell1.setAttribute("class", "yellowline");
                    break;
                case 'OR':
                    newCell1.setAttribute("class", "orangeline");
                    break;
                case 'SV':
                    newCell1.setAttribute("class", "silverline");
                    break;
        }
            
            //data for destination cell
            newCell2.innerHTML = dest;
            
            //alternate display for ARR/BRD 
            switch (nextTrain){
                case 'ARR':
                    nextTrain = "Arriving!";
                    break;
                case 'BRD':
                    nextTrain = "Boarding!";
                    break;
                default:
                    nextTrain += ' min';
            }
            
            //data for arrival
            newCell3.innerHTML = nextTrain;
            
            
            //add data cells to the new table row
            newRow.appendChild(newCell1);
            newRow.appendChild(newCell2);
            newRow.appendChild(newCell3);        
            
            //append the new tow to the table element
            tableBody.appendChild(newRow);
            theTable.appendChild(tableBody);
        
            //display station name at the top
            var stationDisplay = document.getElementById("stationid");
            stationDisplay.innerHTML = selectedValue;
        }
        
    /*
        //create refresh button
        var refreshButton = document.createElement("button");
        refreshButton.setAttribute("class", "btn btn-default");
        refreshButton.setAttribute("id", "refresh-button");
        refreshButton.innerHTML = "Refresh This Station"
        containerDiv.insertBefore(refreshButton, containerDiv.firstChild);
        
        */
        
/*
        //when the button is clicked
        $("#refresh-button").click(function(){
            console.log("this button works");
        
            //add a new child of getData();?
            return getData();
            
            //remove fristChild from DOM (document.getElementById("body").appendChild(containerDiv);)
        
        });
        
        //add refresh glyphicon "glyphicon glyphicon-refresh"
        
        //wrap the new result in a div so you can make a function to delete the child node and add a new child node
    });
};    


function errorFn(xhr, status, strErr){
    console.log("There was an error.");
};

*/










