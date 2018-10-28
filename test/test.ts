import { expect, tap } from '@pushrocks/tapbundle';
import * as tswatch from '../ts/index';

let testTsWatchInstance: tswatch.TsWatch;

tap.test('should create a valid TsWatch instance', async () => {
  testTsWatchInstance = new tswatch.TsWatch({
    filePathToWatch: process.cwd(),
    commandToExecute: 'npm -v',
    timeout: 1000
  });
});

tap.test('should start the tswatch instance', async () => {
  testTsWatchInstance.start();
  console.log('test executed');
});

tap.test('should run abitrary commands', async () => {

});

tap.start();
