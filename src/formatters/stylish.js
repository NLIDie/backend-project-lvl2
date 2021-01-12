const signAddedField = '+ ';
const signRemovedField = '- ';
const signUnchangedField = '  ';
const signLength = 2;
const indentSize = 4;

const indent = (size) => ' '.repeat(size);

const stylishMapping = {
  added: ({ key, value }) => [`${signAddedField}${key}: ${value}`],

  removed: ({ key, value }) => [`${signRemovedField}${key}: ${value}`],

  changed: ({ key, value1, value2 }) => [
    `${signRemovedField}${key}: ${value1}`,
    `${signAddedField}${key}: ${value2}`,
  ],

  unchanged: ({ key, value }) => [`${signUnchangedField}${key}: ${value}`],
};

const stylishFormat = (ast) => {
  const output = ast.children
    .flatMap((node) => stylishMapping[node.type](node))
    .map((field) => `${indent(indentSize - signLength)}${field}`)
    .join('\n');

  return `{\n${output}\n}`;
};

export default stylishFormat;
