import stylishFormat from './stylish.js';
import plainFormat from './plain.js';

const formattersMapping = {
  stylish: stylishFormat,
  plain: plainFormat,
  json: JSON.stringify,
};

export default (ast, type) => {
  const format = formattersMapping[type];

  if (!format) {
    throw new Error(`There "${type}" no such formatter`);
  }

  return format(ast);
};
