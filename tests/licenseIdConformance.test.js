// Import Node.js Dependencies
import { test } from "node:test";
import assert from "node:assert";

// Import Internal Dependencies
import { licenseIdConformance } from "../index.js";

test("check the output of MIT license", () => {
  const mitLicense = unwrap(licenseIdConformance("MIT"));
  assert.deepEqual(mitLicense,
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
});

test("check the output of BSD 3-Clause license (missing hyphen)", () => {
  const mitLicense = unwrap(licenseIdConformance("BSD 3-Clause"));
  assert.deepEqual(mitLicense,
    {
      uniqueLicenseIds: ["BSD-3-Clause"],
      spdxLicenseLinks: ["https://spdx.org/licenses/BSD-3-Clause.html#licenseText"],
      spdx: {
        osi: true,
        fsf: true,
        fsfAndOsi: true,
        includesDeprecated: false
      }
    }
  );
});

test("check deprecated license cases", () => {
  const deprecatedLicense = unwrap(licenseIdConformance("AGPL-1.0"));
  assert.deepEqual(deprecatedLicense, {
    uniqueLicenseIds: ["AGPL-1.0"],
    spdxLicenseLinks: [
      "https://spdx.org/licenses/AGPL-1.0.html#licenseText"
    ],
    spdx: {
      osi: false,
      fsf: true,
      fsfAndOsi: false,
      includesDeprecated: true
    }
  });

  const multipleDeprecatedLicenses = unwrap(licenseIdConformance("AGPL-1.0 AND AGPL-3.0"));
  assert.deepEqual(multipleDeprecatedLicenses, {
    uniqueLicenseIds: ["AGPL-1.0", "AGPL-3.0"],
    spdxLicenseLinks: [
      "https://spdx.org/licenses/AGPL-1.0.html#licenseText",
      "https://spdx.org/licenses/AGPL-3.0.html#licenseText"
    ],
    spdx: {
      osi: false,
      fsf: true,
      fsfAndOsi: false,
      includesDeprecated: true
    }
  });
});

test("check two licenses that pass osi and fsf", () => {
  const licenses = unwrap(licenseIdConformance("ISC OR MIT"));
  assert.deepEqual(licenses, {
    uniqueLicenseIds: ["ISC", "MIT"],
    spdxLicenseLinks: [
      "https://spdx.org/licenses/ISC.html#licenseText",
      "https://spdx.org/licenses/MIT.html#licenseText"
    ],
    spdx: { osi: true, fsf: true, fsfAndOsi: true, includesDeprecated: false }
  });
});

test("complex license statement that does not pass osi but does pass fsf", () => {
  const licenses = unwrap(licenseIdConformance("MIT OR (CC0-1.0 AND ISC)"));
  assert.deepEqual(licenses, {
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
});

test("check license that should throw an Error", () => {
  assert.throws(
    () => unwrap(licenseIdConformance("unreallicense")),
    {
      name: "Error",
      message: "Passed license expression 'unreallicense' was not a valid license expression."
    }
  );
});

function unwrap(result) {
  if (result.ok) {
    return result.value;
  }

  throw result.value;
}
