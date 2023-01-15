// Import Node.js Dependencies
import fs from "node:fs";

// Import Third-party Dependencies
import httpie from "@myunisoft/httpie";

// CONSTANTS
const kSrcDirectory = new URL("../src/", import.meta.url);

// VARS
const licenses = new Map();

const { data } = await httpie.get(
  "https://raw.githubusercontent.com/spdx/license-list-data/main/json/licenses.json"
);
const response = JSON.parse(data);

for (const license of response.licenses) {
  const {
    isDeprecatedLicenseId: deprecated,
    licenseId: id,
    isOsiApproved: osi,
    isFsfLibre: fsf = false
  } = license;

  licenses.set(license.name, { id, deprecated, osi, fsf });
}

const spdxLicenses = Object.fromEntries(licenses);
fs.writeFileSync(new URL("spdx.json", kSrcDirectory), JSON.stringify(spdxLicenses, null, 2));
