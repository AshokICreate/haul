/**
 * Copyright 2017-present, Callstack.
 * All rights reserved.
 *
 * @flow
 */
const dedent = require('dedent');
const chalk = require('chalk');
const getEntryFile = require('../utils/getEntryFiles');

type Params = {
  entries: Array<Array<string>>,
  port: number,
};

module.exports = (config: Params) => dedent`
  Ready at ${chalk.cyan(`http://localhost:${config.port}`)}

  Haul is now bundling your React Native app, starting from:

  ${getEntryFile(config.entries)}

  A fresh build may take longer than usual\n
`;
