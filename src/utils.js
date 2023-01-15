// Import Node.js Dependencies
import fs from "node:fs/promises";

// Import Internal Dependencies
import { osi, deprecated, fsf } from "./licenses.js";

// CONSTANT
const kMaxLicenseLineToRead = 3;

export function checkEveryTruthy(...arrayOfBooleans) {
  return arrayOfBooleans.every((check) => check);
}

export function checkSomeTruthy(...arrayOfBooleans) {
  return arrayOfBooleans.some((check) => check);
}

export function createSpdxLink(license) {
  return `https://spdx.org/licenses/${license}.html#licenseText`;
}

export function checkSpdx(licenseToCheck) {
  return {
    osi: osi.includes(licenseToCheck),
    fsf: fsf.includes(licenseToCheck),
    fsfAndOsi: osi.includes(licenseToCheck) && fsf.includes(licenseToCheck),
    includesDeprecated: deprecated.includes(licenseToCheck)
  };
}

/**
 * @param {!string} destination
 * @returns {Promise<string>}
 */
export async function readLicense(destination) {
  const handle = await fs.open(destination);
  let contentStr = "";
  try {
    let lineCount = 0;

    for await (const line of handle.readLines()) {
      contentStr += line;
      if (++lineCount === kMaxLicenseLineToRead) {
        break;
      }
    }
  }
  finally {
    handle.close();
  }

  return contentStr;
}
