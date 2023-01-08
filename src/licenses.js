// Import Third-party Dependencies
import * as levenshtein from "fastest-levenshtein";

// CONSTANTS
const kMaximumLicenseDistance = 1;
const kFixedLicenseIds = new Map([
  ["Apache", "Apache-2.0"]
]);

export const osi = [
  "ZPL-2.0",
  "Zlib",
  "Xnet",
  "Watcom-1.0",
  "W3C",
  "VSL-1.0",
  "UPL-1.0",
  "SPL-1.0",
  "Sleepycat",
  "SISSL",
  "SimPL-2.0",
  "RSCPL",
  "RPSL-1.0",
  "RPL-1.5",
  "RPL-1.1",
  "QPL-1.0",
  "Python-2.0",
  "PostgreSQL",
  "PHP-3.0",
  "OSL-3.0",
  "OSL-2.1",
  "OSL-2.0",
  "OSL-1.0",
  "OSET-PL-2.1",
  "OGTSL",
  "OFL-1.1",
  "OCLC-2.0",
  "NTP",
  "NPOSL-3.0",
  "Nokia",
  "NGPL",
  "NCSA",
  "Naumen",
  "NASA-1.3",
  "Multics",
  "MS-RL",
  "MS-PL",
  "MPL-2.0-no-copyleft-exception",
  "MPL-2.0",
  "MPL-1.1",
  "MPL-1.0",
  "Motosoto",
  "MIT-0",
  "MIT",
  "MirOS",
  "LPPL-1.3c",
  "LPL-1.02",
  "LPL-1.0",
  "LiLiQ-Rplus-1.1",
  "LiLiQ-R-1.1",
  "LiLiQ-P-1.1",
  "LGPL-3.0-or-later",
  "LGPL-3.0-only",
  "LGPL-2.1-or-later",
  "LGPL-2.1-only",
  "LGPL-2.0-or-later",
  "LGPL-2.0-only",
  "ISC",
  "IPL-1.0",
  "IPA",
  "Intel",
  "HPND",
  "GPL-3.0-or-later",
  "GPL-3.0-only",
  "GPL-2.0-or-later",
  "GPL-2.0-only",
  "Frameworx-1.0",
  "Fair",
  "EUPL-1.2",
  "EUPL-1.1",
  "EUDatagrid",
  "EPL-2.0",
  "EPL-1.0",
  "Entessa",
  "EFL-2.0",
  "EFL-1.0",
  "ECL-2.0",
  "ECL-1.0",
  "CUA-OPL-1.0",
  "CPL-1.0",
  "CPAL-1.0",
  "CNRI-Python",
  "CECILL-2.1",
  "CDDL-1.0",
  "CATOSL-1.1",
  "BSL-1.0",
  "BSD-3-Clause-LBNL",
  "BSD-3-Clause",
  "BSD-2-Clause-Patent",
  "BSD-2-Clause",
  "Artistic-2.0",
  "Artistic-1.0-Perl",
  "Artistic-1.0-cl8",
  "Artistic-1.0",
  "APSL-2.0",
  "APSL-1.2",
  "APSL-1.1",
  "APSL-1.0",
  "APL-1.0",
  "Apache-2.0",
  "Apache-1.1",
  "AGPL-3.0-or-later",
  "AGPL-3.0-only",
  "AFL-3.0",
  "AFL-2.1",
  "AFL-2.0",
  "AFL-1.2",
  "AFL-1.1",
  "AAL",
  "0BSD"
];

export const fsf = [
  "ZPL-2.1",
  "ZPL-2.0",
  "Zlib",
  "Zimbra-1.3",
  "Zend-2.0",
  "YPL-1.1",
  "xinetd",
  "XFree86-1.1",
  "X11",
  "WTFPL",
  "W3C",
  "Vim",
  "UPL-1.0",
  "Unlicense",
  "SPL-1.0",
  "SMLNJ",
  "Sleepycat",
  "SISSL",
  "SGI-B-2.0",
  "Ruby",
  "RPSL-1.0",
  "QPL-1.0",
  "Python-2.0",
  "PHP-3.01",
  "OSL-3.0",
  "OSL-2.1",
  "OSL-2.0",
  "OSL-1.1",
  "OSL-1.0",
  "OpenSSL",
  "OLDAP-2.7",
  "OLDAP-2.3",
  "OFL-1.1",
  "OFL-1.0",
  "ODbL-1.0",
  "NPL-1.1",
  "NPL-1.0",
  "NOSL",
  "Nokia",
  "NCSA",
  "MS-RL",
  "MS-PL",
  "MPL-2.0",
  "MPL-1.1",
  "MIT",
  "LPPL-1.3a",
  "LPPL-1.2",
  "LPL-1.02",
  "LGPL-3.0-or-later",
  "LGPL-3.0-only",
  "LGPL-2.1-or-later",
  "LGPL-2.1-only",
  "ISC",
  "IPL-1.0",
  "IPA",
  "Intel",
  "Imlib2",
  "iMatix",
  "IJG",
  "HPND",
  "GPL-3.0-or-later",
  "GPL-3.0-only",
  "GPL-2.0-or-later",
  "GPL-2.0-only",
  "gnuplot",
  "GFDL-1.3-or-later",
  "GFDL-1.3-only",
  "GFDL-1.2-or-later",
  "GFDL-1.2-only",
  "GFDL-1.1-or-later",
  "GFDL-1.1-only",
  "FTL",
  "FSFAP",
  "EUPL-1.2",
  "EUPL-1.1",
  "EUDatagrid",
  "EPL-2.0",
  "EPL-1.0",
  "EFL-2.0",
  "ECL-2.0",
  "CPL-1.0",
  "CPAL-1.0",
  "Condor-1.1",
  "ClArtistic",
  "CECILL-C",
  "CECILL-B",
  "CECILL-2.0",
  "CDDL-1.0",
  "CC0-1.0",
  "CC-BY-SA-4.0",
  "CC-BY-4.0",
  "BSL-1.0",
  "BSD-4-Clause",
  "BSD-3-Clause-Clear",
  "BSD-3-Clause",
  "BSD-2-Clause-FreeBSD",
  "BitTorrent-1.1",
  "Artistic-2.0",
  "APSL-2.0",
  "Apache-2.0",
  "Apache-1.1",
  "Apache-1.0",
  "AGPL-3.0-or-later",
  "AGPL-3.0-only",
  "AFL-3.0",
  "AFL-2.1",
  "AFL-2.0",
  "AFL-1.2",
  "AFL-1.1"
];

export const deprecated = [
  "AGPL-1.0",
  "AGPL-3.0",
  "BSD-2-Clause-FreeBSD",
  "BSD-2-Clause-NetBSD",
  "GFDL-1.1",
  "GFDL-1.2",
  "GFDL-1.3",
  "GPL-1.0",
  "GPL-2.0",
  "GPL-2.0-with-GCC-exception",
  "GPL-2.0-with-autoconf-exception",
  "GPL-2.0-with-bison-exception",
  "GPL-2.0-with-classpath-exception",
  "GPL-2.0-with-font-exception",
  "GPL-3.0",
  "GPL-3.0-with-GCC-exception",
  "GPL-3.0-with-autoconf-exception",
  "LGPL-2.0",
  "LGPL-2.1",
  "LGPL-3.0",
  "Nunit",
  "StandardML-NJ",
  "eCos-2.0",
  "wxWindows"
];

export const spdxLicenses = new Set([
  ...deprecated,
  ...fsf,
  ...osi
]);

/**
 * @param {!string} licenseID
 */
export function closestSpdxLicenseID(licenseID) {
  if (kFixedLicenseIds.has(licenseID)) {
    return kFixedLicenseIds.get(licenseID);
  }

  for (const iteratedLicenseId of spdxLicenses) {
    const distance = levenshtein.distance(licenseID, iteratedLicenseId);
    if (distance <= kMaximumLicenseDistance) {
      kFixedLicenseIds.set(licenseID, iteratedLicenseId);

      return iteratedLicenseId;
    }
  }

  return licenseID;
}
