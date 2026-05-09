#!/usr/bin/env node

import { Command } from 'commander';
import { CliApplication } from './application/index.js';
import pkg from '../../package.json';

(async () => {
  const app = new CliApplication();
  await app.initialize();

  const program = new Command();
  program
    .name('ksef-pdf')
    .description('Generator PDF dla faktur i UPO z systemu KSeF')
    .version(pkg.version);

  app.setupCommands(program);
  program.parse(process.argv);
})();
