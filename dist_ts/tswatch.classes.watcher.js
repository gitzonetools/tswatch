import * as plugins from './tswatch.plugins.js';
import { logger } from './tswatch.logging.js';
/**
 * A watcher keeps track of one child execution
 */
export class Watcher {
    constructor(optionsArg) {
        /**
         * used to execute shell commands
         */
        this.smartshellInstance = new plugins.smartshell.Smartshell({
            executor: 'bash',
        });
        this.smartchokWatcher = new plugins.smartchok.Smartchok([], {});
        this.options = optionsArg;
    }
    /**
     * start the file
     */
    async start() {
        await this.setupCleanup();
        console.log(`Looking at ${this.options.filePathToWatch} for changes`);
        this.smartchokWatcher.add([this.options.filePathToWatch]); // __dirname refers to the directory of this very file
        await this.smartchokWatcher.start();
        const changeObservable = await this.smartchokWatcher.getObservableFor('change');
        changeObservable.subscribe(() => {
            this.updateCurrentExecution();
        });
        await this.updateCurrentExecution();
    }
    /**
     * updates the current execution
     */
    async updateCurrentExecution() {
        if (typeof this.options.commandToExecute === 'string') {
            if (this.currentExecution) {
                logger.log('ok', `reexecuting ${this.options.commandToExecute}`);
                this.currentExecution.kill();
            }
            else {
                logger.log('ok', `executing ${this.options.commandToExecute} for the first time`);
            }
            this.currentExecution = await this.smartshellInstance.execStreaming(this.options.commandToExecute);
        }
        else {
            console.log('cannot run execution task');
        }
    }
    /**
     * this method sets up a clean exit strategy
     */
    async setupCleanup() {
        process.on('exit', () => {
            console.log('');
            console.log('now exiting!');
            this.stop();
            process.exit(0);
        });
        process.on('SIGINT', () => {
            console.log('');
            console.log('ok! got SIGINT We are exiting! Just cleaning up to exit neatly :)');
            this.stop();
            process.exit(0);
        });
        // handle timeout
        if (this.options.timeout) {
            plugins.smartdelay.delayFor(this.options.timeout).then(() => {
                console.log(`timed out afer ${this.options.timeout} milliseconds! exiting!`);
                this.stop();
                process.exit(0);
            });
        }
    }
    /**
     * stops the watcher
     */
    async stop() {
        await this.smartchokWatcher.stop();
        if (this.currentExecution && !this.currentExecution.childProcess.killed) {
            this.currentExecution.kill();
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHN3YXRjaC5jbGFzc2VzLndhdGNoZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90c3dhdGNoLmNsYXNzZXMud2F0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQVU5Qzs7R0FFRztBQUNILE1BQU0sT0FBTyxPQUFPO0lBWWxCLFlBQVksVUFBc0M7UUFYbEQ7O1dBRUc7UUFDSyx1QkFBa0IsR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO1lBQzdELFFBQVEsRUFBRSxNQUFNO1NBQ2pCLENBQUMsQ0FBQztRQUdLLHFCQUFnQixHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBSWpFLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO0lBQzVCLENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUssQ0FBQyxLQUFLO1FBQ2hCLE1BQU0sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsY0FBYyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLHNEQUFzRDtRQUNqSCxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNwQyxNQUFNLGdCQUFnQixHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hGLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDOUIsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7T0FFRztJQUNLLEtBQUssQ0FBQyxzQkFBc0I7UUFDbEMsSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEtBQUssUUFBUSxFQUFFO1lBQ3JELElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUN6QixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxlQUFlLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDOUI7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsYUFBYSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixxQkFBcUIsQ0FBQyxDQUFDO2FBQ25GO1lBQ0QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FDakUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FDOUIsQ0FBQztTQUNIO2FBQU07WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7U0FDMUM7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxLQUFLLENBQUMsWUFBWTtRQUN4QixPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7WUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNaLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLG1FQUFtRSxDQUFDLENBQUM7WUFDakYsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztRQUVILGlCQUFpQjtRQUNqQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ3hCLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLHlCQUF5QixDQUFDLENBQUM7Z0JBQzdFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDWixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLLENBQUMsSUFBSTtRQUNmLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25DLElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7WUFDdkUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztDQUNGIn0=