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
exports.logger = new plugins.smartlog.Smartlog({
    logContext: {
        company: 'Some Company',
        companyunit: 'Some CompanyUnit',
        containerName: 'Some Containername',
        environment: 'local',
        runtime: 'node',
        zone: 'gitzone'
    },
    minimumLogLevel: 'silly'
});
exports.logger.addLogDestination(new plugins.smartlogDestinationLocal.DestinationLocal());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHN3YXRjaC5sb2dnaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvdHN3YXRjaC5sb2dnaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJEQUE2QztBQUVoQyxRQUFBLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBQ2xELFVBQVUsRUFBRTtRQUNWLE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLFdBQVcsRUFBRSxrQkFBa0I7UUFDL0IsYUFBYSxFQUFFLG9CQUFvQjtRQUNuQyxXQUFXLEVBQUUsT0FBTztRQUNwQixPQUFPLEVBQUUsTUFBTTtRQUNmLElBQUksRUFBRSxTQUFTO0tBQ2hCO0lBQ0QsZUFBZSxFQUFFLE9BQU87Q0FDekIsQ0FBQyxDQUFDO0FBRUgsY0FBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksT0FBTyxDQUFDLHdCQUF3QixDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyJ9