## Installation

`npm i --dev @kard/webpack-config`

Or with yarn

`yarn add --dev @kard/webpack-config`

## Configuration exaple

In the `package.json`:

```
  "scripts": {
    "build": "build",
    "serve": "devserver",
    "esfix": "esfix"
  },
  "webpack": {
    "source": "src",
    "static": "static",
    "build": "dist",
    "html": "src/index.ejs",
    "main": "src/app.js",
    "devport": "3000"
  },
  "eslintConfig": {
    "files": [ "src/**/*.js", "src/**/*.jsx" ],
    "fix": true
  }
```

Notes:
* The `eslintConfig` section can be used to rewrite all of the eslint options. Please refer to the `package.json` options in [eslint doc](https://eslint.org/docs/user-guide/configuring#configuration-file-formats)
