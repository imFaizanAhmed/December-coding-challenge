const fs = require("fs");

fs.readFile("Input.txt", "utf-8", (err, data) => {
  if (err) throw err;
  const fileContentArray = data.split(/\r\n|\n/);

  let openedDir = [],
    dirWithSize = {},
    requiredSum = 0;
  fileContentArray.map((line) => {
    const words = line.split(" ");
    if (words[0] === "$") {
      // command
      if (words[1] === "cd") {
        if (words[2] != "..") {
          openedDir.push(words[2]);
          dirWithSize[words[2]] = 0;
        } else {
          const removed = openedDir.pop();
          if (dirWithSize[removed] <= 100000) {
            requiredSum += dirWithSize[removed];
          }
          delete dirWithSize[removed];
        }
      }
    } else if (Number(words[0])) {
      openedDir.map((dir) => {
        dirWithSize[dir] += Number(words[0]);
      });
    }
  });
  for (const [_, value] of Object.entries(dirWithSize)) {
    if (value <= 100000) {
      requiredSum += value;
    }
  }
  console.log("requiredSum", requiredSum);
});
