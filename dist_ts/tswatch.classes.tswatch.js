"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsWatch = void 0;
const plugins = __importStar(require("./tswatch.plugins"));
const paths = __importStar(require("./tswatch.paths"));
const tswatch_classes_watcher_1 = require("./tswatch.classes.watcher");
class TsWatch {
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
                this.watcherMap.add(new tswatch_classes_watcher_1.Watcher({
                    filePathToWatch: paths.cwd,
                    commandToExecute: 'npm run test2',
                    timeout: null,
                }));
                break;
            case 'gitzone_npm':
                this.watcherMap.add(new tswatch_classes_watcher_1.Watcher({
                    filePathToWatch: paths.cwd,
                    commandToExecute: 'npm run test',
                    timeout: null,
                }));
                break;
            case 'gitzone_element':
                // lets create a standard server
                console.log('bundling TypeScript files to "dist_watch" Note: This is for development only!');
                const parcel = new plugins.smartparcel.Parcel(plugins.path.join(process.cwd(), './html/index.html'), plugins.path.join(process.cwd(), './dist_watch'), 'index.html');
                await parcel.start();
                break;
            case 'gitzone_website':
                this.watcherMap.add(new tswatch_classes_watcher_1.Watcher({
                    filePathToWatch: plugins.path.join(paths.cwd, './ts/'),
                    commandToExecute: 'npm run startTs',
                    timeout: null,
                }));
                // client directory
                const parcelWebsite = new plugins.smartparcel.Parcel(plugins.path.join(process.cwd(), './ts_web/index.ts'), plugins.path.join(process.cwd(), './dist_serve'), 'bundle.js');
                await parcelWebsite.start();
                break;
            case 'gitzone_service':
                this.watcherMap.add(new tswatch_classes_watcher_1.Watcher({
                    filePathToWatch: plugins.path.join(paths.cwd, './ts/'),
                    commandToExecute: 'npm run startTs',
                    timeout: null,
                }));
                break;
            case 'echoSomething':
                const tsWatchInstanceEchoSomething = new tswatch_classes_watcher_1.Watcher({
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
exports.TsWatch = TsWatch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHN3YXRjaC5jbGFzc2VzLnRzd2F0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90c3dhdGNoLmNsYXNzZXMudHN3YXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQTZDO0FBQzdDLHVEQUF5QztBQUd6Qyx1RUFBb0Q7QUFFcEQsTUFBYSxPQUFPO0lBS2xCLFlBQVksWUFBb0M7UUFIekMsZUFBVSxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQVcsQ0FBQztRQUl2RCxJQUFJLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztJQUNoQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLLENBQUMsS0FBSztRQUNoQixRQUFRLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDdEIsS0FBSyxNQUFNO2dCQUNULElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUNqQixJQUFJLGlDQUFPLENBQUM7b0JBQ1YsZUFBZSxFQUFFLEtBQUssQ0FBQyxHQUFHO29CQUMxQixnQkFBZ0IsRUFBRSxlQUFlO29CQUNqQyxPQUFPLEVBQUUsSUFBSTtpQkFDZCxDQUFDLENBQ0gsQ0FBQztnQkFDRixNQUFNO1lBQ1IsS0FBSyxhQUFhO2dCQUNoQixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FDakIsSUFBSSxpQ0FBTyxDQUFDO29CQUNWLGVBQWUsRUFBRSxLQUFLLENBQUMsR0FBRztvQkFDMUIsZ0JBQWdCLEVBQUUsY0FBYztvQkFDaEMsT0FBTyxFQUFFLElBQUk7aUJBQ2QsQ0FBQyxDQUNILENBQUM7Z0JBQ0YsTUFBTTtZQUNSLEtBQUssaUJBQWlCO2dCQUNwQixnQ0FBZ0M7Z0JBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQ1QsK0VBQStFLENBQ2hGLENBQUM7Z0JBQ0YsTUFBTSxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FDM0MsT0FBTyxDQUFDLElBQUksQ0FB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