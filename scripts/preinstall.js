/*
This pre-install script will check that the necessary dependencies are installed
Checks for:
    * Node 20+
    * npm 10+
 */

if (process.env.CI) {
  process.exit(0);
}

const childProcess = require('child_process');
const semverLessThan = require('semver/functions/lt');

// Check node version
if (semverLessThan(process.version, '20.19.0')) {
  console.warn(
    `Please make sure that your installed Node version (${process.version}) is greater than v20.19.0`
  );
}

// Check for pnpm version
try {
  let npmVersion = childProcess.execSync('npm --version', {
    encoding: 'utf8'
  });
  const version = npmVersion.trim();
  if (semverLessThan(version, '10.0.0')) {
    console.error(
      `Found pnpm ${version}. Please make sure that your installed npm version is 10.0.0 or greater.`
    );
    process.exit(1);
  }
} catch {
  console.error('Could not find npm on this system');
  process.exit(1);
}
