const fs = require("fs");

fs.readFile("Input.txt", "utf-8", (err, data) => {
  if (err) throw err;
  const fileContentArray = data.split(/\r\n|\n/);
  let monkeys = [];
  for (let i = 0; i < fileContentArray.length; i++) {
    const monkey = {};
    i += 1; // skip first line
    const startingItems = fileContentArray[i]
      .split(":")[1]
      .split(",")
      .map((item) => Number(item));
    monkey["items"] = startingItems;
    i += 1;
    const operation = fileContentArray[i].split(" ");
    monkey["operation"] = {
      operator: operation[6],
      operant: operation[7] === "old" ? "old" : Number(operation[7]),
    };
    i += 1;
    monkey["test"] = Number(fileContentArray[i].split(" ")[5]);
    i += 1;
    monkey["true"] = Number(fileContentArray[i].split(" ")[9]);
    i += 1;
    monkey["false"] = Number(fileContentArray[i].split(" ")[9]);
    i += 1;
    monkey["itemInspected"] = 0;
    monkeys.push(monkey);
  }

  for (let j = 0; j < 20; j++)
    for (let i = 0; i < monkeys.length; i++) {
      const monkey = monkeys[i];
      const items = monkey["items"];
      while (items.length > 0) {
        let worriedness = items.shift();
        monkey["itemInspected"] = monkey["itemInspected"] + 1;
        const operant2 =
          monkey["operation"]["operant"] === "old"
            ? worriedness
            : monkey["operation"]["operant"];
        worriedness = applyOperation(
          monkey["operation"]["operator"],
          worriedness,
          operant2
        );
        worriedness = Math.floor(worriedness / 3);
        if (worriedness % monkey["test"] === 0) {
          monkeys[monkey["true"]]["items"].push(worriedness);
        } else {
          monkeys[monkey["false"]]["items"].push(worriedness);
        }
      }
    }

  const topTwoItemInspectedByMonkey = findTowMax(monkeys);
  console.log(
    "monkey business:",
    topTwoItemInspectedByMonkey[0] * topTwoItemInspectedByMonkey[1]
  );
});

function applyOperation(operator, operant1, operant2) {
  if (operator === "/") {
    return Math.floor(operant1 / operant2);
  } else if (operator === "*") {
    return Math.floor(operant1 * operant2);
  } else if (operator === "+") {
    return Math.floor(operant1 + operant2);
  } else if (operator === "-") {
    return Math.floor(operant1 - operant2);
  } else {
    return operant1;
  }
}

function findTowMax(monkeys) {
  let max = -Infinity,
    result = -Infinity;

  for (const value of monkeys) {
    const nr = Number(value["itemInspected"]);

    if (nr > max) {
      [result, max] = [max, nr]; // save previous max
    } else if (nr < max && nr > result) {
      result = nr; // new second biggest
    }
  }

  return [result, max];
}
