const { join: j } = require("path");
const { hasNumber } = require(j(__dirname, "..", "build", "index.js"));

test("Checks if a string contains a number", () => {
    expect(hasNumber("We are number one")).toBeFalsy();
    expect(hasNumber("We are number 1")).toBeTruthy();
});