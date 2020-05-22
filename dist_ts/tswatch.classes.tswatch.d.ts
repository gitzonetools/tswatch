import * as plugins from './tswatch.plugins';
import * as interfaces from './interfaces';
import { Watcher } from './tswatch.classes.watcher';
export declare class TsWatch {
    watchmode: interfaces.TWatchModes;
    watcherMap: plugins.lik.ObjectMap<Watcher>;
    smartserve: plugins.smartserve.SmartServe;
    constructor(watchmodeArg: interfaces.TWatchModes);
    /**
     * starts the TsWatch instance
     */
    start(): Promise<void>;
    /**
     * stops the execution of any active Watchers
     */
    stop(): Promise<void>;
}
