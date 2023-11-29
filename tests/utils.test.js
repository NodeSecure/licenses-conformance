// Import Node.js Dependencies
import { describe, test } from "node:test";
import assert from "node:assert";

// Import Internal Dependencies
import { checkEveryTruthy, checkSomeTruthy, checkSpdx, createSpdxLink } from "../src/utils.js";

describe("Check everytruthy", () => {
  test("check a single true is true", () => {
    assert.equal(checkEveryTruthy(true), true);
  });

  test("check multiple true booleans are true", () => {
    assert.equal(checkEveryTruthy(true, true, true), true);
  });

  test("check that a single false is false", () => {
    assert.equal(checkEveryTruthy(false), false);
  });

  test("ensure that one false will result in a false return", () => {
    assert.equal(checkEveryTruthy(true, false), false);
  });
});

describe("check someTruthy", () => {
  test("check a single true is true", () => {
    assert.equal(checkSomeTruthy(true), true);
  });

  test("check multiple true booleans are true", () => {
    assert.equal(checkSomeTruthy(true, true, true), true);
  });

  test("check that a single false is false", () => {
    assert.equal(checkSomeTruthy(false), false);
  });

  test("ensure that one false will result in a true return", () => {
    assert.equal(checkSomeTruthy(true, false), true);
  });

  test("create an MIT SPDX link", () => {
    const link = createSpdxLink("MIT");

    assert.strictEqual(link, "https://spdx.org/licenses/MIT.html#licenseText");
  });
});

describe("checkSpdx", () => {
  test("test with MIT license", () => {
    const mitLicense = checkSpdx("MIT");
    assert.deepEqual(mitLicense, {
      osi: true,
      fsf: true,
      fsfAndOsi: true,
      includesDeprecated: false
    });
  });

  test("test with a deprecated license", () => {
    const deprecatedLicense = checkSpdx("AGPL-1.0");
    assert.deepEqual(deprecatedLicense, {
      osi: false,
      fsf: true,
      fsfAndOsi: false,
      includesDeprecated: true
    });
  });

  test("test with a broken license", () => {
    const brokenLicense = checkSpdx("wrong");
    assert.deepEqual(brokenLicense, {
      osi: false,
      fsf: false,
      fsfAndOsi: false,
      includesDeprecated: false
    });
  });
});
