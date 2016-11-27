'use strict';

/*
 * Protractor Plugin to run axe-core accessibility audits after Angular bootstrapped.
 */

const AxeBuilder = require('axe-webdriverjs');
const {buildMessage} = require('./build-message');

/* Resolved violations */
const violations = {};

/** When the page is ready and Angular is bootstrapped. */
function onPageStable() {

  console.log(this.config);

  AxeBuilder(browser.driver)
    .options(this.config || {})
    .analyze(results => handleResults(this, results));
}

/** Handles the results of axe-core. */
function handleResults(context, results) {

  if (!violations.hasOwnProperty(results.url)) {
    violations[results.url] = true;

    results.violations.forEach(violation => {
      
      let specName = `${violation.help} (${results.url})`;
      let message = '\n' + buildMessage(violation);

      context.addFailure(message, {specName});

    });

  }

}

exports.name = 'protractor-axe';
exports.onPageStable = onPageStable;
