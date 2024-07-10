const { join: j } = require("path");
const { isNumber } = require(j(__dirname, "..", "build", "index.js"));

test("Checks if the input is a number", () => {
    expect(isNumber("1")).toBeTruthy();
    expect(isNumber(1)).toBeTruthy();
});