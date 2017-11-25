module.exports = {
    "files": [ 'src/**/*.js', 'src/**/*.jsx' ],
    "fix": true,
    "formatter": "codeframe",
    "useEslintrc": false,
    "extends": [ "eslint:recommended", "plugin:react/recommended" ],
    // "extends": ["eslint:all", "plugin:react/all"],
    "plugins": [ "class-property", "react" ],
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 2017,
        "ecmaFeatures": {
            "jsx": true,
            "experimentalObjectRestSpread": true
        },
        "sourceType": "module"
    },
    "rules": {

        "semi": [2, "always"],
        // "semi": [2, "never"],
        "indent": ["error", 4],

        // NOTE: Use these rules to remove message error "'React' is defined but never used" for js files
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",

        "react/prop-types": 1,
        "no-unused-vars": 1,
        "no-console": ["warn", { "allow": [
            "warn",
            "error"
        ]}]
    },
    "globals": [
        // note: There is a known bug about eslint 'globals'. https://stackoverflow.com/a/45776151
        "__DEV__"
    ]
};
