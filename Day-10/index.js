const fs = require("fs");

fs.readFile("Input.txt", "utf-8", (err, data) => {
  if (err) throw err;
  const fileContentArray = data.split(/\r\n|\n/);
  let cyclenumber = 1,
    regX = 1,
    signalStrength = 0;
  fileContentArray.map((line) => {
    if (line === "noop") {
      if ([20, 60, 100, 140, 180, 220].includes(cyclenumber)) {
        signalStrength += cyclenumber * regX;
      }
      cyclenumber++;
    } else {
      const words = line.split(" ");
      if (words) {
        if ([20, 60, 100, 140, 180, 220].includes(cyclenumber)) {
          signalStrength += cyclenumber * regX;
        } else if ([19, 59, 99, 139, 179, 219].includes(cyclenumber)) {
          signalStrength += (cyclenumber + 1) * regX;
        }
        const value = Number(words[1]);
        cyclenumber += 2;
        regX += value;
      }
    }
  });
  console.log("signalStrength", signalStrength);
});
