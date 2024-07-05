// Import Node.js Dependencies
import { describe, test } from "node:test";
import assert from "node:assert";

// Import Internal Dependencies
import { closestSpdxLicenseID } from "../src/licenses.js";

describe("Check everytruthy", () => {
  test("it should return the given LicenseID if no record match", () => {
    assert.equal(closestSpdxLicenseID("foooobar"), "foooobar");
  });

  test("it should fix 'BSD 3-Clause' to 'BSD-3-Clause'", () => {
    assert.equal(closestSpdxLicenseID("BSD 3-Clause"), "BSD-3-Clause");
  });

  test("it should not fix 'BSD 3 Clause' because the distance is greater than one", () => {
    assert.equal(closestSpdxLicenseID("BSD 3 Clause"), "BSD 3 Clause");
  });
});
