const fs = require('fs');
const path = require('path');
const Module = require('module');

const vendorDir = path.join(__dirname, 'vendor');
process.env.NODE_PATH = process.env.NODE_PATH
  ? `${vendorDir}${path.delimiter}${process.env.NODE_PATH}`
  : vendorDir;
Module._initPaths();

const suites = [];
const suiteStack = [];

function currentSuite() {
  return suiteStack[suiteStack.length - 1] || null;
}

function createSuite(title) {
  return {
    title,
    tests: [],
    beforeEachHooks: [],
    afterEachHooks: [],
    beforeHooks: [],
    afterHooks: [],
  };
}

global.describe = (title, suiteFn) => {
  const suite = createSuite(title);
  const parent = currentSuite();
  if (parent) {
    parent.tests.push(suite);
  } else {
    suites.push(suite);
  }

  suiteStack.push(suite);
  try {
    suiteFn.call({ timeout() {} });
  } finally {
    suiteStack.pop();
  }
};

global.it = (title, testFn) => {
  const suite = currentSuite();
  if (!suite) {
    throw new Error('it() must be called inside describe()');
  }
  suite.tests.push({ title, testFn, skipped: false });
};

global.it.skip = (title) => {
  const suite = currentSuite();
  if (!suite) {
    throw new Error('it.skip() must be called inside describe()');
  }
  suite.tests.push({ title, skipped: true });
};

global.beforeEach = (hook) => {
  const suite = currentSuite();
  if (!suite) {
    throw new Error('beforeEach() must be called inside describe()');
  }
  suite.beforeEachHooks.push(hook);
};

global.afterEach = (hook) => {
  const suite = currentSuite();
  if (!suite) {
    throw new Error('afterEach() must be called inside describe()');
  }
  suite.afterEachHooks.push(hook);
};

global.before = (hook) => {
  const suite = currentSuite();
  if (!suite) {
    throw new Error('before() must be called inside describe()');
  }
  suite.beforeHooks.push(hook);
};

global.after = (hook) => {
  const suite = currentSuite();
  if (!suite) {
    throw new Error('after() must be called inside describe()');
  }
  suite.afterHooks.push(hook);
};

function runMaybeAsync(fn) {
  return new Promise((resolve, reject) => {
    if (typeof fn !== 'function') {
      resolve();
      return;
    }

    const context = { timeout() {} };
    try {
      if (fn.length > 0) {
        let doneCalled = false;
        const done = (error) => {
          if (doneCalled) {
            return;
          }
          doneCalled = true;
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        };
        fn.call(context, done);
        return;
      }

      const result = fn.call(context);
      if (result && typeof result.then === 'function') {
        result.then(resolve).catch(reject);
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
}

async function runSuite(suite, ancestors = []) {
  const suiteName = [...ancestors, suite.title].join(' ');
  console.log(suiteName);

  for (const hook of suite.beforeHooks) {
    await runMaybeAsync(hook);
  }

  for (const test of suite.tests) {
    if (test.tests) {
      await runSuite(test, [...ancestors, suite.title]);
      continue;
    }

    if (test.skipped) {
      console.log(`  - ${test.title} (skipped)`);
      continue;
    }

    try {
      for (const hook of suite.beforeEachHooks) {
        await runMaybeAsync(hook);
      }

      await runMaybeAsync(test.testFn);
      console.log(`  ✓ ${test.title}`);
    } catch (error) {
      console.error(`  ✗ ${test.title}`);
      console.error(error && error.stack ? error.stack : error);
      process.exitCode = 1;
    } finally {
      for (const hook of suite.afterEachHooks) {
        await runMaybeAsync(hook);
      }
    }
  }

  for (const hook of suite.afterHooks) {
    await runMaybeAsync(hook);
  }
}

function loadTestFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Test file not found: ${filePath}`);
  }

  require(filePath);
}

async function main() {
  const requestedFiles = process.argv.slice(2).filter((arg) => !arg.startsWith('-'));
  const testFiles = requestedFiles.length > 0 ? requestedFiles : ['test.js'];

  for (const file of testFiles) {
    loadTestFile(path.resolve(process.cwd(), file));
  }

  for (const suite of suites) {
    await runSuite(suite);
  }

  if (process.exitCode && process.exitCode !== 0) {
    process.exit(process.exitCode);
  }
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : error);
  process.exit(1);
});