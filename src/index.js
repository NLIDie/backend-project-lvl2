import { Command } from 'commander';
import genDiff from './gendiff.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0', '-v, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format');

program
  .arguments('<filepath1> <filepath2>')
  .action((filePath1, filePath2) => {
    console.log(genDiff(filePath1, filePath2));
  });

export default () => {
  program.parse(process.argv);
};
