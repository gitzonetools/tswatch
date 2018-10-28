import * as plugins from './tswatch.plugins';
import * as paths from './tswatch.paths';

import { TsWatch } from './tswatch.classes.tswatch';

const tswatchCli = new plugins.smartcli.Smartcli();

tswatchCli.addCommand('test').subscribe(argvArg => {
  const tsWatch = new TsWatch({
    filePathToWatch: paths.cwd,
    commandToExecute: 'npm run test2',
    timeout: (() => {
      if (argvArg.timeout) {
        console.log(`timeing out after ${argvArg.timeout}`);
        return argvArg.timeout;
      } else {
        return null;
      }
    })()
  });
  tsWatch.start();
});

tswatchCli.startParse();
