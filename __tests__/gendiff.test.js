import { test, expect, describe } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const outputFormats = ['stylish', 'plain', 'json'];
const filesExtensions = [
  ['json', 'json'],
  ['yml', 'yml'],
  ['yaml', 'yaml'],

  ['json', 'yml'],
  ['json', 'yaml'],

  ['yml', 'json'],
  ['yaml', 'json'],
];

describe('genDiff', () => {
  outputFormats.forEach((outputFormat) => {
    describe(`${outputFormat} format`, () => {
      filesExtensions.forEach(([fileExt1, fileExt2]) => {
        const result = readFixture(`result_${outputFormat}.txt`);

        test(`Should return correct diff *.${fileExt1} *.${fileExt2} files`, () => {
          const filePath1 = getFixturePath(`file1.${fileExt1}`);
          const filePath2 = getFixturePath(`file2.${fileExt2}`);

          expect(genDiff(filePath1, filePath2, outputFormat)).toBe(result);
        });
      });
    });
  });
});
