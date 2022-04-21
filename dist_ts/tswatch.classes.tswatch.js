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
        const tsbundle = new plugins.tsbundle.TsBundle();
        const htmlHandler = new plugins.tsbundle.HtmlHandler();
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
                const bundleAndReloadElement = async () => {
                    await tsbundle.build(paths.cwd, './html/index.ts', './dist_watch/bundle.js', {
                        bundler: 'esbuild'
                    });
                    await smartserve.reload();
                };
                this.watcherMap.add(new Watcher({
                    filePathToWatch: plugins.path.join(paths.cwd, './ts_web/'),
                    functionToCall: async () => {
                        await bundleAndReloadElement();
                    },
                    timeout: null,
                }));
                this.watcherMap.add(new Watcher({
                    filePathToWatch: plugins.path.join(paths.cwd, './html/'),
                    functionToCall: async () => {
                        await htmlHandler.copyHtml(plugins.path.join(paths.cwd, './html/index.html'), plugins.path.join(paths.cwd, './dist_watch/index.html'));
                        await bundleAndReloadElement();
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
                const bundleAndReloadWebsite = async () => {
                    await tsbundle.build(paths.cwd, './ts_web/index.ts', './dist_serve/bundle.js', {
                        bundler: 'esbuild'
                    });
                };
                this.watcherMap.add(new Watcher({
                    filePathToWatch: plugins.path.join(paths.cwd, './ts_web/'),
                    functionToCall: async () => {
                        await bundleAndReloadWebsite();
                    },
                    timeout: null,
                }));
                this.watcherMap.add(new Watcher({
                    filePathToWatch: plugins.path.join(paths.cwd, './html/'),
                    functionToCall: async () => {
                        await htmlHandler.copyHtml(plugins.path.join(paths.cwd, './html/index.html'), plugins.path.join(paths.cwd, './dist_serve/index.html'));
                        await bundleAndReloadWebsite();
                    },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHN3YXRjaC5jbGFzc2VzLnRzd2F0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90c3dhdGNoLmNsYXNzZXMudHN3YXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sS0FBSyxLQUFLLE1BQU0sb0JBQW9CLENBQUM7QUFDNUMsT0FBNEIsdUJBQXVCLENBQUM7QUFFcEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXZELE1BQU0sT0FBTyxPQUFPO0lBS2xCLFlBQVksWUFBb0M7UUFIekMsZUFBVSxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQVcsQ0FBQztRQUl2RCxJQUFJLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztJQUNoQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLLENBQUMsS0FBSztRQUNoQixNQUFNLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDakQsTUFBTSxXQUFXLEdBQUcsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZELFFBQVEsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUN0QixLQUFLLE1BQU07Z0JBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQ2pCLElBQUksT0FBTyxDQUFDO29CQUNWLGVBQWUsRUFBRSxLQUFLLENBQUMsR0FBRztvQkFDMUIsZ0JBQWdCLEVBQUUsZUFBZTtvQkFDakMsT0FBTyxFQUFFLElBQUk7aUJBQ2QsQ0FBQyxDQUNILENBQUM7Z0JBQ0YsTUFBTTtZQUNSLEtBQUssYUFBYTtnQkFDaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQ2pCLElBQUksT0FBTyxDQUFDO29CQUNWLGVBQWUsRUFBRSxLQUFLLENBQUMsR0FBRztvQkFDMUIsZ0JBQWdCLEVBQUUsY0FB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