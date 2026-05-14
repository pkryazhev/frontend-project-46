const { program } = require('commander');

program
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .version('0.0.1');

program.parse();