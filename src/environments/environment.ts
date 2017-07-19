// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAI-LqaxrRzlOva3C6_D-XvXTPJb_vIrr0",
    authDomain: "hmd-ken.firebaseapp.com",
    databaseURL: "https://hmd-ken.firebaseio.com",
    projectId: "hmd-ken",
    storageBucket: "hmd-ken.appspot.com",
    messagingSenderId: "361262731181"
  }
};
