const fs = require("fs");

function getMovePoints(char) {
  if (char === "X") {
    return { value: 1, mapping: "A" };
  } else if (char === "Y") {
    return { value: 2, mapping: "B" };
  } else if (char === "Z") {
    return { value: 3, mapping: "C" };
  }
}

fs.readFile("Input.txt", "utf-8", (err, data) => {
  if (err) throw err;
  const fileContentArray = data.split(/\r\n|\n/);
  let point = 0;
  fileContentArray.map((line) => {
    if (line === "") return;
    const { value, mapping } = getMovePoints(line[2]);
    point += value;
    if (mapping === line[0]) point += 3;
    else if (line[0] === "A" && mapping === "B") point += 6;
    else if (line[0] === "B" && mapping === "C") point += 6;
    else if (line[0] === "C" && mapping === "A") point += 6;
  });
  console.log("Points I will get are:", point);
});
