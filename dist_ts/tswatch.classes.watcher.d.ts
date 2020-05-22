export declare type TCommandFunction = () => Promise<void>;
export interface IWatcherConstructorOptions {
    filePathToWatch: string;
    commandToExecute: string | TCommandFunction;
    timeout?: number;
}
/**
 * A watcher keeps track of one child execution
 */
export declare class Watcher {
    /**
     * used to execute shell commands
     */
    private smartshellInstance;
    private currentExecution;
    private smartchokWatcher;
    private options;
    constructor(optionsArg: IWatcherConstructorOptions);
    /**
     * start the file
     */
    start(): Promise<void>;
    /**
     * updates the current execution
     */
    private updateCurrentExecution;
    /**
     * this method sets up a clean exit strategy
     */
    private setupCleanup;
    /**
     * stops the watcher
     */
    stop(): Promise<void>;
}
