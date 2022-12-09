const fs = require("fs");

fs.readFile("Input.txt", "utf-8", (err, data) => {
  if (err) throw err;
  const fileContentArray = data.split(/\r\n|\n/);
  fileContentArray.map((line, num) => {
    const streamLength = line.length;
    let markerStartAt = -1;
    for (let i = 0; i < streamLength - 4; i++) {
      const regex = line.slice(i, i + 4);
      // (.*) match any character, ?= look ahead, ?=(.*) look ahead and match any character,
      // and \1 at the end tells to match one look ahead character to previously matched character
      const match = regex.match(/(.*)(?=(.*)\1)/g).filter((m) => m != "");
      if (match.length === 0) {
        markerStartAt = i + 4;
        break;
      }
    }
    console.log("Marker for line", num, ":");
    if (markerStartAt === -1) {
      console.log("\tNo marker found");
    } else {
      console.log("\tMarker found at:", markerStartAt);
    }
  });
});
