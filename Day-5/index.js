const fs = require("fs");

fs.readFile("Input.txt", "utf-8", (err, data) => {
  if (err) throw err;
  const fileContentArray = data.split(/\r\n|\n/);

  let isFirstTime = true;
  let isStackEnded = false;
  let isInstruction = false;
  let crateArray;
  fileContentArray.map((line) => {
    if (isFirstTime) {
      isFirstTime = false;
      const totalCrates = (line.length + 1) / 4;
      crateArray = new Array(totalCrates);
      for (const i in totalCrates) {
        crateArray[i] = new Array();
      }
    }
    if (line[1] === "1") {
      isStackEnded = true;
      isInstruction = true;
      return;
    }
    if (!isStackEnded) {
      let i = 0;
      while (i < line.length) {
        if (line[i + 1] !== " ") {
          if (crateArray[i / 4] === undefined) {
            crateArray[i / 4] = [];
          }
          crateArray[i / 4].push(line[i + 1]);
        }
        i += 4;
      }
    } else if (isInstruction) {
      const nItemsToMove = line[5];
      const moveFrom = line[12];
      const moveTo = line[17];
      for (let i = 0; i < nItemsToMove; i++) {
        crateArray[moveTo - 1].unshift(crateArray[moveFrom - 1].shift());
      }
    }
  });
  let topItems = "";
  for (let i = 0; i < crateArray.length; i++) {
    topItems += crateArray[i][0];
  }
  console.log("top Items", topItems);
});
