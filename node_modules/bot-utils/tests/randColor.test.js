const { join: j } = require("path");
const { randColor, randColour } = require(j(__dirname, "..", "build", "index.js"));

test("generates a random colour code", () => {
    expect(randColor()).toMatch(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
    expect(randColour()).toMatch(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
});