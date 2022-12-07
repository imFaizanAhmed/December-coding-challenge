const fs = require("fs");

fs.readFile("Input.txt", "utf-8", (err, data) => {
  if (err) throw err;
  const fileContentArray = data.split(/\r\n|\n/);

  let totalPriorities = 0;
  fileContentArray.map((line) => {
    if (line === "") return;
    //assuming each line has even number of letters (items)
    const length = line.length;
    const compartmentOneItems = line.slice(0, length / 2);
    const compartmentTwoItems = line.slice(length / 2, length);
    const commonItems = new Set();
    for (const item of compartmentOneItems) {
      if (compartmentTwoItems.indexOf(item) !== -1) commonItems.add(item);
    }
    for (const item of commonItems) {
      if (item >= "a" && item <= "z") {
        // 97 ascii of small a
        totalPriorities += item.charCodeAt(0) - 96;
      } else if (item >= "A" && item <= "Z") {
        // 65 ascii of small A
        // 65 - 26 = 39 to assign 27 to A and so on
        totalPriorities += item.charCodeAt(0) - 38;
      }
    }
  });
  console.log("Total Priorities:", totalPriorities);
});
