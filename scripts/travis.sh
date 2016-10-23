set -e

if [ "$TRAVIS_PULL_REQUEST" = "false" ]; then
  jest --coverage
  codeclimate-test-reporter < coverage/lcov.info
else
  jest
fi
