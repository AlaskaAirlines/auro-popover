# auro-popover

`<auro-popover>` is a [HTML custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) for hovering/blurring over an element to display a tooltip-style popover with any content populated in a slot.

## UI development browser support

For the most up to date information on [UI development browser support](https://auro.alaskaair.com/support/browsersSupport)

## Install

[![Build Status](https://img.shields.io/github/workflow/status/AlaskaAirlines/auro-popover/Test%20and%20publish?branch=master&style=for-the-badge)](https://github.com/AlaskaAirlines/auro-popover/actions?query=workflow%3A%22test+and+publish%22)
[![See it on NPM!](https://img.shields.io/npm/v/@alaskaairux/auro-popover?style=for-the-badge&color=orange)](https://www.npmjs.com/package/@alaskaairux/auro-popover)
[![License](https://img.shields.io/npm/l/@alaskaairux/auro-popover?color=blue&style=for-the-badge)](https://www.apache.org/licenses/LICENSE-2.0)

```shell
$ npm i @alaskaairux/auro-popover
```

Installing as a direct, dev or peer dependency is up to the user installing the package. If you are unsure as to what type of dependency you should use, consider reading this [stack overflow](https://stackoverflow.com/questions/18875674/whats-the-difference-between-dependencies-devdependencies-and-peerdependencies) answer.

### Design Token CSS Custom Property dependency

The use of any Auro custom element has a dependency on the [Auro Design Tokens](https://auro.alaskaair.com/getting-started/developers/design-tokens).

For additional details in regards to using Auro Design Tokens with components, please see [TECH_DETAILS.md](https://github.com/AlaskaAirlines/auro_docs/blob/master/src/TECH_DETAILS.md)

### CSS Custom Property fallbacks

[CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) are [not supported](https://github.com/AlaskaAirlines/auro_docs/blob/master/src/CUSTOM_PROPERTIES.md) in older browsers. For this, fallback properties are pre-generated and included with the npm.

Any update to the Auro Design Tokens will be immediately reflected with browsers that support CSS custom properties, legacy browsers will require updated components with pre-generated fallback properties.

### Define dependency in project component

Defining the component dependency within each component that is using the `<auro-popover>` component.

```javascript
import "@alaskaairux/auro-popover";
```

**Reference component in HTML**

The popover component has a requirement on the placement of a designated element that will trigger the popover. The following is a default configuration with a trigger that is OUTSIDE the shadow DOM.

```html
<auro-popover for="example1">Hello World</auro-popover>
<p id="example1">Hover over me</p>
```

The following is an example of a popover with the trigger from within the scope of the shadow DOM using `slot` elements. This format will also work with nested shadow DOMs, from the implementor of `<auro-popover>` to the trigger component.

```html
<auro-popover for="example2">
  Hello World!
  <p slot="trigger" id="example2">Hover over me</p>
</auro-popover>
```

## Install bundled assets from CDN

In cases where the project is not able to process JS assets, there are pre-processed assets available for use. Two bundles are available -- `[namespace]-[name]__bundled.js` for modern browsers and `[namespace]-[name]__bundled.es5.js` for legacy browsers (including IE11).

Since the legacy bundle includes many polyfills that are not needed by modern browsers, we recommend you load these bundles using [differential serving](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/) so that the browser only loads the bundle it needs. To accomplish this, the script tag for the modern bundle should have `type="module"` and the script tag for the legacy bundle should have the `nomodule` attribute. See the example below.

**NOTE:** Be sure to replace `@latest` in the URL with the version of the asset you want. @latest is NOT aware of any MAJOR releases, use at your own risk.

```html
<link rel="stylesheet" href="https://unpkg.com/@alaskaairux/design-tokens@latest/dist/tokens/CSSCustomProperties.css" />
<link rel="stylesheet" href="https://unpkg.com/@alaskaairux/webcorestylesheets@latest/dist/bundled/essentials.css" />

<script src="https://unpkg.com/@alaskaairux/[namespace]-[name]@latest/dist/[namespace]-[name]__bundled.js" type="module"></script>
<script src="https://unpkg.com/@alaskaairux/[namespace]-[name]@latest/dist/[namespace]-[name]__bundled.es5.js" nomodule></script>
```

### polyfills.js

The `polyfills.js` is packaged with this component, but **IT IS NOT NEEDED** to load a polyfill per component. The `polyfills.js` will work for all additional components added to the project.


## auro-popover use cases

The `<auro-popover>` element should be used in situations where users may:

* Hover/blur over an element to display a popover-style graphic

## Development

In order to develop against this project, if you are not part of the core team, you will be required to fork the project prior to submitting a pull request.

Please be sure to review the [contribution guidelines](https://auro.alaskaair.com/getting-started/developers/contributing) for this project. Please make sure to **pay special attention** to the **conventional commits** section of the document.

### Start development environment

Once the project has been cloned to your local resource and you have installed all the dependencies you will need to open three different shell sessions. One is for the **Gulp tasks**, the second is for a series of **npm tasks** and the last is to run the **Polymer server**.

**Peer dependency:** Please make sure Polymer is installed globally in order to run the Polymer server. See [Auro Component Development Details](https://github.com/AlaskaAirlines/auro_docs/blob/master/src/TECH_DETAILS.md) for more information.

```shell
// shell terminal one
$ npm run dev

// shell terminal two
$ npm run serve
```

Open [localhost:8000](http://localhost:8000/)

### Testing
Automated tests are required for every Auro component. See `.\test\auro-popover.test.js` for the tests for this component. Run `npm test` to run the tests and check code coverage. Tests must pass and meet a certain coverage threshold to commit. See [the testing documentation](https://auro.alaskaair.com/support/tests) for more details.
