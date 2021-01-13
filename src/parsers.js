import yaml from 'js-yaml';

const parsersMapping = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

/**
 * Parse data
 * @param {string} data data for parsing.
 * @param {'json' | 'yml' | 'yaml'} type data type.
 * @return {object} data as JS object
 */
export default (data, type) => {
  const parse = parsersMapping[type];

  if (!parse) {
    throw new Error(`There is no parser for "${type}"`);
  }

  return parse(data);
};
