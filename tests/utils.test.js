// Import Third-party Dependencies
import test from "tape";

// Import Internal Dependencies
import { checkEveryTruthy, checkSomeTruthy, checkSpdx, createSpdxLink } from "../src/utils.js";

// Check everytruthy
test("check a single true is true", (tape) => {
  tape.same(checkEveryTruthy(true), true);
  tape.end();
});

test("check multiple true booleans are true", (tape) => {
  tape.same(checkEveryTruthy(true, true, true), true);
  tape.end();
});

test("check that a single false is false", (tape) => {
  tape.same(checkEveryTruthy(false), false);
  tape.end();
});

test("ensure that one false will result in a false return", (tape) => {
  tape.same(checkEveryTruthy(true, false), false);
  tape.end();
});

// check someTruthy
test("check a single true is true", (tape) => {
  tape.same(checkSomeTruthy(true), true);
  tape.end();
});

test("check multiple true booleans are true", (tape) => {
  tape.same(checkSomeTruthy(true, true, true), true);
  tape.end();
});

test("check that a single false is false", (tape) => {
  tape.same(checkSomeTruthy(false), false);
  tape.end();
});

test("ensure that one false will result in a true return", (tape) => {
  tape.same(checkSomeTruthy(true, false), true);
  tape.end();
});

test("create an MIT SPDX link", (tape) => {
  const link = createSpdxLink("MIT");

  tape.strictEqual(link, "https://spdx.org/licenses/MIT.html#licenseText");
  tape.end();
});

// checkSpdx
test("test with MIT license", (tape) => {
  const mitLicense = checkSpdx("MIT");
  tape.same(mitLicense, {
    osi: true,
    fsf: true,
    fsfAndOsi: true,
    includesDeprecated: false
  });
  tape.end();
});

test("test with a deprecated license", (tape) => {
  const deprecatedLicense = checkSpdx("AGPL-1.0");
  tape.same(deprecatedLicense, {
    osi: false,
    fsf: true,
    fsfAndOsi: false,
    includesDeprecated: true
  });
  tape.end();
});

test("test with a broken license", (tape) => {
  const brokenLicense = checkSpdx("wrong");
  tape.same(brokenLicense, {
    osi: false,
    fsf: false,
    fsfAndOsi: false,
    includesDeprecated: false
  });
  tape.end();
});


