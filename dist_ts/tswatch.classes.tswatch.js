"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = __importStar(require("./tswatch.plugins"));
const paths = __importStar(require("./tswatch.paths"));
const tswatch_classes_watcher_1 = require("./tswatch.classes.watcher");
const tswatch_classes_parcel_1 = require("./tswatch.classes.parcel");
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
                    timeout: null
                }));
                break;
            case 'gitzone_npm':
                this.watcherMap.add(new tswatch_classes_watcher_1.Watcher({
                    filePathToWatch: paths.cwd,
                    commandToExecute: 'npm run test',
                    timeout: null
                }));
                break;
            case 'gitzone_element':
                // lets create a standard server
                console.log('bundling TypeScript files to "dist_watch" Note: This is for development only!');
                const parcel = new tswatch_classes_parcel_1.Parcel();
                await parcel.start();
                break;
            case 'gitzone_website':
                this.watcherMap.add(new tswatch_classes_watcher_1.Watcher({
                    filePathToWatch: plugins.path.join(paths.cwd, './ts/'),
                    commandToExecute: 'npm run startTs',
                    timeout: null
                }));
                // client directory
                this.watcherMap.add(new tswatch_classes_watcher_1.Watcher({
                    filePathToWatch: plugins.path.join(paths.cwd, './ts_web/'),
                    commandToExecute: 'npm run build',
                    timeout: null
                }));
                break;
            case 'gitzone_service':
                this.watcherMap.add(new tswatch_classes_watcher_1.Watcher({
                    filePathToWatch: plugins.path.join(paths.cwd, './ts/'),
                    commandToExecute: 'npm run startTs',
                    timeout: null
                }));
                break;
            case 'echoSomething':
                const tsWatchInstanceEchoSomething = new tswatch_classes_watcher_1.Watcher({
                    filePathToWatch: plugins.path.join(paths.cwd, './ts'),
                    commandToExecute: 'npm -v',
                    timeout: null
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHN3YXRjaC5jbGFzc2VzLnRzd2F0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90c3dhdGNoLmNsYXNzZXMudHN3YXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyREFBNkM7QUFDN0MsdURBQXlDO0FBR3pDLHVFQUFvRDtBQUNwRCxxRUFBa0Q7QUFFbEQsTUFBYSxPQUFPO0lBS2xCLFlBQVksWUFBb0M7UUFIekMsZUFBVSxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQVcsQ0FBQztRQUl2RCxJQUFJLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztJQUNoQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLLENBQUMsS0FBSztRQUNoQixRQUFRLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDdEIsS0FBSyxNQUFNO2dCQUNULElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUNqQixJQUFJLGlDQUFPLENBQUM7b0JBQ1YsZUFBZSxFQUFFLEtBQUssQ0FBQyxHQUFHO29CQUMxQixnQkFBZ0IsRUFBRSxlQUFlO29CQUNqQyxPQUFPLEVBQUUsSUFBSTtpQkFDZCxDQUFDLENBQ0gsQ0FBQztnQkFDRixNQUFNO1lBQ1IsS0FBSyxhQUFhO2dCQUNoQixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FDakIsSUFBSSxpQ0FBTyxDQUFDO29CQUNWLGVBQWUsRUFBRSxLQUFLLENBQUMsR0FBRztvQkFDMUIsZ0JBQWdCLEVBQUUsY0FBYztvQkFDaEMsT0FBTyxFQUFFLElBQUk7aUJBQ2QsQ0FBQyxDQUNILENBQUM7Z0JBQ0YsTUFBTTtZQUNSLEtBQUssaUJBQWlCO2dCQUNwQixnQ0FBZ0M7Z0JBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQ1QsK0VBQStFLENBQ2hGLENBQUM7Z0JBQ0YsTUFBTSxNQUFNLEdBQUcsSUFBSSwrQkFBTSxFQUFFLENBQUM7Z0JBQzVCLE1BQU0sTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNyQixNQUFNO1lBQ1IsS0FBSyxpQkFBaUI7Z0JBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUNqQixJQUFJLGlDQUFPLENBQUM7b0JBQ1YsZUFBZSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO29CQUN0RCxnQkFBZ0IsRUFBRSxpQkFBaUI7b0JBQ25DLE9BQU8sRUFBRSxJQUFJO2lCQUNkLENBQUMsQ0FDSCxDQUFDO2dCQUVGLG1CQUFtQjtnQkFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQ2pCLElBQUksaUNBQU8sQ0FBQztvQkFDVixlQUFlLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUM7b0JBQzFELGdCQUFnQixFQUFFLGVBQWU7b0JBQ2pDLE9BQU8sRUFBRSxJQUFJO2lCQUNkLENBQUMsQ0FDSCxDQUFDO2dCQUNGLE1BQU07WUFDUixLQUFLLGlCQUFpQjtnQkFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQ2pCLElBQUksaUNBQU8sQ0FBQztvQkFDVixlQUFlLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7b0JBQ3RELGdCQUFnQixFQUFFLGlCQUFpQjtvQkFDbkMsT0FBTyxFQUFFLElBQUk7aUJBQ2QsQ0FBQyxDQUNILENBQUM7Z0JBQ0YsTUFBTTtZQUNSLEtBQUssZUFBZTtnQkFDbEIsTUFBTSw0QkFBNEIsR0FBRyxJQUFJLGlDQUFPLENBQUM7b0JBQy9DLGVBQWUsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQztvQkFDckQsZ0JBQWdCLEVBQUUsUUFBUTtvQkFDMUIsT0FBTyxFQUFFLElBQUk7aUJBQ2QsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7Z0JBQ2xELE1BQU07WUFDUjtnQkFDRSxNQUFNO1NBQ1Q7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEVBQUU7WUFDdEMsTUFBTSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQy9CO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0ksS0FBSyxDQUFDLElBQUk7UUFDZixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxFQUFFO1lBQ3RDLE1BQU0sT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBakdELDBCQWlHQyJ9