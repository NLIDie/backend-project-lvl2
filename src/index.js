import { Command } from 'commander';

const cliCommander = new Command();

cliCommander
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0', '-v, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information');

export default () => {
  cliCommander.parse(process.argv);
};
