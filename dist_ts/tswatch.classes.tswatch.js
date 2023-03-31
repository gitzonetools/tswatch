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
                this.typedserver = new plugins.typedserver.TypedServer({
                    cors: true,
                    injectReload: true,
                    serveDir: plugins.path.join(paths.cwd, './dist_watch/'),
                    port: 3002,
                });
                const bundleAndReloadElement = async () => {
                    await tsbundle.build(paths.cwd, './html/index.ts', './dist_watch/bundle.js', {
                        bundler: 'esbuild',
                    });
                    await this.typedserver.reload();
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
                        await htmlHandler.processHtml({
                            from: plugins.path.join(paths.cwd, './html/index.html'),
                            to: plugins.path.join(paths.cwd, './dist_watch/index.html'),
                            minify: false,
                        });
                        await bundleAndReloadElement();
                    },
                    timeout: null,
                }));
                await this.typedserver.start();
                break;
            case 'gitzone_website':
                this.watcherMap.add(new Watcher({
                    filePathToWatch: plugins.path.join(paths.cwd, './ts/'),
                    commandToExecute: 'npm run startTs',
                    timeout: null,
                }));
                const bundleAndReloadWebsite = async () => {
                    await tsbundle.build(paths.cwd, './ts_web/index.ts', './dist_serve/bundle.js', {
                        bundler: 'esbuild',
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
                        await htmlHandler.processHtml({
                            from: plugins.path.join(paths.cwd, './html/index.html'),
                            to: plugins.path.join(paths.cwd, './dist_serve/index.html'),
                            minify: false,
                        });
                        await bundleAndReloadWebsite();
                    },
                    timeout: null,
                }));
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
        if (this.typedserver) {
            await this.typedserver.start();
        }
    }
    /**
     * stops the execution of any active Watchers
     */
    async stop() {
        if (this.typedserver) {
            await this.typedserver.stop();
        }
        this.watcherMap.forEach(async (watcher) => {
            await watcher.stop();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHN3YXRjaC5jbGFzc2VzLnRzd2F0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90c3dhdGNoLmNsYXNzZXMudHN3YXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sS0FBSyxLQUFLLE1BQU0sb0JBQW9CLENBQUM7QUFDNUMsT0FBNEIsdUJBQXVCLENBQUM7QUFFcEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXZELE1BQU0sT0FBTyxPQUFPO0lBS2xCLFlBQVksWUFBb0M7UUFIekMsZUFBVSxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQVcsQ0FBQztRQUl2RCxJQUFJLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztJQUNoQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLLENBQUMsS0FBSztRQUNoQixNQUFNLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDakQsTUFBTSxXQUFXLEdBQUcsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZELFFBQVEsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUN0QixLQUFLLE1BQU07Z0JBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQ2pCLElBQUksT0FBTyxDQUFDO29CQUNWLGVBQWUsRUFBRSxLQUFLLENBQUMsR0FBRztvQkFDMUIsZ0JBQWdCLEVBQUUsZUFBZTtvQkFDakMsT0FBTyxFQUFFLElBQUk7aUJBQ2QsQ0FBQyxDQUNILENBQUM7Z0JBQ0YsTUFBTTtZQUNSLEtBQUssYUFBYTtnQkFDaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQ2pCLElBQUksT0FBTyxDQUFDO29CQUNWLGVBQWUsRUFBRSxLQUFLLENBQUMsR0FBRztvQkFDMUIsZ0JBQWdCLEVBQUUsY0FB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