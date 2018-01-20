## Installation

`npm i --dev @kard/webpack-config`

Or with yarn

`yarn add --dev @kard/webpack-config`

## Configuration exaple

In the `package.json`:

```
  "scripts": {
    "build": "wp-build",
    "serve": "wp-serve"
  },
  "webpack": {
    "source": "src",
    "static": "static",
    "build": "dist",
    "html": "src/index.ejs",
    "main": "src/app.js",
    "devport": "3000",
    "alias": {
        "@Services": "src/services"
    }
  },
```


## Module resolving

According to the setup, you can either refer your modules relative to the source root or define alias object in the package.json of our project. For a case of the setup example above, both references to the `services` are equivalent:
```js
import { preloader } from '@Services'
import { preloader } from 'services'
```

## Valid Example

__index.ejs__
```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <link rel="icon" href="/favicon.ico?v=<%= htmlWebpackPlugin.options.favid %>">
    <title><%= htmlWebpackPlugin.options.pkg.name %></title>
    <base href="<%= htmlWebpackPlugin.options.publicPath %>">
    <!--link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css"-->
  </head>
  <body>
    <div id='root'>Loading...</div>
  </body>
</html>
```
