const { join: j } = require("path");
const { round } = require(j(__dirname, "..", "build", "index.js"));

test("round 2.482482 to 4 decimal places", () => {
    expect(round(2.482482, 4)).toBe(2.4825);
});