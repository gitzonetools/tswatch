import * as plugins from './tswatch.plugins.js';
import * as paths from './tswatch.paths.js';
import { logger } from './tswatch.logging.js';

import { TsWatch } from './tswatch.classes.tswatch.js';

const tswatchCli = new plugins.smartcli.Smartcli();

// standard behaviour will assume gitzone setup
tswatchCli.standardCommand().subscribe((argvArg => {
  tswatchCli.triggerCommand('npm', {});
}))

tswatchCli.addCommand('element').subscribe(async (argvArg) => {
  logger.log('info', `running watch task for a gitzone element project`);
  const tsWatch = new TsWatch('gitzone_element');
  await tsWatch.start();
});

tswatchCli.addCommand('npm').subscribe(async (argvArg) => {
  logger.log('info', `running watch task for a gitzone element project`);
  const tsWatch = new TsWatch('gitzone_npm');
  await tsWatch.start();
});

tswatchCli.addCommand('service').subscribe(async (argvArg) => {
  logger.log('info', `running test task`);
  const tsWatch = new TsWatch('gitzone_service');
  await tsWatch.start();
});

tswatchCli.addCommand('test').subscribe(async (argvArg) => {
  logger.log('info', `running test task`);
  const tsWatch = new TsWatch('test');
  await tsWatch.start();
});

tswatchCli.addCommand('website').subscribe(async (argvArg) => {
  logger.log('info', `running watch task for a gitzone website project`);
  const tsWatch = new TsWatch('gitzone_website');
  await tsWatch.start();
});

export const runCli = async () => {
  tswatchCli.startParse();
};
