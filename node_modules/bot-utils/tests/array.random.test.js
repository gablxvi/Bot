const { join: j } = require("path");
const utils = require(j(__dirname, "..", "build", "index.js"));

test("Returns a randomized array based on the given array", () => {
    expect(([1, 2, 3, 4, 5].random()) == [1, 2, 3, 4, 5]).toBeFalsy();
});