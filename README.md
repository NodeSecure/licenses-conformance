# SPDX Licenses conformance

![version](https://img.shields.io/badge/dynamic/json.svg?style=for-the-badge&url=https://raw.githubusercontent.com/NodeSecure/licenses-conformance/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge)](https://github.com/NodeSecure/licenses-conformance/graphs/commit-activity)
[![OpenSSF
Scorecard](https://api.securityscorecards.dev/projects/github.com/NodeSecure/licenses-conformance/badge?style=for-the-badge)](https://api.securityscorecards.dev/projects/github.com/NodeSecure/licenses-conformance)
[![mit](https://img.shields.io/github/license/NodeSecure/licenses-conformance.svg?style=for-the-badge)](https://github.com/NodeSecure/licenses-conformance/blob/master/LICENSE)
![build](https://img.shields.io/github/actions/workflow/status/NodeSecure/licenses-conformance/main.yml?style=for-the-badge)

NodeSecure [SPDX licenses](https://spdx.org/licenses/) conformance. Project forked/inspired from [cutenode/conformance](https://github.com/cutenode/conformance.git).

## Requirements

- [Node.js](https://nodejs.org/en/) v20 or higher

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

This repository is inspired by [cutenode/conformance](https://github.com/cutenode/conformance.git)

```bash
$ npm i @nodesecure/licenses-conformance
# or
$ yarn add @nodesecure/licenses-conformance
```

## Usage example

```js
import { licenseIdConformance } from "@nodesecure/licenses-conformance";

const conformance = licenseIdConformance("MIT").unwrap();
console.log(conformance);

/*  
  {
    uniqueLicenseIds: ["MIT"],
    spdxLicenseLinks: ["https://spdx.org/licenses/MIT.html#licenseText"],
    spdx: {
      osi: true,
      fsf: true,
      fsfAndOsi: true,
      includesDeprecated: false
    }
  }
*/
```

## API

```ts
export interface SpdxLicenseConformance {
  licenses: Record<string, string>
  spdx: {
    osi: boolean;
    fsf: boolean;
    fsfAndOsi: boolean;
    includesDeprecated: boolean;
  };
}

function licenseIdConformance(
  licenseID: string
): Result<SpdxLicenseConformance, Error>;

function searchSpdxLicenseId(contentStr: string): string | null;
```

## Updating SPDX licenses

To update the `src/data/spdx.ts` file just run the following npm script:

```bash
$ npm run spdx:refresh
```

It will fetch SPDX licenses [here](https://github.com/spdx/license-list-data/blob/main/json/licenses.json).

## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Kawacrepe"><img src="https://avatars.githubusercontent.com/u/40260517?v=4?s=100" width="100px;" alt="Vincent Dhennin"/><br /><sub><b>Vincent Dhennin</b></sub></a><br /><a href="https://github.com/NodeSecure/licenses-conformance/commits?author=Kawacrepe" title="Code">💻</a> <a href="https://github.com/NodeSecure/licenses-conformance/issues?q=author%3AKawacrepe" title="Bug reports">🐛</a> <a href="https://github.com/NodeSecure/licenses-conformance/commits?author=Kawacrepe" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/thomas-gentilhomme/"><img src="https://avatars.githubusercontent.com/u/4438263?v=4?s=100" width="100px;" alt="Gentilhomme"/><br /><sub><b>Gentilhomme</b></sub></a><br /><a href="https://github.com/NodeSecure/licenses-conformance/commits?author=fraxken" title="Code">💻</a> <a href="https://github.com/NodeSecure/licenses-conformance/pulls?q=is%3Apr+reviewed-by%3Afraxken" title="Reviewed Pull Requests">👀</a> <a href="#security-fraxken" title="Security">🛡️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/fabnguess"><img src="https://avatars.githubusercontent.com/u/72697416?v=4?s=100" width="100px;" alt="Kouadio Fabrice Nguessan"/><br /><sub><b>Kouadio Fabrice Nguessan</b></sub></a><br /><a href="#maintenance-fabnguess" title="Maintenance">🚧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

MIT
