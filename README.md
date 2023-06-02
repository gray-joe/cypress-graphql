# cypress-graphql

[Latest run](/latest-test-run.png)

[Prequisites](https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements)

To install Cypress: `npm install cypress --save-dev`

To run the test suite in headless mode: `npx cypress run --spec "cypress/e2e/" --browser electron`

To run the test suite / individual tests in gui mode: `npx cypress open`


### Reporting

To generate a report for the test suite with mochawesome:

```
npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator

npx cypress run --reporter mochawesome   --reporter-options reportDir="cypress/results",overwrite=false,html=false,json=true

npx mochawesome-merge "cypress/results/*.json" > mochawesome.json

npx marge mochawesome.json
```

This can then be viewed at `${pwd}/mochawesome-report/mochawesome.html`.
