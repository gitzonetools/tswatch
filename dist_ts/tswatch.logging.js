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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const plugins = __importStar(require("./tswatch.plugins"));
exports.logger = new plugins.smartlog.Smartlog({
    logContext: {
        company: 'Some Company',
        companyunit: 'Some CompanyUnit',
        containerName: 'Some Containername',
        environment: 'local',
        runtime: 'node',
        zone: 'gitzone',
    },
    minimumLogLevel: 'silly',
});
exports.logger.addLogDestination(new plugins.smartlogDestinationLocal.DestinationLocal());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHN3YXRjaC5sb2dnaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvdHN3YXRjaC5sb2dnaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBNkM7QUFFaEMsUUFBQSxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUNsRCxVQUFVLEVBQUU7UUFDVixPQUFPLEVBQUUsY0FBYztRQUN2QixXQUFXLEVBQUUsa0JBQWtCO1FBQy9CLGFBQWEsRUFBRSxvQkFBb0I7UUFDbkMsV0FBVyxFQUFFLE9BQU87UUFDcEIsT0FBTyxFQUFFLE1BQU07UUFDZixJQUFJLEVBQUUsU0FBUztLQUNoQjtJQUNELGVBQWUsRUFBRSxPQUFPO0NBQ3pCLENBQUMsQ0FBQztBQUVILGNBQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMifQ==