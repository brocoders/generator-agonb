#!/usr/bin/env bash

export CYPRESS_BASE_URL=http://localhost:3000/simple-time-tracker

# clean-up report folder
rm -R -f report && mkdir report

# run tests
yarn cypress run --headless --browser chrome

# # combine report
node mergeReports.js

# # generate-report
yarn marge ./report/mochawesome-report/report.json -f index -o report
