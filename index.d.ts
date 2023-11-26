export {
  licenseIdConformance,
  searchSpdxLicenseId,
  spdxLicenseConformance
}

interface spdxLicenseConformance {
  uniqueLicenseIds: string[];
  spdxLicenseLinks: string[];
  spdx?: {
    osi: boolean;
    fsf: boolean;
    fsfAndOsi: boolean;
    includesDeprecated: boolean;
  };
}

declare function licenseIdConformance(
  licenseID: string
): { ok: true, value: spdxLicenseConformance } | { ok: false, value: Error };

declare function searchSpdxLicenseId(
  contentStr: string
): Promise<string | null>;
