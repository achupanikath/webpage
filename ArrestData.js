//require statements for Streaming
const fs = require('fs');
const CrimeSheet = require('./OGCS.json');

//function that takes the entire JSON file as arr and gives the 
//arrest and non-arrest values for each primary type
function filterData(arr) {
    const tempList = arr.map((item) => item['Primary Type']);//stores the temperary list of
    //Primary Types
    let pTList = tempList.filter((item, pos, list) => list.indexOf(item) === pos);
    //makes the temporary list uniqu},{"THEFT":[122,908]},{"WEAPONS VIOLATION":[63,17]}]e by getting rid of duplicates
    pTList = pTList.sort();
    //let arrestArray[0] be arrest ,noArrest= arrestArray[1];
    let arrestArray = [0, 0];
    let finalArray = [];
    pTList.forEach(function (element) {
        let object1 = {};
        arr.forEach(function (item) {
            if (item["Primary Type"] === element) {
                if (item["Arrest"] === "true" || item["Arrest"] === "PUBLIC") {
                    arrestArray[0] += 1;
                }
                else {
                    arrestArray[1] += 1;
                }
            }
        });

        object1[element] = {
            Arrest: arrestArray[0],
            noArrest: arrestArray[1]
        };
        finalArray.push(object1);
        arrestArray = [0, 0];

    });

    const file = fs.createWriteStream('webData.json');
    resultToWrite = JSON.stringify(finalArray);
    file.write(resultToWrite);
}
filterData(CrimeSheet);//calls the function