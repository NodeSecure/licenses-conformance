// Import Third-party Dependencies
import parseExpressions from "spdx-expression-parse";

// Import Internal Dependencies
import { spdxLicenseIds, licenseNameToId, closestSpdxLicenseID } from "./src/licenses.js";
import {
  checkSpdx, checkEveryTruthy, checkSomeTruthy, createSpdxLink, readLicense
} from "./src/utils.js";

export function licenseIdConformance(licenseID) {
  if (typeof licenseID !== "string") {
    throw new TypeError("expecter licenseID to be a strnig");
  }

  const closestLicenseID = spdxLicenseIds.has(licenseID) ?
    licenseID : closestSpdxLicenseID(licenseID);
  try {
    const data = parseExpressions(closestLicenseID);
    const licenses = handleLicenseCase(data);

    return {
      ok: true,
      value: licenses
    };
  }
  catch (err) {
    return {
      ok: false,
      value: new Error(`Passed license expression '${closestLicenseID}' was not a valid license expression.`, {
        cause: err
      })
    };
  }
}

export async function searchSpdxLicenseId(destination) {
  const contentStr = await readLicense(destination);

  for (const [licenseName, license] of licenseNameToId) {
    const expr = escapeRegExp(licenseName)
      .split(" ")
      .join(String.raw`[\s\S\r\n]+`);

    if (new RegExp(expr, "gm").test(contentStr)) {
      return license.id;
    }
  }

  return null;
}

/**
 * @param {!string} string
 * @returns {string}
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function handleLicenseCase(data) {
  const licenses = {
    uniqueLicenseIds: [],
    spdxLicenseLinks: [],
    spdx: {
      osi: false,
      fsf: false,
      fsfAndOsi: false,
      includesDeprecated: false
    }
  };

  if (typeof data.license === "string") {
    const spdxCheck = checkSpdx(data.license);
    licenses.spdx = spdxCheck;

    licenses.uniqueLicenseIds.push(data.license);
    licenses.spdxLicenseLinks.push(createSpdxLink(data.license));
  }
  else if (typeof data.right.license === "string") {
    const spdxCheckLeft = checkSpdx(data.left.license);
    const spdxCheckRight = checkSpdx(data.right.license);

    licenses.spdx.osi = checkEveryTruthy(spdxCheckLeft.osi, spdxCheckRight.osi);
    licenses.spdx.fsf = checkEveryTruthy(spdxCheckLeft.fsf, spdxCheckRight.fsf);
    licenses.spdx.fsfAndOsi = checkEveryTruthy(spdxCheckLeft.fsfAndOsi, spdxCheckRight.fsfAndOsi);
    licenses.spdx.includesDeprecated = checkSomeTruthy(spdxCheckLeft.includesDeprecated, spdxCheckRight.includesDeprecated);

    licenses.uniqueLicenseIds.push(
      data.left.license,
      data.right.license
    );

    licenses.spdxLicenseLinks.push(
      createSpdxLink(data.left.license),
      createSpdxLink(data.right.license)
    );
  }
  else if (typeof data.right.left.license === "string") {
    const spdxCheckLeft = checkSpdx(data.left.license);
    const spdxCheckRightLeft = checkSpdx(data.right.left.license);
    const spdxCheckRightRight = checkSpdx(data.right.right.license);

    licenses.spdx.osi = checkEveryTruthy(spdxCheckLeft.osi, spdxCheckRightLeft.osi, spdxCheckRightRight.osi);
    licenses.spdx.fsf = checkEveryTruthy(spdxCheckLeft.fsf, spdxCheckRightLeft.fsf, spdxCheckRightRight.fsf);
    licenses.spdx.fsfAndOsi = checkEveryTruthy(
      spdxCheckLeft.fsfAndOsi, spdxCheckRightLeft.fsfAndOsi, spdxCheckRightRight.fsfAndOsi);
    licenses.spdx.includesDeprecated = checkSomeTruthy(
      spdxCheckLeft.includesDeprecated, spdxCheckRightLeft.includesDeprecated, spdxCheckRightRight.includesDeprecated);

    licenses.uniqueLicenseIds.push(
      data.left.license,
      data.right.left.license,
      data.right.right.license
    );

    licenses.spdxLicenseLinks.push(
      createSpdxLink(data.left.license),
      createSpdxLink(data.right.left.license),
      createSpdxLink(data.right.right.license)
    );
  }

  return licenses;
}
