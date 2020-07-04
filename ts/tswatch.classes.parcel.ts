import * as plugins from './tswatch.plugins';
import * as paths from './tswatch.paths';

export class Parcel {
  private defaultOptions: plugins.parcel.ParcelOptions = {
    outDir: plugins.path.join(process.cwd(), './dist_watch'), // The out directory to put the build files in, defaults to dist
    outFile: 'index.html', // The name of the outputFile
    publicUrl: '/', // The url to serve on, defaults to '/'
    watch: true, // Whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
    cache: true, // Enabled or disables caching, defaults to true
    cacheDir: '.nogit/.parcelcache', // The directory cache gets put in, defaults to .cache
    contentHash: false, // Disable content hash from being included on the filename
    global: 'moduleName', // Expose modules as UMD under this name, disabled by default
    minify: false, // Minify files, enabled if process.env.NODE_ENV === 'production'
    scopeHoist: false, // Turn on experimental scope hoisting/tree shaking flag, for smaller production bundles
    target: 'browser', // Browser/node/electron, defaults to browser
    bundleNodeModules: true, // By default, package.json dependencies are not included when using 'node' or 'electron' with 'target' option above. Set to true to adds them to the bundle, false by default
    https: null,
    logLevel: 3, // 5 = save everything to a file, 4 = like 3, but with timestamps and additionally log http requests to dev server, 3 = log info, warnings & errors, 2 = log warnings & errors, 1 = log errors, 0 = log nothing
    hmr: true, // Enable or disable HMR while watching
    hmrPort: 3003, // The port the HMR socket runs on, defaults to a random free port (0 in node.js resolves to a random free port)
    sourceMaps: true, // Enable or disable sourcemaps, defaults to enabled (minified builds currently always create sourcemaps)
    hmrHostname: '', // A hostname for hot module reload, default to ''
    detailedReport: false // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
  };
  public options: plugins.parcel.ParcelOptions;
  public entryFiles: string | string [] = plugins.path.join(paths.cwd, './html/index.html');

  public async start() {
    const bundler = new plugins.parcel(this.entryFiles, this.options);

    // Run the bundler, this returns the main bundle
    // Use the events if you're using watch mode as this promise will only trigger once and not for every rebuild
    const bundle = await bundler.serve(3002);
  }

  constructor(fromArg: string | string[], outputDirArg: string, outputFileArg: string) {
    this.entryFiles = fromArg;
    this.options = {
      ...this.defaultOptions,
      outDir: outputDirArg,
      outFile: outputFileArg
    };
  }
}
