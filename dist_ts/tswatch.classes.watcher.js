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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Watcher = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHN3YXRjaC5jbGFzc2VzLndhdGNoZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90c3dhdGNoLmNsYXNzZXMud2F0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQTZDO0FBQzdDLHVEQUEyQztBQVUzQzs7R0FFRztBQUNILE1BQWEsT0FBTztJQVlsQixZQUFZLFVBQXNDO1FBWGxEOztXQUVHO1FBQ0ssdUJBQWtCLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztZQUM3RCxRQUFRLEVBQUUsTUFBTTtTQUNqQixDQUFDLENBQUM7UUFHSyxxQkFBZ0IsR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUlqRSxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztJQUM1QixDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLLENBQUMsS0FBSztRQUNoQixNQUFNLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLGNBQWMsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxzREFBc0Q7UUFDakgsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDcEMsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRixnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQzlCLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFD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