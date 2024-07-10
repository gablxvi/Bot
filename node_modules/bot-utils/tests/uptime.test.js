const { join: j } = require("path");
const { uptime } = require(j(__dirname, "..", "build", "index.js"));

test("Returns the process Uptime", () => {
    expect(uptime()).toMatch(/\d+(h|m|s)\s*/);
});