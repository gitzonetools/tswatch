// tslint:disable-next-line: no-implicit-dependencies
import { expect, tap } from '@pushrocks/tapbundle';
import * as tswatch from '../ts/index';

let testTsWatchInstance: tswatch.TsWatch;

tap.test('should create a valid TsWatch instance', async () => {
  testTsWatchInstance = new tswatch.TsWatch('echoSomething');
});

tap.test('should start the tswatch instance', async () => {
  await testTsWatchInstance.start();
});

tap.test('should stop the instance', async (tools) => {
  tools.delayFor(2000);
  testTsWatchInstance.stop();
});

tap.start();
