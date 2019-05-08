import * as plugins from './tswatch.plugins';
import * as paths from './tswatch.paths';
import * as interfaces from './interfaces';

import { Watcher } from './tswatch.classes.watcher';

export class TsWatch {
  public watchmode: interfaces.TWatchModes;
  public watcherMap = new plugins.lik.Objectmap<Watcher>();

  constructor(watchmodeArg: interfaces.TWatchModes) {
    this.watchmode = watchmodeArg; 
  }

  /**
   * starts the TsWatch instance
   */
  public async start () {
    switch (this.watchmode) {
      case 'test':
        const tsWatchInstanceTest = new Watcher({
          filePathToWatch: paths.cwd,
          commandToExecute: 'npm run test2',
          timeout: null
        });
        this.watcherMap.add(tsWatchInstanceTest);
        break;
      case 'gitzone_npm':
        const tsWatchInstanceGitzoneNpm = new Watcher({
          filePathToWatch: paths.cwd,
          commandToExecute: 'npm run test',
          timeout: null
        });
        this.watcherMap.add(tsWatchInstanceGitzoneNpm);
        break;
      case 'gitzone_website':
        const tsWatchInstanceGitzoneWebsite = new Watcher({
          filePathToWatch: paths.cwd,
          commandToExecute: 'npm run test',
          timeout: null
        });
        this.watcherMap.add(tsWatchInstanceGitzoneWebsite);
        break;
      case 'echoSomething':
      const tsWatchInstanceEchoSomething = new Watcher({
        filePathToWatch: paths.cwd,
        commandToExecute: 'npm -v',
        timeout: null
      });
      this.watcherMap.add(tsWatchInstanceEchoSomething);
      break;
      default:
        break;
    }
    this.watcherMap.forEach(async watcher => {
      await watcher.start();
    });
  }

  /**
   * stops the execution of any active Watchers
   */
  public async stop () {
    this.watcherMap.forEach(async watcher => {
      await watcher.stop();
    })
  }
}
