const { join: j } = require("path");
const { randInt } = require(j(__dirname, "..", "build", "index.js"));

test("generates a random number between 1 and 5", () => {
  const num = randInt(1, 5);
  expect(num).toBeGreaterThanOrEqual(1);
  expect(num).toBeLessThanOrEqual(5);
});