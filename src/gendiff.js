import fs from 'fs';
import path from 'path';

import stylishFormat from './formatters/stylish.js';
import buildAST from './astBuilder.js';

const getFullPath = (filePath) => path.resolve(process.cwd(), filePath);

/**
 * Return diff files
 * @param {string} filePath1 - path to first file.
 * @param {string} filePath2 - path to seconds file.
 * @return {string}
 */
const genDiff = (filePath1, filePath2) => {
  const file1 = fs.readFileSync(getFullPath(filePath1), 'utf-8');
  const file2 = fs.readFileSync(getFullPath(filePath2), 'utf-8');

  const fileData1 = JSON.parse(file1);
  const fileData2 = JSON.parse(file2);

  const ast = buildAST(fileData1, fileData2);
  const diff = stylishFormat(ast);

  return diff;
};

export default genDiff;
