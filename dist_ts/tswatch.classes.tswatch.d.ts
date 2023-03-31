import * as plugins from './tswatch.plugins.js';
import * as interfaces from './interfaces/index.js';
import { Watcher } from './tswatch.classes.watcher.js';
export declare class TsWatch {
    watchmode: interfaces.TWatchModes;
    watcherMap: plugins.lik.ObjectMap<Watcher>;
    typedserver: plugins.typedserver.TypedServer;
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
