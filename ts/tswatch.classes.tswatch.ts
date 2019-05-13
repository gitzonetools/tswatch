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
  public async start() {
    switch (this.watchmode) {
      case 'test':
        this.watcherMap.add(new Watcher({
          filePathToWatch: paths.cwd,
          commandToExecute: 'npm run test2',
          timeout: null
        }));
        break;
      case 'gitzone_npm':
        this.watcherMap.add(new Watcher({
          filePathToWatch: paths.cwd,
          commandToExecute: 'npm run test',
          timeout: null
        }));
        break;
      case 'gitzone_website':
        // server directory
        this.watcherMap.add(
          new Watcher({
            filePathToWatch: plugins.path.join(paths.cwd, './ts/'),
            commandToExecute: 'npm run start',
            timeout: null
          })
        );
        
        // client directory
        this.watcherMap.add(new Watcher({
          filePathToWatch: plugins.path.join(paths.cwd, './ts_web/'),
          commandToExecute: 'npm run build',
          timeout: null
        }));
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
  public async stop() {
    this.watcherMap.forEach(async watcher => {
      await watcher.stop();
    });
  }
}
