const fs = require('fs');

function parseFile(indata, outdata, delimiter = ';') {
  try {
    // Remove existing output file
    if (fs.existsSync(outdata)) {
      fs.unlinkSync(outdata);
    }

    const data = fs.readFileSync(indata, "utf-8");
    const lines = data.split(/\n/);
    let count = 0;
    let newData = '';

    for (let i = 1; i < lines.length; i++) {
      const [review, sentiment] = lines[i].split(delimiter).map(item => item.trim());
      if (review && sentiment) { // Check if both values exist
        newData += `${sentiment}${delimiter} ${review.substring(0, 20)}\n`;
        count++;
      }
    }

    fs.appendFileSync(outdata, newData, { encoding: 'utf-8' }); // Write to file outside the loop
    return count;
  } catch (err) {
      console.error('Error parsing file:', err);
      return -1;
  }
}

// Leave this code here for the automated tests
module.exports = {
  parseFile,
};

parseFile("./datafile.csv", "./outputfile.csv")