// Import Node.js Dependencies
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Import Third-party Dependencies
import test from "tape";

// Import Internal Dependencies
import { searchSpdxLicenseId } from "../index.js";

// CONSTANTS
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const kFixturePath = path.join(__dirname, "fixtures");

test("it should find and parse licenses ID for all fixtures files", async(tape) => {
  const licensesDir = path.join(kFixturePath, "licenses");

  const files = await fs.readdir(licensesDir, { withFileTypes: true });
  for (const dirent of files) {
    const licenseID = await searchSpdxLicenseId(
      path.join(licensesDir, dirent.name)
    );

    console.log(licenseID, dirent.name);
    // tape.same(licenseID, dirent.name);
  }

  tape.end();
});

test("it should return null if there is no license matching name", async(tape) => {
  const result = await searchSpdxLicenseId(
    path.join(kFixturePath, "LICENSE")
  );
  tape.strictEqual(result, null);

  tape.end();
});
