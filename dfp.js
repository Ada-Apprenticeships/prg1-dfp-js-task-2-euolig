const fs = require('fs');

function parseFile(indata, outdata, delimiter = ';') {

  //Checks if the input file exists. If it doesn't, return -1 to indicate an error
  if (!fs.existsSync(indata)) {
    return -1;
  };

  // Checks if the output file already exists. If it does, delete it to start fresh
  if (fs.existsSync(outdata)) {
    fs.unlinkSync(outdata);
  };

  // Reads the content of the input file
  const data = fs.readFileSync(indata, "utf-8");
  const lines = data.split(/\n/);
  //counter for the number of processed lines
  let count = 0;
  //variable initialised as an empty string to gather the processed data
  let newData = '';

  // Loops through each line starting from the second line because the first line si a header
  for (let i = 1; i < lines.length; i++) {

  // Splits each line into 'review' and 'sentiment' based on the delimiter and trim whitespace
    const [review, sentiment] = lines[i].split(delimiter).map(item => item.trim());
  // Checks if both 'review' and 'sentiment' values exist
    if (review && sentiment) { 
  // Adds the sentiment and the first 20 characters of the review to the new data
      newData += `${sentiment}${delimiter}${review.substring(0, 20)}\n`;
  // Increments the count of processed lines
      count++;
    };
  };

  // adds the new data to the output file
  fs.appendFileSync(outdata, newData, { encoding: 'utf-8' });
  return count;
  
};

// Leave this code here for the automated tests
module.exports = {
  parseFile,
};

//calls the parseFile function
//parseFile("./datafile.csv", "./outputfile.csv");