const fs = require("fs");

fs.readFile("Input.txt", "utf-8", (err, data) => {
  if (err) throw err;
  const fileContentArray = data.split(/\r\n|\n/);

  let fullyOverlapedCount = 0;
  fileContentArray.map((line) => {
    // single digit IDs
    // so line[0] -> startingId for first Elf
    // so line[2] -> endingId for first Elf
    // so line[4] -> startingId for second Elf
    // so line[6] -> endingId for second Elf
    if (
      (line[0] <= line[4] && line[2] >= line[6]) ||
      (line[0] >= line[4] && line[2] <= line[6])
    )
      fullyOverlapedCount++;
  });
  console.log("fully overlaped assignment:", fullyOverlapedCount);
});
