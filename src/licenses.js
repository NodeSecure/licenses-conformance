// Import Node.js Dependencies
import fs from "node:fs/promises";

// Import Third-party Dependencies
import * as levenshtein from "fastest-levenshtein";

const spdx = JSON.parse(
  await fs.readFile(new URL("./spdx.json", import.meta.url))
);

// CONSTANTS
const kMaximumLicenseDistance = 1;
const kLevenshteinCache = new Map();

/** @type {Map<string, string>} */
const licenseNameToId = new Map();
const osi = [];
const fsf = [];
const deprecated = [];

for (const [licenseName, license] of Object.entries(spdx)) {
  if (license.deprecated) {
    deprecated.push(license.id);
  }
  if (license.osi) {
    osi.push(license.id);
  }
  if (license.fsf) {
    fsf.push(license.id);
  }
  licenseNameToId.set(licenseName, license);
}

const spdxLicenseIds = new Set([
  ...deprecated,
  ...fsf,
  ...osi
]);

/**
 * @param {!string} licenseID
 */
export function closestSpdxLicenseID(licenseID) {
  if (kLevenshteinCache.has(licenseID)) {
    return kLevenshteinCache.get(licenseID);
  }

  for (const iteratedLicenseId of spdxLicenseIds) {
    const distance = levenshtein.distance(licenseID, iteratedLicenseId);
    if (distance <= kMaximumLicenseDistance) {
      kLevenshteinCache.set(licenseID, iteratedLicenseId);

      return iteratedLicenseId;
    }
  }

  return licenseID;
}

export { osi, fsf, deprecated, licenseNameToId, spdxLicenseIds };
