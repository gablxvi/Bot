const { join: j } = require("path");
const util = require(j(__dirname, "..", "build", "index.js"));

test("Checks if the object is a array", () => {
    expect(["1", 2, 4].isArray()).toBeTruthy();
    expect("One".isArray()).toBeFalsy();
});