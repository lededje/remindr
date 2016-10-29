set -e

if [ "$TRAVIS_PULL_REQUEST" = "false" ]; then
  jest app/snapshots.test.js
  jest jest app/*/* --coverage
  codeclimate-test-reporter < coverage/lcov.info
else
  jest
fi
