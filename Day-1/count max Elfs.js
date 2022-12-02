const fs = require("fs");

fs.readFile("Input.txt", "utf-8", (err, data) => {
  if (err) throw err;
  const fileContentArray = data.split(/\r\n|\n/);
  let sum = 0,
    max = 0;
  fileContentArray.forEach((element) => {
    if (element != "") {
      sum += +element;
    } else {
      if (max < sum) max = sum;
      sum = 0;
    }
  });
  console.log("max", max);
});
