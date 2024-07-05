// Import Internal Dependencies
import { osi, deprecated, fsf } from "./licenses.js";

export function checkEveryTruthy(
  ...arrayOfBooleans: boolean[]
): boolean {
  return arrayOfBooleans.every((check) => check);
}

export function checkSomeTruthy(
  ...arrayOfBooleans: boolean[]
): boolean {
  return arrayOfBooleans.some((check) => check);
}

export function createSpdxLink(
  license: string
): string {
  return `https://spdx.org/licenses/${license}.html#licenseText`;
}

export function checkSpdx(
  licenseToCheck: string
) {
  return {
    osi: osi.includes(licenseToCheck),
    fsf: fsf.includes(licenseToCheck),
    fsfAndOsi: osi.includes(licenseToCheck) && fsf.includes(licenseToCheck),
    includesDeprecated: deprecated.includes(licenseToCheck)
  };
}
