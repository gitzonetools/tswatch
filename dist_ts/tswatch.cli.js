"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCli = void 0;
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
exports.runCli = async () => {
    tswatchCli.startParse();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHN3YXRjaC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90c3dhdGNoLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQTZDO0FBRTdDLHVEQUEyQztBQUUzQyx1RUFBb0Q7QUFFcEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBRW5ELCtDQUErQztBQUUvQyxVQUFVLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUU7SUFDM0Qsd0JBQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGtEQUFrRCxDQUFDLENBQUM7SUFDdkUsTUFBTSxPQUFPLEdBQUcsSUFBSSxpQ0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDL0MsTUFBTSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDeEIsQ0FBQyxDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUU7SUFDdkQsd0JBQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGtEQUFrRCxDQUFDLENBQUM7SUFDdkUsTUFBTSxPQUFPLEdBQUcsSUFBSSxpQ0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ3hCLENBQUMsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO0lBQzNELHdCQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3hDLE1BQU0sT0FBTyxHQUFHLElBQUksaUNBQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ3hCLENBQUMsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO0lBQ3hELHdCQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3hDLE1BQU0sT0FBTyxHQUFHLElBQUksaUNBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxNQUFNLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN4QixDQUFDLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRTtJQUMzRCx3QkFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsa0RBQWtELENBQUMsQ0FBQztJQUN2RSxNQUFNLE9BQU8sR0FBRyxJQUFJLGlDQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUMvQyxNQUFNLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN4QixDQUFDLENBQUMsQ0FBQztBQUVVLFFBQUEsTUFBTSxHQUFHLEtBQUssSUFBSSxFQUFFO0lBQy9CLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUMxQixDQUFDLENBQUMifQ==