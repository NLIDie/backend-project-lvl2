import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const formatMapped = {
  added: (key, astNode) => {
    const [, newValue] = astNode.value;
    return [`+ ${key}: ${newValue}`];
  },

  removed: (key, astNode) => {
    const [oldValue] = astNode.value;
    return [`- ${key}: ${oldValue}`];
  },

  changed: (key, astNode) => {
    const [oldValue, newValue] = astNode.value;
    return [
      `- ${key}: ${oldValue}`,
      `+ ${key}: ${newValue}`,
    ];
  },

  'not-changed': (key, astNode) => {
    const [oldValue] = astNode.value;
    return [`  ${key}: ${oldValue}`];
  },
};

const format = (astDiff) => {
  const keys = _.sortBy(_.keys(astDiff));

  const strLines = keys.reduce((acc, key) => {
    const astNode = astDiff[key];
    const lines = formatMapped[astNode.status](key, astNode);

    return acc.concat(lines);
  }, []);

  const addIndent = (line) => `${' '.repeat(2)}${line}`;

  return `{\n${strLines.map(addIndent).join('\n')}\n}`;
};

const getAST = (data1, data2) => {
  const allKeys = [..._.keys(data1), ..._.keys(data2)];
  const keys = _.union(allKeys);

  const ast = keys.reduce((acc, key) => {
    const hasKeyData1 = _.has(data1, key);
    const hasKeyData2 = _.has(data2, key);

    if (!hasKeyData1 && hasKeyData2) {
      return {
        ...acc,
        [key]: {
          status: 'added',
          value: [null, data2[key]],
        },
      };
    }

    if (hasKeyData1 && !hasKeyData2) {
      return {
        ...acc,
        [key]: {
          status: 'removed',
          value: [data1[key], null],
        },
      };
    }

    if (_.isEqual(data1[key], data2[key])) {
      return {
        ...acc,
        [key]: {
          status: 'changed',
          value: [data1[key], data2[key]],
        },
      };
    }

    return {
      ...acc,
      [key]: {
        status: 'not-changed',
        value: [data1[key], null],
      },
    };
  }, {});

  return ast;
};

/**
 * Return diff files
 * @param {string} filePath1 - path to first file.
 * @param {string} filePath2 - path to seconds file.
 * @return {string}
 */
const genDiff = (filePath1, filePath2) => {
  const file1 = fs.readFileSync(path.resolve(filePath1));
  const file2 = fs.readFileSync(path.resolve(filePath2));

  const fileData1 = JSON.parse(file1);
  const fileData2 = JSON.parse(file2);

  const ast = getAST(fileData1, fileData2);
  const result = format(ast);

  return result;
};

export default genDiff;
