import * as plugins from './tswatch.plugins.js';
export const logger = new plugins.smartlog.Smartlog({
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
logger.addLogDestination(new plugins.smartlogDestinationLocal.DestinationLocal());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHN3YXRjaC5sb2dnaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvdHN3YXRjaC5sb2dnaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFFaEQsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDbEQsVUFBVSxFQUFFO1FBQ1YsT0FBTyxFQUFFLGNBQWM7UUFDdkIsV0FBVyxFQUFFLGtCQUFrQjtRQUMvQixhQUFhLEVBQUUsb0JBQW9CO1FBQ25DLFdBQVcsRUFBRSxPQUFPO1FBQ3BCLE9BQU8sRUFBRSxNQUFNO1FBQ2YsSUFBSSxFQUFFLFNBQVM7S0FDaEI7SUFDRCxlQUFlLEVBQUUsT0FBTztDQUN6QixDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxPQUFPLENBQUMsd0JBQXdCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDIn0=