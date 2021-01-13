import { Command } from 'commander';
import genDiff from './gendiff.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2> [format]')
  .action((filePath1, filePath2) => {
    const diff = genDiff(filePath1, filePath2, program.format);
    console.log(diff);
  });

export default () => program.parse(process.argv);
