import * as plugins from './tswatch.plugins';
import * as paths from './tswatch.paths';
import * as interfaces from './interfaces';

import { Watcher } from './tswatch.classes.watcher';
import { Parcel } from './tswatch.classes.parcel';

export class TsWatch {
  public watchmode: interfaces.TWatchModes;
  public watcherMap = new plugins.lik.ObjectMap<Watcher>();
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
            timeout: null,
          })
        );
        break;
      case 'gitzone_npm':
        this.watcherMap.add(
          new Watcher({
            filePathToWatch: paths.cwd,
            commandToExecute: 'npm run test',
            timeout: null,
          })
        );
        break;
      case 'gitzone_element':
        // lets create a standard server
        console.log(
          'bundling TypeScript files to "dist_watch" Note: This is for development only!'
        );
        const parcel = new Parcel(
          plugins.path.join(process.cwd(), './html/index.html'),
          plugins.path.join(process.cwd(), './dist_watch'),
          'index.html'
        );
        await parcel.start();
        break;
      case 'gitzone_website':
        this.watcherMap.add(
          new Watcher({
            filePathToWatch: plugins.path.join(paths.cwd, './ts/'),
            commandToExecute: 'npm run startTs',
            timeout: null,
          })
        );

        // client directory
        const parcelWebsite = new Parcel(
          plugins.path.join(process.cwd(), './ts_web/index.ts'),
          plugins.path.join(process.cwd(), './dist_serve'),
          'bundle.js'
        );
        await parcelWebsite.start();
        break;
      case 'gitzone_service':
        this.watcherMap.add(
          new Watcher({
            filePathToWatch: plugins.path.join(paths.cwd, './ts/'),
            commandToExecute: 'npm run startTs',
            timeout: null,
          })
        );
        break;
      case 'echoSomething':
        const tsWatchInstanceEchoSomething = new Watcher({
          filePathToWatch: plugins.path.join(paths.cwd, './ts'),
          commandToExecute: 'npm -v',
          timeout: null,
        });
        this.watcherMap.add(tsWatchInstanceEchoSomething);
        break;
      default:
        break;
    }
    this.watcherMap.forEach(async (watcher) => {
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
    this.watcherMap.forEach(async (watcher) => {
      await watcher.stop();
    });
  }
}
