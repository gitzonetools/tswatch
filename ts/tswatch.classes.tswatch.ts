import * as plugins from './tswatch.plugins';

/**
 * handles the management of watching for foes
 */
export class TsWatch {
  private smartshellInstance = new plugins.smartshell.Smartshell({
    executor: 'bash'
  });
  private currentExecution: plugins.smartshell.IExecResultStreaming;
  private watcher = plugins.fileWatcher();
  private filePathToWatch: string;
  private commandToExecute: string;

  constructor(optionsArg: {
    filePathToWatch: string,
    commandToExecute: string
  }) {
    this.filePathToWatch = optionsArg.filePathToWatch;
    this.commandToExecute = optionsArg.commandToExecute;
  }

  /**
   * start the file
   */
  public async start() {
    this.setupCleanup();
    console.log(`Looking at ${this.filePathToWatch} for changes`);
    this.watcher.add(this.filePathToWatch); // __dirname refers to the directory of this very file
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
    this.currentExecution = await this.smartshellInstance.execStreaming(this.commandToExecute);
    this.currentExecution = null;
  }

  /**
   * this method sets up a clean exit strategy
   */
  private setupCleanup() {
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
  }
}
