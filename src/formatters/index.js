import stylishFormat from './stylish.js';

const formattersMapping = {
  stylish: stylishFormat,
};

export default (ast, type) => {
  const format = formattersMapping[type];

  if (!format) {
    throw new Error(`There "${type}" no such formatter`);
  }

  return format(ast);
};
