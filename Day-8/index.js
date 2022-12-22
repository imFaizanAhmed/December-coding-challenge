const fs = require("fs");

fs.readFile("Input.txt", "utf-8", (err, data) => {
  if (err) throw err;
  const fileContentArray = data.split(/\r\n|\n/);
  const totalRows = fileContentArray.length;
  const visibleTrees = new Set([]);
  let upMax = [];
  fileContentArray.map((line, num) => {
    if (num === totalRows - 1) {
      return;
    } else if (num === 0) {
      upMax = [...line];
      return;
    }
    // skipping the first and last trees
    let leftMax = line[0];
    for (let i = 1; i < line.length - 1; i++) {
      if (line[i] > upMax[i]) {
        upMax[i] = line[i];
        visibleTrees.add(num.toString() + i.toString());
      } else if (line[i] > leftMax) {
        leftMax = line[i];
        visibleTrees.add(num.toString() + i.toString());
      }
    }
  });

  let downMax = [];
  for (let num = totalRows - 1; num > 0; num--) {
    const line = fileContentArray[num];
    if (num == totalRows - 1) {
      downMax = [...line];
      continue;
    }
    let rightMax = line[line.length - 1];
    for (let i = line.length - 2; i > 0; i--) {
      if (line[i] > downMax[i]) {
        downMax[i] = line[i];
        visibleTrees.add(num.toString() + i.toString());
      } else if (line[i] > rightMax) {
        rightMax = line[i];
        visibleTrees.add(num.toString() + i.toString());
      }
    }
  }
  console.log(
    "totalVisibleTrees",
    visibleTrees.size +
      (totalRows - 2) * 2 +
      fileContentArray[0].length +
      fileContentArray[totalRows - 1].length
  );
});
