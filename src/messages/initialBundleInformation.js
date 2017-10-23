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
  entry: Array<string>,
  dev: boolean,
};

module.exports = (config: Params) => {
  const mode = config.dev ? 'development' : 'production';
  console.log('enx', config.entry);
  return dedent`
    Haul is now bundling your React Native app in ${chalk.bold(mode)} mode.
    
    Starting from:

    ${chalk.grey(getEntryFile(config.entry))}
  `;
};
