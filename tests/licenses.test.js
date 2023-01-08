// Import Third-party Dependencies
import test from "tape";

// Import Internal Dependencies
import { closestSpdxLicenseID } from "../src/licenses.js";

// Check everytruthy
test("it should return the given LicenseID if no record match", (tape) => {
  tape.same(closestSpdxLicenseID("foooobar"), "foooobar");
  tape.end();
});

test("it should fix 'Apache' to 'Apache-2.0'", (tape) => {
  tape.same(closestSpdxLicenseID("Apache"), "Apache-2.0");
  tape.end();
});

test("it should fix 'BSD 3-Clause' to 'BSD-3-Clause'", (tape) => {
  tape.same(closestSpdxLicenseID("BSD 3-Clause"), "BSD-3-Clause");
  tape.end();
});

test("it should not fix 'BSD 3 Clause' because the distance is greater than one", (tape) => {
  tape.same(closestSpdxLicenseID("BSD 3 Clause"), "BSD 3 Clause");
  tape.end();
});
