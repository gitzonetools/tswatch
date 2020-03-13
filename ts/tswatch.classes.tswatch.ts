import * as plugins from './tswatch.plugins';
import * as paths from './tswatch.paths';
import * as interfaces from './interfaces';

import { Watcher } from './tswatch.classes.watcher';
import { Parcel } from './tswatch.classes.parcel';

export class TsWatch {
  public watchmode: interfaces.TWatchModes;
  public watcherMap = new plugins.lik.Objectmap<Watcher>();
  public smartserve: plugins.smartserve.SmartServe;

  constructor(watchmodeArg: interfaces.TWatchModes) {
    this.watchmode = watchmodeArg;
  }

  /**
   * starts the TsWatch instance
   */
  public async start() {
    switch (this.watchmode) {
      case 'test':
        this.watcherMap.add(
          new Watcher({
            filePathToWatch: paths.cwd,
            commandToExecute: 'npm run test2',
            timeout: null
          })
        );
        break;
      case 'gitzone_npm':
        this.watcherMap.add(
          new Watcher({
            filePathToWatch: paths.cwd,
            commandToExecute: 'npm run test',
            timeout: null
          })
        );
        break;
      case 'gitzone_element':
        // lets create a standard server
        console.log('bundling TypeScript files to "dist_watch" Note: This is for development only!');
        this.smartserve = new plugins.smartserve.SmartServe({
          port: 3001,
          injectReload: true,
          serveDir: plugins.path.join(paths.cwd, './dist_watch/')
        });
        const parcel = new Parcel();
        await parcel.start();
        break;
      case 'gitzone_website':
        this.watcherMap.add(
          new Watcher({
            filePathToWatch: plugins.path.join(paths.cwd, './ts/'),
            commandToExecute: 'npm run startTs',
            timeout: null
          })
        );

        // client directory
        this.watcherMap.add(
          new Watcher({
            filePathToWatch: plugins.path.join(paths.cwd, './ts_web/'),
            commandToExecute: 'npm run build',
            timeout: null
          })
        );
        break;
      case 'gitzone_service':
          this.watcherMap.add(
            new Watcher({
              filePathToWatch: plugins.path.join(paths.cwd, './ts/'),
              commandToExecute: 'npm run startTs',
              timeout: null
            })
          );
          break;
      case 'echoSomething':
        const tsWatchInstanceEchoSomething = new Watcher({
          filePathToWatch: plugins.path.join(paths.cwd, './ts'),
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
    if (this.smartserve) {

      await this.smartserve.start();
    }
  }

  /**
   * stops the execution of any active Watchers
   */
  public async stop() {
    if (this.smartserve) {
      await this.smartserve.stop();
    }
    this.watcherMap.forEach(async watcher => {
      await watcher.stop();
    });
  }
}
