import test from "tape";
import licenseConformance from "../index.js";

test("check the output of MIT license", (tape) => {
  const mitLicense = licenseConformance("MIT");
  tape.same(mitLicense,
    {
      uniqueLicenseIds: ["MIT"],
      spdxLicenseLinks: ["https://spdx.org/licenses/MIT.html#licenseText"],
      spdx: {
        osi: true,
        fsf: true,
        fsfAndOsi: true,
        includesDeprecated: false
      }
    }
  );
  tape.end();
});

test("check deprecated license cases", (tape) => {
  const deprecatedLicense = licenseConformance("AGPL-1.0");
  tape.same(deprecatedLicense, {
    uniqueLicenseIds: ["AGPL-1.0"],
    spdxLicenseLinks: [
      "https://spdx.org/licenses/AGPL-1.0.html#licenseText"
    ],
    spdx: {
      osi: false,
      fsf: false,
      fsfAndOsi: false,
      includesDeprecated: true
    }
  });

  const multipleDeprecatedLicenses = licenseConformance("AGPL-1.0 AND AGPL-3.0");
  tape.same(multipleDeprecatedLicenses, {
    uniqueLicenseIds: ["AGPL-1.0", "AGPL-3.0"],
    spdxLicenseLinks: [
      "https://spdx.org/licenses/AGPL-1.0.html#licenseText",
      "https://spdx.org/licenses/AGPL-3.0.html#licenseText"
    ],
    spdx: {
      osi: false,
      fsf: false,
      fsfAndOsi: false,
      includesDeprecated: true
    }
  });
  tape.end();
});

test("check two licenses that pass osi and fsf", (tape) => {
  const licenses = licenseConformance("ISC OR MIT");
  tape.same(licenses, {
    uniqueLicenseIds: ["ISC", "MIT"],
    spdxLicenseLinks: [
      "https://spdx.org/licenses/ISC.html#licenseText",
      "https://spdx.org/licenses/MIT.html#licenseText"
    ],
    spdx: { osi: true, fsf: true, fsfAndOsi: true, includesDeprecated: false }
  });
  tape.end();
});

test("complex license statement that does not pass osi but does pass fsf", (tape) => {
  const licenses = licenseConformance("MIT OR (CC0-1.0 AND ISC)");
  tape.same(licenses, {
    uniqueLicenseIds: ["MIT", "CC0-1.0", "ISC"],
    spdxLicenseLinks: [
      "https://spdx.org/licenses/MIT.html#licenseText",
      "https://spdx.org/licenses/CC0-1.0.html#licenseText",
      "https://spdx.org/licenses/ISC.html#licenseText"
    ],
    spdx: {
      osi: false,
      fsf: true,
      fsfAndOsi: false,
      includesDeprecated: false }
  });
  tape.end();
});

test("check license that should throw an Error", (tape) => {
  try {
    licenseConformance("unreallicense");
    tape.fail("should not get here since license-conformance should throw new Error");
  }
  catch (err) {
    // eslint-disable-next-line max-len
    tape.ok(err, "Passed license expression was not a valid license expression. Error from spdx-expression-parse: Error: `u` at offset 0");
  }
  tape.end();
});

