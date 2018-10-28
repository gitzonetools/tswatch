import * as plugins from './tswatch.plugins';

export interface ITsWatchConstructorOptions {
  filePathToWatch: string;
  commandToExecute: string;
  timeout?: number;
}

/**
 * handles the management of watching for foes
 */
export class TsWatch {
  private smartshellInstance = new plugins.smartshell.Smartshell({
    executor: 'bash'
  });
  private currentExecution: plugins.smartshell.IExecResultStreaming;
  private watcher = plugins.fileWatcher();
  private options: ITsWatchConstructorOptions;

  constructor(optionsArg: ITsWatchConstructorOptions) {
    this.options = optionsArg;
  }

  /**
   * start the file
   */
  public async start() {
    this.setupCleanup();
    console.log(`Looking at ${this.options.filePathToWatch} for changes`);
    this.watcher.add(this.options.filePathToWatch); // __dirname refers to the directory of this very file
    this.watcher.on('change', async (file, stat) => {
      console.log('Noticed change!');
      if (!stat) {
        console.log('deleted');
      }
      this.updateCurrentExecution();
    });
    this.updateCurrentExecution();
  }

  private async updateCurrentExecution() {
    if (this.currentExecution) {
      process.kill(-this.currentExecution.childProcess.pid);
    }
    this.currentExecution = await this.smartshellInstance.execStreaming(this.options.commandToExecute);
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
}
