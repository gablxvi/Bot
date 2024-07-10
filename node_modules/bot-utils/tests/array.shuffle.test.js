const { join: j } = require("path");
const utils = require(j(__dirname, "..", "build", "index.js"));

test("randomly shuffles [1,2,3,4,5]", () => {
    expect(([1, 2, 3, 4, 5].shuffle()) == [1, 2, 3, 4, 5]).toBeFalsy();
});