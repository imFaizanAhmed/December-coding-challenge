const fs = require("fs");

fs.readFile("Input.txt", "utf-8", (err, data) => {
  if (err) throw err;
  const fileContentArray = data.split(/\r\n|\n/);
  let visited = [[0, 0]],
    head = [0, 0],
    tail = [0, 0];
  fileContentArray.map((line) => {
    const [direction, nSteps] = line.split(" ");
    if (direction === "U") {
      for (let i = 0; i < nSteps; i++) {
        head = [head[0], head[1] + 1];
        updateTail(head, tail, visited);
      }
    } else if (direction === "D") {
      for (let i = 0; i < nSteps; i++) {
        head = [head[0], head[1] - 1];
        updateTail(head, tail, visited);
      }
    } else if (direction === "L") {
      for (let i = 0; i < nSteps; i++) {
        head = [head[0] - 1, head[1]];
        updateTail(head, tail, visited);
      }
    } else if (direction === "R") {
      for (let i = 0; i < nSteps; i++) {
        head = [head[0] + 1, head[1]];
        updateTail(head, tail, visited);
      }
    }
  });
  visited = removeDuplicates(visited);
  console.log("tail visited", visited.length);
});

function updateTail(head, tail, visited) {
  if (head[1] - tail[1] >= 2) {
    tail[1] = head[1] - 1;
    tail[0] = head[0];
  } else if (tail[1] - head[1] >= 2) {
    tail[1] = head[1] + 1;
    tail[0] = head[0];
  }

  if (tail[0] - head[0] >= 2) {
    tail[0] = head[0] + 1;
    tail[1] = head[1];
  } else if (head[0] - tail[0] >= 2) {
    tail[0] = head[0] - 1;
    tail[1] = head[1];
  }
  visited.push([...tail]);
}

function removeDuplicates(twoDimArr) {
  return twoDimArr
    .map(JSON.stringify)
    .filter((e, i, a) => i === a.indexOf(e))
    .map(JSON.parse);
}
