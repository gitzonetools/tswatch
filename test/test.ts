import { expect, tap } from '@pushrocks/tapbundle';
import * as tswatch from '../ts/index';

let testTsWatchInstance: tswatch.TsWatch;

tap.test('should create a valid TsWatch instance', async () => {
  testTsWatchInstance = new tswatch.TsWatch({
    filePathToWatch: process.cwd(),
    commandToExecute: 'npm -v'
  });
});

tap.test('should start the tswatch instance', async () => {
  console.log('test executed');
});

tap.test('should run abitrary commands', async () => {
  
});

tap.start();
