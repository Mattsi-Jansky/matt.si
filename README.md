# matt.si

[![Deploy Status](https://api.netlify.com/api/v1/badges/dcadbc17-697b-4194-9871-cab8ba07309a/deploy-status)](https://app.netlify.com/sites/mattsi/deploys)
[![Automated Tests Status](https://github.com/mattsi-jansky/matt.si/workflows/Run%20tests/badge.svg)](https://github.com/Mattsi-Jansky/matt.si/actions)

My blog-slash-portfolio, [matt.si](https://matt.si). Built with:

* [Gatsby](https://www.gatsbyjs.org/)
* [Flexible Gatsby](https://github.com/wangonya/flexible-gatsby/)
* [Netlify](https://www.netlify.com)
* [React](https://reactjs.org/)

## Requirements

* Node (I recommend using [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm#installing-and-updating)
  * With NVM run `nvm use` in the root dir to set the appropriate Node version in your terminal
* Yarn (`brew install yarn`)
  * Run `yarn` (no args) in root to download all dependencies, before doing anything else.

## Run locally

`yarn dev`

## Build

`yarn build`

## Tests

### Unit Tests

To run them: `yarn test`
To update the snapshots: `yarn test:updateSnapshots`

### Visual Regression Tests

To run them: `yarn test:visual`
To update the references: `yarn test:visual:update`
To approve the test snapshots as the new references: `yarn test:visual:approve`
