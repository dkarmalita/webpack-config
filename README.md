## Installation

`npm i --dev https://git.io/vFxBD`

Or with yarn

`yarn add --dev https://git.io/vFxBD`

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

