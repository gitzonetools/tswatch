"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = __importStar(require("./tswatch.plugins"));
const tswatch_logging_1 = require("./tswatch.logging");
const tswatch_classes_tswatch_1 = require("./tswatch.classes.tswatch");
const tswatchCli = new plugins.smartcli.Smartcli();
// standard behaviour will assume gitzone setup
tswatchCli.addCommand('element').subscribe(async (argvArg) => {
    tswatch_logging_1.logger.log('info', `running watch task for a gitzone element project`);
    const tsWatch = new tswatch_classes_tswatch_1.TsWatch('gitzone_element');
    await tsWatch.start();
});
tswatchCli.addCommand('npm').subscribe(async (argvArg) => {
    tswatch_logging_1.logger.log('info', `running watch task for a gitzone element project`);
    const tsWatch = new tswatch_classes_tswatch_1.TsWatch('gitzone_npm');
    await tsWatch.start();
});
tswatchCli.addCommand('service').subscribe(async (argvArg) => {
    tswatch_logging_1.logger.log('info', `running test task`);
    const tsWatch = new tswatch_classes_tswatch_1.TsWatch('gitzone_service');
    await tsWatch.start();
});
tswatchCli.addCommand('test').subscribe(async (argvArg) => {
    tswatch_logging_1.logger.log('info', `running test task`);
    const tsWatch = new tswatch_classes_tswatch_1.TsWatch('test');
    await tsWatch.start();
});
tswatchCli.addCommand('website').subscribe(async (argvArg) => {
    tswatch_logging_1.logger.log('info', `running watch task for a gitzone website project`);
    const tsWatch = new tswatch_classes_tswatch_1.TsWatch('gitzone_website');
    await tsWatch.start();
});
tswatchCli.startParse();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHN3YXRjaC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90c3dhdGNoLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyREFBNkM7QUFFN0MsdURBQTJDO0FBRTNDLHVFQUFvRDtBQUVwRCxNQUFNLFVBQVUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7QUFFbkQsK0NBQStDO0FBRS9DLFVBQVUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsRUFBRTtJQUN6RCx3QkFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsa0RBQWtELENBQUMsQ0FBQztJQUN2RSxNQUFNLE9BQU8sR0FBRyxJQUFJLGlDQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUMvQyxNQUFNLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN4QixDQUFDLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsRUFBRTtJQUNyRCx3QkFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsa0RBQWtELENBQUMsQ0FBQztJQUN2RSxNQUFNLE9BQU8sR0FBRyxJQUFJLGlDQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDM0MsTUFBTSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDeEIsQ0FBQyxDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEVBQUU7SUFDekQsd0JBQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFDeEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxpQ0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDL0MsTUFBTSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDeEIsQ0FBQyxDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEVBQUU7SUFDdEQsd0JBQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFDeEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxpQ0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ3hCLENBQUMsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxFQUFFO0lBQ3pELHdCQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxrREFBa0QsQ0FBQyxDQUFDO0lBQ3ZFLE1BQU0sT0FBTyxHQUFHLElBQUksaUNBQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ3hCLENBQUMsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDIn0=