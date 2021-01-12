import { test, expect, describe } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

let jsonResult;

beforeAll(() => {
  jsonResult = readFixture('result_json.txt');
});

describe('gendiff', () => {
  test('Should return correct diff for *.json files', () => {
    const filePath1 = getFixturePath('file1.json');
    const filePath2 = getFixturePath('file2.json');

    expect(genDiff(filePath1, filePath2)).toBe(jsonResult);
  });
});
