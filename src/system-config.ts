"use strict";

// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  '@ng-bootstrap': 'vendor/@ng-bootstrap'
};

/** User packages configuration. */
const packages: any = {
  '@ng-bootstrap/ng-bootstrap': {
    main: 'index.js',
    defaultExtension: 'js'
  }
};

const ngBootstrapPackages:string[] = [
  'accordion',
  'alert',
  'buttons',
  'carousel',
  'collapse',
  'dropdown',
  'pagination',
  'popover',
  'progressbar',
  'rating',
  'tabset',
  'timepicker',
  'tooltip',
  'typeahead'
];

ngBootstrapPackages.forEach((pkg) => {
  packages[`@ng-bootstrap/ng-bootstrap/${pkg}`] = {
    main: 'index.js',
    defaultExtension: 'js'
  };
});

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/forms',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
