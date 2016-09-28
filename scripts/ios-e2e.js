/* eslint-disable */

'use strict';

require('shelljs/global');

const spawn = require('child_process').spawn;
const path = require('path');
const ROOT = path.normalize(path.join(__dirname, '..'));

cd('ios');
let packagerEnv = Object.create(process.env);
packagerEnv.REACT_NATIVE_MAX_WORKERS = 1;
const packagerProcess = spawn('npm', ['start'],{
  stdio: 'inherit',
  env: packagerEnv
});
const SERVER_PID = packagerProcess.pid;
exec('sleep 15s');
// prepare cache to reduce chances of possible red screen "Can't fibd variable __fbBatchedBridge..."
exec('response=$(curl --write-out %{http_code} --silent --output /dev/null localhost:8081/index.ios.bundle?platform=ios&dev=true)');
echo(`Starting packager server, ${SERVER_PID}`);
echo('Executing ios e2e test');
exec('sleep 10s');
process.exit(exec('xcodebuild test -project remindr.xcodeproj -scheme remindr -destination "platform=iOS Simulator,name=iPhone 6" | xcpretty').code);
cd('..');
