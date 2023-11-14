const csv = require('csv-parser');
const fs = require('fs');

const processorInputData = async () => {
    const filepath = "C:\Users\SanjayYadav\Desktop\Login2FA\upload-download-data\processorTestData.csv";
    return new Promise((resolve, reject) => {
      try {
        const results = []
        fs.createReadStream(filepath)
          .pipe(csv())
          .on('data', (data) => {
            results.push(data)
          })
          .on('end', () => {
            resolve(results)
          })
      } catch (err) {
        reject({ message: 'Something went wrong while parsing CSV', data: { errorMsg: err.message } })
      }
    })
  }

//test();
module.exports.processorInputData = processorInputData;