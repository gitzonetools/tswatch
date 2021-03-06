import * as plugins from './tswatch.plugins';
import * as paths from './tswatch.paths';
import { logger } from './tswatch.logging';

import { TsWatch } from './tswatch.classes.tswatch';

const tswatchCli = new plugins.smartcli.Smartcli();

// standard behaviour will assume gitzone setup

tswatchCli.addCommand('test').subscribe(async argvArg => {
  logger.log('info', `running test task`);
  const tsWatch = new TsWatch('test');
  await tsWatch.start();
});

tswatchCli.addCommand('website').subscribe(async argvArg => {
  logger.log('info', `running watch task for a gitzone website project`);
  const tsWatch = new TsWatch('gitzone_website');
  await tsWatch.start();
});

tswatchCli.startParse();
