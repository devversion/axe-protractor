'use strict';

/*
 * Protractor Plugin to run axe-core accessibility audits after Angular bootstrapped.
 */

const AxeBuilder = require('axe-webdriverjs')

/** When the page is ready and Angular is bootstrapped. */
function onPageStable() {
  AxeBuilder(browser.driver).analyze(handleResults);
}

/** Handles the results of axe-core. */
function handleResults(results) {
  console.log(results.violations);
}

exports.onPageStable = onPageStable;