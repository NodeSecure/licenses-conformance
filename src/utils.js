import { osi, deprecated, fsf } from "./licenses.js";

export function checkEveryTruthy(...arrayOfBooleans) {
  return arrayOfBooleans.every((check) => check);
}

export function checkSomeTruthy(...arrayOfBooleans) {
  return arrayOfBooleans.some((check) => check);
}

export function checkSpdx(licenseToCheck) {
  return {
    osi: osi.includes(licenseToCheck),
    fsf: fsf.includes(licenseToCheck),
    fsfAndOsi: osi.includes(licenseToCheck) && fsf.includes(licenseToCheck),
    includesDeprecated: deprecated.includes(licenseToCheck)
  };
}
