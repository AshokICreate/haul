/**
 * Copyright 2017-present, Callstack.
 * All rights reserved.
 *
 * @flow
 */

import path from 'path';
import { replacePathsInObject } from 'jest/helpers'; // eslint-disable-line import/no-unresolved
import makeReactNativeConfig from '../makeReactNativeConfig';

test('creates config from defaults', () => {
  const webpackConfig = require('./fixtures/webpack.config.js');
  const [configs, platforms] = makeReactNativeConfig(webpackConfig, {
    dev: true,
    root: path.resolve(__dirname, 'fixtures'),
  });

  expect(replacePathsInObject(configs)).toMatchSnapshot(
    'creates config from defaults (configs)'
  );
  expect(platforms).toMatchSnapshot('creates config from defaults (platforms)');
});

test('merges existing config', () => {
  const webpackConfig = require('./fixtures/webpack.custom.config.js');
  const [configs] = makeReactNativeConfig(webpackConfig, {
    dev: true,
    root: path.resolve(__dirname, 'fixtures'),
  });

  expect(replacePathsInObject(configs)).toMatchSnapshot(
    'merges existing config'
  );
});

describe('injects polyfill into entries, when', () => {
  const wpConfig = {};
  const fakePolyfillPath = 'path/to/polyfill';
  const options = { root: path.resolve(__dirname, 'fixtures') };

  describe('entry is a string', () => {
    wpConfig.entry = './src/index.js';
    const [configs, PLATFORMS] = makeReactNativeConfig(
      wpConfig,
      options,
      fakePolyfillPath
    );

    configs.forEach((config, i) => {
      test(`platform ${PLATFORMS[i]}`, () => {
        expect(config.entry.length).toBe(2);
        expect(config.entry[0]).toBe(fakePolyfillPath);
      });
    });
  });

  describe('entry is an array', () => {
    wpConfig.entry = ['./src/index.js', './src/module.js'];
    const [configs, PLATFORM] = makeReactNativeConfig(
      wpConfig,
      options,
      fakePolyfillPath
    );

    configs.forEach((config, i) => {
      test(`platform ${PLATFORM[i]}`, () => {
        expect(config.entry[0]).toBe(fakePolyfillPath);
        expect(config.entry.length).toBe(3);
      });
    });
  });

  describe('entry is an object', () => {
    wpConfig.entry = {
      entry1: './src/index.js',
      entry2: ['./src/module.js', './src/vendor.js'],
    };
    const expectedEntry1 = [fakePolyfillPath, './src/index.js'];

    const expectedEntry2 = [
      fakePolyfillPath,
      './src/module.js',
      './src/vendor.js',
    ];

    const [configs, PLATFORM] = makeReactNativeConfig(
      wpConfig,
      options,
      fakePolyfillPath
    );

    configs.forEach((config, i) => {
      test(`platform ${PLATFORM[i]} matches object`, () => {
        expect(config.entry).toMatchObject({
          entry1: expectedEntry1,
          entry2: expectedEntry2,
        });
      });
    });
  });
});
