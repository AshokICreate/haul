/**
 * Copyright 2017-present, Callstack.
 * All rights reserved.
 *
 * @flow
 */

const path = require('path');

const getEntryFile = (entries: Array<string>) => {
  return entries
    .reduce((pathArray, entry) => {
      if (!Array.isArray(entry)) {
        Object.keys(entry).forEach(key => {
          entry[key].slice(1).forEach(file => {
            pathArray.push(file);
          });
        });
        return pathArray;
      }
      entry.slice(1).forEach(file => pathArray.push(file));
      return pathArray;
    }, [])
    .map(filePath => path.resolve(process.cwd(), filePath))
    .join('\n');
};

module.exports = getEntryFile;
