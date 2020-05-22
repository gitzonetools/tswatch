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
const tswatch_logging_1 = require("./tswatch.logging");
/**
 * A watcher keeps track of one child execution
 */
class Watcher {
    constructor(optionsArg) {
        /**
         * used to execute shell commands
         */
        this.smartshellInstance = new plugins.smartshell.Smartshell({
            executor: 'bash'
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
                tswatch_logging_1.logger.log('ok', `reexecuting ${this.options.commandToExecute}`);
                this.currentExecution.kill();
            }
            else {
                tswatch_logging_1.logger.log('ok', `executing ${this.options.commandToExecute} for the first time`);
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
        const cleanup = () => {
            if (this.currentExecution) {
                process.kill(-this.currentExecution.childProcess.pid);
            }
        };
        process.on('exit', () => {
            console.log('');
            console.log('now exiting!');
            cleanup();
            process.exit(0);
        });
        process.on('SIGINT', () => {
            console.log('');
            console.log('ok! got SIGINT We are exiting! Just cleaning up to exit neatly :)');
            cleanup();
            process.exit(0);
        });
        // handle timeout
        if (this.options.timeout) {
            plugins.smartdelay.delayFor(this.options.timeout).then(() => {
                console.log(`timed out afer ${this.options.timeout} milliseconds! exiting!`);
                cleanup();
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
            process.kill(-this.currentExecution.childProcess.pid);
        }
    }
}
exports.Watcher = Watcher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHN3YXRjaC5jbGFzc2VzLndhdGNoZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90c3dhdGNoLmNsYXNzZXMud2F0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyREFBNkM7QUFDN0MsdURBQTJDO0FBVTNDOztHQUVHO0FBQ0gsTUFBYSxPQUFPO0lBWWxCLFlBQVksVUFBc0M7UUFYbEQ7O1dBRUc7UUFDSyx1QkFBa0IsR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO1lBQzdELFFBQVEsRUFBRSxNQUFNO1NBQ2pCLENBQUMsQ0FBQztRQUdLLHFCQUFnQixHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBSWpFLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO0lBQzVCLENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUssQ0FBQyxLQUFLO1FBQ2hCLE1BQU0sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsY0FBYyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLHNEQUFzRDtRQUNqSCxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNwQyxNQUFNLGdCQUFnQixHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hGLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDOUIsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLElB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