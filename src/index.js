function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  if (expr.match(/(\(|\))/g)) {
    try {
      if (expr.match(/(\()/g).length != expr.match(/(\))/g).length) {
        throw new Error("ExpressionError: Brackets must be paired");
      }
    } catch (e) {
      throw new Error("ExpressionError: Brackets must be paired");
    }
  }
  let temp = "",
    last,
    first;
  let arr = expr
    .replace(/\s/g, "")
    .slice()
    .match(/(\d+\.*\d*)|(\+|-|\*|\/)|(\(|\))/g);
  while (
    arr.indexOf("-") != -1 ||
    arr.indexOf("+") != 1 ||
    arr.indexOf("/") != 1 ||
    arr.indexOf("*") != 1
  ) {
    first = arr.lastIndexOf("(");

    if (first != -1) {
      for (let i = first; i < arr.length; i++) {
        if (arr[i] == ")") {
          last = i;
          if (last) break;
        }
      }
      temp = arr.slice(first + 1, last);
    } else {
      temp = arr;
    }
    while (
      temp.indexOf("/") != -1 ||
      temp.indexOf("*") != -1 ||
      temp.indexOf("+") != -1 ||
      temp.indexOf("-") != -1
    ) {
      if (temp.indexOf("/") != -1) {
        let num = temp[temp.indexOf("/") - 1] / temp[temp.indexOf("/") + 1];
        if (num == "Infinity") throw new Error("TypeError: Division by zero.");
        temp = temp
          .slice(0, temp.indexOf("/") - 1)
          .concat(num, temp.slice(temp.indexOf("/") + 2));
        continue;
      }
      if (temp.indexOf("*") != -1) {
        let num = temp[temp.indexOf("*") - 1] * temp[temp.indexOf("*") + 1];
        temp = temp
          .slice(0, temp.indexOf("*") - 1)
          .concat(num, temp.slice(temp.indexOf("*") + 2));
        continue;
      }
      if (temp.indexOf("-") != -1) {
        let num = temp[temp.indexOf("-") - 1] - temp[temp.indexOf("-") + 1];
        temp = temp
          .slice(0, temp.indexOf("-") - 1)
          .concat(num, temp.slice(temp.indexOf("-") + 2));
        continue;
      }
      if (temp.indexOf("+") != -1) {
        let num =
          parseFloat(temp[temp.indexOf("+") - 1]) +
          parseFloat(temp[temp.indexOf("+") + 1]);
        temp = temp
          .slice(0, temp.indexOf("+") - 1)
          .concat(num, temp.slice(temp.indexOf("+") + 2));
        continue;
      }
    }
    if (first != -1) {
      arr = arr.slice(0, first).concat(temp, arr.slice(last + 1));
    } else {
      break;
    }
  }
  return parseFloat(temp[0].toFixed(4));
}

module.exports = {
  expressionCalculator
};
