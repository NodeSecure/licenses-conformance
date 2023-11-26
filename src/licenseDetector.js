// Import Internal Dependencies
import { licenseNameToId } from "./licenses.js";

// CONSTANTS
const kNumberChar = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
const kEnglishSegmenter = new Intl.Segmenter(
  "en", { granularity: "word" }
);

export class LicenseDetector {
  /**
   * @param {!string} value
   * @returns {string[]}
   */
  static getWordSegments(value) {
    return Array.from(
      kEnglishSegmenter.segment(value),
      ({ segment }) => segment
    ).filter((word) => word.trim() !== "" && word.length > 1);
  }

  static getNumericFromString(value) {
    const maybeNumeric = [...value]
      .filter((char) => kNumberChar.has(char))
      .join("");

    return maybeNumeric.trim() === "" ? null : Number(maybeNumeric);
  }

  static versionRegex(version) {
    return new RegExp(
      `version ${version}|v ${version}|v${version}|v-${version}`, "i"
    );
  }

  /**
   * @param {!string} value
   * @returns {string | null}
   */
  detectExceptionalLicenses(value) {
    if (value.includes("Apple Computer, Inc., All Rights Reserved")) {
      return "AML";
    }

    return null;
  }

  /**
   * @param {!string} value
   * @returns {string | null}
   */
  detectFromString(licenseStr) {
    const segmentedLicenseWords = LicenseDetector.getWordSegments(licenseStr);

    for (const license of licenseNameToId.values()) {
      const expr = escapeRegExp(license.name)
        .split(" ")
        .join(String.raw`[\s\S\r\n]+`);

      /** @type {string} */
      const id = license.id;

      const matchVersion = license.version === null ?
        () => true :
        () => LicenseDetector.versionRegex(license.version).test(licenseStr);

      if (new RegExp(expr, "im").test(licenseStr) && matchVersion()) {
        return id;
      }

      // const licenseNumericId = LicenseDetector.getNumericFromString(license.id);
      const separatedId = id.split("-");

      if (
        licenseStr.includes(id) ||
        licenseStr.includes(separatedId.join(" ")) ||
        separatedId.every((word) => segmentedLicenseWords.includes(word))
      ) {
        return id;
      }
    }

    return this.detectExceptionalLicenses(licenseStr);
  }
}

/**
 * @param {!string} string
 * @returns {string}
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
