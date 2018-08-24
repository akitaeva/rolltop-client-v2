export const environment = {
  production: true,
  // make sure you never put apiBase: 'http://rolltop-online.herokuapp.com/' <= the last backslash
  // if you ever get error while deploying that is something like 'undefined < in JSON at position 1', the first thing to check is here, you most likely forgot to delete last backslash (or however you spell this '/')
  apiBase: 'http://rolltop-online.herokuapp.com',
  apiKey:'AIzaSyDHDUcBBjQiiOh-PXS_SbPX5tqCOFkIENs'
};
