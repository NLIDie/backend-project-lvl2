import fs from 'fs';
import path from 'path';

import buildAST from './astBuilder.js';
import format from './formatters/index.js';
import parse from './parsers.js';

const getFullPath = (filePath) => path.resolve(process.cwd(), filePath);

/**
 * Return diff files
 * @param {string} filePath1 path to first file.
 * @param {string} filePath2 path to seconds file.
 * @return {string} diff
 */
const genDiff = (filePath1, filePath2, outputFormat = 'stylish') => {
  const file1 = fs.readFileSync(getFullPath(filePath1), 'utf-8');
  const file2 = fs.readFileSync(getFullPath(filePath2), 'utf-8');

  const format1 = path.extname(getFullPath(filePath1)).replace('.', '');
  const format2 = path.extname(getFullPath(filePath2)).replace('.', '');

  const data1 = parse(file1, format1);
  const data2 = parse(file2, format2);

  const ast = buildAST(data1, data2);
  const diff = format(ast, outputFormat);

  return diff;
};

export default genDiff;
