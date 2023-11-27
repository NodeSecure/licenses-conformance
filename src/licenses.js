// Import Third-party Dependencies
import * as levenshtein from "fastest-levenshtein";

// Import Internal Dependencies
import { spdx } from "./spdx.js";

// CONSTANTS
const kMaximumLicenseDistance = 1;
const kLevenshteinCache = new Map();

const licenseNameToId = new Map();
const osi = [];
const fsf = [];
const deprecated = [];

for (const [licenseId, license] of Object.entries(spdx)) {
  if (license.deprecated) {
    deprecated.push(licenseId);
  }
  if (license.osi) {
    osi.push(licenseId);
  }
  if (license.fsf) {
    fsf.push(licenseId);
  }
  licenseNameToId.set(license.name, license);
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
