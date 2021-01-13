import yaml from 'js-yaml';

const parsersMapping = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

/**
 * Parse data
 * @param {string} data data for parsing.
 * @param {'json' | 'yml' | 'yaml'} format data format.
 * @return {object} data as JS object
 */
export default (data, format) => {
  const parse = parsersMapping[format];

  if (!parse) {
    throw new Error(`There is no parser for "${format}"`);
  }

  return parse(data);
};
