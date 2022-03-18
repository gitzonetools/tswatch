import * as plugins from './tswatch.plugins.js';
import * as paths from './tswatch.paths.js';
import * as interfaces from './interfaces/index.js';

import { Watcher } from './tswatch.classes.watcher.js';

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
    const tsbundle = new plugins.tsbundle.TsBundle();
    const htmlHandler = new plugins.tsbundle.HtmlHandler();
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
        const smartserve = new plugins.smartserve.SmartServe({
          injectReload: true,
          serveDir: plugins.path.join(paths.cwd, './dist_watch/'),
          port: 3002,
        });
        
        const bundleAndReloadElement = async () => {
          await tsbundle.build(paths.cwd, './html/index.ts', './dist_watch/bundle.js', {
            bundler: 'esbuild'
          });
          await smartserve.reload();
        }
        this.watcherMap.add(
          new Watcher({
            filePathToWatch: plugins.path.join(paths.cwd, './ts_web/'),
            functionToCall: async () => {
              await bundleAndReloadElement();
            },
            timeout: null,
          })
        );
        this.watcherMap.add(
          new Watcher({
            filePathToWatch: plugins.path.join(paths.cwd, './html/'),
            functionToCall: async () => {
              await htmlHandler.copyHtml(
                plugins.path.join(
                  paths.cwd,
                  './html/index.html'
                ),
                plugins.path.join(
                  paths.cwd,
                  './dist_watch/index.html'
                )
              );
              await bundleAndReloadElement();
            },
            timeout: null,
          })
        );
        await smartserve.start();
        /* const parcel = new plugins.smartparcel.Parcel(
          plugins.path.join(process.cwd(), './html/index.html'),
          plugins.path.join(process.cwd(), './dist_watch'),
          'index.html'
        );
        await parcel.watchAndServe(); */
        break;
      case 'gitzone_website':
        this.watcherMap.add(
          new Watcher({
            filePathToWatch: plugins.path.join(paths.cwd, './ts/'),
            commandToExecute: 'npm run startTs',
            timeout: null,
          })
        );
        const bundleAndReloadWebsite = async () => {
          await tsbundle.build(paths.cwd, './ts_web/index.ts', './dist_serve/bundle.js', {
            bundler: 'esbuild'
          });
        }
        this.watcherMap.add(
          new Watcher({
            filePathToWatch: plugins.path.join(paths.cwd, './ts_web/'),
            functionToCall: async () => {
              await bundleAndReloadWebsite();
            },
            timeout: null,
          })
        );
        this.watcherMap.add(
          new Watcher({
            filePathToWatch: plugins.path.join(paths.cwd, './html/'),
            functionToCall: async () => {
              await htmlHandler.copyHtml(
                plugins.path.join(
                  paths.cwd,
                  './html/index.html'
                ),
                plugins.path.join(
                  paths.cwd,
                  './dist_watch/index.html'
                )
              );
              await bundleAndReloadWebsite();
            },
            timeout: null,
          })
        );

        // client directory
        /* const parcelWebsite = new plugins.smartparcel.Parcel(
          plugins.path.join(process.cwd(), './html/index.html'),
          plugins.path.join(process.cwd(), './dist_serve'),
          'bundle.js'
        );
        await parcelWebsite.watchAndServe(); */
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
