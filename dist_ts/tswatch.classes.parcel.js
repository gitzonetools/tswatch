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
const paths = __importStar(require("./tswatch.paths"));
class Parcel {
    async start() {
        const entryFiles = plugins.path.join(paths.cwd, './html/index.html');
        // Bundler options
        const options = {
            outDir: './dist_watch',
            outFile: 'index.html',
            publicUrl: '/',
            watch: true,
            cache: true,
            cacheDir: '.nogit/.parcelcache',
            contentHash: false,
            global: 'moduleName',
            minify: false,
            scopeHoist: false,
            target: 'browser',
            bundleNodeModules: true,
            https: null,
            logLevel: 3,
            hmr: true,
            hmrPort: 3003,
            sourceMaps: true,
            hmrHostname: '',
            detailedReport: false // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
        };
        const bundler = new plugins.parcel(entryFiles, options);
        // Run the bundler, this returns the main bundle
        // Use the events if you're using watch mode as this promise will only trigger once and not for every rebuild
        const bundle = await bundler.serve(3002);
    }
}
exports.Parcel = Parcel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHN3YXRjaC5jbGFzc2VzLnBhcmNlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3Rzd2F0Y2guY2xhc3Nlcy5wYXJjZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMkRBQTZDO0FBQzdDLHVEQUF5QztBQUV6QyxNQUFhLE1BQU07SUFDVixLQUFLLENBQUMsS0FBSztRQUNoQixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFFckUsa0JBQWtCO1FBQ2xCLE1BQU0sT0FBTyxHQUFpQztZQUM1QyxNQUFNLEVBQUUsY0FBYztZQUN0QixPQUFPLEVBQUUsWUFBWTtZQUNyQixTQUFTLEVBQUUsR0FBRztZQUNkLEtBQUssRUFBRSxJQUFJO1lBQ1gsS0FBSyxFQUFFLElBQUk7WUFDWCxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLE1BQU0sRUFBRSxZQUFZO1lBQ3BCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsVUFBVSxFQUFFLEtBQUs7WUFDakIsTUFBTSxFQUFFLFNBQVM7WUFDakIsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixLQUFLLEVBQUUsSUFBSTtZQUNYLFFBQVEsRUFBRSxDQUFDO1lBQ1gsR0FBRyxFQUFFLElBQUk7WUFDVCxPQUFPLEVBQUUsSUFBSTtZQUNiLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsY0FBYyxFQUFFLEtBQUssQ0FBQyx5SUFBeUk7U0FDaEssQ0FBQztRQUVGLE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFeEQsZ0RBQWdEO1FBQ2hELDZHQUE2RztRQUM3RyxNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUNGO0FBakNELHdCQWlDQyJ9