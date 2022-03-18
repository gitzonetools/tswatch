import * as plugins from './tswatch.plugins.js';
import * as paths from './tswatch.paths.js';
import './interfaces/index.js';
import { Watcher } from './tswatch.classes.watcher.js';
export class TsWatch {
    constructor(watchmodeArg) {
        this.watcherMap = new plugins.lik.ObjectMap();
        this.watchmode = watchmodeArg;
    }
    /**
     * starts the TsWatch instance
     */
    async start() {
        switch (this.watchmode) {
            case 'test':
                this.watcherMap.add(new Watcher({
                    filePathToWatch: paths.cwd,
                    commandToExecute: 'npm run test2',
                    timeout: null,
                }));
                break;
            case 'gitzone_npm':
                this.watcherMap.add(new Watcher({
                    filePathToWatch: paths.cwd,
                    commandToExecute: 'npm run test',
                    timeout: null,
                }));
                break;
            case 'gitzone_element':
                // lets create a standard server
                console.log('bundling TypeScript files to "dist_watch" Note: This is for development only!');
                const smartserve = new plugins.smartserve.SmartServe({
                    injectReload: true,
                    serveDir: plugins.path.join(paths.cwd, './dist_watch/'),
                    port: 3002,
                });
                const tsbundle = new plugins.tsbundle.TsBundle();
                const bundleAndReload = async () => {
                    await tsbundle.build(paths.cwd, './ts_web/index.ts', './dist_watch/bundle.js', {
                        bundler: 'esbuild'
                    });
                    await smartserve.reload();
                };
                this.watcherMap.add(new Watcher({
                    filePathToWatch: plugins.path.join(paths.cwd, './ts_web/'),
                    functionToCall: async () => {
                        await bundleAndReload();
                    },
                    timeout: null,
                }));
                await smartserve.start();
                /* const parcel = new plugins.smartparcel.Parcel(
                  plugins.path.join(process.cwd(), './html/index.html'),
                  plugins.path.join(process.cwd(), './dist_watch'),
                  'index.html'
                );
                await parcel.watchAndServe(); */
                break;
            case 'gitzone_website':
                this.watcherMap.add(new Watcher({
                    filePathToWatch: plugins.path.join(paths.cwd, './ts/'),
                    commandToExecute: 'npm run startTs',
                    timeout: null,
                }));
                this.watcherMap.add(new Watcher({
                    filePathToWatch: plugins.path.join(paths.cwd, './ts_web/'),
                    commandToExecute: 'npm run bundle',
                    timeout: null,
                }));
                // client directory
                /* const parcelWebsite = new plugins.smartparcel.Parcel(
                  plugins.path.join(process.cwd(), './html/index.html'),
                  plugins.path.join(process.cwd(), './dist_serve'),
                  'bundle.js'
                );
                await parcelWebsite.watchAndServe(); */
                break;
            case 'gitzone_service':
                this.watcherMap.add(new Watcher({
                    filePathToWatch: plugins.path.join(paths.cwd, './ts/'),
                    commandToExecute: 'npm run startTs',
                    timeout: null,
                }));
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
    async stop() {
        if (this.smartserve) {
            await this.smartserve.stop();
        }
        this.watcherMap.forEach(async (watcher) => {
            await watcher.stop();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHN3YXRjaC5jbGFzc2VzLnRzd2F0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90c3dhdGNoLmNsYXNzZXMudHN3YXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sS0FBSyxLQUFLLE1BQU0sb0JBQW9CLENBQUM7QUFDNUMsT0FBNEIsdUJBQXVCLENBQUM7QUFFcEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXZELE1BQU0sT0FBTyxPQUFPO0lBS2xCLFlBQVksWUFBb0M7UUFIekMsZUFBVSxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQVcsQ0FBQztRQUl2RCxJQUFJLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztJQUNoQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLLENBQUMsS0FBSztRQUNoQixRQUFRLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDdEIsS0FBSyxNQUFNO2dCQUNULElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUNqQixJQUFJLE9BQU8sQ0FBQztvQkFDVixlQUFlLEVBQUUsS0FBSyxDQUFDLEdBQUc7b0JBQzFCLGdCQUFnQixFQUFFLGVBQWU7b0JBQ2pDLE9BQU8sRUFBRSxJQUFJO2lCQUNkLENBQUMsQ0FDSCxDQUFDO2dCQUNGLE1BQU07WUFDUixLQUFLLGFBQWE7Z0JBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUNqQixJQUFJLE9BQU8sQ0FBQztvQkFDVixlQUFlLEVBQUUsS0FBSyxDQUFDLEdBQUc7b0JBQzFCLGdCQUFnQixFQUFFLGNBQWM7b0JBQ2hDLE9BQU8sRUFBRSxJQUFJO2lCQUNkLENBQUMsQ0FDSCxDQUFDO2dCQUNGLE1BQU07WUFDUixLQUFLLGlCQUFpQjtnQkFDcEIsZ0NBQWdDO2dCQUNoQyxPQUFPLENBQUMsR0FBRyxDQUNULCtFQUErRSxD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