"use strict";

// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'ng2-bootstrap': 'vendor/ng2-bootstrap',
  'moment': 'vendor/moment/moment.js',
  'boostrap': 'vendor/bootstrap'
};

/** User packages configuration. */
const packages: any = {
};

packages['ng2-bootstrap'] = {
  main: 'ng2-bootstrap.js',
  defaultExtension: 'js'
}

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
  'app/operations',
  'app/statistics',
  'app/account-form',
  'app/form-error',
  'app/account-form2',
  'app/account-list',
  'app/wrapper-test',
  'app/tag-form',
  'app/tag-list',
  'app/operation-form',
  'app/login',
  'app/home',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

cliSystemConfigPackages['angular2-jwt'] = {
  main: 'angular2-jwt'
};

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'angular2-jwt': 'vendor/angular2-jwt',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
