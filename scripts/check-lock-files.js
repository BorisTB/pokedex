const fs = require('fs');

function checkLockFiles() {
  const errors = [];
  if (fs.existsSync('pnpm-lock.yaml')) {
    errors.push(
      'Invalid occurence of "pnpm-lock.yaml" file. Please remove it and use only "package-lock.json"'
    );
  }
  if (fs.existsSync('bun.lockb')) {
    errors.push(
      'Invalid occurence of "bun.lockb" file. Please remove it and use only "package-lock.json"'
    );
  }
  if (fs.existsSync('bun.lock')) {
    errors.push(
      'Invalid occurence of "bun.lockb" file. Please remove it and use only "package-lock.json"'
    );
  }
  if (fs.existsSync('yarn.lock')) {
    errors.push(
      'Invalid occurence of "yarn.lock" file. Please remove it and use only "package-lock.json"'
    );
  }
  try {
    const content = fs.readFileSync('package-lock.json', 'utf-8');
    if (content.match(/localhost:487/)) {
      errors.push(
        'The "package-lock.json" has reference to local repository ("localhost:4873"). Please use ensure you disable local registry before running "npm install"'
      );
    }
    if (content.match(/resolution: \{tarball/)) {
      errors.push(
        'The "package-lock.json" has reference to tarball package. Please use npm registry only'
      );
    }
  } catch {
    errors.push('The "package-lock.json" does not exist or cannot be read');
  }
  return errors;
}

console.log('🔒🔒🔒 Validating lock files 🔒🔒🔒\n');
const invalid = checkLockFiles();
if (invalid.length > 0) {
  invalid.forEach((e) => console.log(e));
  process.exit(1);
} else {
  console.log('Lock file is valid 👍');
  process.exit(0);
}
