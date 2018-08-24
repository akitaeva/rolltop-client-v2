// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // make sure you never put apiBase: 'http://localhost:3000/' <= the last backslash
  // if you ever get error while deploying that is something like 'undefined < in JSON at position 1', the first thing to check is here, you most likely forgot to delete last backslash (or however you spell this '/')
  apiBase: 'http://localhost:3000',
  apiKey:'AIzaSyDHDUcBBjQiiOh-PXS_SbPX5tqCOFkIENs'
};


/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
