#!/usr/bin/env node
/**
 * @fileoverview Eslint CLI default configuration utility.
 * @author Dmitriy Karmalita
 *
 * Note: babel & eslint stacks are required.
 */
/* eslint no-console: 0 */
'use strict';

const path = require('path');

const rootPath = process.cwd();

const defaultConfig = require('../config/eslint');
const customConfig = require(path.join(rootPath, 'package.json'))['eslintConfig'];

const eslintConfig = {
    ...defaultConfig,
    ...customConfig
};

const CLIEngine = require("eslint").CLIEngine;

const cli = new CLIEngine(eslintConfig);

const formatter = cli.getFormatter(eslintConfig.formatter || "codeframe");  // ?

// Formatter options are:
// var formatter = cli.getFormatter();  // “stylish” (the default)
// var formatter = cli.getFormatter("checkstyle");
// var formatter = cli.getFormatter("codeframe");  // ?
// var formatter = cli.getFormatter("compact"); // ?
// var formatter = cli.getFormatter("html");
// var formatter = cli.getFormatter("jslint-xml");
// var formatter = cli.getFormatter("json");
// var formatter = cli.getFormatter("junit");
// var formatter = cli.getFormatter("table");   // ?
// var formatter = cli.getFormatter("tap");
// var formatter = cli.getFormatter("unix"); // ? == compact

const report = cli.executeOnFiles(eslintConfig.files || [ "src/**/*.js", "src/**/*.jsx" ]);//files);
CLIEngine.outputFixes(report);
console.log(formatter(report.results));
