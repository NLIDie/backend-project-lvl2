import _ from 'lodash';

const stringify = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }

  if (_.isString(data)) {
    return `'${data}'`;
  }

  return data;
};

const mapping = {
  root: ({ children }, propertyParents, format) => children.flatMap(
    (node) => mapping[node.type](node, propertyParents, format),
  ),
  object: ({ key, children }, propertyParents, format) => children.flatMap(
    (node) => mapping[node.type](node, [...propertyParents, key], format),
  ),
  added: ({ key, value }, propertyParents) => `Property '${[...propertyParents, key].join('.')}' was added with value: ${stringify(value)}`,
  removed: ({ key }, propertyParents) => `Property '${[...propertyParents, key].join('.')}' was removed`,
  changed: ({ key, value1, value2 }, propertyParents) => `Property '${[...propertyParents, key].join('.')}' was updated. From ${stringify(value1)} to ${stringify(value2)}`,
  unchanged: () => [],
};

const format = (node, propertyParents) => mapping[node.type](node, propertyParents, format);

export default (ast) => format(ast, []).join('\n');
