// Import Third-party Dependencies
import test from "tape";

// Import Internal Dependencies
import { searchSpdxLicenseId } from "../index.js";

test("search for Apache 2.0 license", (tape) => {
  const result = searchSpdxLicenseId("Apache License 2.0");
  tape.strictEqual(result, "Apache-2.0");

  tape.end();
});

test("search for Artistic 1.0 license", (tape) => {
  const result = searchSpdxLicenseId("Artistic License 1.0");
  tape.strictEqual(result, "Artistic-1.0");

  tape.end();
});

test("it should return null if there is no license matching name", (tape) => {
  const result = searchSpdxLicenseId("not a license");
  tape.strictEqual(result, null);

  tape.end();
});
