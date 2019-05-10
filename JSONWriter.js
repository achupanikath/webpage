const readline = require('readline');
const fs = require('fs');

let ptValue;
let obj = {};
let heading = [];
let lineno = 0;
const file = fs.createWriteStream('webData.json');
const myInterface = readline.createInterface({
  //stream interface is used to accept the CSV file since the file is huge
  input: fs.createReadStream('../project1/Crimes_-_2001_to_present.csv', 'utf8'),
});
//to accept the csv file line by line and writing it into a JSON file
myInterface.on('line', (line) => {
  lineno += 1;
  if (lineno === 1) {
    heading = line.split(',');
    //splits the first line into its headings based on comma occurances
  }
  else {//considers only the first 5000 lines
    const words = line.split(',');
    const strObj = {};
    heading.forEach((elem, index) => {//iterates through the array and puts them into the
      //the corresponding heading based on index location
      strObj[heading[index]] = words[index];
    });
    ptValue = strObj["Primary Type"];
    // console.log("tets",ptValue);

    if (!obj.hasOwnProperty(ptValue)) {
      obj[ptValue] = {
        Arrest: 0,
        noArrest: 0
      }
    }

    if (strObj["Arrest"] === "true" || strObj["Arrest"].toLowerCase() === "public") {

      obj[ptValue]["Arrest"] += 1;

    } else {

      obj[ptValue]["noArrest"] += 1;
    }
    // console.log("tets", obj);

  }



}).on('close', () => {//asynchronous nature is dealt with by forcing the program
  //to discontinue till the whole of the array is created.
  // let array = [];
  // array = arr.filter(val => val.Arrest === 'true');
  //the above commented code can be used to filter the data based on a particular situation 
  let arr = [];
  let keys=Object.keys(obj);
  keys.forEach((elem)=>{
    let tempObj={};//temporary object to separate the o ne objet of PT into each objects
    tempObj[elem]=obj[elem];
    arr.push(tempObj);
  });
  resultToWrite = JSON.stringify(arr);
  file.write(resultToWrite);

  console.log("File has been created");
  //writes the file
});
