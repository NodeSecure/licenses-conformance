// Import Node.js Dependencies
import { test } from "node:test";
import assert from "node:assert";

// Import Internal Dependencies
import { searchSpdxLicenseId } from "../src/index.js";

test("search for Apache 2.0 license", () => {
  const result = searchSpdxLicenseId("Apache License 2.0");
  assert.strictEqual(result, "Apache-2.0");
});

test("search for Artistic 1.0 license", () => {
  const result = searchSpdxLicenseId("Artistic License 1.0");
  assert.strictEqual(result, "Artistic-1.0");
});

test("it should return null if there is no license matching name", () => {
  const result = searchSpdxLicenseId("not a license");
  assert.strictEqual(result, null);
});
