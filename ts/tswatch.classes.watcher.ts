import * as plugins from './tswatch.plugins';
import { logger } from './tswatch.logging';

export interface IWatcherConstructorOptions {
  filePathToWatch: string;
  commandToExecute: string;
  timeout?: number;
}

/**
 * A watcher keeps track of one child execution
 */
export class Watcher {
  private smartshellInstance = new plugins.smartshell.Smartshell({
    executor: 'bash'
  });
  private currentExecution: plugins.smartshell.IExecResultStreaming;
  private smartchokWatcher = new plugins.smartchok.Smartchok([], {});
  private options: IWatcherConstructorOptions;

  constructor(optionsArg: IWatcherConstructorOptions) {
    this.options = optionsArg;
  }

  /**
   * start the file
   */
  public async start() {
    await this.setupCleanup();
    console.log(`Looking at ${this.options.filePathToWatch} for changes`);
    this.smartchokWatcher.add([this.options.filePathToWatch]); // __dirname refers to the directory of this very file
    await this.smartchokWatcher.start();
    const changeObservable = await this.smartchokWatcher.getObservableFor('change');
    changeObservable.subscribe(() => {
      this.updateCurrentExecution();
    });
    this.updateCurrentExecution();
  }

  /**
   * updates the current execution
   */
  private async updateCurrentExecution() {
    if (this.currentExecution) {
      logger.log('ok', `reexecuting ${this.options.commandToExecute}`);
      process.kill(-this.currentExecution.childProcess.pid);
    } else {
      logger.log('ok', `executing ${this.options.commandToExecute} for the first time`);
    }
    this.currentExecution = await this.smartshellInstance.execStreaming(
      this.options.commandToExecute
    );
    this.currentExecution = null;
  }

  /**
   * this method sets up a clean exit strategy
   */
  private async setupCleanup() {
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
  public async stop() {
    await this.smartchokWatcher.stop();
    if (this.currentExecution && !this.currentExecution.childProcess.killed) {
      process.kill(-this.currentExecution.childProcess.pid);
    }
  }
}
